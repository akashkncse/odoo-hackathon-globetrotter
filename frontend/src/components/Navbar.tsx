import { useNavigate, useLocation } from "react-router-dom";
import { Home, User, LogOut, Plus } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-8 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex-1">
        <a
          onClick={() => navigate("/")}
          className="btn btn-ghost normal-case text-2xl font-bold text-primary cursor-pointer"
        >
          GlobeTrotter
        </a>
      </div>

      {/* Navigation Links - Desktop */}
      <div className="hidden md:flex flex-none">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <a
              onClick={() => navigate("/")}
              className={`gap-2 ${isActive("/") ? "active" : ""}`}
            >
              <Home size={18} /> Home
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate("/create-trip")}
              className={`gap-2 ${isActive("/create-trip") ? "active" : ""}`}
            >
              <Plus size={18} /> Plan Trip
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate("/profile")}
              className={`gap-2 ${isActive("/profile") ? "active" : ""}`}
            >
              <User size={18} /> Profile
            </a>
          </li>
        </ul>
      </div>

      {/* Avatar Dropdown */}
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
                alt="avatar"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {/* Mobile-only nav links */}
            <li className="md:hidden">
              <a onClick={() => navigate("/")} className="gap-2">
                <Home size={16} /> Home
              </a>
            </li>
            <li className="md:hidden">
              <a onClick={() => navigate("/create-trip")} className="gap-2">
                <Plus size={16} /> Plan Trip
              </a>
            </li>
            <li className="md:hidden divider"></li>
            <li>
              <a onClick={() => navigate("/profile")} className="gap-2">
                <User size={16} /> Profile
              </a>
            </li>
            <li>
              <a onClick={handleLogout} className="text-error gap-2">
                <LogOut size={16} /> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
