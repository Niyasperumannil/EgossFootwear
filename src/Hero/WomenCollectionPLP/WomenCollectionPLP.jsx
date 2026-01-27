import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WomenCollectionPLP.css";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

// ✅ Updated API URL
const API_URL = "https://egoss.onrender.com/api/products";

export default function WomenCollectionPLP() {
  const [products, setProducts] = useState([]);

  // ================= FETCH WOMEN PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API_URL);

        // ✅ ONLY WOMEN CATEGORY
        const womenProducts = res.data.filter(
          (p) => p.category === "Women"
        );

        setProducts(womenProducts);
      } catch (error) {
        console.error("Failed to fetch women products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <section className="wplp">
        {/* TOP BAR */}
        <div className="wplp-top">
          <div className="wplp-view">
            <span>▦</span>
            <span>▥</span>
            <span>☰</span>
          </div>

          <p className="wplp-count">
            {products.length} PRODUCTS
          </p>

          <select className="wplp-sort">
            <option>Featured</option>
            <option>Best selling</option>
            <option>Alphabetically, A-Z</option>
            <option>Alphabetically, Z-A</option>
            <option>Price, low to high</option>
            <option>Price, high to low</option>
            <option>Date, old to new</option>
            <option>Date, new to old</option>
          </select>
        </div>

        {/* BODY */}
        <div className="wplp-body">
          {/* FILTER SIDEBAR */}
          <aside className="wplp-filters">

            <div className="filter">
              <h4>SIZE</h4>
              <ul>
                <li>34 (1)</li>
                <li>35 (35)</li>
                <li>36 (58)</li>
                <li>37 (58)</li>
                <li>38 (58)</li>
                <li>39 (58)</li>
                <li>40 (58)</li>
                <li>41 (57)</li>
                <li>42 (49)</li>
              </ul>
            </div>

            <div className="filter">
              <h4>PRICE</h4>
              <div className="price-values">
                <span>₹ 0</span>
                <span>₹ 3599</span>
              </div>
              <input type="range" />
            </div>

            <div className="filter">
              <h4>COLOR</h4>
              <div className="colors">
                <span className="c beige"></span>
                <span className="c cream"></span>
                <span className="c black"></span>
                <span className="c navy"></span>
                <span className="c blue"></span>
                <span className="c red"></span>
                <span className="c yellow"></span>
                <span className="c maroon"></span>
              </div>
            </div>

          </aside>

          {/* PRODUCTS GRID */}
          <div className="wplp-grid">
            {products.map((p) => (
              <Link
                key={p._id}
                to={`/women-product/${p._id}`}
                className="wplp-link"
              >
                <div className="wplp-card">
                  {p.stock < 10 && (
                    <span className="save">LOW STOCK</span>
                  )}

                  {/* ✅ Updated image URL */}
                  <img
                    src={`https://egoss.onrender.com${p.images[0]}`}
                    alt={p.name}
                  />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
