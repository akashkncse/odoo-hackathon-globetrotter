import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

function Register() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <div className="card bg-base-200 shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <UserPlus className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Register</h1>
        </div>

        <form className="flex flex-col gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
            />
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Login
          </Link>
        </p>

        <p className="text-center mt-2">
          <Link to="/" className="link link-secondary">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
