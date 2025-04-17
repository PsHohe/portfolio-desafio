import { navigate } from 'astro:transitions/client';
import { useState } from 'react';
import { scrollToTop } from '../utils/scrollUtils';

export default function NavButtonInteractive({ href, command }) {
  const handleClick = (e) => {
    e.preventDefault();

    // Scroll to top of the page
    scrollToTop();

    if (window.simulateCommand) {
      window.simulateCommand(command);
    } else {
      navigate(href);
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    display: 'inline-block',
    backgroundColor: isHovered ? '#333333' : '#ffffff',
    color: isHovered ? '#f0f0f0' : '#000',
    border: '1px solid #555',
    borderRadius: '0',
    marginRight: '1rem',
    marginBottom: '0.5rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'background-color 0.2s, color 0.2s',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    position: 'relative',
    fontSize: '1.1rem',
    minWidth: '140px',
    textAlign: 'center',
    letterSpacing: '0.5px',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
  };

  return (
    <a
      href={href}
      className="nav-button"
      onClick={handleClick}
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ color: isHovered ? '#0f0' : '#0f0', marginRight: '0.5rem', fontWeight: 'bold', fontSize: '1.2rem' }}>$</span>
      {command}
    </a>
  );
}
