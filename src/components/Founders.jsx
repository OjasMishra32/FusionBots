import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './Founders.css';
import OjasS from '../assets/OjasS.jpg';
import OjasM from '../assets/OjasM.jpeg';
import Anvay from '../assets/Anvay.jpeg';


const Founders = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [card1Ref, card1Visible] = useIntersectionObserver();
  const [card2Ref, card2Visible] = useIntersectionObserver();
  const [card3Ref, card3Visible] = useIntersectionObserver();

  const founders = [
    {
      name: 'Ojasva Mishra',
      role: 'Co-Founder & CEO',
      background: 'I’m Ojasva Mishra, cofounder and CEO of FusionBots. I lead the engineering, curriculum, and strategy to make robotics education accessible, practical, and innovation-driven for students. With a background in competitive robotics, aerospace research, and STEM innovation, I’ve built and led teams pushing the limits of engineering, autonomy, and real-world problem solving.
',
      image: OjasM,
      expertise: 'Robotics • Education • Innovation',
      gradient: 'linear-gradient(135deg, #7877c6, #ff77c6)'
    },
    {
      name: 'Ojas Sarada',
      role: 'Co-Founder & CTO',
      background: 'Passionate about computer engineering, robotics, and AI. I explore embedded systems, hardware-software integration, and cutting-edge technological innovation.',
      image: OjasS,
      expertise: 'Computer Engineering • Robotics • AI',
      gradient: 'linear-gradient(135deg, #00d4ff, #7877c6)'
    },
    {
      name: 'Anvay Ajmera',
      role: 'Co-Founder & Head of Innovation',
      background: 'Former Google AI researcher and Berkeley PhD in Computer Science. Pioneer in educational AI and adaptive learning systems for STEM education.',
      image: Anvay,
      expertise: 'AI • Machine Learning • Pedagogy',
      gradient: 'linear-gradient(135deg, #ff77c6, #00d4ff)'
    }
  ];

  const cardRefs = [card1Ref, card2Ref, card3Ref];
  const cardVisibility = [card1Visible, card2Visible, card3Visible];

  return (
    <section id="founders" className="section founders-section">
      <div className="container">
        <div 
          ref={headerRef}
          className={`section-header fade-in ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-badge">Meet the Team</div>
          <h2 className="section-title">Visionary Founders</h2>
          <p className="section-description">
            Our founders bring together decades of experience in education, technology, and innovation 
            to create the most impactful STEM learning experiences.
          </p>
        </div>
        <div className="founders-grid">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              ref={cardRefs[index]}
              className={`founder-card fade-in stagger-${index + 1} ${cardVisibility[index] ? 'visible' : ''} ${founder.name === 'Ojas Sarada' ? 'ojas-card' : ''}`}
              style={{ '--founder-gradient': founder.gradient }}
            >
              <div className="founder-image-container">
                <img src={founder.image} alt={founder.name} className="founder-image" />
                <div className="founder-glow"></div>
              </div>
              <div className="founder-info">
                <h3>{founder.name}</h3>
                <div className="founder-role">{founder.role}</div>
                <p className="founder-background">{founder.background}</p>
                <div className="founder-expertise">{founder.expertise}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;
