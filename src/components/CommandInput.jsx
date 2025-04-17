import { useState, useEffect, useRef, createContext } from 'react';
import { navigate } from 'astro:transitions/client';
import TypewriterEffect from './TypewriterEffect';
import { scrollToTop } from '../utils/scrollUtils';

// Create a context to share the command input functionality with NavButtons
export const CommandContext = createContext(null);

/**
 * @typedef {Object} CommandOption
 * @property {string} command - The command text
 * @property {string} href - The URL to navigate to
 */

/**
 * @param {Object} props
 * @param {CommandOption[]} props.availableCommands - List of available commands
 */

export default function CommandInput({ availableCommands = [] }) {
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [displayCommand, setDisplayCommand] = useState('');
  const [showTypingEffect, setShowTypingEffect] = useState(false);
  const inputRef = useRef(null);

  // Map of commands to their corresponding URLs
  const commandMap = availableCommands.reduce((acc, item) => {
    acc[item.command] = item.href;
    return acc;
  }, {});

  // Focus the input field when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isProcessing) {
      const command = inputValue.trim();

      if (commandMap[command]) {
        // Scroll to top of the page
        scrollToTop();

        // Valid command entered - navigate immediately
        navigate(commandMap[command]);
        setInputValue('');
      }
    }
  };

  // Function to simulate typing a command (called from NavButton)
  const simulateCommand = (command) => {
    if (isProcessing) return;

    setIsProcessing(true);
    setDisplayCommand(command);
    setShowTypingEffect(true);
    setInputValue('');
  };

  const handleTypingComplete = () => {
    // Navigate to the corresponding URL after typing animation completes
    const url = commandMap[displayCommand];
    if (url) {
      // Scroll to top of the page
      scrollToTop();

      setTimeout(() => {
        navigate(url);
      }, 500); // Small delay after typing completes
    }
    setIsProcessing(false);
    setShowTypingEffect(false);
  };

  // Make the simulateCommand function available to other components
  useEffect(() => {
    // Add the simulateCommand function to the window object
    window.simulateCommand = simulateCommand;

    return () => {
      // Clean up when component unmounts
      delete window.simulateCommand;
    };
  }, []);

  return (
    <div className="command-input-container">
      {showTypingEffect ? (
        <div className="command-line">
          <div className="command">
            <span className="prompt">user@portfolio:~$</span>{' '}
            <TypewriterEffect
              text={displayCommand}
              className="cmd-text"
              delay={70}
              onComplete={handleTypingComplete}
            />
          </div>
        </div>
      ) : (
        <div className="command-input">
          <span className="prompt">user@portfolio:~$</span>{' '}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            placeholder="Type a command (e.g., cd about)"
            className="cmd-input"
          />
        </div>
      )}

      <div className="available-commands">
        <span className="hint">Available commands: </span>
        {availableCommands.map((cmd, index) => (
          <span key={index} className="available-command">
            {cmd.command}
            {index < availableCommands.length - 1 ? ', ' : ''}
          </span>
        ))}
      </div>
    </div>
  );
}
