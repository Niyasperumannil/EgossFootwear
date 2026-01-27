import React from "react";
import "./WatchAndBuy.css";

const videos = [
  {
    id: 1,
    src: "https://cdn.shopify.com/s/files/1/0578/1055/0955/files/whatmore_tn_47df0d2a-34d9-4ca6-a524-56664cf77eae.mp4?v=1759562074",
    title: "Egoss Gold Zero Gravity Loafers By...",
    price: "₹5,499",
  },
  {
    id: 2,
    src: "https://cdn.shopify.com/s/files/1/0578/1055/0955/files/whatmore_tn_4d1cd3b3-8bbd-4cb6-bc12-c22355efc247.mp4?v=1765959538",
    title: "Zero Gravity 2.0 Boots By Aspererio",
    price: "₹5,499",
    old: "₹10,999",
    off: "50% off",
  },
  {
    id: 3,
    src: "https://cdn.shopify.com/s/files/1/0578/1055/0955/files/whatmore_tn_219a938b-2df8-45a8-bd6b-5149d67f5b7c.mp4?v=1762008968",
    title: "Zero Gravity 2.0 Boots By Aspererio",
    price: "₹5,499",
    old: "₹10,999",
    off: "50% off",
  },
  {
    id: 4,
    src: "https://cdn.shopify.com/s/files/1/0578/1055/0955/files/whatmore_tn_cadad69b-b8a2-45cf-8f71-648360b50344.mp4?v=1765959525",
    title: "Egoss Platinum Boots For Men",
    price: "₹5,999",
  },
  {
    id: 5,
    src: "https://cdn.shopify.com/s/files/1/0578/1055/0955/files/whatmore_tn_3a770ad7-5df6-44e8-a8ab-1cdebea35a63.mp4?v=1759562071",
    title: "Egoss Platinum Party Loafers For Men",
    price: "₹5,499",
  },
  {
    id: 6,
    src: "https://cdn.shopify.com/s/files/1/0578/1055/0955/files/whatmore_tn_3f4acbe8-0de4-4f2b-b9b0-a1dee150d32d.mp4?v=1748615082",
    title: "Classic Buckled Loafers By Lafatti",
    price: "₹7,999",
  },
];

export default function WatchAndBuy() {
  return (
    <section className="watch-section">
      <h2 className="watch-title">Watch and Buy</h2>

      <div className="watch-row">
        {videos.map((item) => (
          <div className="watch-card" key={item.id}>
            <div className="video-wrapper">
              <video
                src={item.src}
                muted
                loop
                playsInline
                preload="metadata"
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => e.target.pause()}
              />
            </div>

            <p className="product-name">{item.title}</p>

            <p className="price-row">
              <span className="price">{item.price}</span>
              {item.old && <span className="old">{item.old}</span>}
            </p>

            {item.off && <span className="offer">{item.off}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
