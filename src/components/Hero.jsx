import { useEffect, useRef } from 'react';
import './Hero.css';
import './Hero_new.css';
import fusionBotDog from '../assets/dog.png';

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

      {/* Floating Social Icons */}
      <div
        className="hero-social-icons"
        style={{
          position: 'absolute',
          top: '80px',
          right: '10px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/fusionbots"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="FusionBots LinkedIn"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="#0077B5">
            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.98H4.5V24H.5V8.98zM8.98 8.98H12.6V10.56H12.66C13.2 9.54 14.6 8.44 16.6 8.44 21.2 8.44 22 11.2 22 15.36V24H18V16.4C18 14.42 17.96 11.94 15.2 11.94 12.4 11.94 12 13.96 12 16.2V24H8.98V8.98z" />
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/fusionbots1/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="FusionBots Instagram"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="#E1306C">
            <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5zm8.88 1.38a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
          </svg>
        </a>
      </div>

      <div className="floating-elements">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>

      <div className="particles" ref={particlesRef}></div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span>Empowering Young Innovators</span>
          </div>

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
            <a href="https://drive.google.com/file/d/1b8tRulQOgEMv1G4KbCdx4dGDKaKqK929/view?usp=drivesdk" className="btn btn-small">Robotics Curriculum</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="fusion-bot-container">
            <div className="bot-glow-effect"></div>
            <img src={fusionBotDog} alt="FusionBot Robot Dog" className="fusion-bot-image" />
            <div className="bot-floating-particles">
              <div className="bot-particle"></div>
              <div className="bot-particle"></div>
              <div className="bot-particle"></div>
              <div className="bot-particle"></div>
              <div className="bot-particle"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
