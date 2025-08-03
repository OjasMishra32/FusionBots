import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h3>Fusion Bots</h3>
              <p>Excellence in STEM Education</p>
            </div>
            
            <div className="footer-links">
              <div className="link-group">
                <h4>Products</h4>
                <a href="#products">STEM Kits</a>
                <a href="/catalog">Full Catalog</a>
                <a href="/custom">Custom Solutions</a>
              </div>
              
              <div className="link-group">
                <h4>Company</h4>
                <a href="#about">About Us</a>
                <a href="#founders">Our Team</a>
                <a href="/careers">Careers</a>
              </div>
              
              <div className="link-group">
                <h4>Support</h4>
                <a href="/support">Help Center</a>
                <a href="/contact">Contact</a>
                <a href="/warranty">Warranty</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-info">
              <p>&copy; 2025 Fusion Bots. Inspiring the next generation of innovators.</p>
              <div className="footer-badges">
                <span className="badge">🔬 Premium Quality</span>
                <span className="badge">� Educational Excellence</span>
                <span className="badge">🌟 Award Winning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
