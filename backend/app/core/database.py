from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings

# Create async engine
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    future=True,
)

# Create async session factory
async_session_maker = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    """Base class for all database models."""
    pass


async def create_db_and_tables():
    """Create all database tables."""
    async with engine.begin() as conn:
        from app.models.trip import Trip
        from app.models.itinerary import ItineraryItem

        await conn.run_sync(Base.metadata.create_all)


async def get_async_session() -> AsyncSession:
    """Dependency to get async database session."""
    async with async_session_maker() as session:
        yield session
