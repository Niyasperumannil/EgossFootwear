import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CollectionPLP.css";
import Navbar from "../Navbar";

// ✅ Updated API URL
const API_URL = "https://egoss.onrender.com/api/products";

export default function CollectionPLP() {
  const [products, setProducts] = useState([]);

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API_URL);

        // ✅ ONLY MEN CATEGORY
        const menProducts = res.data.filter(
          (p) => p.category === "Men"
        );

        setProducts(menProducts);
      } catch (error) {
        console.error("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <section className="plp">
        {/* TOP BAR */}
        <div className="plp-top">
          <div className="plp-views">
            <span>▦</span>
            <span>▥</span>
            <span>☰</span>
          </div>

          <p className="plp-count">
            {products.length} PRODUCTS
          </p>

          <select className="plp-sort">
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
        <div className="plp-body">
          {/* FILTERS */}
          <aside className="plp-filters">
            <div className="filter-block">
              <h4>SIZE</h4>
              <ul>
                <li>5 (17)</li>
                <li>6 (108)</li>
                <li>7 (112)</li>
                <li>8 (113)</li>
                <li>9 (114)</li>
                <li>10 (112)</li>
                <li>11 (110)</li>
                <li>12 (28)</li>
                <li>13 (29)</li>
                <li>14 (27)</li>
                <li>15 (27)</li>
                <li>16 (27)</li>
              </ul>
            </div>

            <div className="filter-block">
              <h4>PRICE</h4>
              <div className="price-range">
                <span>₹ 0</span>
                <span>₹ 13999</span>
              </div>
              <input type="range" />
            </div>

            <div className="filter-block">
              <h4>COLOR</h4>
              <div className="color-grid">
                <span className="c white"></span>
                <span className="c black"></span>
                <span className="c blue"></span>
                <span className="c red"></span>
                <span className="c cream"></span>
                <span className="c olive"></span>
              </div>
            </div>
          </aside>

          {/* PRODUCTS */}
          <div className="plp-grid">
            {products.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p._id}`}
                className="plp-link"
              >
                <div className="plp-card">
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
