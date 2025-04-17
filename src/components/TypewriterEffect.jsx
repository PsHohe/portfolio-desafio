import { useState, useEffect, useRef } from 'react';

export default function TypewriterEffect({ text, delay = 30, onComplete = () => {}, className = '', style = {} }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const textRef = useRef(text);

  // Reset state when text changes
  useEffect(() => {
    if (textRef.current !== text) {
      setDisplayText('');
      setCurrentIndex(0);
      setIsComplete(false);
      textRef.current = text;
    }
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete();
    }
  }, [currentIndex, delay, text, isComplete, onComplete]);

  // If text is empty, return empty span
  if (!text) return <span className={className} style={style}></span>;

  return <span className={className} style={style}>{displayText}</span>;
}
