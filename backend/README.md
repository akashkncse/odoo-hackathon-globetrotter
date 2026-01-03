# 🔧 Globetrotter Backend

> FastAPI-powered REST API for the Globetrotter travel planning application.

## 📋 Overview

This is the backend service for Globetrotter, built with FastAPI. It handles user authentication, trip management, and itinerary planning with a PostgreSQL database.

## 🛠️ Tech Stack

- **FastAPI** - Modern, fast web framework
- **SQLAlchemy** - Database ORM with async support
- **FastAPI-Users** - Ready-to-use user authentication
- **Pydantic** - Data validation and settings
- **PostgreSQL** - Database (via AsyncPG)
- **Uvicorn** - ASGI server

## 📁 Project Structure

```
backend/
├── app/
│   ├── api/           # API route handlers
│   │   ├── routes.py  # Main router
│   │   ├── trips.py   # Trip endpoints
│   │   └── itineraries.py
│   ├── core/          # Core functionality
│   │   ├── config.py  # App settings
│   │   ├── database.py# DB connection
│   │   └── users.py   # User management
│   ├── models/        # SQLAlchemy models
│   │   ├── user.py
│   │   ├── trip.py
│   │   └── itinerary.py
│   ├── schemas/       # Pydantic schemas
│   │   ├── user.py
│   │   ├── trip.py
│   │   └── itinerary.py
│   └── main.py        # App entry point
├── pyproject.toml     # Dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Python 3.12 or higher
- PostgreSQL database
- [uv](https://github.com/astral-sh/uv) package manager

### Installation

1. **Navigate to the backend folder**

   ```bash
   cd backend
   ```

2. **Create virtual environment and install dependencies**

   ```bash
   uv venv
   uv sync
   ```

3. **Activate the virtual environment**

   ```bash
   # On macOS/Linux
   source .venv/bin/activate

   # On Windows
   .venv\Scripts\activate
   ```

4. **Set up environment variables**

   Create a `.env` file in the backend folder:

   ```env
   DATABASE_URL=postgresql+asyncpg://username:password@localhost:5432/globetrotter
   SECRET_KEY=your-super-secret-key-here
   DEBUG=True
   ```

5. **Run the server**
   ```bash
   uvicorn app.main:app --reload
   ```

The API will be running at `http://localhost:8000`

## 📡 API Documentation

Once the server is running, you can access:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### Main Endpoints

| Method | Endpoint                         | Description           |
| ------ | -------------------------------- | --------------------- |
| `GET`  | `/`                              | Welcome message       |
| `GET`  | `/health`                        | Health check          |
| `POST` | `/api/v1/auth/register`          | Register new user     |
| `POST` | `/api/v1/auth/jwt/login`         | Login (get JWT token) |
| `POST` | `/api/v1/auth/jwt/logout`        | Logout                |
| `GET`  | `/api/v1/trips`                  | List all trips        |
| `POST` | `/api/v1/trips`                  | Create a trip         |
| `GET`  | `/api/v1/trips/{id}`             | Get trip by ID        |
| `GET`  | `/api/v1/trips/{id}/itineraries` | Get trip itineraries  |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. Register a new user at `/api/v1/auth/register`
2. Login at `/api/v1/auth/jwt/login` to get a token
3. Include the token in the `Authorization` header: `Bearer <your-token>`

## 🗃️ Database

The app uses PostgreSQL with async support. Tables are automatically created on startup.

### Models

- **User** - User accounts and authentication
- **Trip** - Travel trips with destination, dates, etc.
- **Itinerary** - Day-by-day plans within a trip

## 🧪 Development

```bash
# Run with auto-reload
uvicorn app.main:app --reload

# Run on a different port
uvicorn app.main:app --reload --port 8080
```

## 📝 Environment Variables

| Variable        | Description                  | Default               |
| --------------- | ---------------------------- | --------------------- |
| `DATABASE_URL`  | PostgreSQL connection string | Required              |
| `SECRET_KEY`    | JWT signing key              | Required              |
| `DEBUG`         | Enable debug mode            | `True`                |
| `APP_NAME`      | Application name             | `FastAPI Application` |
| `API_V1_PREFIX` | API route prefix             | `/api/v1`             |

---

Built with ❤️ using FastAPI
