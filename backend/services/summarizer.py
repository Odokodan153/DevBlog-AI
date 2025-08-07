from transformers import pipeline

# This model is loaded into memory once when the application starts.
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def get_summary(text: str, min_len: int, max_len: int) -> str:
    """
    Generates a summary for the given text using the pre-loaded model.
    The model has a token limit of 1024. Truncating by character is a simple
    safeguard but a more advanced solution would use the model's tokenizer.
    """
    # Simple truncation to prevent errors with very long text
    if len(text) > 4000:
        text = text[:4000]

    result = summarizer(text, max_length=max_len, min_length=min_len, do_sample=False)
    return result[0]['summary_text']