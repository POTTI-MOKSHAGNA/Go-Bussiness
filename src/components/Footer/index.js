import './index.css';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="brand-sm">Go Business</span>
        <nav aria-label="Footer" className="footer-nav">
          <a href="#about">About</a>
          <a href="#privacy">Privacy</a>
        </nav>
        <span className="muted">© 2024 Go Business</span>
      </div>
    </footer>
  );
}