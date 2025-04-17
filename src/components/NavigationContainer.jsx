import React from 'react';

export default function NavigationContainer({ children }) {
  const containerStyle = {
    margin: '1.5rem 0',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1rem',
    backgroundColor: 'rgba(40, 40, 40, 0.5)',
    borderRadius: '4px',
    borderLeft: '3px solid #0f0',
    position: 'relative',
    border: '1px solid #444',
    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)'
  };

  const titleStyle = {
    color: '#0f0',
    fontFamily: 'var(--font-mono)',
    marginBottom: '1rem',
    width: '100%',
    fontSize: '1.1rem',
    fontWeight: 600,
    paddingLeft: '0.5rem',
    borderBottom: '1px dotted #444',
    paddingBottom: '0.5rem'
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Navegación</div>
      {children}
    </div>
  );
}
