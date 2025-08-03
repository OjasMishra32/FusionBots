import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './About.css';

const About = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [card1Ref, card1Visible] = useIntersectionObserver();
  const [card2Ref, card2Visible] = useIntersectionObserver();
  const [card3Ref, card3Visible] = useIntersectionObserver();

  const features = [
    {
      id: '01',
      title: 'Quality Engineering',
      description: 'Every Fusion Bots kit is meticulously designed and tested to ensure durability, safety, and educational excellence. We believe in products that last and inspire.'
    },
    {
      id: '02',
      title: 'Hands-On Learning',
      description: 'Our kits bridge the gap between theory and practice, offering immersive experiences that make complex STEM concepts accessible and engaging for all learners.'
    },
    {
      id: '03',
      title: 'Future-Ready Skills',
      description: 'We\'re not just teaching robotics—we\'re preparing minds for tomorrow. Critical thinking, problem-solving, and innovation are at the heart of every Fusion Bots experience.'
    }
  ];

  const cardRefs = [card1Ref, card2Ref, card3Ref];
  const cardVisibility = [card1Visible, card2Visible, card3Visible];

  return (
    <section id="about" className="section">
      <div className="container">
        <div 
          ref={headerRef}
          className={`section-header fade-in ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-badge">Why Choose Fusion Bots</div>
          <h2 className="section-title">Excellence in STEM Education</h2>
          <p className="section-description">
            We're dedicated to creating the highest quality robotics and STEM kits that inspire learning, 
            foster creativity, and prepare students for a technology-driven future.
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={cardRefs[index]}
              className={`feature-card fade-in stagger-${index + 1} ${cardVisibility[index] ? 'visible' : ''}`}
            >
              <div className="feature-icon">{feature.id}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
