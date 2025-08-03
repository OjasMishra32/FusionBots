# Copilot Instructions for YSWS Hack Club React Project

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a React.js project built with Vite that converts a premium modern website with advanced animations and effects. The original website features glassmorphism design, scroll-triggered animations, SVG line effects, and comprehensive mobile responsiveness.

## Code Style & Conventions
- Use functional components with React hooks
- Implement custom hooks for reusable logic (scroll detection, intersection observer, animations)
- Use CSS Modules or styled-components for component-scoped styling
- Maintain the existing Satoshi font family and color scheme
- Keep all existing animations and premium effects

## Key Features to Maintain
- Scroll progress line with gradient colors
- Glassmorphism navbar with backdrop blur
- SVG animated line effects in stats section
- Intersection Observer based fade-in animations
- Particle system and floating elements
- Counter animations with number counting
- Ripple effects on button clicks
- Mobile-first responsive design
- Touch device optimizations

## Component Structure
- `Navbar` - Fixed glassmorphism navigation with scroll effects
- `Hero` - Main landing section with floating particles and animated grid
- `About` - Feature cards with hover effects
- `Features` - Advanced workshops section with animations
- `Stats` - Animated counters with SVG line graphics
- `CTA` - Call to action section
- `Footer` - Links and information footer

## Animation Requirements
- Use useEffect hooks for scroll listeners
- Implement useIntersectionObserver custom hook
- Maintain reversible scroll animations (fade out when scrolling back up)
- Keep all CSS keyframe animations intact
- Ensure mobile performance optimizations

## Dependencies to Consider
- React hooks for state management
- Custom hooks for animations and scroll detection
- CSS Modules or styled-components for styling
- No external animation libraries - maintain vanilla CSS animations
