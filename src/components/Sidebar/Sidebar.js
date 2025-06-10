import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  X,
  Trash2,
  GripVertical,
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
  Search,
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

const Sidebar = ({ 
  topics = [], 
  isOpen, 
  width, 
  isMobile, 
  onToggle, 
  onResize, 
  onTopicSelect 
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Enhanced topic filtering with more robust search
  const filteredTopics = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return topics;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return topics.filter(topic => {
      const name = topic.name?.toLowerCase() || '';
      const description = topic.description?.toLowerCase() || '';
      
      return name.includes(query) || 
             description.includes(query) ||
             name.split(' ').some(word => word.startsWith(query));
    });
  }, [topics, searchQuery]);

  // Enhanced body scroll prevention for mobile
  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        // Store current scroll position
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.classList.add('sidebar-open');
      } else {
        // Restore scroll position
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.classList.remove('sidebar-open');
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('sidebar-open');
    };
  }, [isOpen, isMobile]);

  // Add this useEffect to manage body scroll
  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        document.body.classList.add('sidebar-open');
      } else {
        document.body.classList.remove('sidebar-open');
      }
      
      // Cleanup on unmount
      return () => {
        document.body.classList.remove('sidebar-open');
      };
    }
  }, [isOpen, isMobile]);

  const handleMouseDown = useCallback((e) => {
    if (isMobile) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    
    const startX = e.clientX;
    const startWidth = width;
    
    document.body.classList.add('resizing-cursor');
    
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newWidth = startWidth + deltaX;
      const constrainedWidth = Math.max(200, Math.min(500, newWidth));
      onResize(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.classList.remove('resizing-cursor');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [isMobile, width, onResize]);

  const handleTopicClick = useCallback((topic) => {
    console.log('Topic clicked:', topic);
    onTopicSelect(topic);
    
    // Close sidebar on mobile after selection
    if (isMobile) {
      onToggle();
    }
  }, [onTopicSelect, isMobile, onToggle]);

  // FIXED: Enhanced overlay click handling to prevent search area clicks from closing sidebar
  const handleOverlayClick = useCallback((e) => {
    // Only close if clicking directly on overlay, not its children
    if (e.target === overlayRef.current) {
      onToggle();
    }
  }, [onToggle]);

  // FIXED: Prevent sidebar content clicks from bubbling to overlay
  const handleSidebarClick = useCallback((e) => {
    // Stop propagation to prevent overlay click
    e.stopPropagation();
  }, []);

  // Enhanced search handling with event prevention
  const handleSearchChange = useCallback((e) => {
    // FIXED: Stop event propagation to prevent sidebar closing
    e.stopPropagation();
    const value = e.target.value;
    console.log('Search query changed:', value);
    setSearchQuery(value);
  }, []);

  const handleSearchFocus = useCallback((e) => {
    // FIXED: Prevent focus event from bubbling
    e.stopPropagation();
    console.log('Search input focused');
    setIsSearchFocused(true);
  }, []);

  const handleSearchBlur = useCallback((e) => {
    // FIXED: Prevent blur event from bubbling
    e.stopPropagation();
    console.log('Search input blurred');
    setIsSearchFocused(false);
  }, []);

  const handleClearSearch = useCallback((e) => {
    // FIXED: Prevent clear button click from bubbling
    e.stopPropagation();
    console.log('Clearing search');
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // FIXED: Handle search wrapper clicks to prevent propagation
  const handleSearchWrapperClick = useCallback((e) => {
    e.stopPropagation();
    // Focus the input when clicking anywhere in the search area
    if (searchInputRef.current && e.target !== searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Focus search when sidebar opens on mobile
  useEffect(() => {
    if (isMobile && isOpen && searchInputRef.current) {
      // Small delay to ensure sidebar is fully rendered
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    }
  }, [isMobile, isOpen]);

  // FIXED: Professional icon component renderer with comprehensive mapping
  const getTopicIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || iconMap.default;
    return <IconComponent size={isMobile ? 22 : 20} />;
  };

  useEffect(() => {
    if (sidebarRef.current) {
      if (isResizing) {
        sidebarRef.current.classList.add('resizing');
      } else {
        sidebarRef.current.classList.remove('resizing');
      }
    }
  }, [isResizing]);

  // Enhanced overlay animation
  useEffect(() => {
    if (overlayRef.current) {
      if (isOpen) {
        overlayRef.current.classList.add('show');
      } else {
        overlayRef.current.classList.remove('show');
      }
    }
  }, [isOpen]);

  // Fix the handleClose function
  const handleClose = useCallback(() => {
    console.log('🔴 Sidebar close button clicked');
    onToggle(false); // Explicitly pass false to close
  }, [onToggle]);

  // Alternative: if onToggle is a toggle function, use this instead
  const handleCloseToggle = useCallback(() => {
    console.log('🔴 Sidebar toggle close clicked');
    onToggle(); // Call toggle function
  }, [onToggle]);

  // Using the handleOverlayClick already defined with useCallback above

  if (!isOpen && !isMobile) {
    return (
      <div className="sidebar-collapsed">
        <button className="sidebar-toggle-btn" onClick={onToggle}>
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }

  return (
    <>
      {isMobile && isOpen && (
        <div 
          ref={overlayRef}
          className="sidebar-overlay" 
          onClick={handleOverlayClick}
        />
      )}
      
      <div 
        ref={sidebarRef}
        className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'} ${isMobile ? 'sidebar-mobile' : ''}`}
        style={{ 
          width: isMobile ? '300px' : `${width}px`,
        }}
        onClick={handleSidebarClick}
      >
        <div className="sidebar-header">
          <div className="sidebar-title">
            <h2>SkillNav</h2>
            <span className="sidebar-subtitle">AI Powered by Naveenkumar Kalluri</span>
            <h6></h6>
          </div>
          <button 
            className="sidebar-close-btn" 
            onClick={handleClose}
            onTouchStart={(e) => e.stopPropagation()}
            aria-label="Close sidebar"
            type="button"
          >
            {/* FIXED: Remove X icon, use ChevronLeft for all screen sizes */}
            <ChevronLeft size={isMobile ? 24 : 20} />
          </button>
        </div>

        {/* Search section */}
        <div className="sidebar-search" onClick={handleSearchWrapperClick}>
          <div className={`search-input-wrapper ${isSearchFocused ? 'focused' : ''}`}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              onClick={handleSearchChange}
              onTouchStart={(e) => e.stopPropagation()}
              className="sidebar-search-input"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              inputMode="text"
              enterKeyHint="search"
            />
            
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={handleClearSearch}
                onTouchStart={(e) => e.stopPropagation()}
                aria-label="Clear search"
                type="button"
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
                    onClick={() => handleTopicClick(topic)}
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

          {/* Keep your existing footer */}
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

        {!isMobile && (
          <div 
            className={`sidebar-resizer ${isResizing ? 'resizing' : ''}`}
            onMouseDown={handleMouseDown}
            aria-label="Resize sidebar"
          >
            <GripVertical size={16} />
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;