from typing import List
import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_async_session
from app.core.users import current_active_user
from app.models.user import User
from app.models.trip import Trip
from app.models.itinerary import ItineraryItem
from app.schemas.itinerary import ItineraryItemCreate, ItineraryItemRead, ItineraryItemUpdate

itineraries_router = APIRouter()


async def verify_trip_ownership(
    trip_id: uuid.UUID,
    user: User,
    session: AsyncSession,
) -> Trip:
    """Helper to verify trip exists and belongs to user."""
    result = await session.execute(
        select(Trip).where(Trip.id == trip_id, Trip.user_id == user.id)
    )
    trip = result.scalar_one_or_none()
    
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    return trip


@itineraries_router.post("/{trip_id}/items", response_model=ItineraryItemRead, status_code=status.HTTP_201_CREATED)
async def create_itinerary_item(
    trip_id: uuid.UUID,
    item_in: ItineraryItemCreate,
    user: User = Depends(current_active_user),
    session: AsyncSession = Depends(get_async_session),
):
    """Create a new itinerary item (section) for a specific trip."""
    # Security Check: Does the trip exist and does it belong to this user?
    await verify_trip_ownership(trip_id, user, session)

    # Create the item
    new_item = ItineraryItem(
        **item_in.model_dump(),
        trip_id=trip_id
    )
    
    session.add(new_item)
    await session.commit()
    await session.refresh(new_item)
    return new_item


@itineraries_router.get("/{trip_id}/items", response_model=List[ItineraryItemRead])
async def read_itinerary_items(
    trip_id: uuid.UUID,
    user: User = Depends(current_active_user),
    session: AsyncSession = Depends(get_async_session),
):
    """Get all itinerary items for a specific trip, sorted by start_time."""
    # Security Check
    await verify_trip_ownership(trip_id, user, session)

    # Fetch items sorted by start_time
    query = select(ItineraryItem).where(ItineraryItem.trip_id == trip_id).order_by(ItineraryItem.start_time)
    result = await session.execute(query)
    return result.scalars().all()


@itineraries_router.get("/{trip_id}/items/{item_id}", response_model=ItineraryItemRead)
async def read_itinerary_item(
    trip_id: uuid.UUID,
    item_id: uuid.UUID,
    user: User = Depends(current_active_user),
    session: AsyncSession = Depends(get_async_session),
):
    """Get a specific itinerary item by ID."""
    await verify_trip_ownership(trip_id, user, session)

    query = select(ItineraryItem).where(
        ItineraryItem.id == item_id,
        ItineraryItem.trip_id == trip_id
    )
    result = await session.execute(query)
    item = result.scalar_one_or_none()
    
    if not item:
        raise HTTPException(status_code=404, detail="Itinerary item not found")
    return item


@itineraries_router.patch("/{trip_id}/items/{item_id}", response_model=ItineraryItemRead)
async def update_itinerary_item(
    trip_id: uuid.UUID,
    item_id: uuid.UUID,
    item_update: ItineraryItemUpdate,
    user: User = Depends(current_active_user),
    session: AsyncSession = Depends(get_async_session),
):
    """Update an itinerary item."""
    await verify_trip_ownership(trip_id, user, session)

    query = select(ItineraryItem).where(
        ItineraryItem.id == item_id,
        ItineraryItem.trip_id == trip_id
    )
    result = await session.execute(query)
    item = result.scalar_one_or_none()
    
    if not item:
        raise HTTPException(status_code=404, detail="Itinerary item not found")

    # Update only provided fields
    update_data = item_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)

    await session.commit()
    await session.refresh(item)
    return item


@itineraries_router.delete("/{trip_id}/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_itinerary_item(
    trip_id: uuid.UUID,
    item_id: uuid.UUID,
    user: User = Depends(current_active_user),
    session: AsyncSession = Depends(get_async_session),
):
    """Delete an itinerary item."""
    await verify_trip_ownership(trip_id, user, session)

    query = select(ItineraryItem).where(
        ItineraryItem.id == item_id,
        ItineraryItem.trip_id == trip_id
    )
    result = await session.execute(query)
    item = result.scalar_one_or_none()
    
    if not item:
        raise HTTPException(status_code=404, detail="Itinerary item not found")

    await session.delete(item)
    await session.commit()
