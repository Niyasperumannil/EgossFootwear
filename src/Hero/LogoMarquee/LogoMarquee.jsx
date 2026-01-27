import React from "react";
import "./LogoMarquee.css";

export default function LogoMarquee() {
  const logos = [
    "https://egoss.in/cdn/shop/files/logo-regal_medium.png?v=1733927027",
    "https://egoss.in/cdn/shop/files/logo-regal_medium.png?v=1733927027",
    "https://egoss.in/cdn/shop/files/centro_24ff2692-3678-462d-bae4-0870f273f86c_medium.jpg?v=1733927144",
    "https://egoss.in/cdn/shop/files/jack_jill_medium.jpg?v=1733927536",
    "https://egoss.in/cdn/shop/files/suvidha_medium.jpg?v=1733927322",
    "https://egoss.in/cdn/shop/files/heels_medium.jpg?v=1733928344",
    "https://egoss.in/cdn/shop/files/mochi_medium.webp?v=1733926808",
    "https://egoss.in/cdn/shop/files/suvidha_medium.jpg?v=1733927322",
    "https://egoss.in/cdn/shop/files/boot_medium.png?v=1733928430",
    "https://egoss.in/cdn/shop/files/suvidha_medium.jpg?v=1733927322",
    "https://egoss.in/cdn/shop/files/logo-regal_medium.png?v=1733927027"
  ];

  return (
    <section className="logo-marquee-section">
      <h2 className="logo-marquee-title">
        PROUDLY INDIAN · RETAILING AT 2000+ STORES PAN-INDIA
      </h2>

      <div className="logo-marquee-wrapper">
        <div className="logo-marquee">
          {logos.concat(logos).map((src, index) => (
            <div className="logo-marquee-item" key={index}>
              <img src={src} alt={`logo-${index}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
