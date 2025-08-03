import './Footer.css';

const Footer = () => {
  const footerSections = [
    {
      title: 'YSWS Hack Club',
      content: 'Building the future, one line of code at a time.',
      isDescription: true
    },
    {
      title: 'Quick Links',
      links: [
        { href: '#about', label: 'About' },
        { href: '#features', label: 'Programs' },
        { href: '#stats', label: 'Impact' },
        { href: '#contact', label: 'Contact' }
      ]
    },
    {
      title: 'Community',
      links: [
        { href: '#', label: 'Discord' },
        { href: '#', label: 'GitHub' },
        { href: '#', label: 'Twitter' },
        { href: '#', label: 'LinkedIn' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { href: '#', label: 'Documentation' },
        { href: '#', label: 'Tutorials' },
        { href: '#', label: 'Blog' },
        { href: '#', label: 'Support' }
      ]
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h4>{section.title}</h4>
              {section.isDescription ? (
                <p>{section.content}</p>
              ) : (
                <ul className="footer-links">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 YSWS Hack Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
