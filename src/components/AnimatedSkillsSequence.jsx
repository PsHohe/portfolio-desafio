import { useState, useEffect } from 'react';
import AnimatedSkillSection from './AnimatedSkillSection';

export default function AnimatedSkillsSequence({ skillSections, onComplete }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  // Start the sequence after a small delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex(0);
    }, 200); // Faster initial delay

    return () => clearTimeout(timer);
  }, []);

  // Function to advance to the next section
  const goToNextSection = () => {
    setActiveIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= skillSections.length) {
        // Dispatch a custom event when all skill sections are complete
        const event = new CustomEvent('skills-sequence-complete');
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
    <div className="skills-sequence">
      {skillSections.map((section, index) => (
        <AnimatedSkillSection
          key={index}
          command={section.command}
          skills={section.skills}
          isActive={index <= activeIndex}
          onComplete={index === activeIndex ? goToNextSection : undefined}
        />
      ))}
    </div>
  );
}
