import { useState } from "react";
import axios from "axios";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom"; // <--- CHANGED for React Router

function Login() {
  const navigate = useNavigate(); // <--- CHANGED

  // State for form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Prepare data for OAuth2
      const params = new URLSearchParams();
      params.append("username", formData.username);
      params.append("password", formData.password);

      // 2. Send request
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/jwt/login",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Login successful:", response.data);

      // 3. Store Token
      localStorage.setItem("access_token", response.data.access_token);

      // 4. Redirect to Dashboard
      navigate("/dashboard"); // <--- CHANGED
    } catch (err) {
      console.error("Login error:", err);
      const errorMsg =
        err.response?.data?.detail || "Invalid username or password.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1000"
            alt="Login Banner"
            className="h-48 w-full object-cover"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold mb-4">
            Welcome Back
          </h2>

          {error && (
            <div
              role="alert"
              className="alert alert-error mb-4 p-2 text-sm flex"
            >
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email / Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="user@example.com"
                className="input input-bordered w-full"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control w-full mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="card-actions justify-center mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <LogIn size={20} className="mr-2" />
                    Login
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
