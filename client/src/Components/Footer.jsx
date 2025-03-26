import React from "react";
import "../Styles/Footer.css";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <h3>Simplify Your Finances, Amplify Your Life</h3>
        <p>
          iFinance provides comprehensive expense management solutions, simplifying tracking and enhancing financial efficiency.
        </p>
        <div className="footer-social">
          <SocialIcon url="https://twitter.com" target="_blank" />
          <SocialIcon url="https://instagram.com" target="_blank"/>
          <SocialIcon url="https://linkedin.com" target="_blank"/>
          <SocialIcon url="https://facebook.com" target="_blank"/>
        </div>
      </div>

      <div className="footer-column">
        <h3>Quick Links</h3>
        <a href="/">Home</a>
        <br />
        <a href="/aboutus">About</a>
        <br />
        <a href="/friends">Friends</a>
      </div>

      <div className="footer-column">
        <h3>Contact Us</h3>
        <p>+1 (123) 456-7890</p>
        <p>info@ifinance.com</p>
        <p>Pune, Maharashtra 411001</p>
      </div>

      <div className="footer-bottom">
        © 2024 iFinance. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
