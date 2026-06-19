import { Link } from "react-router-dom";
import './index.css';
export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-inner">
        <h1 className="huge">404</h1>
        <h2>Page not found</h2>
        <p className="muted">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}