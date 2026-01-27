import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      {/* TOP FEATURES */}
      <section className="footer-features">
        <div className="feature">
          <span className="icon">📦</span>
          <h4>SHIPPING</h4>
          <p>Your order will be swiftly and safely delivered.</p>
        </div>

        <div className="feature">
          <span className="icon">🔁</span>
          <h4>EASY EXCHANGES</h4>
          <p>Easily exchange your product without any problem!</p>
        </div>

        <div className="feature">
          <span className="icon">💬</span>
          <h4>TOP-NOTCH SUPPORT</h4>
          <p>
            Questions about your order, shipping, or product?
            Our team is always here to help!
          </p>
        </div>

        <div className="feature">
          <span className="icon">🛡️</span>
          <h4>SECURE PAYMENTS</h4>
          <p>Shop with confidence using our secure payment options!</p>
        </div>
      </section>

      {/* MAIN FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          {/* LEFT */}
          <div className="footer-col">
            <h5>MAIN MENU</h5>
            <ul>
              <li>Men</li>
              <li>Women</li>
              <li>Lafattio</li>
              <li>Aspeerio</li>
              <li>New Year Sale</li>
              <li>GST Savings Sale</li>
              <li>Stores</li>
              <li>Exchange Support</li>
            </ul>

            <div className="socials">
              <span>f</span>
              <span>x</span>
              <span>📷</span>
              <span>▶</span>
              <span>in</span>
            </div>

            <div className="country">
              🇮🇳 INDIA (INR ₹)
            </div>
          </div>

          {/* CENTER */}
          <div className="footer-col">
            <h5>USEFUL LINKS</h5>
            <ul>
              <li>About Us</li>
              <li>Size Guide</li>
              <li>Shipping & Delivery</li>
              <li>Returns and Exchanges</li>
              <li>Cancellation Policy</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact Us</li>
              <li>Disclaimer</li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="footer-col newsletter">
            <h5>NEWSLETTER</h5>
            <p>
              Sign up to our newsletter to receive
              exclusive offers.
            </p>

            <input type="email" placeholder="E-mail" />
            <button>SUBSCRIBE</button>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 · EGOSS SHOES POWERED BY SHOPIFY
        </div>
      </footer>
    </>
  );
}
