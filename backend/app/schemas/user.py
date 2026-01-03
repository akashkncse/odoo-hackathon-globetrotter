import uuid
from fastapi_users import schemas

class UserRead(schemas.BaseUser[uuid.UUID]):
    """Schema for reading user data."""
    first_name: str | None = None
    last_name: str | None = None
    phone_number: str | None = None
    city: str | None = None
    country: str | None = None
    additional_info: str | None = None
    profile_picture_url: str | None = None


class UserCreate(schemas.BaseUserCreate):
    """Schema for creating a new user."""
    first_name: str | None = None
    last_name: str | None = None
    phone_number: str | None = None
    city: str | None = None
    country: str | None = None
    additional_info: str | None = None
    profile_picture_url: str | None = None


class UserUpdate(schemas.BaseUserUpdate):
    """Schema for updating user data."""
    first_name: str | None = None
    last_name: str | None = None
    phone_number: str | None = None
    city: str | None = None
    country: str | None = None
    additional_info: str | None = None
    profile_picture_url: str | None = None