from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_async_session
from app.core.users import current_active_user
from app.models.user import User
from app.models.trip import Trip
from app.schemas.trip import TripCreate, TripRead, TripUpdate

trips_router = APIRouter()

@trips_router.post("/", response_model=TripRead, status_code=status.HTTP_201_CREATED)
async def create_trip(
    trip_in: TripCreate,
    user: User = Depends(current_active_user),
    session: AsyncSession = Depends(get_async_session),
):
    """Create a new trip for the current user."""
    new_trip = Trip(
        **trip_in.model_dump(),
        user_id=user.id
    )
    session.add(new_trip)
    await session.commit()
    await session.refresh(new_trip)
    return new_trip

@trips_router.get("/", response_model=List[TripRead])
async def read_trips(
    skip: int = 0,
    limit: int = 100,
    user: User = Depends(current_active_user),
    session: AsyncSession = Depends(get_async_session),
):
    """Get all trips belonging to the current user."""
    query = select(Trip).where(Trip.user_id == user.id).offset(skip).limit(limit)
    result = await session.execute(query)
    return result.scalars().all()

@trips_router.get("/{trip_id}", response_model=TripRead)
async def read_trip(
    trip_id: str,
    user: User = Depends(current_active_user),
    session: AsyncSession = Depends(get_async_session),
):
    """Get a specific trip by ID (ensure user owns it)."""
    # Note: trip_id should probably be UUID in the path param, but str works too if cast
    query = select(Trip).where(Trip.id == trip_id, Trip.user_id == user.id)
    result = await session.execute(query)
    trip = result.scalar_one_or_none()
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    return trip