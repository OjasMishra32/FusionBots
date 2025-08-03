import { useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './Tutorials.css';

const Tutorials = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [path1Ref, path1Visible] = useIntersectionObserver();
  const [path2Ref, path2Visible] = useIntersectionObserver();
  const [hoveredPath, setHoveredPath] = useState(null);

  const handleRippleClick = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  const paths = [
    {
      id: 'introduction',
      title: 'Introduction Track',
      subtitle: 'Foundation Path',
      audience: 'Early Learners',
      location: 'Ghana Students',
      reward: 'micro:bit Kit',
      difficulty: 'Beginner',
      duration: '6 weeks',
      description: 'Perfect foundation for young innovators starting their technology journey with hands-on learning.',
      features: [
        'Visual programming environment',
        'Hardware prototyping basics',
        'Interactive dashboard creation',
        'Collaborative project building',
        'Creative problem solving',
        'Mentorship program'
      ],
      dashboard: {
        title: 'Simplified Dashboard',
        features: [
          'Drag-and-drop interface',
          'Real-time sensor data',
          'Project gallery showcase',
          'Progress tracking system',
          'Community sharing tools'
        ]
      },
      guidelines: [
        'Focus on fundamentals',
        'Hands-on project approach',
        'Peer collaboration emphasis',
        'Creative exploration encouraged',
        'Patient learning pace'
      ],
      color: 'blue'
    },
    {
      id: 'advanced',
      title: 'Advanced Track',
      subtitle: 'Professional Path', 
      audience: 'Experienced Coders',
      location: 'US High Schools',
      reward: 'Arduino Mega Kit',
      difficulty: 'Advanced',
      duration: '8 weeks',
      description: 'Intensive program for experienced developers ready to tackle industry-level challenges.',
      features: [
        'Professional development workflows',
        'Advanced IoT architectures',
        'Machine learning integration',
        'Industry best practices',
        'Performance optimization',
        'Team collaboration protocols'
      ],
      dashboard: {
        title: 'Professional Console',
        features: [
          'Real-time analytics',
          'Performance monitoring',
          'Code quality metrics',
          'Deployment pipelines',
          'Team collaboration tools'
        ]
      },
      guidelines: [
        'Industry standard practices',
        'Code quality enforcement',
        'Performance-first mindset',
        'Professional workflows',
        'Advanced problem solving'
      ],
      color: 'purple'
    }
  ];

  return (
    <section id="tutorials" className="section">
      <div className="container">
        <div 
          ref={headerRef}
          className={`section-header fade-in ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-badge">Learning Paths</div>
          <h2 className="section-title">Choose Your Journey</h2>
          <p className="section-description">
            Two distinct tracks designed for different skill levels and learning objectives. 
            Start where you are, grow where you want to be.
          </p>
        </div>

        <div className="features-grid">
          {paths.map((path, index) => (
            <div
              key={path.id}
              ref={index === 0 ? path1Ref : path2Ref}
              className={`feature-card fade-in stagger-${index + 1} ${
                index === 0 ? (path1Visible ? 'visible' : '') : (path2Visible ? 'visible' : '')
              }`}
              onMouseEnter={() => setHoveredPath(path.id)}
              onMouseLeave={() => setHoveredPath(null)}
            >
              <div className="feature-icon">{index + 1}</div>
              <h3>{path.title}</h3>
              <p className="path-subtitle">{path.subtitle}</p>
              <p className="path-description">{path.description}</p>
              
              <div className="path-meta">
                <div className="meta-row">
                  <span className="meta-label">Target:</span>
                  <span>{path.audience}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Location:</span>
                  <span>{path.location}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Duration:</span>
                  <span>{path.duration}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Reward:</span>
                  <span>{path.reward}</span>
                </div>
              </div>

              <div className="path-features">
                <h4>What You'll Learn</h4>
                <ul>
                  {path.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="path-action">
                <button 
                  className="btn btn-primary ripple"
                  onClick={handleRippleClick}
                >
                  Begin {path.title}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tutorials;
