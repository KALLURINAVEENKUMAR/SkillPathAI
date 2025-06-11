import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  X,
  Search,
  // Enhanced icon imports for all topics
  Cpu,
  Network,
  Coffee,
  Shield,
  BarChart3,
  Cloud,
  Brain,
  Smartphone,
  Globe,
  Database,
  Palette,
  Settings,
  Rocket,
  Lock,
  Zap,
  Gamepad2,
  TestTube,
  GitBranch,
  Code,
  Server,
  Terminal,
  Monitor,
  HardDrive,
  Wifi,
  BookOpen,
  FileText,
  TreePine,
  Link,
  Layers,
  Target,
  Clock,
  Binary,
  Puzzle,
  Workflow,
  FlaskConical,
  Bug,
  User,
  FileCode,
  GitCommit,
  Package,
  Container,
  TrendingUp,
  Users,
  Briefcase,
  GraduationCap,
  Award
} from 'lucide-react';
import './Sidebar.css';

// FIXED: Comprehensive professional icon mapping
const iconMap = {
  // Data Structures & Algorithms
  dsa: TreePine,
  algorithms: Binary,
  datastructures: Layers,
  sorting: BarChart3,
  searching: Search,
  recursion: Workflow,
  backtracking: Target,
  dynamicprogramming: Puzzle,
  greedy: TrendingUp,
  graphs: Network,
  trees: TreePine,
  linkedlists: Link,
  complexity: Clock,
  
  // Programming Languages
  java: Coffee,
  cpp: Code,
  python: Code,
  javascript: Code,
  programming: Code,
  oop: Package,
  
  // Problem Solving Platforms
  leetcode: Target,
  hackerrank: Award,
  codeforces: Gamepad2,
  problemsolving: Puzzle,
  
  // Database & SQL
  sql: Database,
  database: Database,
  dbms: HardDrive,
  queries: Search,
  
  // System Fundamentals
  os: Monitor,
  operatingsystems: Cpu,
  processes: Settings,
  threads: Workflow,
  memory: HardDrive,
  networks: Network,
  networking: Wifi,
  tcpip: Network,
  http: Globe,
  dns: Server,
  
  // System Design
  systemdesign: Layers,
  architecture: Settings,
  scalability: TrendingUp,
  
  // Version Control
  git: GitBranch,
  github: GitCommit,
  versioncontrol: FileCode,
  
  // APIs & Web
  api: Zap,
  rest: Link,
  json: FileText,
  web: Globe,
  html: Code,
  css: Palette,
  
  // Frameworks
  react: Code,
  angular: Code,
  frontend: Palette,
  backend: Server,
  springboot: Coffee,
  nodejs: Server,
  django: Code,
  
  // DevOps & Cloud
  cloud: Cloud,
  aws: Cloud,
  gcp: Cloud,
  azure: Cloud,
  devops: Rocket,
  cicd: Workflow,
  jenkins: Settings,
  docker: Container,
  
  // Testing & Quality
  testing: TestTube,
  unittest: FlaskConical,
  debugging: Bug,
  
  // Linux & Shell
  linux: Terminal,
  shell: Terminal,
  scripting: FileCode,
  
  // Software Engineering
  software: HardDrive,
  engineering: Settings,
  agile: Users,
  sdlc: Workflow,
  
  // Projects & Career
  projects: Briefcase,
  portfolio: FileText,
  resume: User,
  linkedin: Users,
  interview: Briefcase,
  behavioral: User,
  aptitude: Brain,
  logical: Puzzle,
  
  // Security
  security: Shield,
  cybersecurity: Lock,
  
  // AI & ML
  ai: Brain,
  ml: Brain,
  
  // Mobile
  mobile: Smartphone,
  
  // Design
  design: Palette,
  
  // Gaming
  gaming: Gamepad2,
  
  // Default
  default: BookOpen
};

// Function to get icon component based on icon name
const getTopicIcon = (iconName) => {
  const IconComponent = iconMap[iconName.toLowerCase()] || iconMap.default;
  return <IconComponent size={18} />;
};

const Sidebar = ({ 
  topics = [], 
  isOpen, 
  width, 
  isMobile, 
  onToggle, 
  onResize, 
  onTopicSelect 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const searchInputRef = useRef(null);

  // FIXED: Completely disable auto-focus on mobile
  useEffect(() => {
    // Never auto-focus on mobile to prevent keyboard popup
    if (!isMobile && isOpen && searchInputRef.current) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMobile]);

  // FIXED: Better mobile body scroll prevention
  useEffect(() => {
    if (isMobile && isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Prevent body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
      document.body.classList.add('sidebar-open');
      
      return () => {
        // Restore body scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.height = '';
        document.body.style.overflow = '';
        document.body.classList.remove('sidebar-open');
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, isMobile]);

  // FIXED: Prevent immediate closing with better event handling
  const handleOverlayClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add small delay to prevent immediate closing
    setTimeout(() => {
      console.log('Overlay clicked - closing sidebar');
      onToggle(false);
    }, 100);
  }, [onToggle]);

  // FIXED: Prevent all event bubbling from sidebar
  const handleSidebarClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  // FIXED: Close handler with delay on mobile
  const handleClose = useCallback(() => {
    console.log('Close button clicked');
    if (isMobile) {
      // Small delay on mobile to prevent conflicts
      setTimeout(() => {
        onToggle(false);
      }, 50);
    } else {
      onToggle(false);
    }
  }, [onToggle, isMobile]);

  // FIXED: Search handlers that don't interfere with mobile
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSearchFocus = useCallback(() => {
    // Only set focus state on desktop
    if (!isMobile) {
      setIsSearchFocused(true);
    }
  }, [isMobile]);

  const handleSearchBlur = useCallback(() => {
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 200);
  }, []);

  // FIXED: Manual search focus for mobile (user initiated)
  const handleSearchClick = useCallback(() => {
    if (isMobile && searchInputRef.current) {
      searchInputRef.current.focus();
      setIsSearchFocused(true);
    }
  }, [isMobile]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setIsSearchFocused(false);
    
    // Blur the input on mobile to hide keyboard
    if (isMobile && searchInputRef.current) {
      searchInputRef.current.blur();
    }
  }, [isMobile]);

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return topics;
    return topics.filter(topic => 
      topic.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [topics, searchQuery]);

  // FIXED: Handle topic selection with proper mobile cleanup
  const handleTopicSelect = useCallback((topic) => {
    console.log('Topic selected:', topic.name);
    
    // Clear search and blur input on mobile
    if (isMobile) {
      setSearchQuery('');
      setIsSearchFocused(false);
      if (searchInputRef.current) {
        searchInputRef.current.blur();
      }
    }
    
    // Call the parent handler
    onTopicSelect(topic);
    
    // Close sidebar on mobile with delay
    if (isMobile) {
      setTimeout(() => {
        onToggle(false);
      }, 100);
    }
  }, [isMobile, onTopicSelect, onToggle]);

  return (
    <>
      {/* FIXED: Mobile overlay with better event handling */}
      {isMobile && isOpen && (
        <div 
          ref={overlayRef}
          className="sidebar-overlay open"
          onTouchEnd={handleOverlayClick}
          onClick={handleOverlayClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            height: '100dvh',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 9998,
            touchAction: 'none',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none'
          }}
        />
      )}
      
      {/* FIXED: Sidebar with better mobile handling */}
      <div 
        ref={sidebarRef}
        className={`sidebar ${isMobile ? 'sidebar-mobile' : ''} ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}
        onTouchStart={handleSidebarClick}
        onTouchEnd={handleSidebarClick}
        onClick={handleSidebarClick}
        style={{ 
          width: isMobile ? '85vw' : `${width}px`, // Slightly smaller on mobile
          maxWidth: isMobile ? '320px' : 'none',
          zIndex: isMobile ? 9999 : 1000
        }}
      >
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-title">
            <h2>SkillNav</h2>
            <span className="sidebar-subtitle">AI Powered</span>
          </div>
          <button 
            className="sidebar-close-btn" 
            onClick={handleClose}
            onTouchEnd={handleClose}
            type="button"
            aria-label="Close sidebar"
          >
            <ChevronLeft size={isMobile ? 24 : 20} />
          </button>
        </div>

        {/* FIXED: Search section with mobile optimization */}
        <div className="sidebar-search">
          <div className={`search-input-wrapper ${isSearchFocused ? 'focused' : ''}`}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder={isMobile ? "Tap to search..." : "Search topics..."}
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              onClick={handleSearchClick}
              className="sidebar-search-input"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              // FIXED: Prevent auto-zoom on iOS
              style={{ fontSize: isMobile ? '16px' : '14px' }}
              // FIXED: Only enable input when user explicitly wants to search
              readOnly={isMobile && !isSearchFocused}
            />
            
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={handleClearSearch}
                onTouchEnd={handleClearSearch}
                type="button"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
          
          {searchQuery && (
            <div className="search-results-info">
              Found {filteredTopics.length} topic{filteredTopics.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        <div className="sidebar-content">
          <div className="topics-section">
            <h3 className="section-title">
              {searchQuery ? 'Search Results' : 'Computer Science Topics'}
            </h3>
            <div className="topics-list">
              {filteredTopics.length > 0 ? (
                filteredTopics.map((topic, index) => (
                  <button
                    key={`${topic.name}-${index}`}
                    className="topic-item"
                    onClick={() => handleTopicSelect(topic)}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTopicSelect(topic);
                    }}
                    style={{ 
                      '--topic-color': topic.color,
                      animationDelay: `${index * 0.05}s`
                    }}
                    aria-label={`Select ${topic.name} topic`}
                  >
                    <div className="topic-icon" style={{ backgroundColor: topic.color }}>
                      {getTopicIcon(topic.icon)}
                    </div>
                    <span className="topic-name">{topic.name}</span>
                    <ChevronRight size={isMobile ? 20 : 16} className="topic-arrow" />
                  </button>
                ))
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">
                    <Search size={32} />
                  </div>
                  <div className="no-results-text">
                    <p>No topics found for "{searchQuery}"</p>
                    <button 
                      className="clear-search-btn"
                      onClick={handleClearSearch}
                    >
                      Clear search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="sidebar-footer">
            <div className="footer-stats">
              <div className="stat-item">
                <span className="stat-number">{filteredTopics.length}</span>
                <span className="stat-label">{searchQuery ? 'Found' : 'Topics'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{topics.length}</span>
                <span className="stat-label">Total</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;