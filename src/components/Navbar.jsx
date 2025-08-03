import { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../assets/fusionbots-logo.jpeg';


const Navbar = () => {
 const [isScrolled, setIsScrolled] = useState(false);
 const [activeLink, setActiveLink] = useState('hero');


 useEffect(() => {
   const updateNavbar = () => {
     setIsScrolled(window.pageYOffset > 100);
   };


   const updateActiveNavLink = () => {
     const sections = document.querySelectorAll('section[id]');
     let current = '';


     sections.forEach(section => {
       const sectionTop = section.getBoundingClientRect().top;
       if (sectionTop <= 150) {
         current = section.getAttribute('id');
       }
     });


     if (current) {
       setActiveLink(current);
     }
   };


   const handleScroll = () => {
     updateNavbar();
     updateActiveNavLink();
   };


   window.addEventListener('scroll', handleScroll);
   handleScroll(); // Initial call


   return () => window.removeEventListener('scroll', handleScroll);
 }, []);


 const navLinks = [
   { href: '#hero', label: 'Home' },
   { href: '#about', label: 'About' },
   { href: '#products', label: 'Products' },
   { href: '#founders', label: 'Team' },
   { href: '#contact', label: 'Contact' },
 ];


 return (
   <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
     <div className="nav-content">
       <div className="logo">
         <img src={logo} alt="FusionBots Logo" className="logo-img" />
         <span>FusionBots</span>
       </div>
       <ul className="nav-links">
         {navLinks.map(({ href, label }) => (
           <li key={href}>
             <a
               href={href}
               className={`nav-link ${activeLink === href.substring(1) ? 'active' : ''}`}
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



