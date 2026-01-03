import uuid
from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class ItineraryItemBase(BaseModel):
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    estimated_cost: float = 0.0
    category: Optional[str] = "activity"


class ItineraryItemCreate(ItineraryItemBase):
    pass


class ItineraryItemUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    estimated_cost: Optional[float] = None
    category: Optional[str] = None


class ItineraryItemRead(ItineraryItemBase):
    id: uuid.UUID
    trip_id: uuid.UUID

    class Config:
        from_attributes = True
