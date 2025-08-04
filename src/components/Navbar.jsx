import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from './logo.png'; // Update with your actual logo path

const Navbar = () => {
  const navRef = useRef(null);
  const links = ['Home', 'About', 'Products', 'Founders', 'Contact'];
  const [activeIndex, setActiveIndex] = useState(0);
  const lastScrollY = useRef(0);

  // Scroll navbar automatically based on page scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) > 50) {
        if (currentScrollY > lastScrollY.current && activeIndex < links.length - 1) {
          // Scrolling down → next link
          setActiveIndex(prev => Math.min(prev + 1, links.length - 1));
        } else if (currentScrollY < lastScrollY.current && activeIndex > 0) {
          // Scrolling up → previous link
          setActiveIndex(prev => Math.max(prev - 1, 0));
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex, links.length]);

  // Scroll navbar to center active link
  useEffect(() => {
    if (navRef.current) {
      const activeEl = navRef.current.children[activeIndex + 1]; // +1 for logo
      if (activeEl) {
        const containerWidth = navRef.current.offsetWidth;
        const elCenter = activeEl.offsetLeft + activeEl.offsetWidth / 2;
        navRef.current.scrollTo({
          left: elCenter - containerWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex]);

  return (
    <nav className="navbar">
      <div className="nav-content" ref={navRef}>
        <div className="logo">
          <img src={logo} alt="FusionBots Logo" className="logo-img" />
          <span>FusionBots</span>
        </div>
        {links.map((link, index) => (
          <a
            key={index}
            href={`#${link.toLowerCase()}`}
            className={`nav-link ${activeIndex === index ? 'active' : ''}`}
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
