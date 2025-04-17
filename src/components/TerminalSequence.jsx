import { useState, useEffect } from 'react';
import TypewriterEffect from './TypewriterEffect';

// A component that represents a single command in the sequence
function SequentialCommand({ prompt, command, output, isActive, onComplete }) {
  const [showCommand, setShowCommand] = useState(isActive);
  const [showOutput, setShowOutput] = useState(false);

  // When this command becomes active, start showing it
  useEffect(() => {
    if (isActive) {
      setShowCommand(true);
    }
  }, [isActive]);

  // If this command is not active yet, render an empty div to maintain layout
  if (!isActive) {
    return <div className="command-line-placeholder"></div>;
  }

  return (
    <div className="command-line">
      <div className="command">
        <span className="prompt">{prompt}:~$</span>{' '}
        {showCommand && (
          <TypewriterEffect
            text={command}
            className="cmd-text"
            delay={40}
            onComplete={() => setShowOutput(true)}
          />
        )}
      </div>

      {showOutput && output && (
        <div className="output">
          <TypewriterEffect
            text={output}
            delay={5}
            onComplete={onComplete}
          />
        </div>
      )}
    </div>
  );
}

// The main component that manages the sequence of commands
export default function TerminalSequence({ commands, prompt = "user@portfolio" }) {
  const [activeCommandIndex, setActiveCommandIndex] = useState(-1);

  // Start the sequence after a small delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveCommandIndex(0);
    }, 300); // 300ms delay before starting

    return () => clearTimeout(timer);
  }, []);

  // Function to advance to the next command
  const goToNextCommand = () => {
    setActiveCommandIndex(prevIndex => {
      const nextIndex = prevIndex + 1;

      // If we've reached the end of the commands, dispatch a custom event
      if (nextIndex >= commands.length) {
        // Dispatch a custom event that can be listened for by other components
        console.log('Terminal sequence complete, dispatching event');
        const event = new CustomEvent('terminal-sequence-complete');
        document.dispatchEvent(event);
        return prevIndex;
      }

      return nextIndex;
    });
  };

  return (
    <div className="terminal-sequence">
      {commands.map((cmd, index) => (
        <SequentialCommand
          key={index}
          prompt={prompt}
          command={cmd.command}
          output={cmd.output}
          isActive={index <= activeCommandIndex}
          onComplete={index === activeCommandIndex ? goToNextCommand : undefined}
        />
      ))}
    </div>
  );
}
