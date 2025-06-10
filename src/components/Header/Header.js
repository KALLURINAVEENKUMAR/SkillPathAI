import React from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

const Header = ({ onSidebarToggle, isSidebarOpen, isMobile }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button 
            className="mobile-menu-btn"
            onClick={onSidebarToggle}
            aria-label="Toggle sidebar"
          >
            {isMobile && isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="header-title">
            <h1>SkillNav</h1>
            <span className="header-subtitle">AI-Powered Learning Paths</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="header-badge">
            <span className="badge-text">🤖 Naveenkumar Kalluri</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;