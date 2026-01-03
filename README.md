# 🌍 Globetrotter

> Your personal travel companion for planning and organizing trips effortlessly.

**Hackathon Submission for Odoo Hackathon 2026**

---

## ✨ What is Globetrotter?

Globetrotter is a full-stack web application that helps travelers plan, organize, and manage their trips. Create detailed itineraries, track your travel plans, and never miss a moment of your adventure.

## 🚀 Features

- **User Authentication** - Secure sign-up and login with JWT tokens
- **Trip Management** - Create, view, and manage your trips
- **Itinerary Planning** - Build detailed day-by-day itineraries for each trip
- **Dashboard** - See all your trips at a glance
- **User Profiles** - Manage your account and preferences

## 🛠️ Tech Stack

| Frontend     | Backend       | Database   |
| ------------ | ------------- | ---------- |
| React 19     | FastAPI       | PostgreSQL |
| TypeScript   | SQLAlchemy    | AsyncPG    |
| Tailwind CSS | Pydantic      |            |
| DaisyUI      | FastAPI-Users |            |
| Vite         | Uvicorn       |            |

## 📁 Project Structure

```
globetrotter/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── pages/     # Page components
│   │   ├── components/# Reusable components
│   │   └── api/       # API integration
│   └── ...
├── backend/           # FastAPI backend
│   ├── app/
│   │   ├── api/       # API routes
│   │   ├── models/    # Database models
│   │   ├── schemas/   # Pydantic schemas
│   │   └── core/      # Config & database setup
│   └── ...
└── README.md
```

## 🏃‍♂️ Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (3.12 or higher)
- **PostgreSQL** database
- **uv** (Python package manager) - [Install uv](https://github.com/astral-sh/uv)

### 1. Clone the Repository

```bash
git clone https://github.com/akashkncse/odoo-hackathon-globetrotter.git
cd odoo-hackathon-globetrotter
```

### 2. Set Up the Backend

```bash
cd backend

# Create and activate virtual environment
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
uv sync

# Set up environment variables
# Create a .env file with your database URL and secret key
# DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/globetrotter
# SECRET_KEY=your-super-secret-key

# Run the server
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000` with docs at `http://localhost:8000/docs`

### 3. Set Up the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📡 API Endpoints

| Method | Endpoint                         | Description             |
| ------ | -------------------------------- | ----------------------- |
| POST   | `/api/v1/auth/register`          | Register a new user     |
| POST   | `/api/v1/auth/jwt/login`         | Login and get JWT token |
| GET    | `/api/v1/trips`                  | Get all trips           |
| POST   | `/api/v1/trips`                  | Create a new trip       |
| GET    | `/api/v1/trips/{id}`             | Get trip details        |
| GET    | `/api/v1/trips/{id}/itineraries` | Get trip itineraries    |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Built with ❤️ for Odoo Hackathon 2026

---

_Happy Travels! 🛫_
