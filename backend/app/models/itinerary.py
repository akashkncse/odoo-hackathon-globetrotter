import uuid
from datetime import datetime
from sqlalchemy import String, ForeignKey, Float, DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class ItineraryItem(Base):
    __tablename__ = "itinerary_items"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    
    # The Link: This connects the item to a specific Trip
    trip_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("trips.id"), index=True)
    
    # Fields from wireframe
    title: Mapped[str] = mapped_column(String(100))  # e.g. "Hotel Stay", "Museum Visit"
    description: Mapped[str | None] = mapped_column(Text, nullable=True)  # "Necessary info..."
    
    start_time: Mapped[datetime] = mapped_column(DateTime)  # Start of this section
    end_time: Mapped[datetime] = mapped_column(DateTime)    # End of this section
    
    estimated_cost: Mapped[float] = mapped_column(Float, default=0.0)  # "Budget of this section"
    
    # Optional: Categorize the item (Travel, Stay, Activity)
    category: Mapped[str] = mapped_column(String(50), default="activity")
