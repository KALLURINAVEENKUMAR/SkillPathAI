import React from 'react';
import { leetcodeProblems } from '../../data/leetcodeProblems';
import ProblemCard from './ProblemCard';
import './LeetcodeSection.css';

const LeetcodeSection = ({ sortOrder }) => {
  const getSortedLeetcodeProblems = () => {
    const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
    
    return [...leetcodeProblems].sort((a, b) => {
      const diffA = difficultyOrder[a.difficulty] || 2;
      const diffB = difficultyOrder[b.difficulty] || 2;
      
      return sortOrder === 'easy-to-hard' ? diffA - diffB : diffB - diffA;
    });
  };

  return (
    <div className="leetcode-section">
      <h2>🧠 LeetCode Interview Must-Do Problems</h2>
      <p>Master these handpicked LeetCode problems frequently asked in technical interviews</p>
      <div className="leetcode-grid">
        {getSortedLeetcodeProblems().map(problem => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
    </div>
  );
};

export default LeetcodeSection;