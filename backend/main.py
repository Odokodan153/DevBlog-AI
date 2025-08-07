from fastapi import FastAPI, HTTPException
from fastapi.concurrency import run_in_threadpool
from models.schemas import SummaryRequest
from services.summarizer import get_summary

# It's good practice to define metadata for your API documentation
app = FastAPI(
    title="AI Devlog Summarizer",
    description="An API to summarize text using the Gemini API.",
    version="1.0.0",
)

# A dictionary to map user-friendly length presets to model parameters
LENGTH_PRESETS = {
    "short": {"min_len": 20, "max_len": 60},
    "medium": {"min_len": 50, "max_len": 150},
    "long": {"min_len": 100, "max_len": 250},
}

@app.post("/summarize/", tags=["Summarization"])
async def summarize(request: SummaryRequest):
    """
    Receives text and returns a summary of a chosen length.
    - **text**: The source text to summarize.
    - **length_preset**: Can be 'short', 'medium', or 'long'.
    """
    # Get the min and max length from our preset dictionary
    preset = LENGTH_PRESETS.get(request.length_preset)
    if not preset:
        # This case should ideally not be hit due to Pydantic validation, but it's good practice
        raise HTTPException(status_code=400, detail="Invalid length preset provided.")

    try:
        # Run the synchronous, CPU-bound summarizer in a separate threadpool
        # This prevents the server from blocking
        summary = await run_in_threadpool(
            get_summary,
            text=request.text,
            min_len=preset["min_len"],
            max_len=preset["max_len"]
        )
        return {"summary": summary}
    except Exception as e:
        # Catch potential errors from the summarization service
        raise HTTPException(status_code=500, detail=f"An error occurred during summarization: {e}")