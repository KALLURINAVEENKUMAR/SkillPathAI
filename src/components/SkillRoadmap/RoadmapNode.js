import React, { useState, useEffect } from 'react';
import './RoadmapNode.css';

const RoadmapNode = ({ skill, index, isTyping, onTypingComplete }) => {
  const [typedText, setTypedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  // Safe property access with fallbacks
  const skillName = skill?.skill || 'Unknown Skill';
  const skillLevel = skill?.level || 'Beginner';
  const levelClass = `level-${skillLevel.toLowerCase()}`;
  const importance = skill?.importance || 'This skill is important for your career development.';
  const resources = skill?.resources || [];
  const course = skill?.course || '#';

  // Typewriter effect for importance text
  useEffect(() => {
    if (isTyping && importance && currentCharIndex < importance.length) {
      const timer = setTimeout(() => {
        setTypedText(prev => prev + importance[currentCharIndex]);
        setCurrentCharIndex(currentCharIndex + 1);
      }, 15);
      
      return () => clearTimeout(timer);
    } else if (isTyping && currentCharIndex >= importance.length && onTypingComplete) {
      onTypingComplete();
    }
  }, [isTyping, currentCharIndex, importance, onTypingComplete]);

  // Reset typing when skill changes
  useEffect(() => {
    setTypedText('');
    setCurrentCharIndex(0);
  }, [skill]);

  // Validate that we have a skill object
  if (!skill || typeof skill !== 'object') {
    console.warn('RoadmapNode received invalid skill:', skill);
    return null;
  }

  return (
    <div className="roadmap-node fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
      <div className="roadmap-step">{index + 1}</div>
        
        <h3 className="roadmap-skill-title">{skillName}</h3>
        
        <div className="importance-text">
          {isTyping ? (
            <>
              {typedText}
              <span className="typing-cursor"></span>
            </>
          ) : (
            importance
          )}
        </div>
        
        {resources && resources.length > 0 && (
          <div className="resources-section">
            <h4>Recommended Resources:</h4>
            <ul>
              {resources.map((resource, idx) => (
                <li key={idx}>{resource || 'Resource link'}</li>
              ))}
            </ul>
          </div>
        )}
        
        <a
          href={course}
          target="_blank"
          rel="noopener noreferrer"
          className="learn-button"
        >
          📚 Start Learning {skillName}
        </a>
    </div>
  );
};

export default RoadmapNode;