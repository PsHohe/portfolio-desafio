import { useState, useEffect } from 'react';
import AnimatedCommandLine from './AnimatedCommandLine';

export default function CommandSequence({ commands, onComplete }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  // Start the sequence after a small delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex(0);
    }, 200); // Faster initial delay

    return () => clearTimeout(timer);
  }, []);

  // Function to advance to the next command
  const goToNextCommand = () => {
    setActiveIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= commands.length) {
        // Dispatch a custom event when all commands are complete
        const event = new CustomEvent('command-sequence-complete');
        document.dispatchEvent(event);

        if (onComplete) {
          onComplete();
        }
        return prevIndex;
      }
      return nextIndex;
    });
  };

  return (
    <div className="command-sequence">
      {commands.map((cmd, index) => (
        <AnimatedCommandLine
          key={index}
          command={cmd.command}
          output={cmd.output}
          isActive={index <= activeIndex}
          onComplete={index === activeIndex ? goToNextCommand : undefined}
        />
      ))}
    </div>
  );
}
