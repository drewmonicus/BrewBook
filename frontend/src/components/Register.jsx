import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";

function Register() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/register", formData, {
        withCredentials: true,
      });

      const { success, message } = data;

      if (success) {
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        toast.success(message, {
          position: "bottom-left",
        });
        await checkAuth();
        navigate("/profile");
      } else {
        toast.error(message, {
          position: "bottom-left",
        });
      }
    } catch (err) {
      err.response && err.response.status === 400
        ? toast.error(err.response.data.message, {
            position: "bottom-left",
          })
        : toast.error("Server error", {
            position: "bottom-left",
          });
    }
  };

  return (
    <div className="container py-3">
      <div className="row">
        <h2 className="text-center">Register</h2>
        <div className="col-6 offset-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
