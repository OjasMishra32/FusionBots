import { useState, useEffect, useRef } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './CTA.css';

const CTA = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();

  return (
    <section id="contact" className="section cta-section">
      <div className="container">
        <div 
          ref={headerRef}
          className={`cta-content ${headerVisible ? 'visible' : ''}`}
        >
          <div className="cta-header">
            <h2 className="cta-title">
              Ready to Revolutionize
              <span className="highlight-text"> STEM Learning</span>?
            </h2>
            <p className="cta-description">
              Partner with Fusion Bots to bring cutting-edge robotics and STEM education to your classroom. 
              Experience the future of hands-on learning with our premium educational kits.
            </p>
          </div>

          <div className="cta-actions">
            <a href="https://fusionbots.myshopify.com" className="cta-primary-btn" target="_blank" rel="noopener noreferrer">
              🚀 Shop Now - STEM Kits
            </a>
            
            <div className="cta-secondary-actions">
              <a href="#products" className="secondary-link">
                Browse Kits
              </a>
              <a href="/demo" className="secondary-link">
                Request Demo
              </a>
              <a href="#founders" className="secondary-link">
                Meet Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
