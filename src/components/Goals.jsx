import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './Goals.css';

const Icon = ({ index }) => {
  // Cycle a few lightweight inline SVGs that inherit currentColor (fits your theme)
  const which = index % 4;
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', 'aria-hidden': true };
  if (which === 0) {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v4M12 17v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M3 12h4M17 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  if (which === 1) {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3l7 4v5c0 5-7 9-7 9s-7-4-7-9V7l7-4z"/>
        <circle cx="12" cy="11" r="2.25"/>
      </svg>
    );
  }
  if (which === 2) {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
      </svg>
    );
  }
  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h4l3 7 3-14 2 7h4"/>
      <circle cx="5" cy="12" r="1.75"/>
      <circle cx="21" cy="12" r="1.75"/>
    </svg>
  );
};

const Goals = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();

  const futurePlans = [
    { label: 'Host inclusive robotics and STEM workshops to engage students from underserved communities with hands-on tech learning' },
    { label: 'Donate high-tech kits, microcontrollers, and sensors to Title 1 schools and public libraries to increase access to engineering tools' },
    { label: 'Set up scholarships and one-on-one mentorships to support aspiring young engineers in pursuing college and career pathways' },
    { label: 'Launch school-wide and community fundraising campaigns to grow our STEM impact, support innovation, and reach new regions' },
    { label: 'Organize regional and national student competitions focused on problem-solving, creativity, and real-world innovation' },
    { label: 'Collaborate with nonprofits, educators, and school districts to scale FusionBots programs across the country' },
    { label: 'Provide students without resources access to robotics competitions like FIRST and VEX, ensuring equal opportunities for all.' },
  ];

  // Create refs and visibility states for each goal (preserve your hook usage)
  const goalRefs = futurePlans.map(() => useIntersectionObserver());

  return (
    <section id="goals" className="goals-section" aria-labelledby="goals-title">
      <div className="stats-container">
        {/* Header */}
        <header
          ref={headerRef}
          className={`stats-header fade-in ${headerVisible ? 'visible' : ''}`}
          style={{ transitionDelay: headerVisible ? '80ms' : '0ms' }}
        >
          <div className="section-badge" role="doc-subtitle">Future Plans</div>
          <h2 className="section-title" id="goals-title">What’s Next for FusionBots</h2>
          <p className="section-description">
            Our journey is just beginning. Here's how we plan to expand our reach, deepen our impact,
            and empower the next generation of tech leaders through real-world opportunities and meaningful community partnerships.
          </p>
        </header>

        {/* Goals Grid */}
        <ul className="stats-grid" role="list">
          {futurePlans.map((goal, index) => {
            const [ref, isVisible] = goalRefs[index];

            return (
              <li
                key={index}
                ref={ref}
                className={`stat-item fade-in-box ${isVisible ? 'visible' : ''}`}
                style={{
                  // Stagger each card’s reveal; no CSS changes needed
                  transitionDelay: isVisible ? `${120 + index * 80}ms` : '0ms',
                  // Add subtle modern micro-interaction without touching CSS
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                }}
              >
                {/* Card header row */}
                <div
                  className="stat-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px',
                  }}
                >
                  <div
                    className="stat-icon"
                    aria-hidden="true"
                    style={{
                      display: 'grid',
                      placeItems: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '9999px',
                      background: 'rgba(255,255,255,0.06)', // respects dark theme
                      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
                    }}
                  >
                    <Icon index={index} />
                  </div>

                  <div
                    className="stat-index"
                    style={{
                      fontVariantNumeric: 'tabular-nums',
                      opacity: 0.8,
                      fontSize: 12,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Body */}
                <div
                  className="stat-label"
                  style={{
                    lineHeight: 1.5,
                    // Slight hover lift + ring without requiring new CSS
                    transition: 'transform 220ms ease, box-shadow 220ms ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.parentElement.style.transform = 'translateY(-2px)';
                    e.currentTarget.parentElement.style.boxShadow = '0 10px 24px rgba(0,0,0,0.25)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.parentElement.style.transform = 'translateY(0)';
                    e.currentTarget.parentElement.style.boxShadow = 'none';
                  }}
                >
                  {goal.label}
                </div>

                {/* Subtle progress/underline accent (pure JSX inline style) */}
                <div
                  aria-hidden="true"
                  style={{
                    marginTop: 14,
                    height: 2,
                    width: '100%',
                    background:
                      'linear-gradient(90deg, rgba(255,255,255,0.25), rgba(255,255,255,0.06))',
                    borderRadius: 999,
                    transformOrigin: 'left',
                    transform: isVisible ? 'scaleX(1)' : 'scaleX(0.35)',
                    transition: 'transform 600ms cubic-bezier(.2,.8,.2,1)',
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Goals;
