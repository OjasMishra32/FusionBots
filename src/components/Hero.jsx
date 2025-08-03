import { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      if (particlesRef.current) {
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 15 + 's';
          particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
          particlesRef.current.appendChild(particle);
        }
      }
    };

    // Parallax effect for hero grid
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const heroGrid = document.querySelector('.hero-grid');
      if (heroGrid) {
        heroGrid.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`;
      }
    };

    createParticles();
    window.addEventListener('scroll', handleParallax);

    return () => {
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-grid"></div>
      <div className="floating-elements">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>
      <div className="particles" ref={particlesRef}></div>
      <div className="hero-content">
        <div className="hero-badge">
          <span>🤖 Premium STEM Education</span>
        </div>
        <h1 className="glow-text">FusionBots</h1>
        <p className="hero-subtitle">
          Revolutionizing STEM education with cutting-edge robotics kits, sensors, and interactive learning experiences. 
          Empowering the next generation of innovators with hands-on technology that sparks curiosity and builds the future.
        </p>
        <div className="hero-cta">
          <a href="https://fusionbots.myshopify.com" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            🛒 Our Store
          </a>
          <a href="#about" className="btn btn-secondary">Our Story</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
