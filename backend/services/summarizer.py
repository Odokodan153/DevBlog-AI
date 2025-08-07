import google.generativeai as genai

# Paste your API key here, as requested.
genai.configure(api_key="[paste your api key here]")

# We are setting up the model to use.
model = genai.GenerativeModel('gemini-1.5-flash') # 'gemini-1.5-flash' is a fast and very capable model.

def get_summary(text: str, min_len: int, max_len: int) -> str:
    """
    Generates a summary by sending a request to the Gemini API.

    Args:
        text: The text to be summarized.
        min_len: The minimum desired length of the summary in words.
        max_len: The maximum desired length of the summary in words.

    Returns:
        The generated summary as a string.
    """

    # We create a "prompt" - a clear instruction for the AI model.
    prompt = f"""
    Your task is to act as an expert in creating summaries.
    Summarize the following text within {min_len} to {max_len} words.
    Return only the clean summary without any additional explanations or titles.

    Original text to summarize:
    ---
    {text}
    ---
    """

    try:
        # We send the prompt to the model
        response = model.generate_content(prompt)
        # We return only the text part of the response
        return response.text.strip()
    except Exception as e:
        # Error handling in case the API returns a problem
        print(f"An error occurred while contacting the Gemini API: {e}")
        return "Sorry, an error occurred while trying to summarize."