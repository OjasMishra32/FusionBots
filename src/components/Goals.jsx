import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './Goals.css';

const Goals = () => {
  const [headerRef, headerVisible] = useIntersectionObserver(); // Ref for the header section
  const futurePlans = [
    { label: 'Host inclusive robotics and STEM workshops to engage students from underserved communities with hands-on tech learning' },
    { label: 'Donate high-tech kits, microcontrollers, and sensors to Title 1 schools and public libraries to increase access to engineering tools' },
    { label: 'Set up scholarships and one-on-one mentorships to support aspiring young engineers in pursuing college and career pathways' },
    { label: 'Launch school-wide and community fundraising campaigns to grow our STEM impact, support innovation, and reach new regions' },
    { label: 'Organize regional and national student competitions focused on problem-solving, creativity, and real-world innovation' },
    { label: 'Collaborate with nonprofits, educators, and school districts to scale FusionBots programs across the country' },
    { label: 'Provide students without resources access to robotics competitions like FIRST and VEX, ensuring equal opportunities for all.' },
  ];
 
  // Create refs and visibility states for each goal
  const goalRefs = futurePlans.map(() => useIntersectionObserver());

  return (
    <section id="goals" className="goals-section">
      <div className="stats-container">
        <div
          ref={headerRef}
          className={`stats-header fade-in ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-badge">Future Plans</div>
          <h2 className="section-title">What’s Next for FusionBots</h2>
          <p className="section-description">
            Our journey is just beginning. Here's how we plan to expand our reach, deepen our impact,
            and empower the next generation of tech leaders through real-world opportunities and meaningful community partnerships.
          </p>
        </div>

        <div className="stats-grid">
          {futurePlans.map((goal, index) => {
            const [ref, isVisible] = goalRefs[index];
            return (
              <div
                key={index}
                ref={ref}
                className={`stat-item fade-in-box ${isVisible ? 'visible' : ''}`}
              >
                <div className="stat-label">{goal.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Goals;
