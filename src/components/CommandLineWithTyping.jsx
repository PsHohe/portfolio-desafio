import { useState, useEffect, useRef } from 'react';
// This comment ensures this component is treated as a client component
import TypewriterEffect from './TypewriterEffect';

export default function CommandLineWithTyping({ prompt = "user@portfolio", command, output }) {
  const [showCommand, setShowCommand] = useState(true);
  const [showOutput, setShowOutput] = useState(false);
  const commandRef = useRef(command);
  const outputRef = useRef(output);
  const isInitialMount = useRef(true);

  // Reset states when command or output changes
  useEffect(() => {
    // Skip on initial mount to prevent double animation
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (commandRef.current !== command || outputRef.current !== output) {
      setShowCommand(true);
      setShowOutput(false);
      commandRef.current = command;
      outputRef.current = output;
    }
  }, [command, output]);

  // Log to help debug
  useEffect(() => {
    console.log('CommandLineWithTyping rendered', { showCommand, showOutput, command, output });
  }, [showCommand, showOutput, command, output]);

  return (
    <div className="command-line">
      <div className="command">
        <span className="prompt">{prompt}:~$</span>{' '}
        {showCommand && (
          <TypewriterEffect
            text={command}
            className="cmd-text"
            delay={70}
            onComplete={() => {
              console.log('Command typing complete');
              setShowOutput(true);
            }}
          />
        )}
      </div>

      {showOutput && output && (
        <div className="output">
          <TypewriterEffect
            text={output}
            delay={10}
          />
        </div>
      )}
    </div>
  );
}
