import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CollectionPLP.css";
import Navbar from "../Navbar";

// ✅ Updated API URL
const API_URL = "https://egoss.onrender.com/api/products";

export default function CollectionPLP() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // FILTER STATES
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [price, setPrice] = useState(13999);
  const [sort, setSort] = useState("Featured");

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
        setFiltered(menProducts);
      } catch (error) {
        console.error("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  // ================= APPLY FILTERS =================
  useEffect(() => {
    let temp = [...products];

    // SIZE FILTER
    if (selectedSize) {
      temp = temp.filter((p) =>
        p.sizes?.includes(selectedSize)
      );
    }

    // COLOR FILTER
    if (selectedColor) {
      temp = temp.filter(
        (p) => p.color === selectedColor
      );
    }

    // PRICE FILTER
    temp = temp.filter((p) => p.price <= price);

    // SORT
    if (sort === "Price, low to high") {
      temp.sort((a, b) => a.price - b.price);
    }
    if (sort === "Price, high to low") {
      temp.sort((a, b) => b.price - a.price);
    }
    if (sort === "Alphabetically, A-Z") {
      temp.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "Alphabetically, Z-A") {
      temp.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFiltered(temp);
  }, [products, selectedSize, selectedColor, price, sort]);

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
            {filtered.length} PRODUCTS
          </p>

          <select
            className="plp-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
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
            {/* <div className="filter-block">
              <h4>SIZE</h4>
              <ul>
                {[5,6,7,8,9,10,11,12,13,14,15,16].map((s) => (
                  <li
                    key={s}
                    onClick={() =>
                      setSelectedSize(
                        selectedSize === s ? null : s
                      )
                    }
                    style={{
                      cursor: "pointer",
                      fontWeight:
                        selectedSize === s ? "700" : "400",
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div> */}

            <div className="filter-block">
              <h4>PRICE</h4>
              <div className="price-range">
                <span>₹ 0</span>
                <span>₹ {price}</span>
              </div>
              <input
                type="range"
                min="0"
                max="13999"
                value={price}
                onChange={(e) =>
                  setPrice(Number(e.target.value))
                }
              />
            </div>

            <div className="filter-block">
              <h4>COLOR</h4>
              <div className="color-grid">
                {["white","black","blue","red","cream","olive"].map(
                  (c) => (
                    <span
                      key={c}
                      className={`c ${c}`}
                      onClick={() =>
                        setSelectedColor(
                          selectedColor === c ? null : c
                        )
                      }
                      style={{
                        outline:
                          selectedColor === c
                            ? "2px solid #000"
                            : "none",
                        cursor: "pointer",
                      }}
                    ></span>
                  )
                )}
              </div>
            </div>
          </aside>

          {/* PRODUCTS */}
          <div className="plp-grid">
            {filtered.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p._id}`}
                className="plp-link"
              >
                <div className="plp-card">
                  {p.stock < 10 && (
                    <span className="save">
                      LOW STOCK
                    </span>
                  )}

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
