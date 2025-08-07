from services.summarizer import get_summary

def test_get_summary_short_text():
    # The Bulgarian text has been replaced with its English equivalent.
    text = (
        "FastAPI is a modern, fast (high-performance) web framework for Python "
        "for building APIs based on the OpenAPI and JSON Schema standards."
    )
    # Note: This test might fail now because it calls the real Gemini API.
    # For a real-world application, you would "mock" the API call during testing.
    summary = get_summary(text, min_len=10, max_len=30)
    assert isinstance(summary, str)
    assert 5 < len(summary.split()) < 35