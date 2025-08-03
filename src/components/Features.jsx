import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './Features.css';

const Features = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [card1Ref, card1Visible] = useIntersectionObserver();
  const [card2Ref, card2Visible] = useIntersectionObserver();
  const [card3Ref, card3Visible] = useIntersectionObserver();

  const features = [
    {
      icon: '🤖',
      title: 'Robotics Starter Kits',
      description: 'Complete beginner-friendly robotics sets with programmable controllers, sensors, and step-by-step guides. Perfect for ages 8-16 to build their first robots.'
    },
    {
      icon: '🔬',
      title: 'Advanced STEM Labs',
      description: 'Professional-grade laboratory equipment and experiment kits covering physics, chemistry, and engineering. Designed for serious young scientists and educators.'
    },
    {
      icon: '⚡',
      title: 'IoT Development Boards',
      description: 'Cutting-edge microcontrollers and sensor arrays for building Internet of Things projects. Includes cloud connectivity and mobile app integration.'
    }
  ];

  const cardRefs = [card1Ref, card2Ref, card3Ref];
  const cardVisibility = [card1Visible, card2Visible, card3Visible];

  return (
    <section id="products" className="section stats-section">
      <div className="container">
        <div 
          ref={headerRef}
          className={`section-header fade-in ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-badge">Our Product Line</div>
          <h2 className="section-title">Premium STEM Education Kits</h2>
          <p className="section-description">
            Discover our comprehensive range of robotics, electronics, and STEM learning kits 
            designed to inspire and educate the next generation of innovators.
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={feature.icon}
              ref={cardRefs[index]}
              className={`feature-card fade-in stagger-${index + 1} ${cardVisibility[index] ? 'visible' : ''}`}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
