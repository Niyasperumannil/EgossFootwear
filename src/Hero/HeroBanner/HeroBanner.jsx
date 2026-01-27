import React, { useRef, useState } from "react";
import "./HeroBanner.css";

export default function HeroBanner() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <section className="hero">
      {/* BACKGROUND VIDEO */}
      <video
        className="hero__video"
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://egoss.in/cdn/shop/videos/c/vp/106e709d4ec8412d8e2e4be7ea1df956/106e709d4ec8412d8e2e4be7ea1df956.HD-1080p-7.2Mbps-31834038.mp4?v=0"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* OVERLAY */}
      <div className="hero__overlay"></div>

      {/* CONTENT */}
      <div className="hero__content">
        <h1 className="hero__title">WELCOME TO EGOSS</h1>

        <button className="hero__btn">SHOP NOW</button>

        <div className="hero__sound" onClick={toggleSound}>
          <svg
            className={`hero__sound-icon ${muted ? "muted" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 9v6h4l5 5V4L9 9H5z"
              stroke="#ffffff"
              strokeWidth="2"
            />
            {!muted && (
              <path
                d="M19 8c0 1.66-1.34 3-3 3"
                stroke="#ffffff"
                strokeWidth="2"
              />
            )}
          </svg>
        </div>
      </div>
    </section>
  );
}
