import React from 'react';
import './ProblemCard.css';

const ProblemCard = ({ problem }) => {
  return (
    <div className="leetcode-problem-card">
      <div className={`leetcode-difficulty leetcode-${(problem?.difficulty || 'easy').toLowerCase()}`}>
        {problem?.difficulty || 'Easy'}
      </div>
      
      <div className="leetcode-topic">
        {problem?.topic || 'General'}
      </div>
      
      <h3 className="leetcode-title">
        {problem?.title || 'Practice Problem'}
      </h3>
      
      <a 
        href={problem?.link || '#'} 
        target="_blank"
        rel="noopener noreferrer"
        className="leetcode-solve-button"
      >
        💻 Solve Problem
      </a>
    </div>
  );
};

export default ProblemCard;