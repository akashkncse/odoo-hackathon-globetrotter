import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // Adjust path as needed

// Dummy data for suggestions
const SUGGESTIONS = [
  {
    id: 1,
    title: "Kyoto, Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    title: "Swiss Alps",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    title: "New York City",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    title: "Santorini, Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=400",
  },
];

export default function CreateTrip() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    cover_photo_url: "",
  });

  // --- 1. AUTH GUARD ---
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please login to plan a trip!");
      navigate("/"); // Redirect to login
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/trips/", formData);
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to create trip!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. LOGIC UPDATE: Save Image URL too ---
  const handleSuggestionClick = (place: (typeof SUGGESTIONS)[0]) => {
    setFormData({
      ...formData,
      title: place.title,
      cover_photo_url: place.image, // <--- Auto-fill the image URL
    });
  };

  return (
    <div className="min-h-screen bg-base-200 p-8 flex justify-center items-start">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body p-8">
          {/* Header */}
          <div className="border-b pb-4 mb-8">
            <h1 className="text-3xl font-bold text-base-content">
              Plan a New Trip
            </h1>
            <p className="text-base-content/60 mt-1">
              Where will your next adventure take you?
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Top Section: Place & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Select a Place (Title)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Paris, France"
                  className="input input-bordered input-lg w-full"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Description
                  </span>
                </label>
                <textarea
                  placeholder="What are your goals for this trip?"
                  className="textarea textarea-bordered h-full text-base"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>

            {/* --- 3. NEW INPUT: Custom Cover Photo URL --- */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Cover Photo URL (Optional)
                </span>
                {formData.cover_photo_url && (
                  <span className="label-text-alt text-primary">
                    Image selected!
                  </span>
                )}
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="url"
                  placeholder="https://example.com/my-cool-photo.jpg"
                  className="input input-bordered input-lg w-full"
                  value={formData.cover_photo_url}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cover_photo_url: e.target.value,
                    })
                  }
                />
                {/* Tiny Preview */}
                {formData.cover_photo_url && (
                  <div className="avatar">
                    <div className="w-12 h-12 rounded ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={formData.cover_photo_url} alt="Preview" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Middle Section: Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    Start Date
                  </span>
                </label>
                <input
                  type="date"
                  className="input input-bordered input-lg w-full"
                  value={formData.start_date}
                  onChange={(e) =>
                    setFormData({ ...formData, start_date: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">
                    End Date
                  </span>
                </label>
                <input
                  type="date"
                  className="input input-bordered input-lg w-full"
                  value={formData.end_date}
                  onChange={(e) =>
                    setFormData({ ...formData, end_date: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Suggestions Section */}
            <div className="pt-6">
              <label className="label mb-2">
                <span className="label-text font-bold text-xl">
                  Suggestions for Places to Visit
                </span>
              </label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SUGGESTIONS.map((place) => (
                  <div
                    key={place.id}
                    // --- PASS WHOLE OBJECT TO UPDATE IMAGE AND TITLE ---
                    onClick={() => handleSuggestionClick(place)}
                    className="card bg-base-200 hover:bg-primary hover:text-primary-content transition-all cursor-pointer h-32 relative overflow-hidden group"
                  >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                      <img
                        src={place.image}
                        alt={place.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-primary/20" />
                    </div>

                    {/* Text */}
                    <div className="card-body p-4 flex items-center justify-center relative z-10 text-center">
                      <h3 className="font-bold text-white group-hover:text-white text-lg shadow-black drop-shadow-md">
                        {place.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-8">
              <button
                type="submit"
                className="btn btn-primary btn-lg w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Create My Trip"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
