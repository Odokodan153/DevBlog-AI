from services.summarizer import get_summary

def test_get_summary_short_text():
    text = (
        "FastAPI е модерен, бърз (високопроизводителен) уеб framework за Python "
        "за изграждане на API-та на база на стандартите OpenAPI и JSON Schema."
    )
    summary = get_summary(text)
    assert isinstance(summary, str)
    assert 10 < len(summary) < 300
