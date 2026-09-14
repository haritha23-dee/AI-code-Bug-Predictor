from groq import Groq
from app.config import settings
import json

client = Groq(api_key=settings.groq_api_key)

def analyze_code(code: str, language: str) -> dict:
    completion = client.chat.completions.create(
        model = settings.groq_model,
        messages = [
            {"role": "system", "content": "You are a code analysis enginer. Returns only valid JSON, no prose, nor markdown fences."},
            {"role": "user", "content" :(
                f"Analyze this {language} code for bugs, complexity and quality.\n\n{code}\n\n"
                "Return JSON with exactly these keys: bug_severity (low/medium/high/critical/none), "
                "bug_type, bug_score (0-100), complexity_score (0-100), quality_score (0-100), "
                "flagged_lines (array of {line, message, severity}), suggested_fix_text, suggested_code."
             )}
        ],
        temperature = 0.1,
        max_completion_tokens=2048,
        top_p = 1,
        reasoning_effort="medium",
        stream=False,
        response_format={"type": "json_object"},
    )
    return completion.choices[0].message.content