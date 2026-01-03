import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Check,
  X,
} from "lucide-react";
import api from "../utils/api";
import Navbar from "../components/Navbar";

// Define Types
interface UserData {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  city?: string;
  country?: string;
  profile_picture_url?: string;
}

interface Trip {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  cover_photo_url?: string;
}

export default function UserProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // State for User Data & Trips
  const [user, setUser] = useState<UserData | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);

  // Form State for Editing
  const [editForm, setEditForm] = useState<UserData | null>(null);

  // --- 1. Fetch Data on Load ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user details
        const userRes = await api.get("/users/me");
        setUser(userRes.data);
        setEditForm(userRes.data);

        // Fetch user's trips
        const tripRes = await api.get("/trips/");
        setTrips(Array.isArray(tripRes.data) ? tripRes.data : []);
      } catch (error: any) {
        console.error("Failed to load profile", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  // --- 2. Helper Logic: Split Trips into Upcoming vs Past ---
  const today = new Date().toISOString().split("T")[0];
  const upcomingTrips = (trips || []).filter((t) => t.start_date >= today);
  const pastTrips = (trips || []).filter((t) => t.end_date < today);

  // --- 3. Handle Profile Update ---
  const handleSave = async () => {
    if (!editForm) return;
    try {
      const response = await api.patch("/users/me", {
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        phone_number: editForm.phone_number,
        city: editForm.city,
        country: editForm.country,
      });
      setUser(response.data);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 pb-20">
      {/* Shared Navbar */}
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* --- 1. User Details Section --- */}
        <div className="card lg:card-side bg-base-100 shadow-xl overflow-hidden">
          {/* Avatar Section */}
          <div className="bg-primary/10 p-8 flex flex-col items-center justify-center min-w-[250px]">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    user?.profile_picture_url ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
                  }
                  alt="Profile"
                />
              </div>
            </div>
            <h2 className="mt-4 text-xl font-bold">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="text-sm opacity-60">Travel Enthusiast</p>
          </div>

          {/* Details / Edit Form */}
          <div className="card-body">
            <div className="flex justify-between items-start mb-4">
              <h2 className="card-title text-2xl">Profile Details</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-sm btn-outline gap-2"
                >
                  <Edit2 size={16} /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn btn-sm btn-ghost text-error"
                  >
                    <X size={16} /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn btn-sm btn-primary"
                  >
                    <Check size={16} /> Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <User size={16} /> First Name
                  </span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered ${
                    !isEditing && "input-ghost pl-0 border-none"
                  }`}
                  disabled={!isEditing}
                  value={editForm?.first_name || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm!, first_name: e.target.value })
                  }
                />
              </div>

              {/* Last Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <User size={16} /> Last Name
                  </span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered ${
                    !isEditing && "input-ghost pl-0 border-none"
                  }`}
                  disabled={!isEditing}
                  value={editForm?.last_name || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm!, last_name: e.target.value })
                  }
                />
              </div>

              {/* Email (Read-only) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <Mail size={16} /> Email
                  </span>
                </label>
                <input
                  type="text"
                  value={user?.email || ""}
                  className="input input-ghost pl-0 border-none"
                  disabled
                />
              </div>

              {/* Phone */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <Phone size={16} /> Phone
                  </span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered ${
                    !isEditing && "input-ghost pl-0 border-none"
                  }`}
                  disabled={!isEditing}
                  value={editForm?.phone_number || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm!, phone_number: e.target.value })
                  }
                />
              </div>

              {/* City */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <MapPin size={16} /> City
                  </span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered ${
                    !isEditing && "input-ghost pl-0 border-none"
                  }`}
                  disabled={!isEditing}
                  value={editForm?.city || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm!, city: e.target.value })
                  }
                />
              </div>

              {/* Country */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <MapPin size={16} /> Country
                  </span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered ${
                    !isEditing && "input-ghost pl-0 border-none"
                  }`}
                  disabled={!isEditing}
                  value={editForm?.country || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm!, country: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- 2. Preplanned Trips (Upcoming) --- */}
        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="text-primary" /> Preplanned Trips
          </h3>
          {upcomingTrips.length === 0 ? (
            <div className="alert">No upcoming trips planned.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} navigate={navigate} />
              ))}
            </div>
          )}
        </div>

        {/* --- 3. Previous Trips (Past) --- */}
        <div>
          <h3 className="text-2xl font-bold mb-4 opacity-70 flex items-center gap-2">
            <Check className="text-success" /> Previous Trips
          </h3>
          {pastTrips.length === 0 ? (
            <div className="alert opacity-60">No past trips found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80 hover:opacity-100 transition-opacity">
              {pastTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} navigate={navigate} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Reusable Trip Card Component ---
function TripCard({
  trip,
  navigate,
}: {
  trip: Trip;
  navigate: ReturnType<typeof useNavigate>;
}) {
  return (
    <div className="card bg-base-100 shadow-lg image-full h-48 hover:scale-105 transition-transform cursor-pointer">
      <figure>
        <img
          src={
            trip.cover_photo_url ||
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80"
          }
          alt={trip.title}
        />
      </figure>
      <div className="card-body justify-end">
        <h3 className="card-title text-white shadow-black drop-shadow-md">
          {trip.title}
        </h3>
        <div className="card-actions justify-end">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => navigate(`/trips/${trip.id}`)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
