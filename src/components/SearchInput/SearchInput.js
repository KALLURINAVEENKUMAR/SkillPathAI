import React, { useState, useEffect, useCallback } from 'react';
import { X, Brain, Zap, ArrowRight } from 'lucide-react';
import { getJobRecommendations } from '../../services/skillPathGenerator';
import './SearchInput.css';

const SearchInput = ({ 
  onSearch, 
  isLoading = false,
  placeholder = "Try 'AI Engineer', 'Cloud Architect', or describe your dream role...",
  isSidebarOpen = false // Add this prop
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  const popularJobTitles = [
    "AI/ML Engineer",
    "Full Stack Developer", 
    "Data Scientist",
    "Cloud Solutions Architect",
    "DevOps Engineer",
    "Cybersecurity Analyst",
    "Product Manager",
    "UI/UX Designer"
  ];

  // Updated logic: Only show recommendations for 2+ characters
  useEffect(() => {
    const getSuggestions = async () => {
      if (query.trim().length >= 2) {
        console.log('🔍 Getting suggestions for:', query);
        try {
          // Enhanced recommendations for partial queries
          const recs = await getJobRecommendations(query.trim());
          
          // If typing "ful", suggest "Full Stack Developer" etc.
          const enhancedRecs = enhanceRecommendations(query.trim(), recs);
          
          setRecommendations(enhancedRecs);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error getting suggestions:', error);
          // Fallback to smart suggestions based on partial input
          const smartSuggestions = getSmartSuggestions(query.trim());
          setRecommendations(smartSuggestions);
          setShowSuggestions(true);
        }
      } else {
        setRecommendations([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(getSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const executeSearch = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length === 0) {
      return;
    }

    console.log('🚀 Executing search for:', searchQuery);
    setIsLocalLoading(true);
    setShowSuggestions(false); // Hide suggestions when searching
    
    try {
      await onSearch(searchQuery.trim());
    } catch (error) {
      console.error('❌ Search error:', error);
    } finally {
      setIsLocalLoading(false);
    }
  }, [onSearch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      await executeSearch(query.trim());
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // FIXED: Only set showSuggestions to true if we have 2+ characters
    if (value.trim().length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    
    // FIXED: Only show suggestions on focus if we have 2+ characters
    if (query.trim().length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    // Delay to allow clicks on suggestions
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleRecommendationClick = async (selectedTitle) => {
    console.log('🎯 Recommendation clicked:', selectedTitle);
    setQuery(selectedTitle);
    setShowSuggestions(false);
    await executeSearch(selectedTitle);
  };

  const clearQuery = () => {
    setQuery('');
    setRecommendations([]);
    setShowSuggestions(false);
  };

  const isSearching = isLoading || isLocalLoading;
  
  // FIXED: Only show suggestions if we have 2+ characters AND recommendations exist
  const shouldShowSuggestions = showSuggestions && 
                                recommendations.length > 0 && 
                                query.trim().length >= 2 && 
                                !isSearching &&
                                !isSidebarOpen; // Hide when sidebar is open

  return (
    <div className={`modern-search-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="search-header">
        <div className="search-title">
          <h1>
            <span className="gradient-text">Discover Your</span>
            <br />
            <span className="accent-text">Learning Path</span>
          </h1>
          <p className="search-subtitle">
            AI-powered career guidance tailored to your goals
          </p>
        </div>
      </div>

      {/* FIXED: Added proper mobile wrapper */}
      <div className="search-form-wrapper" style={{ position: 'relative', zIndex: 100 }}>
        <form onSubmit={handleSubmit} className="modern-search-form">
          <div className={`modern-search-wrapper ${isFocused ? 'focused' : ''} ${isSearching ? 'searching' : ''}`}>
            <div className="search-input-container">
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder={placeholder}
                className={`modern-search-input ${isSearching ? 'searching' : ''}`}
                disabled={isSearching}
                autoComplete="off"
              />
              
              {/* FIXED: Clear button only shows when NOT searching and has query */}
              {!isSearching && query && (
                <button 
                  type="button"
                  className="clear-button"
                  onClick={clearQuery}
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
              
              {/* FIXED: Centered loading spinner */}
              {isSearching && (
                <div className="search-loading-spinner">
                  <div className="spinner"></div>
                </div>
              )}
            </div>
            
            <button 
              type="submit" 
              className="ai-generate-button" 
              disabled={!query.trim() || isSearching}
            >
              <Brain size={18} className="button-icon" />
              <span className="button-text">
                {isSearching ? 'Generating...' : 'Generate Path'}
              </span>
              <Zap size={16} className="button-accent" />
            </button>
          </div>
        </form>

        {/* FIXED: Mobile-optimized suggestions dropdown */}
        {shouldShowSuggestions && (
          <div 
            className="suggestions-dropdown"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: isSidebarOpen ? -1 : 25 // Hide behind when sidebar is open
            }}
          >
            <div className="dropdown-header">
              <div className="header-content">
                <Brain size={16} className="header-icon ai" />
                <span>AI-Suggested Roles</span>
              </div>
            </div>
            
            <div className="suggestions-list">
              {recommendations.map((rec, idx) => (
                <button
                  key={`${rec}-${idx}`}
                  onClick={() => handleRecommendationClick(rec)}
                  className="suggestion-item"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                  disabled={isSearching}
                  type="button"
                >
                  <div className="suggestion-icon">🤖</div>
                  <span className="suggestion-text">{rec}</span>
                  <ArrowRight size={14} className="suggestion-arrow" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Action Chips */}
      <div className="quick-actions">
        <p className="quick-actions-label">
          <Brain size={16} className="inline-icon" />
          Try these AI-powered paths:
        </p>
        <div className="action-chips">
          {['AI/ML Engineer', 'Cloud Architect', 'Full Stack Dev', 'Data Scientist'].map((suggestion, idx) => (
            <button
              key={suggestion}
              className="action-chip"
              onClick={() => handleRecommendationClick(suggestion)}
              disabled={isSearching}
              style={{ animationDelay: `${idx * 0.1}s` }}
              type="button"
            >
              <span className="chip-emoji">🚀</span>
              <span className="chip-text">{suggestion}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Add these helper functions at the end of the file
function enhanceRecommendations(query, recommendations) {
  const enhanced = [...recommendations];
  
  // Add smart suggestions based on partial input
  const smartSuggestions = getSmartSuggestions(query);
  
  // Merge and deduplicate
  const combined = [...enhanced, ...smartSuggestions];
  const unique = [...new Set(combined)];
  
  return unique.slice(0, 6);
}

function getSmartSuggestions(query) {
  const q = query.toLowerCase();
  
  const suggestions = [];
  
  if (q.includes('ful') || q.includes('full')) {
    suggestions.push('Full Stack Developer', 'Full Stack Engineer');
  }
  if (q.includes('dat') || q.includes('data')) {
    suggestions.push('Data Scientist', 'Data Analyst', 'Data Engineer');
  }
  if (q.includes('ai') || q.includes('ml')) {
    suggestions.push('AI Engineer', 'Machine Learning Engineer', 'AI Researcher');
  }
  if (q.includes('web') || q.includes('front') || q.includes('back')) {
    suggestions.push('Web Developer', 'Frontend Developer', 'Backend Developer');
  }
  if (q.includes('dev') || q.includes('develop')) {
    suggestions.push('Software Developer', 'Mobile Developer', 'Game Developer');
  }
  if (q.includes('cloud') || q.includes('aws') || q.includes('azure')) {
    suggestions.push('Cloud Engineer', 'Cloud Architect', 'Cloud Solutions Architect');
  }
  if (q.includes('security') || q.includes('cyber')) {
    suggestions.push('Cybersecurity Analyst', 'Security Engineer', 'Penetration Tester');
  }
  
  return suggestions;
}

export default SearchInput;