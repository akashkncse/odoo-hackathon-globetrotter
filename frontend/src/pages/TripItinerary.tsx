import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Calendar, DollarSign, ArrowLeft } from "lucide-react";
import api from "../utils/api";

// Define the shape of an Itinerary Item
interface ItineraryItem {
  id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  estimated_cost: number;
  category: string;
}

export default function TripItinerary() {
  const { tripId } = useParams(); // Get ID from URL
  const navigate = useNavigate();

  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state for creating a new item
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    estimated_cost: "",
    category: "activity",
  });

  // --- 1. Fetch Items on Load ---
  useEffect(() => {
    fetchItems();
  }, [tripId]);

  const fetchItems = async () => {
    try {
      const response = await api.get(`/trips/${tripId}/items`);
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch itinerary:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. Handle Creation ---
  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`/trips/${tripId}/items`, {
        ...newItem,
        estimated_cost: parseFloat(newItem.estimated_cost) || 0,
      });

      // Refresh list & close modal
      await fetchItems();
      setIsModalOpen(false);

      // Reset form
      setNewItem({
        title: "",
        description: "",
        start_time: "",
        end_time: "",
        estimated_cost: "",
        category: "activity",
      });
    } catch (error) {
      alert("Failed to add section");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      {/* Header with Back Button */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="btn btn-circle btn-ghost"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold">Trip Itinerary</h1>
          <p className="opacity-60">Manage your daily activities and budget</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* --- 3. The List of Sections (Wireframe Style) --- */}
        {items.length === 0 ? (
          <div className="text-center py-10 opacity-50">
            <p className="text-xl">No sections yet. Add one to get started!</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className="card bg-base-100 shadow-xl border border-base-300"
            >
              <div className="card-body">
                {/* Section Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title text-2xl text-primary">
                      {item.title || `Section ${index + 1}`}
                    </h2>
                    <span className="badge badge-outline mt-1 capitalize">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg flex items-center gap-1 justify-end text-success">
                      <DollarSign size={16} /> {item.estimated_cost}
                    </div>
                    <div className="text-xs opacity-60 uppercase tracking-wide">
                      Budget
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="py-4 text-base-content/80 whitespace-pre-wrap">
                  {item.description}
                </p>

                {/* Footer: Dates */}
                <div className="flex items-center gap-4 mt-2 p-3 bg-base-200 rounded-lg">
                  <Calendar size={18} className="opacity-70" />
                  <span className="font-mono text-sm">
                    {new Date(item.start_time).toLocaleString()} —{" "}
                    {new Date(item.end_time).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}

        {/* --- 4. "Add another Section" Button --- */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-outline btn-primary btn-block btn-lg border-dashed border-2 h-20 text-xl"
        >
          <Plus size={24} /> Add another Section
        </button>
      </div>

      {/* --- 5. The Create Modal --- */}
      {isModalOpen && (
        <div className="modal modal-open bg-black/50">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Add New Section</h3>

            <form onSubmit={handleCreateItem} className="space-y-4">
              {/* Title & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hotel Check-in, Museum Tour"
                    className="input input-bordered w-full"
                    value={newItem.title}
                    onChange={(e) =>
                      setNewItem({ ...newItem, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category: e.target.value })
                    }
                  >
                    <option value="activity">Activity</option>
                    <option value="travel">Travel</option>
                    <option value="stay">Stay</option>
                    <option value="food">Food</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Details about this activity..."
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                ></textarea>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Start Time</span>
                  </label>
                  <input
                    type="datetime-local"
                    className="input input-bordered w-full"
                    value={newItem.start_time}
                    onChange={(e) =>
                      setNewItem({ ...newItem, start_time: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">End Time</span>
                  </label>
                  <input
                    type="datetime-local"
                    className="input input-bordered w-full"
                    value={newItem.end_time}
                    onChange={(e) =>
                      setNewItem({ ...newItem, end_time: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Estimated Budget ($)</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="0.00"
                  value={newItem.estimated_cost}
                  onChange={(e) =>
                    setNewItem({ ...newItem, estimated_cost: e.target.value })
                  }
                />
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
