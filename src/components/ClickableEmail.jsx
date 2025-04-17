import { useState, useEffect } from 'react';

export default function ClickableEmail({ email }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [displayEmail, setDisplayEmail] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    if (isRevealed) {
      const parts = email.split('@');
      const username = parts[0];
      const domain = parts[1];

      setDisplayEmail(
        <span>
          {username}<span style={{ opacity: 0.01 }}></span>@<span style={{ opacity: 0.01 }}></span>{domain}
          {copyStatus && (
            <span
              style={{
                marginLeft: '0.5rem',
                fontSize: '0.8em',
                color: 'var(--terminal-green)',
                opacity: 1,
                transition: 'opacity 1s'
              }}
            >
              {copyStatus}
            </span>
          )}
        </span>
      );
    }
  }, [isRevealed, email, copyStatus]);

  const handleClick = () => {
    if (!isRevealed) {
      setIsRevealed(true);
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email).then(
      () => {
        setCopyStatus('(copiado)');
        setTimeout(() => setCopyStatus(''), 2000);
      },
      (err) => {
        console.error('No se pudo copiar el email: ', err);
        setCopyStatus('(error al copiar)');
        setTimeout(() => setCopyStatus(''), 2000);
      }
    );
  };

  return (
    <span
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        color: isRevealed ? 'inherit' : 'var(--terminal-cyan)',
        textDecoration: isRevealed ? 'none' : 'underline',
        userSelect: isRevealed ? 'text' : 'none',
        display: 'inline-block',
        transition: 'color 0.2s'
      }}
      title={isRevealed ? 'Click para copiar email' : 'Click para mostrar email'}
      aria-label={isRevealed ? 'Email: ' + email + '. Click para copiar.' : 'Click para mostrar email'}
    >
      {isRevealed ? displayEmail : '[click para mostrar]'}
    </span>
  );
}
