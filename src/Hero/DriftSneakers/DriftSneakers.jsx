import React from "react";
import { useNavigate } from "react-router-dom";
import "./DriftSneakers.css";

const products = [
  {
    id: 1,
    img: "https://egoss.in/cdn/shop/files/DSC_0668.jpg?v=1766499344&width=500",
    color: "brown",
    target: "Men",
  },
  {
    id: 2,
    img: "https://egoss.in/cdn/shop/files/RUS-51_BROWN.jpg?v=1764231631&width=800",
    color: "black",
    target: "Women",
  },
  {
    id: 3,
    img: "https://egoss.in/cdn/shop/files/PLG_5613.jpg?v=1758116179&width=800",
    color: "grey",
    target: "Men",
  },
  {
    id: 4,
    img: "https://egoss.in/cdn/shop/files/DSC_2464_3.jpg?v=1763622983&width=800",
    color: "tan",
    target: "Women",
  },
];

export default function DriftSneakers() {
  const navigate = useNavigate();

  const handleNavigation = (target) => {
    const token = localStorage.getItem("token");

    // ❌ NOT LOGGED IN → LOGIN PAGE
    if (!token) {
      navigate("/Login");
      return;
    }

    // ✅ LOGGED IN → TARGET PAGE
    if (target === "Men") {
      navigate("/Men");
    } else {
      navigate("/Women");
    }
  };

  return (
    <section className="drift-section">
      <p className="drift-subtitle">EVERYDAY SNEAKERS REDEFINED</p>
      <h2 className="drift-title">DRIFT LEATHER SNEAKERS</h2>

      <div className="drift-grid">
        {products.map((item) => (
          <div
            className="drift-card"
            key={item.id}
            onClick={() => handleNavigation(item.target)}
            style={{ cursor: "pointer" }}
          >
            <span className="sale-badge">ON SALE</span>

            <img src={item.img} alt="Drift Sneakers" />

            <p className="product-name">
              DRIFT LACE-UP SNEAKERS BY ASPEERIO
            </p>

            <p className="price">
              FROM <span className="new">₹4,999</span>
              <span className="old">₹9,999</span>
            </p>

            <span className={`color-dot ${item.color}`}></span>
          </div>
        ))}
      </div>

      <button
        className="view-all"
        onClick={() => handleNavigation("Men")}
      >
        VIEW ALL
      </button>
    </section>
  );
}
