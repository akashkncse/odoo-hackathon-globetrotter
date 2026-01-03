import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  Plus,
  Calendar,
  ArrowRight,
  ArrowUpDown,
} from "lucide-react";
import api from "../utils/api";
import Navbar from "../components/Navbar";

// --- Dummy Data for "Top Regional Selections" ---
const REGIONS = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400",
    trips: "12k+ Trips",
  },
  {
    id: 2,
    name: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400",
    trips: "8k+ Trips",
  },
  {
    id: 3,
    name: "Tokyo, Japan",
    image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=400",
    trips: "15k+ Trips",
  },
  {
    id: 4,
    name: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=400",
    trips: "9k+ Trips",
  },
  {
    id: 5,
    name: "Santorini, Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=400",
    trips: "5k+ Trips",
  },
];

interface Trip {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  cover_photo_url?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Fetch User's Real Trips ---
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get("/trips/");
        // Ensure we always have an array
        setTrips(Array.isArray(response.data) ? response.data : []);
        setError(null);
      } catch (error: any) {
        console.error("Failed to fetch trips", error);
        setTrips([]); // Set empty array on error
        // Check if it's an auth error
        if (error.response?.status === 401) {
          navigate("/login");
          return;
        }
        setError("Failed to load trips. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [navigate]);

  // Filter trips locally for search visual
  const filteredTrips = (trips || []).filter((t) =>
    t.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-base-200 pb-20">
      {/* Shared Navbar */}
      <Navbar />

      {/* --- 2. Hero Banner (Wireframe: "Banner Image") --- */}
      <div
        className="hero h-64 md:h-80"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl font-bold text-white">
              Your Next Adventure Awaits
            </h1>
            <p className="mb-5 text-gray-200">
              Explore the world, plan your journey, and create memories that
              last a lifetime.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        {/* --- 3. Search & Filter Bar (Wireframe Screen 3) --- */}
        <div className="card bg-base-100 shadow-xl mb-12">
          <div className="card-body p-4 flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search your trips..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
              <button className="btn btn-outline btn-sm gap-2">
                <SlidersHorizontal size={16} /> Group by
              </button>
              <button className="btn btn-outline btn-sm gap-2">
                <Filter size={16} /> Filter
              </button>
              <button className="btn btn-outline btn-sm gap-2">
                <ArrowUpDown size={16} /> Sort by
              </button>
            </div>
          </div>
        </div>

        {/* --- 4. Top Regional Selections (Horizontal Scroll) --- */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 ml-1 flex items-center gap-2">
            <MapPin className="text-primary" /> Top Regional Selections
          </h2>

          <div className="carousel carousel-center w-full p-4 space-x-4 bg-neutral rounded-box">
            {REGIONS.map((region) => (
              <div key={region.id} className="carousel-item">
                <div className="card w-64 bg-base-100 shadow-xl image-full hover:scale-105 transition-transform cursor-pointer">
                  <figure>
                    <img src={region.image} alt={region.name} />
                  </figure>
                  <div className="card-body justify-end p-4">
                    <h3 className="card-title text-white text-lg">
                      {region.name}
                    </h3>
                    <div className="badge badge-primary">{region.trips}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 5. Previous Trips (Grid) --- */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold ml-1">Your Trips</h2>
            <button
              onClick={() => navigate("/create-trip")}
              className="btn btn-link no-underline text-primary hidden md:block"
            >
              Plan a new trip &rarr;
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-base-100 rounded-xl border border-dashed border-error">
              <h3 className="text-lg font-bold text-error">{error}</h3>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-outline btn-error mt-4"
              >
                Retry
              </button>
            </div>
          ) : filteredTrips.length === 0 ? (
            <div className="text-center py-20 bg-base-100 rounded-xl border border-dashed border-base-300">
              <h3 className="text-lg font-bold opacity-60">No trips found</h3>
              <p className="text-sm opacity-50">
                Start your first adventure today!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                  onClick={() => navigate(`/trips/${trip.id}`)}
                >
                  <figure className="h-48 overflow-hidden">
                    <img
                      src={
                        trip.cover_photo_url ||
                        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </figure>
                  <div className="card-body p-5">
                    <h2 className="card-title text-xl">{trip.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <Calendar size={14} />
                      <span>
                        {trip.start_date} — {trip.end_date}
                      </span>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <button className="btn btn-sm btn-ghost gap-1 group-hover:text-primary transition-colors">
                        View Itinerary <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- 6. Floating Action Button (FAB) --- */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => navigate("/create-trip")}
          className="btn btn-primary btn-circle btn-lg shadow-lg hover:scale-110 transition-transform"
          title="Plan a new trip"
        >
          <Plus size={32} />
        </button>
      </div>
    </div>
  );
}
