import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import "./App.css";
import Login from "./pages/Login";
import CreateTrip from "./pages/CreateTrip";
import TripItinerary from "./pages/TripItinerary";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/trips/:tripId" element={<TripItinerary />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
