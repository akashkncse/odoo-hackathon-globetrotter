import uuid
from typing import Optional
from datetime import date
from pydantic import BaseModel

class TripBase(BaseModel):
    title: str
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    cover_photo_url: Optional[str] = None

class TripCreate(TripBase):
    pass

class TripUpdate(TripBase):
    title: Optional[str] = None # Allow partial updates

class TripRead(TripBase):
    id: uuid.UUID
    user_id: uuid.UUID

    class Config:
        from_attributes = True