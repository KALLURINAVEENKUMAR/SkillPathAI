import React from 'react';
import { Monitor, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Monitor size={20} />
              </div>
              <span className="footer-logo-text">Naveenkumar Kalluri</span>
            </div>
            <p className="footer-description">
              Empowering the next generation of tech professionals with personalized 
              learning paths, comprehensive resources, and expert guidance.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Platform</h3>
            <ul className="footer-links">
              <li><a href="#">Roadmaps</a></li>
              <li><a href="#">Interview Prep</a></li>
              <li><a href="#">Practice Problems</a></li>
              <li><a href="#">Study Notes</a></li>
              <li><a href="#">Video Tutorials</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Community</h3>
            <ul className="footer-links">
              <li><a href="#">Discord Server</a></li>
              <li><a href="#">Study Groups</a></li>
              <li><a href="#">Mentorship</a></li>
              <li><a href="#">Success Stories</a></li>
              <li><a href="#">Events</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Bug Reports</a></li>
              <li><a href="#">Feature Requests</a></li>
              <li><a href="#">Status Page</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; 2025 Naveenkumar Kalluri. All rights reserved.
          </p>
          <div className="footer-links-bottom">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;