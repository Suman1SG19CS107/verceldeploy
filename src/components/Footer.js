import React from 'react';
import { FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <p className="footer__name">Ayush </p>
          <a href="https://github.com/Ayush-kumar-123" target="_blank" rel="noopener noreferrer" className="footer__link">
            <FaGithub className="footer__icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
