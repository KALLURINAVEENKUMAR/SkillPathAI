import React, { useState, useEffect } from 'react';
import RoadmapNode from './RoadmapNode';
import './SkillRoadmap.css';
import { ExternalLink, Clock, Star, BookOpen, Code, Target, CheckCircle, ArrowRight } from 'lucide-react';

const SkillRoadmap = ({ skills = [] }) => {
  const [visibleSkills, setVisibleSkills] = useState([]);
  const [typingIndex, setTypingIndex] = useState(-1);

  console.log('🗺️ SkillRoadmap received skills:', skills);

  // Filter out any invalid skills and log what we're filtering
  const validSkills = skills.filter((skill, index) => {
    const isValid = skill && 
                   typeof skill === 'object' && 
                   skill.skill && 
                   typeof skill.skill === 'string' && 
                   skill.skill.trim().length > 0;
    
    if (!isValid) {
      console.warn(`⚠️ Filtering out invalid skill at index ${index}:`, skill);
    }
    
    return isValid;
  });

  console.log('✅ Valid skills after filtering:', validSkills);

  // Staggered animation effect for roadmap skills
  useEffect(() => {
    if (validSkills && validSkills.length > 0) {
      setVisibleSkills([]);
      setTypingIndex(-1);
      
      let index = 0;
      const interval = setInterval(() => {
        if (index < validSkills.length) {
          setVisibleSkills(prev => [...prev, validSkills[index]]);
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => setTypingIndex(0), 500);
        }
      }, 600);
      
      return () => clearInterval(interval);
    } else {
      setVisibleSkills([]);
      setTypingIndex(-1);
    }
  }, [validSkills]);

  // Handle empty or invalid skills
  if (!validSkills || validSkills.length === 0) {
    return (
      <div className="skill-roadmap-empty">
        <div className="empty-state">
          <Target size={48} className="empty-icon" />
          <h3>No Learning Path Available</h3>
          <p>We couldn't generate a learning path for this role. Please try a different job title.</p>
        </div>
      </div>
    );
  }

  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return '#4CAF50';
      case 'intermediate':
        return '#FF9800';
      case 'advanced':
        return '#F44336';
      default:
        return '#6366f1';
    }
  };

  const getLevelIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return <Star size={16} />;
      case 'intermediate':
        return <BookOpen size={16} />;
      case 'advanced':
        return <Code size={16} />;
      default:
        return <Target size={16} />;
    }
  };

  return (
    <div className="skill-roadmap">
      <div className="roadmap-header">
        <h2>Your Personalized Learning Path</h2>
        <div className="ai-badge">
          <span className="ai-icon">🤖</span>
          AI Generated
        </div>
      </div>
      
      <div className="roadmap-disclaimer">
        <span className="disclaimer-icon">🤖</span>
        This roadmap was dynamically generated using AI based on your job title. The courses are curated suggestions - verify links before starting.
      </div>

      <div className="skills-timeline">
        {validSkills.map((skill, index) => {
          // Ensure we have all required fields with defaults
          const skillData = {
            skill: skill.skill || `Skill ${index + 1}`,
            level: skill.level || 'Beginner',
            importance: skill.importance || 'This skill is important for your career development.',
            course: skill.course || '#',
            timeToComplete: skill.timeToComplete || '3-4 weeks',
            resources: Array.isArray(skill.resources) ? skill.resources : [],
            projects: Array.isArray(skill.projects) ? skill.projects : []
          };

          return (
            <div key={index} className="skill-step">
              <div className="step-connector">
                <div className="step-number">{index + 1}</div>
                {index < validSkills.length - 1 && <div className="connector-line"></div>}
              </div>
              
              <div className="skill-content">
                <div className="skill-card">
                  <div className="skill-header">
                    <h3 className="skill-title">{skillData.skill}</h3>
                    <div className="skill-meta">
                      <span 
                        className="skill-level"
                        style={{ 
                          backgroundColor: getLevelColor(skillData.level),
                          color: 'white'
                        }}
                      >
                        {getLevelIcon(skillData.level)}
                        {skillData.level}
                      </span>
                      <span className="skill-duration">
                        <Clock size={14} />
                        {skillData.timeToComplete}
                      </span>
                    </div>
                  </div>

                  <div className="skill-body">
                    <p className="skill-importance">{skillData.importance}</p>
                    
                    {skillData.resources.length > 0 && (
                      <div className="skill-resources">
                        <h4>📚 Resources</h4>
                        <ul>
                          {skillData.resources.slice(0, 3).map((resource, idx) => (
                            <li key={idx}>
                              <CheckCircle size={12} />
                              {resource}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {skillData.projects.length > 0 && (
                      <div className="skill-projects">
                        <h4>🛠️ Practice Projects</h4>
                        <ul>
                          {skillData.projects.slice(0, 2).map((project, idx) => (
                            <li key={idx}>
                              <ArrowRight size={12} />
                              {project}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="skill-footer">
                    {skillData.course && skillData.course !== '#' ? (
                      <a 
                        href={skillData.course}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="course-link"
                      >
                        <ExternalLink size={16} />
                        Start Learning
                      </a>
                    ) : (
                      <button className="course-link disabled" disabled>
                        <BookOpen size={16} />
                        Course Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="roadmap-footer">
        <div className="ai-disclaimer">
          <strong>AI-Generated Content:</strong> This learning path was created using artificial intelligence. 
          While we strive for accuracy, please verify course links and content before starting your journey.
        </div>
      </div>
    </div>
  );
};

export default SkillRoadmap;