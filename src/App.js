import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header/Header';
import SearchInput from './components/SearchInput/SearchInput';
import SkillRoadmap from './components/SkillRoadmap/SkillRoadmap';
import LeetcodeSection from './components/LeetcodeSection/LeetcodeSection';
import Footer from './components/Footer/Footer';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import Sidebar from './components/Sidebar/Sidebar';
import { generateSkillPath } from './services/skillPathGenerator';
import { testOpenAI } from './utils/testAI';
import { topics } from './data/topics';
import './styles/variables.css';
import './styles/globals.css';
import './App.css';

function App() {
  const [jobTitle, setJobTitle] = useState('');
  const [skills, setSkills] = useState([]);
  const [sortOrder, setSortOrder] = useState('easy-to-hard');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Sidebar states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check mobile screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Auto-close sidebar on mobile, auto-open on desktop
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize(); // Call once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Test OpenAI connection on mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const isWorking = await testOpenAI();
        console.log('OpenAI Status:', isWorking ? '✅ Working' : '❌ Not Working');
      } catch (error) {
        console.error('OpenAI Test Error:', error);
      }
    };
    testConnection();
  }, []);

  const handleSearch = useCallback(async (query) => {
    console.log('🔍 App.js handleSearch called with:', query);
    
    if (!query || query.trim().length === 0) {
      console.log('⏭️ Skipping search - empty query');
      return;
    }

    const trimmedQuery = query.trim();
    console.log('🤖 Starting AI generation for:', trimmedQuery);
    
    setIsLoading(true);
    setError(null);
    setJobTitle(trimmedQuery);
    setSkills([]);
    
    try {
      console.log('📞 Calling AI generateSkillPath...');
      const skillPath = await generateSkillPath(trimmedQuery);
      console.log('📊 Received AI skillPath:', skillPath);
      
      if (!skillPath || !Array.isArray(skillPath) || skillPath.length === 0) {
        throw new Error('AI failed to generate a valid learning path');
      }

      // All skills should be valid since they come from AI
      console.log('✅ AI generated skills:', skillPath.length);
      setSkills(skillPath);
      
    } catch (error) {
      console.error('❌ AI generation error:', error);
      setError(
        error.message.includes('OpenAI') || error.message.includes('API key') 
          ? 'AI service is not available. Please check your OpenAI API key configuration.'
          : `AI couldn't generate a learning path for "${trimmedQuery}". Please try a different job title or check your internet connection.`
      );
      setSkills([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update the handleSidebarToggle function
  const handleSidebarToggle = useCallback(() => {
    console.log('📱 Sidebar toggle clicked, current state:', isSidebarOpen);
    
    if (isMobile) {
      // Add small delay on mobile to prevent conflicts
      setTimeout(() => {
        setIsSidebarOpen(prev => {
          console.log('📱 Changing sidebar state from', prev, 'to', !prev);
          return !prev;
        });
      }, 50);
    } else {
      setIsSidebarOpen(prev => {
        console.log('📱 Changing sidebar state from', prev, 'to', !prev);
        return !prev;
      });
    }
  }, [isSidebarOpen, isMobile]);

  // Alternative: Direct setter function
  const handleSidebarClose = useCallback(() => {
    console.log('❌ Closing sidebar');
    setIsSidebarOpen(false);
  }, []);

  const handleSidebarResize = useCallback((newWidth) => {
    setSidebarWidth(Math.max(200, Math.min(400, newWidth)));
  }, []);

  const handleTopicSelect = useCallback((topic) => {
    console.log('🎯 Topic selected:', topic);
    handleSearch(topic.name);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [handleSearch, isMobile]);

  const handleClearResults = useCallback(() => {
    setSkills([]);
    setJobTitle('');
    setError(null);
  }, []);

  // FIXED: Handle body class for header hiding
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [isSidebarOpen]);

  return (
    <div className={`app ${isSidebarOpen && !isMobile ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* FIXED: Conditionally render header based on sidebar state */}
      {!isSidebarOpen && (
        <Header 
          onSidebarToggle={handleSidebarToggle}
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
        />
      )}

      <Sidebar 
        topics={topics}
        isOpen={isSidebarOpen}
        width={sidebarWidth}
        isMobile={isMobile}
        onToggle={handleSidebarToggle} // For toggle behavior
        // OR use this for explicit close:
        // onToggle={handleSidebarClose} 
        onResize={handleSidebarResize}
        onTopicSelect={handleTopicSelect}
      />
      
      <div 
        className="main-content"
        style={{
          marginLeft: !isMobile && isSidebarOpen ? `${sidebarWidth}px` : '0',
          transition: 'margin-left 0.3s ease'
        }}
      >
        <main className="main-container">
          {/* Search Section - Always visible */}
          <div className="search-section">
            <SearchInput 
              onSearch={handleSearch}
              isLoading={isLoading}
              placeholder="Try 'AI Engineer', 'Cloud Architect', or describe your dream role..."
              isSidebarOpen={isSidebarOpen}
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="loading-container">
              <LoadingSpinner message={`Generating personalized learning path for ${jobTitle}...`} />
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="error-container">
              <div className="error-message">
                <h3>🤖 AI Generation Issue</h3>
                <p>{error}</p>
                <div className="error-actions">
                  <button 
                    onClick={() => {
                      setError(null);
                      if (jobTitle) {
                        handleSearch(jobTitle);
                      }
                    }} 
                    className="retry-button"
                  >
                    🔄 Try Again
                  </button>
                  <button 
                    onClick={handleClearResults}
                    className="clear-button"
                  >
                    ✨ New Search
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {!isLoading && !error && skills.length > 0 && (
            <div className="results-container">
              <div className="results-header">
                <h2>🎯 Learning Path for: {jobTitle}</h2>
                <p>Personalized roadmap with {skills.length} essential skills</p>
                <button 
                  onClick={handleClearResults}
                  className="new-search-button"
                >
                  ✨ Start New Search
                </button>
              </div>
              
              <SkillRoadmap 
                skills={skills} 
                sortOrder={sortOrder}
                jobTitle={jobTitle}
              />
              
              <LeetcodeSection jobTitle={jobTitle} />
            </div>
          )}

          {/* Welcome State */}
          {!isLoading && !error && skills.length === 0 && !jobTitle && (
            <div className="welcome-container">
              <div className="welcome-message">
                <h2>🚀 Ready to Build Your Career Path?</h2>
                <p>Search for any job title above to get started with your personalized learning journey!</p>
                <div className="welcome-examples">
                  <h3>Popular searches:</h3>
                  <div className="example-chips">
                    {['Full Stack Developer', 'Data Scientist', 'AI Engineer', 'DevOps Engineer'].map(title => (
                      <button 
                        key={title}
                        className="example-chip"
                        onClick={() => handleSearch(title)}
                        disabled={isLoading}
                      >
                        {title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
