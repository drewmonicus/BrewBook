import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { toast } from "react-toastify";

const logo = "/logo.jpg";

function Navbar() {
  const { isLoggedIn, checkAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      await checkAuth();
      navigate("/login");
      toast.success("Logged out!", {
        position: "bottom-left",
      });
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Logged out failed", {
        position: "bottom-left",
      });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <Link
          className="navbar-brand fs-3 d-flex align-items-center gap-1"
          to="/"
        >
          <img src={logo} alt="Logo" width="40" height="40" />
          Brew<span className="text-brown">Book</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="w-100 d-flex justify-content-between align-items-center">
            {/* Middle*/}
            <div className="mx-auto d-flex gap-3">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/recipes">
                Recipes
              </Link>
              <Link className="nav-link" to="/recipes/create">
                Post Recipe
              </Link>
            </div>

            {/* Right side */}
            <div className="d-flex gap-2">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="btn btn-outline-primary">
                    Profile
                  </Link>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn btn-outline-secondary">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn btn-secondary">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
