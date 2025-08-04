import { useEffect, useState, useRef } from 'react';
import './Navbar.css';
import logo from '../assets/fusionbots-logo.jpeg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');
  const navLinksRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Highlight section
      const sections = document.querySelectorAll('section[id]');
      let current = 'hero';
      sections.forEach(sec => {
        if (sec.getBoundingClientRect().top <= 150) {
          current = sec.id;
        }
      });
      setActiveLink(current);
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // init
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Center the active nav-link
  useEffect(() => {
    const container = navLinksRef.current;
    const el = container?.querySelector('.nav-link.active');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }, [activeLink]);

  const links = [
    { href: '#hero',    label: 'Home'     },
    { href: '#about',   label: 'About'    },
    { href: '#products',label: 'Products' },
    { href: '#founders',label: 'Founders' },
    { href: '#contact', label: 'Contact'  },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <a
          href="https://fusionbots.myshopify.com/"
          className="logo"
        >
          <img src={logo} alt="FusionBots Logo" className="logo-img" />
          <span>FusionBots</span>
        </a>
        <ul className="nav-links" ref={navLinksRef}>
          {links.map(({ href, label }) => (
            <li key={href} className="nav-item">
              <a
                href={href}
                className={`nav-link ${activeLink === href.slice(1) ? 'active' : ''}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
