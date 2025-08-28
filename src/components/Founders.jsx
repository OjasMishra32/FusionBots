import React, { useRef, useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './Founders.css';
import OjasS from '../assets/OjasS.jpg';
import OjasM from '../assets/OjasM.jpeg';
import Anvay from '../assets/Anvay.jpeg';
import Leo from '../assets/Leo.jpeg';

/** Safely assign either an object ref or a callback ref */
function assignRef(targetRef, node) {
  if (!targetRef) return;
  if (typeof targetRef === 'function') {
    targetRef(node);
  } else {
    targetRef.current = node;
  }
}

const Founders = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [card1Ref, card1Visible] = useIntersectionObserver();
  const [card2Ref, card2Visible] = useIntersectionObserver();
  const [card3Ref, card3Visible] = useIntersectionObserver();
  const [card4Ref, card4Visible] = useIntersectionObserver();

  const founders = [
    {
      name: 'Ojasva Mishra',
      role: 'Co-Founder & CEO',
      background:
        'I lead engineering, curriculum, and strategy to make robotics education accessible, practical, and innovation-driven. With competitive robotics, aerospace research, and STEM venture experience, I build teams that push autonomy and real-world problem solving.',
      image: OjasM,
      expertise: ['Robotics', 'Education', 'Innovation'],
      accent: ['#7877c6', '#ff77c6'],
      link: 'https://ojasvamishra.me',
    },
    {
      name: 'Ojas Sarada',
      role: 'Co-Founder & CTO',
      background:
        'I drive systems design and product innovation across embedded, control, and AI—turning theory into scalable hands-on learning platforms and intelligent hardware.',
      image: OjasS,
      expertise: ['Computer Engineering', 'Robotics', 'AI'],
      accent: ['#00d4ff', '#7877c6'],
    },
    {
      name: 'Anvay Ajmera',
      role: 'Co-Founder & Head of Innovation',
      background:
        'I blend AI, design, and pedagogy to build engaging STEM experiences. As a youth delegate and 2-time UN speaker, I advocate for equitable access to quality STEM worldwide.',
      image: Anvay,
      expertise: ['AI', 'Machine Learning', 'Pedagogy'],
      accent: ['#ff77c6', '#00d4ff'],
    },
    {
      name: 'Leo Shi',
      role: 'Co-Founder & CFO',
      background:
        'I lead financial strategy, budgeting, and risk. Pursuing Finance at Stern with a foundation in accounting, modeling, and data-driven decision making.',
      image: Leo,
      expertise: ['Finance', 'Accounting', 'Data Analysis'],
      accent: ['#00ffcc', '#0077ff'],
    },
  ];

  const cardRefs = [card1Ref, card2Ref, card3Ref, card4Ref];
  const cardVisibility = [card1Visible, card2Visible, card3Visible, card4Visible];

  return (
    <section id="founders" className="section founders-section">
      {/* Scoped CSS to prevent leaks and avoid touching your existing files */}
      <style>{`
        .founders-section .fx-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1.2rem;
          align-items: stretch;
        }
        @media (min-width: 720px) {
          .founders-section .fx-card { grid-column: span 6; }
          .founders-section .fx-inner { grid-template-columns: 240px 1fr; }
          .founders-section .fx-media { height: 240px; }
        }
        @media (max-width: 719.98px) {
          .founders-section .fx-card { grid-column: span 12; }
          .founders-section .fx-inner { grid-template-columns: 1fr; }
          .founders-section .fx-media { height: 220px; }
        }

        .founders-section .fx-header {
          text-align: center; margin-bottom: 2.4rem;
          transition: opacity .6s ease, transform .6s ease;
        }
        .founders-section .fx-badge {
          display:inline-block; padding:.35rem .7rem; border-radius:999px;
          font-size:.8rem; letter-spacing:.04em;
          background: linear-gradient(135deg, rgba(124,58,237,.15), rgba(236,72,153,.15));
          border:1px solid rgba(255,255,255,.12); color:rgba(255,255,255,.85);
          backdrop-filter: blur(6px);
        }
        .founders-section .fx-title { font-size:2.1rem; margin:.8rem 0 .4rem; line-height:1.15; }
        .founders-section .fx-sub { max-width:760px; margin:0 auto; opacity:.85; }

        .founders-section .fx-card {
          position:relative; border-radius:20px; border:1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.035); backdrop-filter: blur(8px);
          box-shadow: 0 10px 30px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.06);
          transition: transform .6s cubic-bezier(.2,.8,.2,1), opacity .6s ease, background .3s ease;
          overflow:hidden;
          background:
            radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.06), transparent 60%),
            rgba(255,255,255,.035);
        }
        .founders-section .fx-card::before {
          content:""; position:absolute; inset:-1px; border-radius:22px; pointer-events:none;
          background: var(--fx-gradient, linear-gradient(135deg,#6366f1,#ec4899));
          filter: blur(20px); opacity:.18;
        }
        .founders-section .fx-card:hover { transform: translateY(-2px); }
        .founders-section .fx-card.visible { opacity:1; transform: translateY(0); }
        .founders-section .fx-card:not(.visible) { opacity:0; transform: translateY(16px); }

        .founders-section .fx-inner { position:relative; display:grid; gap:1rem; padding:1.1rem; }
        .founders-section .fx-media { position:relative; border-radius:16px; overflow:hidden; }
        .founders-section .fx-avatar { width:100%; height:100%; object-fit:cover; border-radius:16px; transform:translateZ(0); }
        .founders-section .fx-ring { position:absolute; inset:-1px; border-radius:18px; filter:blur(14px); opacity:.18; }
        .founders-section .fx-glow { position:absolute; inset:0; border-radius:16px; mix-blend-mode:screen; opacity:.15; filter:blur(18px); }

        .founders-section .fx-info { display:grid; gap:.6rem; }
        .founders-section .fx-row { display:flex; flex-wrap:wrap; align-items:center; gap:.6rem; }
        .founders-section .fx-name { font-size:1.25rem; line-height:1.15; margin:0; }
        .founders-section .fx-role { font-size:.8rem; padding:.28rem .6rem; border-radius:999px; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12); opacity:.9; }
        .founders-section .fx-bio { margin:0; opacity:.9; line-height:1.55; }
        .founders-section .fx-link { display:inline-flex; align-items:center; gap:.5rem; font-size:.92rem; font-weight:500; text-decoration:none; color:#6366f1; border-bottom:1px dashed rgba(99,102,241,.35); width:fit-content; }
        .founders-section .fx-dot { width:7px; height:7px; border-radius:999px; background:currentColor; box-shadow:0 0 16px currentColor; }

        .founders-section .fx-tags { display:flex; flex-wrap:wrap; gap:.5rem; padding:0; margin:.2rem 0 0; list-style:none; }
        .founders-section .fx-tag { font-size:.78rem; padding:.28rem .5rem; border-radius:999px; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); }
      `}</style>

      <div className="container">
        <header
          ref={headerRef}
          className="fx-header"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <span className="fx-badge">Meet the Team</span>
          <h2 className="fx-title">Visionary Founders</h2>
          <p className="fx-sub">
            Engineering accessible, high-impact STEM learning with beautiful hardware, software, and curriculum.
          </p>
        </header>

        <div className="fx-grid">
          {founders.map((f, i) => (
            <Card
              key={f.name}
              data={f}
              extRef={cardRefs[i]}          {/* ✅ pass the hook's ref object */}
              visible={cardVisibility[i]}
              delayMs={i * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ data, extRef, visible, delayMs = 0 }) => {
  const localRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const setNode = (node) => {
    localRef.current = node;
    assignRef(extRef, node); // ✅ safely support object or callback refs
  };

  const onMove = (e) => {
    const el = localRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    setTilt({ rx: dy * -6, ry: dx * 6 });
  };

  const onLeave = () => {
    const el = localRef.current;
    if (!el) return;
    el.style.setProperty('--mx', `50%`);
    el.style.setProperty('--my', `50%`);
    setTilt({ rx: 0, ry: 0 });
  };

  const gradient = `linear-gradient(135deg, ${data.accent[0]}, ${data.accent[1]})`;

  return (
    <article
      ref={setNode}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`fx-card ${visible ? 'visible' : ''}`}
      style={{
        transitionDelay: `${delayMs}ms`,
        transform: visible
          ? `translateY(0) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
          : 'translateY(16px)',
        '--fx-gradient': gradient,
      }}
    >
      <div className="fx-inner">
        <div className="fx-media">
          <div className="fx-ring" style={{ background: gradient }} />
          <img src={data.image} alt={data.name} className="fx-avatar" loading="lazy" />
          <div className="fx-glow" style={{ background: gradient }} />
        </div>

        <div className="fx-info">
          <div className="fx-row">
            <h3 className="fx-name">{data.name}</h3>
            <span className="fx-role">{data.role}</span>
          </div>

          <p className="fx-bio">
            {data.background}
            {data.link && data.name === 'Ojasva Mishra' && (
              <span style={{ display: 'block', marginTop: '0.75rem' }}>
                <a
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fx-link"
                  aria-label={`${data.name} portfolio (opens in a new tab)`}
                >
                  <span className="fx-dot" aria-hidden />
                  Visit portfolio
                </a>
              </span>
            )}
          </p>

          <ul className="fx-tags" role="list">
            {data.expertise.map((t) => (
              <li key={t} className="fx-tag">{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default Founders;
