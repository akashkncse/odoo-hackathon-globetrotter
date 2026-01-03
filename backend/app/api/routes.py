from fastapi import APIRouter

from app.core.users import auth_backend, fastapi_users
from app.schemas.user import UserCreate, UserRead, UserUpdate
from app.api.trips import trips_router
router = APIRouter()

# Auth routes - login, logout
router.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)

# Registration route
router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
router.include_router(
    trips_router,
    prefix="/trips",
    tags=["trips"]
)

# Password reset routes
router.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)

# Email verification routes
router.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)

# User management routes
router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)
