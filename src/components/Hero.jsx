import { useEffect, useRef } from 'react';
import './Hero.css';
import './Hero_new.css';

const Hero = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    const createParticles = () => {
      if (particlesRef.current) {
        for (let i = 0; i < 80; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 10 + 's';
          particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
          particle.style.opacity = Math.random() * 0.4 + 0.2;

          if (i % 4 === 0) {
            const isBlue = Math.random() < 0.5;
            particle.style.background = isBlue
              ? 'rgba(102, 178, 255, 0.25)'
              : 'rgba(178, 102, 255, 0.25)';
            const size = Math.random() * 80 + 40;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.borderRadius = '50%';
            particle.style.filter = 'blur(4px)';
          } else {
            particle.style.width = '5px';
            particle.style.height = '5px';
            particle.style.background = 'rgba(0, 0, 0, 0.5)';
            particle.style.borderRadius = '50%';
          }

          particlesRef.current.appendChild(particle);
        }
      }
    };

    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const heroGrid = document.querySelector('.hero-grid');
      if (heroGrid) {
        heroGrid.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`;
      }
    };

    createParticles();
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
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
          <span>Empowering Young Innovators</span>
        </div>

        {/* Cool animated text */}
        <h1 className="glow-text">FusionBots</h1>

        <p className="hero-subtitle">
          FusionBots was founded to make STEM education accessible and affordable for all students.
          By offering rugged robotics kits and innovative tech gadgets, we combine practical learning with business sustainability — using every product sold to fuel our mission of inspiring the next generation of builders, coders, and problem-solvers.
        </p>

        <div className="hero-cta">
          <a
            href="https://fusionbots.myshopify.com"
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            🛒 Shop STEM Kits
          </a>
          <a href="#about" className="btn btn-secondary">Learn More</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
