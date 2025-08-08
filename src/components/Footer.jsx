import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h3>FusionBots</h3>
              <p>Excellence in STEM Education</p>
            </div>
            
            <div className="footer-links">
              <div className="link-group">
                <h4>Products</h4>
                <a href="#products">STEM Kits</a>
                <a href="https://fusionbots.myshopify.com/">Full Catalog</a>
              </div>
              
              <div className="link-group">
                <h4>Company</h4>
                <a href="#about">About Us</a>
                <a href="#founders">Our Team</a>
              </div>
              
              <div className="link-group">
                <h4>Support</h4>
                <a href="https://fusionbots.myshopify.com/">Help Center</a>
                <a href="https://fusionbots.myshopify.com/">Contact</a>
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
