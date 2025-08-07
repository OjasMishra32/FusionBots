import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Founders from './components/Founders'
import Goals from './components/Goals';
import CTA from './components/CTA'
import Footer from './components/Footer'
import ScrollProgressLine from './components/ScrollProgressLine'
import './App.css'

function App() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e) => {
      const target = e.target;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <div className="app">
      <ScrollProgressLine />
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Founders />
      <Goals />
      <CTA />
      <Footer />
    </div>
  );
}

export default App
