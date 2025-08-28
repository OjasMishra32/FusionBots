import { useEffect, useState, useRef } from 'react';
import './Navbar.css';
const logo = '/fusionbots-logo.jpeg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Floating info button state (with animated mount)
  const [infoOpen, setInfoOpen] = useState(false);
  const [popupMounted, setPopupMounted] = useState(false);  // controls presence in DOM
  const [popupShow, setPopupShow] = useState(false);        // drives opacity/transform for smooth animation

  // Mount/unmount flow for smooth open/close
  useEffect(() => {
    if (infoOpen) {
      setPopupMounted(true);
      // allow next paint before animating in
      const id = requestAnimationFrame(() => setPopupShow(true));
      return () => cancelAnimationFrame(id);
    } else {
      // animate out, then unmount after duration
      setPopupShow(false);
      const t = setTimeout(() => setPopupMounted(false), 220);
      return () => clearTimeout(t);
    }
  }, [infoOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Auto-close popup on scroll
      if (infoOpen) setInfoOpen(false);

      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
          current = section.getAttribute('id');
        }
      });
      if (current) setActiveLink(current);
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setInfoOpen(false);
      }
    };

    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen, infoOpen]);

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#products', label: 'Products' },
    { href: '#founders', label: 'Founders' },
    { href: '#goals', label: 'Goals' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleLinkClick = (href) => {
    setMenuOpen(false);
    setActiveLink(href.substring(1));

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Brand colors (matches your theme)
  const brandGrad = 'linear-gradient(135deg, #7a0e23, #e04a59 60%, #ff8aa7)';

  return (
    <>
      {/* Inline keyframes + responsive helpers (no external CSS edits) */}
      <style>{`
        @keyframes floatY {
          0% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(224,74,89,0.35); }
          70% { box-shadow: 0 0 0 12px rgba(224,74,89,0); }
          100% { box-shadow: 0 0 0 0 rgba(224,74,89,0); }
        }
        @keyframes fbPopIn {
          0%   { opacity: 0; transform: translateY(12px) scale(0.96); }
          60%  { opacity: 1; transform: translateY(-2px) scale(1.015); }
          100% { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes fbPopOut {
          0%   { opacity: 1; transform: translateY(0)    scale(1); }
          100% { opacity: 0; transform: translateY(8px)  scale(0.985); }
        }
        .fb-fab {
          font-weight: 800;
          letter-spacing: .2px;
          white-space: nowrap;
        }
        /* On small screens, keep the button compact */
        @media (max-width: 480px) {
          .fb-fab {
            font-size: 13px;
            padding: 0 12px !important;
            height: 52px !important;
          }
          .fb-fab .fb-fab-text { display: none; } /* icon-only on very small screens */
        }
        @media (prefers-reduced-motion: reduce) {
          .fb-anim, .fb-pulse { animation: none !important; }
          .fb-transition { transition: none !important; }
        }
      `}</style>

      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}

      <nav
        ref={navRef}
        className={`navbar ${isScrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}
        style={{ zIndex: 999 }}
      >
        <div className="nav-container">
          <div className="logo-section">
            <a href="https://fusionbots.myshopify.com/" className="logo-link">
              <div className="logo-wrapper">
                <img src={logo} alt="FusionBots Logo" className="logo-img" />
                <div className="logo-glow"></div>
              </div>
              <span className="logo-text">FusionBots</span>
            </a>
          </div>

          <div className="desktop-nav">
            <ul className="nav-links">
              {navLinks.map(({ href, label }) => (
                <li key={href} className="nav-item">
                  <a
                    href={href}
                    className={`nav-link ${activeLink === href.substring(1) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(href);
                    }}
                  >
                    <span className="nav-label">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <button
            className={`mobile-menu-btn ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-content" style={{ paddingBottom: '80px', paddingTop: '30px' }}>
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`mobile-nav-link ${activeLink === href.substring(1) ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(href);
                }}
              >
                <span className="mobile-nav-label">{label}</span>
                <span className="mobile-nav-arrow">→</span>
              </a>
            ))}

            <div className="mobile-cta">
              <a
                href="https://fusionbots.myshopify.com/"
                className="mobile-cta-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shop Now
              </a>
            </div>

            <div className="mobile-social-icons" style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <a
                href="https://www.linkedin.com/company/fusionbots"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <img src="/linkedin-icon.svg" alt="LinkedIn" className="mobile-social-icon" style={{ width: '30px', height: '30px' }} />
              </a>
              <a
                href="https://www.instagram.com/fusionbots1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img src="/instagram-icon.svg" alt="Instagram" className="mobile-social-icon" style={{ width: '30px', height: '30px' }} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Info Button + Animated Popup */}
      <div
        style={{
          position: 'fixed',
          bottom: '18px',
          right: '18px',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '10px',
          pointerEvents: 'none' // container ignores clicks; children enable
        }}
        aria-live="polite"
      >
        {/* Popup (smooth fade/scale) */}
        {popupMounted && (
          <div
            className="fb-transition"
            style={{
              pointerEvents: 'auto',
              background: '#ffffff',
              color: '#111',
              padding: '14px 16px',
              borderRadius: '14px',
              boxShadow: '0 10px 28px rgba(0,0,0,0.22)',
              width: 'min(88vw, 300px)',
              maxWidth: '92vw',
              textAlign: 'left',
              fontSize: '14.5px',
              transform: popupShow ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)',
              opacity: popupShow ? 1 : 0,
              transition: 'opacity 200ms ease, transform 200ms cubic-bezier(.22,.96,.36,1)',
              border: '1px solid rgba(0,0,0,0.07)'
            }}
            role="dialog"
            aria-modal="false"
            aria-label="Upcoming events"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '8px'
              }}
            >
              <div
                style={{
                  width: 26, height: 26, minWidth: 26,
                  borderRadius: '50%',
                  background: brandGrad,
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff'
                }}
                aria-hidden="true"
              >
                {/* Calendar icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 3v2h10V3h2v2h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1V3h2Zm13 6H4v10h16V9Z" fill="currentColor"/>
                </svg>
              </div>
              <div style={{ fontWeight: 700, fontSize: '15.5px' }}>
                Upcoming Events
              </div>
              <button
                onClick={() => setInfoOpen(false)}
                aria-label="Close"
                style={{
                  marginLeft: 'auto',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 18,
                  lineHeight: 1,
                  color: '#444',
                  padding: 4,
                  borderRadius: 6
                }}
              >
                ×
              </button>
            </div>

            <div style={{ color: '#333', lineHeight: 1.45 }}>
              🚀 <strong>Free Robotics & Coding Workshop</strong><br/>
              Sat, Aug 30 @ 11:00 AM ET
            </div>

            <a
              href="https://forms.gle/A1TrK2yL871KbCVCA"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: 10,
                padding: '10px 12px',
                width: '100%',
                textAlign: 'center',
                background: brandGrad,
                color: '#fff',
                borderRadius: 10,
                textDecoration: 'none',
                fontWeight: 700,
                letterSpacing: '.2px',
                boxShadow: '0 6px 16px rgba(224,74,89,0.35)'
              }}
            >
              Register / Learn More
            </a>
          </div>
        )}

        {/* Floating button */}
        <button
          onClick={() => setInfoOpen((v) => !v)}
          aria-label={infoOpen ? 'Hide upcoming events' : 'Show upcoming events'}
          className="fb-anim fb-pulse fb-fab"
          style={{
            pointerEvents: 'auto',
            background: brandGrad,
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            minWidth: 56,
            height: 56,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            boxShadow: '0 10px 22px rgba(224,74,89,0.35)',
            animation: 'floatY 4s ease-in-out infinite, pulseRing 3.5s ease-out infinite',
            transition: 'transform 160ms ease, box-shadow 160ms ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}
          onFocus={(e) => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; }}
          onBlur={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}
        >
          <div
            aria-hidden="true"
            style={{
              width: 28, height: 28, minWidth: 28,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.18)',
              display: 'grid',
              placeItems: 'center'
            }}
          >
            {/* Calendar icon */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M7 3v2h10V3h2v2h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1V3h2Zm13 6H4v10h16V9Z" fill="#fff"/>
            </svg>
          </div>
          <span className="fb-fab-text" style={{ fontWeight: 800, letterSpacing: '.2px' }}>
            {infoOpen ? 'Close' : 'Upcoming Events'}
          </span>
        </button>
      </div>
    </>
  );
};

export default Navbar;
