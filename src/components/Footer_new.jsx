import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h3>Hack Club YSWS</h3>
              <p>Young Makers, Real Hardware</p>
            </div>
            
            <div className="footer-links">
              <div className="link-group">
                <h4>Program</h4>
                <a href="#how-it-works">How It Works</a>
                <a href="#paths">Choose Path</a>
                <a href="#tutorials">Tutorials</a>
              </div>
              
              <div className="link-group">
                <h4>Community</h4>
                <a href="https://discord.gg/hackclub">Discord</a>
                <a href="https://github.com/hackclub">GitHub</a>
                <a href="https://hackclub.com">Hack Club</a>
              </div>
              
              <div className="link-group">
                <h4>Support</h4>
                <a href="/help">Help Center</a>
                <a href="/contact">Contact</a>
                <a href="/shipping">Shipping Info</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-info">
              <p>&copy; 2025 Hack Club YSWS. Built with ❤️ by young makers.</p>
              <div className="footer-badges">
                <span className="badge">🌍 Global Shipping</span>
                <span className="badge">📦 Free Hardware</span>
                <span className="badge">🚀 Open Source</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
