import { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { UserPlus, Camera } from "lucide-react";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  city: string;
  country: string;
  additional_info: string;
  profile_picture_url: string;
}

function Register() {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    city: "",
    country: "",
    additional_info: "",
    profile_picture_url: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...formData,
      is_active: true,
      is_superuser: false,
      is_verified: false,
    };

    try {
      const response = await axios.post("/auth/register", payload);

      if (response.status === 201) {
        alert("User Registered Successfully!");
        console.log("Response:", response.data);
      }
    } catch (err) {
      console.error("Registration Error:", err);
      const axiosError = err as AxiosError<{
        detail: string | { msg: string }[];
      }>;
      const errorMsg =
        axiosError.response?.data?.detail || "Registration failed";
      setError(
        Array.isArray(errorMsg) ? errorMsg[0].msg : (errorMsg as string)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="flex flex-col items-center mb-6">
            <div className="avatar placeholder cursor-pointer group">
              <div className="bg-neutral text-neutral-content rounded-full w-24 h-24 ring ring-primary ring-offset-base-100 ring-offset-2 flex items-center justify-center transition group-hover:bg-neutral-focus">
                {formData.profile_picture_url ? (
                  <img src={formData.profile_picture_url} alt="Profile" />
                ) : (
                  <span className="text-sm font-bold flex flex-col items-center">
                    <Camera size={20} className="mb-1" />
                    Photo
                  </span>
                )}
              </div>
            </div>
            <span className="label-text mt-2 text-xs opacity-50">
              Click to upload (Not implemented)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                name="first_name"
                className="input w-full"
                placeholder="Distinct Fox"
                value={formData.first_name}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                name="last_name"
                className="input w-full"
                placeholder="Accurate Yak"
                value={formData.last_name}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Address</legend>
              <input
                type="email"
                name="email"
                className="input w-full"
                placeholder="user@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Phone Number</legend>
              <input
                type="tel"
                name="phone_number"
                className="input w-full"
                placeholder="+1 234 567 890"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">City</legend>
              <input
                type="text"
                name="city"
                className="input w-full"
                placeholder="New York"
                value={formData.city}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Country</legend>
              <input
                type="text"
                name="country"
                className="input w-full"
                placeholder="USA"
                value={formData.country}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="fieldset md:col-span-2">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                name="password"
                className="input w-full"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="label-text-alt text-error mt-1">
                Required for registration API
              </span>
            </fieldset>
          </div>

          <fieldset className="fieldset mt-6">
            <legend className="fieldset-legend">Additional Information</legend>
            <textarea
              name="additional_info"
              className="textarea h-24 w-full"
              placeholder="Tell us more..."
              value={formData.additional_info}
              onChange={handleChange}
            ></textarea>
          </fieldset>

          {error && (
            <div role="alert" className="alert alert-error mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="card-actions justify-center mt-8">
            <button
              type="submit"
              className="btn btn-primary btn-wide"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <UserPlus size={20} />
              )}
              Register Users
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
