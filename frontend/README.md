# 🎨 Globetrotter Frontend

> Modern React frontend for the Globetrotter travel planning application.

## 📋 Overview

This is the frontend for Globetrotter, built with React 19, TypeScript, and Tailwind CSS. It provides a beautiful, responsive interface for planning and managing your travels.

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **DaisyUI** - Beautiful UI components
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/          # Page components
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── CreateTrip.tsx
│   │   ├── TripItinerary.tsx
│   │   └── UserProfile.tsx
│   ├── components/     # Reusable components
│   │   └── Navbar.tsx
│   ├── api/            # API configuration
│   │   └── axios.ts
│   ├── utils/          # Utility functions
│   │   └── api.ts
│   ├── App.tsx         # Main app component
│   ├── App.css         # App styles
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── package.json        # Dependencies
└── vite.config.ts      # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. **Navigate to the frontend folder**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The app will be running at `http://localhost:5173`

## 📜 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## 🗺️ Pages & Routes

| Route            | Page           | Description             |
| ---------------- | -------------- | ----------------------- |
| `/`              | Dashboard      | View all your trips     |
| `/home`          | Home           | Landing page            |
| `/login`         | Login          | Sign in to your account |
| `/register`      | Register       | Create a new account    |
| `/create-trip`   | Create Trip    | Plan a new trip         |
| `/trips/:tripId` | Trip Itinerary | View trip details       |
| `/profile`       | User Profile   | Manage your profile     |

## 🎨 Styling

The app uses **Tailwind CSS** with **DaisyUI** components for a clean, modern look.

### Customization

- Global styles: `src/index.css`
- App-specific styles: `src/App.css`
- Tailwind config is handled via `@tailwindcss/vite` plugin

## 🔗 API Integration

The frontend connects to the backend API using Axios. API configuration is in `src/api/axios.ts`.

Make sure the backend server is running at `http://localhost:8000` before using the app.

## 🏗️ Building for Production

```bash
# Build the app
npm run build

# Preview the build
npm run preview
```

The production build will be in the `dist/` folder.

## 🧹 Code Quality

```bash
# Run linting
npm run lint
```

ESLint is configured with TypeScript and React rules for clean, consistent code.

---

Built with ❤️ using React + TypeScript + Vite
