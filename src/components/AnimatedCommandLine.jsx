import { useState, useEffect } from 'react';
import TypewriterEffect from './TypewriterEffect';

export default function AnimatedCommandLine({ command, output, isActive, onComplete }) {
  const [showCommand, setShowCommand] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShowCommand(true);
    }
  }, [isActive]);

  if (!isActive) {
    return <div className="command-line-placeholder"></div>;
  }

  return (
    <div className="command-line">
      <div className="command">
        <span className="prompt">user@portfolio:~$</span>{' '}
        {showCommand && (
          <TypewriterEffect
            text={command}
            className="cmd-text"
            delay={30}
            onComplete={() => setShowOutput(true)}
          />
        )}
      </div>

      {showOutput && output && (
        <div className="output">
          <TypewriterEffect
            text={output}
            delay={3}
            onComplete={onComplete}
          />
        </div>
      )}
    </div>
  );
}
