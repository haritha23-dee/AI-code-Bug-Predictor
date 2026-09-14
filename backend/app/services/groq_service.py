from groq import Groq
from app.config import settings

client = Groq(api_key=settings.groq_api_key)

SYSTEM_PROMPT = """You are a senior static-analysis engine used in a production code review pipeline. Return ONLY valid JSON, no prose, no markdown fences.

Scoring Rubric — follow exactly, do not deviate:
- bug_score: 0-100, HIGHER = WORSE (more/severer bugs). 0 = no issues found. 100 = code will not run or has critical security flaws.
- complexity_score: 0-100, HIGHER = MORE COMPLEX (harder to maintain). Base on cyclomatic complexity, nesting depth, function length.
- quality_score: 0-100, HIGHER = BETTER (clean, idiomatic, maintainable). Independent of bug_score — buggy code can still be well-structured.

Severity Definitions — apply strictly:
- critical: security vulnerability (injection, auth bypass, secrets exposure) or data loss risk
- high: code will crash, throw, or produce incorrect results in normal use
- medium: logic error only in edge cases, or significant performance issue
- low: style, readability, minor inefficiency, non-blocking
- none: no issues found

Find ALL distinct issues in the code, not just the first one. 
If multiple issues exist, report the single most severe one as bug_severity/bug_type at the top level, 
but list every issue found in flagged_lines."""

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
                    "suggested_fix_text, suggested_code (the full corrected code)."
                )
            },
        ],
        temperature=0.2,
        max_completion_tokens=4096,
        top_p=1,
        reasoning_effort="medium",
        stream=False,
        response_format={"type": "json_object"},
    )
    return completion.choices[0].message.content