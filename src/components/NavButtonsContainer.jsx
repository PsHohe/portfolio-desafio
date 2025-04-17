import React from 'react';

export default function NavButtonsContainer({ children }) {
  const containerStyle = {
    margin: '1.5rem 0',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0',
    backgroundColor: '#1a1a1a',
    borderRadius: '4px',
    position: 'relative',
    border: '1px solid #444',
    overflow: 'hidden'
  };

  const contentStyle = {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    padding: '1rem',
    paddingTop: '1.2rem'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #444',
    padding: '0.5rem',
    backgroundColor: '#2a2a2a',
    width: '100%',
    marginBottom: '0'
  };

  const titleStyle = {
    fontWeight: 'bold',
    color: 'var(--terminal-text)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem'
  };

  const controlsStyle = {
    display: 'flex',
    gap: '0.5rem'
  };

  const controlStyle = (color) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: color
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>navigation.sh</div>
        <div style={controlsStyle}>
          <div style={controlStyle('#ff5f56')}></div>
          <div style={controlStyle('#ffbd2e')}></div>
          <div style={controlStyle('#27c93f')}></div>
        </div>
      </div>
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
}
