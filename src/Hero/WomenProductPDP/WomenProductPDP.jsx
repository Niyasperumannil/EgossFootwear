import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./WomenProductPDP.css";
import Navbar from "../Navbar";
import CartModal from "../CartModal/CartModal"; // ✅ ADD

// ✅ Updated API URL
const API_URL = "https://egoss.onrender.com/api/products";

const WomenProductPDP = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const [cartOpen, setCartOpen] = useState(false); // ✅ ADD
  const [cartItem, setCartItem] = useState(null); // ✅ ADD

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(API_URL);
        const found = res.data.find((p) => p._id === id);

        if (!found) return;

        setProduct(found);
        setActiveImg(found.images?.[0]);
      } catch (error) {
        console.error("Product fetch failed");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return null;

  return (
    <>
      <Navbar />

      <section className="women-product-page">
        <div className="women-product-container">

          {/* IMAGE */}
          <div className="women-product-image">
            <img
              src={`https://egoss.onrender.com${activeImg}`}
              alt={product.name}
            />

            <div className="women-thumb-row">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={`https://egoss.onrender.com${img}`}
                  alt="thumb"
                  onClick={() => setActiveImg(img)}
                />
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="women-product-info">
            <h1 className="women-product-title">
              {product.name}
            </h1>

            <p className="women-product-sku">
              SKU: {product._id.slice(-6)}
            </p>

            <p className="women-product-price">
              ₹{product.price}
            </p>

            <p className="women-product-note">
              Stock Available: {product.stock}
            </p>

            {/* ✅ ADD TO CART */}
            <button
              className="women-add-cart"
              onClick={() => {
                setCartItem({
                  ...product,
                  qty: 1,
                });
                setCartOpen(true);
              }}
            >
              ADD TO CART
            </button>

            <button className="women-buy-now">
              BUY IT NOW
            </button>
          </div>

        </div>
      </section>

      {/* ✅ CART MODAL */}
      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItem={cartItem}
      />
    </>
  );
};

export default WomenProductPDP;
