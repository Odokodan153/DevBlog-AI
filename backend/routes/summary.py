from fastapi import APIRouter
from models.schemas import DevlogInput
from services.summarizer import get_summary

router = APIRouter()

@router.post("/")
def generate_summary(data: DevlogInput):
    summary = get_summary(data.text)
    return {"summary": summary}