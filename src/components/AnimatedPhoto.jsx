import { useState, useEffect } from 'react';

export default function AnimatedPhoto({ photoPath = '/images/photo.jpg' }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleTerminalComplete = () => {
      setTimeout(() => {
        setShow(true);
      }, 500);
    };

    document.addEventListener('terminal-sequence-complete', handleTerminalComplete);

    return () => {
      document.removeEventListener('terminal-sequence-complete', handleTerminalComplete);
    };
  }, []);

  return (
    <div
      className="photo-container"
      style={{
        opacity: show ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out'
      }}
    >
      <div className="terminal-header">
        <div className="terminal-title">imagen.app</div>
        <div className="terminal-controls">
          <div className="terminal-control close"></div>
          <div className="terminal-control minimize"></div>
          <div className="terminal-control maximize"></div>
        </div>
      </div>
      <div className="photo-wrapper">
        <img src={photoPath} alt="Sandrino Escobar" className="profile-photo" />
      </div>
    </div>
  );
}
