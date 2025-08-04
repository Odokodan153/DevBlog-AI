from pydantic import BaseModel

class DevlogInput(BaseModel):
    text: str