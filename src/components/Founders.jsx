import { useMemo, useRef, useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './Founders.css';
import OjasS from '../assets/OjasS.jpg';
import OjasM from '../assets/OjasM.jpeg';
import Anvay from '../assets/Anvay.jpeg';
import Leo from '../assets/Leo.jpeg';

const SPOTLIGHT_RADIUS = 220; // px

const Founders = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [card1Ref, card1Visible] = useIntersectionObserver();
  const [card2Ref, card2Visible] = useIntersectionObserver();
  const [card3Ref, card3Visible] = useIntersectionObserver();
  const [card4Ref, card4Visible] = useIntersectionObserver();

  const founders = useMemo(
    () => [
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
    ],
    []
  );

  const cardRefs = [card1Ref, card2Ref, card3Ref, card4Ref];
  const cardVisibility = [card1Visible, card2Visible, card3Visible, card4Visible];

  return (
    <section id="founders" className="section founders-section" style={styles.section}>
      {/* Ambient gradient blobs */}
      <div aria-hidden style={{ ...styles.blob, ...styles.blobA }} />
      <div aria-hidden style={{ ...styles.blob, ...styles.blobB }} />

      <div className="container" style={styles.container}>
        <header
          ref={headerRef}
          className={`section-header fade-in ${headerVisible ? 'visible' : ''}`}
          style={{
            ...styles.header,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0px)' : 'translateY(16px)',
            transition: 'opacity .6s ease, transform .6s ease',
          }}
        >
          <span style={styles.badge}>Meet the Team</span>
          <h2 style={styles.title}>Visionary Founders</h2>
          <p style={styles.subtitle}>
            Engineering accessible, high-impact STEM learning with beautiful hardware, software, and curriculum.
          </p>
        </header>

        <div className="founders-grid" style={styles.grid}>
          {founders.map((f, i) => (
            <FounderCard
              key={f.name}
              data={f}
              refCallback={cardRefs[i]}
              visible={cardVisibility[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/** ---------- Card Component (spotlight hover + parallax image) ---------- */
const FounderCard = ({ data, refCallback, visible, index }) => {
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const cardRef = useRef(null);

  const onMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpot({ x, y });

    // subtle tilt
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / rect.width;
    const dy = (e.clientY - centerY) / rect.height;
    setTilt({ rx: dy * -6, ry: dx * 6 });
  };

  const onLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setSpot({ x: 50, y: 50 });
  };

  const gradient = `linear-gradient(135deg, ${data.accent[0]}, ${data.accent[1]})`;
  const delay = `${80 * index}ms`;

  return (
    <article
      ref={(el) => {
        cardRef.current = el;
        if (refCallback) refCallback(el);
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`founder-card fade-in stagger-${index + 1} ${visible ? 'visible' : ''}`}
      style={{
        ...styles.card,
        '--delay': delay,
        borderImage: `${gradient} 1`,
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translateY(0px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
          : 'translateY(18px)',
        transition:
          'opacity .6s ease var(--delay), transform .6s cubic-bezier(.2,.8,.2,1) var(--delay)',
        background:
          `radial-gradient(${SPOTLIGHT_RADIUS}px circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,.06), transparent 60%)`,
      }}
    >
      <div aria-hidden style={{ ...styles.cardBorder, background: gradient }} />
      <div style={styles.cardInner}>
        <div style={styles.mediaWrap}>
          <div style={{ ...styles.avatarRing, background: gradient }} />
          <img
            src={data.image}
            alt={data.name}
            loading="lazy"
            style={styles.avatar}
            draggable={false}
          />
          <div aria-hidden style={{ ...styles.glow, background: gradient }} />
        </div>

        <div style={styles.info}>
          <div style={styles.nameRow}>
            <h3 style={styles.name}>{data.name}</h3>
            <span style={styles.role}>{data.role}</span>
          </div>

          <p style={styles.bio}>{data.background}</p>

          {data.link && (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
              aria-label={`${data.name} portfolio (opens in a new tab)`}
            >
              <span aria-hidden style={styles.linkDot} />
              Visit portfolio
            </a>
          )}

          <ul style={styles.tags} role="list">
            {data.expertise.map((t) => (
              <li key={t} style={styles.tag}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};

/** ---------- Inline Styles (scoped, minimal override risk) ---------- */
const styles = {
  section: {
    position: 'relative',
    padding: '6rem 0 5rem',
    overflow: 'hidden',
    isolation: 'isolate',
  },
  container: {
    maxWidth: 1160,
    margin: '0 auto',
    padding: '0 1.25rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  badge: {
    display: 'inline-block',
    padding: '.35rem .7rem',
    borderRadius: 999,
    fontSize: '.8rem',
    letterSpacing: '.04em',
    background:
      'linear-gradient(135deg, rgba(124,58,237,.15), rgba(236,72,153,.15))',
    border: '1px solid rgba(255,255,255,.12)',
    color: 'rgba(255,255,255,.85)',
    backdropFilter: 'blur(6px)',
  },
  title: {
    fontSize: '2.1rem',
    margin: '.8rem 0 .4rem',
    lineHeight: 1.15,
  },
  subtitle: {
    maxWidth: 760,
    margin: '0 auto',
    opacity: .85,
    fontSize: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '1.2rem',
    alignItems: 'stretch',
  },
  card: {
    gridColumn: 'span 12',
    position: 'relative',
    borderRadius: 20,
    border: '1px solid transparent',
    background: 'rgba(255,255,255,.03)',
    backdropFilter: 'blur(8px)',
    boxShadow:
      '0 10px 30px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.06)',
    willChange: 'transform',
  },
  cardBorder: {
    position: 'absolute',
    inset: 0,
    borderRadius: 20,
    padding: 1,
    mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    WebkitMask:
      'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: .22,
    pointerEvents: 'none',
  },
  cardInner: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem',
    padding: '1.1rem',
  },
  mediaWrap: {
    position: 'relative',
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 16,
    transform: 'translateZ(0)',
  },
  avatarRing: {
    position: 'absolute',
    inset: -1,
    borderRadius: 18,
    filter: 'blur(16px)',
    opacity: .18,
  },
  glow: {
    position: 'absolute',
    inset: 0,
    borderRadius: 16,
    mixBlendMode: 'screen',
    opacity: .15,
    filter: 'blur(18px)',
  },
  info: {
    display: 'grid',
    gap: '.65rem',
  },
  nameRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '.6rem',
  },
  name: {
    fontSize: '1.25rem',
    lineHeight: 1.15,
    margin: 0,
  },
  role: {
    fontSize: '.8rem',
    padding: '.28rem .6rem',
    borderRadius: 999,
    background: 'rgba(255,255,255,.06)',
    border: '1px solid rgba(255,255,255,.12)',
    opacity: .9,
  },
  bio: {
    margin: 0,
    opacity: .9,
    lineHeight: 1.55,
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '.5rem',
    fontSize: '.92rem',
    fontWeight: 500,
    textDecoration: 'none',
    color: 'rgba(99,102,241,1)',
    borderBottom: '1px dashed rgba(99,102,241,.35)',
    width: 'fit-content',
  },
  linkDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    background: 'currentColor',
    boxShadow: '0 0 16px currentColor',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '.5rem',
    padding: 0,
    margin: '.2rem 0 0',
    listStyle: 'none',
  },
  tag: {
    fontSize: '.78rem',
    padding: '.28rem .5rem',
    borderRadius: 999,
    background: 'rgba(255,255,255,.05)',
    border: '1px solid rgba(255,255,255,.1)',
  },
  blob: {
    position: 'absolute',
    width: 520,
    height: 520,
    borderRadius: '50%',
    filter: 'blur(60px)',
    opacity: .16,
    zIndex: -1,
  },
  blobA: {
    background: 'conic-gradient(from 120deg, rgba(59,130,246,.8), rgba(236,72,153,.6), rgba(99,102,241,.8))',
    top: -120,
    left: -140,
  },
  blobB: {
    background: 'conic-gradient(from 280deg, rgba(16,185,129,.7), rgba(99,102,241,.7), rgba(56,189,248,.7))',
    bottom: -160,
    right: -160,
  },
};

/** ---------- Responsive tweaks (inline) ---------- */
Object.assign(styles, {
  // override grid columns at larger breakpoints via JS media query
});
if (typeof window !== 'undefined') {
  const mq = window.matchMedia('(min-width: 680px)');
  const apply = () => {
    styles.card.gridColumn = mq.matches ? 'span 6' : 'span 12';
    styles.cardInner.gridTemplateColumns = mq.matches ? '240px 1fr' : '1fr';
    styles.mediaWrap.height = mq.matches ? 240 : 220;
  };
  apply();
  mq.addEventListener?.('change', apply);
}

export default Founders;
