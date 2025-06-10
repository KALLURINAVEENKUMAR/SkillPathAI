import React, { useState } from 'react';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    issue: ''
  });
  const [contactStatus, setContactStatus] = useState('');

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('sending');

    try {
      // Replace with your email sending logic
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate email sending

      setContactStatus('success');
      setContactForm({ name: '', email: '', issue: '' });
      setTimeout(() => {
        onClose();
        setContactStatus('');
      }, 2000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setContactStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Report an Issue</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleContactSubmit} className="contact-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={contactForm.name}
              onChange={handleContactChange}
              required
              placeholder="Your name"
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={contactForm.email}
              onChange={handleContactChange}
              required
              placeholder="your.email@example.com"
            />
          </div>
          
          <div className="form-group">
            <label>Issue Description</label>
            <textarea
              name="issue"
              value={contactForm.issue}
              onChange={handleContactChange}
              required
              placeholder="Please describe the issue you're experiencing..."
              rows="4"
            />
          </div>
          
          <button type="submit" className="submit-button" disabled={contactStatus === 'sending'}>
            {contactStatus === 'sending' ? 'Sending...' : 'Send Report'}
          </button>
          
          {contactStatus === 'success' && (
            <div className="status-message success">
              ✅ Thank you! Your report has been sent successfully.
            </div>
          )}
          
          {contactStatus === 'error' && (
            <div className="status-message error">
              ❌ Failed to send report. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactModal;