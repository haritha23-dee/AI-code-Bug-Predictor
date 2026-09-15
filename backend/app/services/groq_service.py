from groq import Groq
from app.config import settings

client = Groq(api_key=settings.groq_api_key)

SYSTEM_PROMPT = """You are a senior static-analysis engine used in a production code review pipeline. Return ONLY valid JSON, no prose, no markdown fences.

Scoring Rubric — follow exactly, do not deviate:
- bug_score: 0-100, HIGHER = WORSE (more/severer bugs). 0 = no issues found. 100 = code will not run or has critical security flaws.
- complexity_score: 0-100, HIGHER = MORE COMPLEX (cyclomatic complexity, nesting, function length). - quality_score: 0-100, HIGHER = BETTER. MUST be penalized by severity, not independent:
  - any critical finding caps quality_score at 40 max
  - any high finding caps quality_score at 65 max
  - only medium/low/none findings may score quality_score above 65 buggy code can still be well-structured.

Severity Definitions — apply strictly:
- critical: security vulnerability (injection, XSS, auth bypass, secrets exposure) or data loss risk
- high: code will crash, throw, or produce incorrect results in normal use
- medium: logic error only in edge cases, missing error handling, unhandles promise rejection, significant performance issue
- low: style, readability, minor inefficiency, non-blocking
- none: no issues found

COVERAGE: find every distinct issue, not just the first. Check explicitly for: security (injection/XSS/unsafe storage/secrets), unhandled errors/promises, missing input validation, unsafe user-facing error exposure (raw alert/console for prod paths), resource leaks, race conditions. Cap at 10 findings max, ordered most-to-least severe.
bug_type MUST be a short snake_case label (e.g. "unsafe_token_storage", "unhandled_promise", "missing_validation"), never a sentence."""

def analyze_code(code: str, language: str) -> str:
    completion = client.chat.completions.create(
        model=settings.groq_model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": (
                    f"Analyze this {language} code.\n\n{code}\n\n"
                    "Return JSON with exactly these keys: bug_severity (low/medium/high/critical/none — "
                    "the MOST severe issue found), bug_type (short label for the most severe issue), "
                    "bug_score (0-100, per rubric above), complexity_score (0-100, per rubric above), "
                    "quality_score (0-100, per rubric above), "
                    "flagged_lines (array of ALL issues found, each with line, message, severity), "
                    "suggested_fix_text, suggested_code (ONLY the corrected lines.snippet for the flagged issues, not the full file - max ~800 tokens)."
                )
            },
        ],
        temperature=0,
        max_completion_tokens=3072,
        top_p=1,
        reasoning_effort="medium",
        stream=False,
        response_format={"type": "json_object"},
    )
    return completion.choices[0].message.content