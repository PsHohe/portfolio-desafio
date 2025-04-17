import { useState, useEffect } from 'react';
import TypewriterEffect from './TypewriterEffect';

export default function AnimatedSkillSection({ command, skills, isActive, onComplete }) {
  const [showCommand, setShowCommand] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShowCommand(true);
    }
  }, [isActive]);

  if (!isActive) {
    return <div className="skill-section-placeholder"></div>;
  }

  return (
    <div className="skill-section">
      <div className="command-line">
        <div className="command">
          <span className="prompt">user@portfolio:~$</span>{' '}
          {showCommand && (
            <TypewriterEffect
              text={command}
              className="cmd-text"
              delay={30}
              onComplete={() => setShowSkills(true)}
            />
          )}
        </div>
      </div>

      {showSkills && (
        <div className="skill-bars"
             style={{
               opacity: 1,
               transition: 'opacity 0.5s ease-in-out',
               animation: 'fadeIn 0.5s ease-in-out'
             }}
             onAnimationEnd={onComplete}>
          {skills.map((skill, index) => {
            const percentage = parseInt(skill.level);
            const barLength = 20;
            const filledSegments = Math.round((percentage / 100) * barLength);
            const emptySegments = barLength - filledSegments;

            const displayFilledSegments = percentage > 0 ? Math.max(1, filledSegments) : 0;

            return (
              <div className="skill" key={index}>
                <div className="skill-cli-bar">
                  <span className="skill-name">{skill.name}: </span>
                  <span className="cli-bar-wrapper">
                    <span className="cli-bar-bracket">[</span>
                    <span
                      className="cli-bar-filled"
                      style={{
                        animation: `typeCharacters ${displayFilledSegments * 0.03}s steps(${displayFilledSegments}) ${index * 0.2}s forwards`,
                        visibility: 'hidden'
                      }}
                    >
                      {'='.repeat(displayFilledSegments > 0 ? displayFilledSegments - 1 : 0)}{displayFilledSegments > 0 ? '>' : ''}
                    </span>
                    <span
                      className="cli-bar-empty"
                      style={{
                        animation: `fadeIn 0.3s ease-out ${index * 0.2 + (displayFilledSegments * 0.03)}s forwards`,
                        opacity: 0
                      }}
                    >
                      {'_'.repeat(emptySegments)}
                    </span>
                    <span className="cli-bar-bracket">]</span>
                    <span className="cli-bar-percentage"> {skill.level}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
