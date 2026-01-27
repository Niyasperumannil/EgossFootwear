import React from "react";
import "./ZeroGravityHero.css";

export default function ZeroGravityHero() {
  return (
    <section className="zg-hero">
      <div className="zg-overlay"></div>

      <div className="zg-content">
        {/* LEFT */}
        <div className="zg-left">
          <div className="zg-brand">
            <span className="zg-logo">O</span>
            <span className="zg-brand-text">Gravity</span>
          </div>

          <h1 className="zg-title">
            ZERO <span>GRAVITY</span>
          </h1>

          <ul className="zg-features">
            <li>Advanced Sole Technology</li>
            <li>Arch Support Insoles</li>
          </ul>
        </div>

        {/* CENTER SHOE IMAGE */}
        <div className="zg-center">
          <img
            src="https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16"
            alt="Zero Gravity Shoes"
          />
        </div>

        {/* RIGHT */}
        <div className="zg-right">
          <p className="zg-tagline">
            COPIED BY MANY,
            <br />
            MATCHED BY NONE
          </p>

          <ul className="zg-features right">
            <li>Ultra-Lightweight Build</li>
            <li>Premium Leather Finish</li>
          </ul>

          <button className="zg-btn">SHOP NOW</button>
        </div>
      </div>
    </section>
  );
}
