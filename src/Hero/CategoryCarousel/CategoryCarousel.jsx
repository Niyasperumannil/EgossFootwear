import React from "react";
import "./CategoryCarousel.css";

const categories = [
  {
    label: "Zero Gravity",
    img: "https://cdn.shopify.com/s/files/1/0578/1055/0955/files/whatmore_f4fb6197-1b25-41ef-bc7a-77634a7d97e1.webp?width=400&height=400",
  },
  {
    label: "Pashmina Leather",
    img: "https://cdn.shopify.com/s/files/1/0578/1055/0955/files/whatmore_37753fe3-90ac-40e2-aa68-56b2af9081bf.webp?width=400&height=400",
  },
  {
    label: "GRWM",
    img: "https://cdn.shopify.com/s/files/1/0578/1055/0955/files/whatmore_37753fe3-90ac-40e2-aa68-56b2af9081bf.webp?width=400&height=400",
  },
  {
    label: "Luxury Edit",
    img: "https://cdn.shopify.com/s/files/1/0578/1055/0955/files/whatmore_37753fe3-90ac-40e2-aa68-56b2af9081bf.webp?width=400&height=400",
  },
  {
    label: "Lafattio",
    img: "https://cdn.shopify.com/s/files/1/0578/1055/0955/files/whatmore_37753fe3-90ac-40e2-aa68-56b2af9081bf.webp?width=400&height=400",
  },
  {
    label: "Egoss Women",
    img: "https://cdn.shopify.com/s/files/1/0578/1055/0955/files/whatmore_37753fe3-90ac-40e2-aa68-56b2af9081bf.webp?width=400&height=400",
  },
  {
    label: "Ethnic",
    img: "https://cdn.shopify.com/s/files/1/0578/1055/0955/files/whatmore_37753fe3-90ac-40e2-aa68-56b2af9081bf.webp?width=400&height=400",
  },
  {
    label: "Boots",
    img: "https://cdn.shopify.com/s/files/1/0578/1055/0955/files/whatmore_e2965b49-ebf2-4365-9bf4-c1f1f3829ff6.webp?width=400&height=400",
  },
];

export default function CategoryCarousel() {
  return (
    <div className="carousel-container">
      <div className="carousel-scroll">
        {categories.map((cat, idx) => (
          <div key={idx} className="carousel-item">
            <div className="circle-image">
              <img src={cat.img} alt={cat.label} />
            </div>
            <span className="carousel-label">{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
