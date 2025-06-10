import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = "Generating your personalized learning path with AI..." }) => {
  return (
    <div className="loading-spinner-container">
      <div className="ai-loading-animation">
        <div className="ai-brain">🧠</div>
        <div className="ai-sparks">✨</div>
      </div>
      <h3>AI is crafting your path...</h3>
      <p>{message}</p>
      <div className="loading-steps">
        <div className="step">🤖 Analyzing job requirements</div>
        <div className="step">📚 Curating learning resources</div>
        <div className="step">🎯 Ordering skills by priority</div>
        <div className="step">⚡ Generating personalized content</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;