from pydantic import BaseModel, Field
from typing import Literal

class SummaryRequest(BaseModel):
    text: str = Field(..., min_length=50, description="The text to be summarized.")
    length_preset: Literal["short", "medium", "long"] = Field(
        "medium",
        description="The desired length of the summary."
    )