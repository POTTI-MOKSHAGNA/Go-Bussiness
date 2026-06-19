import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

function NavBar() {
  const navigate = useNavigate();

  function handleLogout() {
    Cookies.remove('jwt_token'); // Remove JWT token from cookies
    navigate("/login", { replace: true });
  }

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="Go to dashboard home">
          Go Business
        </Link>
        <nav aria-label="Primary" className="nav-links">
          <Link to="/">Home</Link>
        </nav>
        <button type="button" className="btn btn-ghost" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  );
}

export default NavBar;