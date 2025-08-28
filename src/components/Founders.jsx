import React from 'react';
import './Founders.css';

/** Inline SVG fallback to avoid broken images killing layout */
const fallbackSVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stop-color="#7877c6"/>
          <stop offset="1" stop-color="#ff77c6"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#1a1a3e"/>
      <circle cx="256" cy="192" r="110" fill="url(#g)" opacity="0.25"/>
      <circle cx="256" cy="202" r="82" fill="#0f0f23"/>
      <rect x="120" y="304" width="272" height="148" rx="74" fill="#0f0f23" stroke="#7877c6" opacity="0.4"/>
    </svg>`
  );

function SafeImg({ src, alt, className }) {
  const onError = (e) => {
    if (e.currentTarget.dataset.fallbackApplied) return;
    e.currentTarget.dataset.fallbackApplied = '1';
    e.currentTarget.src = fallbackSVG;
  };
  return <img src={src} alt={alt} className={className} loading="lazy" onError={onError} />;
}

/**
 * IMPORTANT: Put your headshots in /public/images/founders with EXACT names:
 *  - /public/images/founders/OjasM.jpeg
 *  - /public/images/founders/OjasS.jpg
 *  - /public/images/founders/Anvay.jpeg
 *  - /public/images/founders/Leo.jpeg
 * Linux deploys are case-sensitive.
 */
const founders = [
  {
    name: 'Ojasva Mishra',
    role: 'Co-Founder & CEO',
    background:
      'I lead engineering, curriculum, and strategy to make robotics education accessible, practical, and innovation-driven. With competitive robotics, aerospace research, and STEM venture experience, I build teams that push autonomy and real-world problem solving.',
    image: '/images/founders/OjasM.jpeg',
    expertise: 'Robotics • Education • Innovation',
    gradient: 'linear-gradient(135deg, #7877c6, #ff77c6)',
    link: 'https://ojasvamishra.me',
  },
  {
    name: 'Ojas Sarada',
    role: 'Co-Founder & CTO',
    background:
      'I drive systems design and product innovation across embedded, control, and AI—turning theory into scalable hands-on learning platforms and intelligent hardware.',
    image: '/images/founders/OjasS.jpg',
    expertise: 'Computer Engineering • Robotics • AI',
    gradient: 'linear-gradient(135deg, #00d4ff, #7877c6)',
    extraClass: 'ojas-card',
  },
  {
    name: 'Anvay Ajmera',
    role: 'Co-Founder & Head of Innovation',
    background:
      'I blend AI, design, and pedagogy to build engaging STEM experiences. As a youth delegate and 2-time UN speaker, I advocate for equitable access to quality STEM worldwide.',
    image: '/images/founders/Anvay.jpeg',
    expertise: 'AI • Machine Learning • Pedagogy',
    gradient: 'linear-gradient(135deg, #ff77c6, #00d4ff)',
  },
  {
    name: 'Leo Shi',
    role: 'Co-Founder & CFO',
    background:
      'I lead financial strategy, budgeting, and risk. Pursuing Finance at Stern with a foundation in accounting, modeling, and data-driven decision making.',
    image: '/images/founders/Leo.jpeg',
    expertise: 'Finance • Accounting • Data Analysis',
    gradient: 'linear-gradient(135deg, #00ffcc, #0077ff)',
  },
];

const Founders = () => {
  return (
    <section id="founders" className="section founders-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Meet the Team</div>
          <h2 className="section-title">Visionary Founders</h2>
          <p className="section-description">
            Our founders bring together experience in education, technology, and innovation to create impactful STEM learning.
          </p>
        </div>

        <div className="founders-grid">
          {founders.map((f) => (
            <div
              key={f.name}
              className={`founder-card ${f.extraClass || ''}`}
              style={{ ['--founder-gradient']: f.gradient }}
            >
              <div className="founder-image-container">
                <SafeImg src={f.image} alt={f.name} className="founder-image" />
                <div className="founder-glow" />
              </div>

              <div className="founder-info">
                <h3>{f.name}</h3>
                <div className="founder-role">{f.role}</div>

                <p className="founder-background">
                  {f.background}
                  {f.link && f.name === 'Ojasva Mishra' && (
                    <span style={{ display: 'block', marginTop: '0.75rem' }}>
                      <a
                        href={f.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="founder-link"
                      >
                        Visit my portfolio
                      </a>
                    </span>
                  )}
                </p>

                <div className="founder-expertise">{f.expertise}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;
