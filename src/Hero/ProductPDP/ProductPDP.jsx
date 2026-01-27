import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductPDP.css";
import Navbar from "../Navbar";
import CartModal from "../CartModal/CartModal";

// ✅ Updated API URLs
const API_URL = "https://egoss.onrender.com/api/products";
const PAYMENT_API = "https://egoss.onrender.com/api/payment";

const ProductPDP = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItem, setCartItem] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(API_URL);
        const foundProduct = res.data.find((p) => p._id === id);
        if (!foundProduct) return;

        setProduct(foundProduct);
        setActiveImg(foundProduct.images?.[0]);
      } catch (error) {
        console.error("Product fetch failed");
      }
    };

    fetchProduct();
  }, [id]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 🔥 BUY NOW HANDLER
  const handleBuyNow = async () => {
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      // 1️⃣ Create order in backend
      const orderRes = await axios.post(
        `${PAYMENT_API}/create-order`,
        { amount: product.price }
      );

      const { razorpayOrder } = orderRes.data;

      // 2️⃣ Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Egoss Store",
        description: product.name,
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            // 3️⃣ Verify payment
            const verifyRes = await axios.post(
              `${PAYMENT_API}/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyRes.data.success) {
              alert("✅ Payment Successful");
            }
          } catch (err) {
            alert("❌ Payment verification failed");
          }
        },

        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (!product) return null;

  return (
    <>
      <Navbar />

      <section className="product-page">
        <div className="product-container">

          {/* LEFT IMAGE */}
          <div className="product-image">
            <img
              src={`https://egoss.onrender.com${activeImg}`}
              alt={product.name}
            />

            {product.images?.length > 1 && (
              <div className="thumb-row">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={`https://egoss.onrender.com${img}`}
                    alt="thumb"
                    onClick={() => setActiveImg(img)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT CONTENT */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">₹{product.price}</p>

            {/* ADD TO CART */}
            <button
              className="add-cart"
              onClick={() => {
                setCartItem({ ...product, qty: 1 });
                setCartOpen(true);
              }}
            >
              ADD TO CART
            </button>

            {/* 🔥 BUY NOW */}
            <button className="buy-now" onClick={handleBuyNow}>
              BUY IT NOW
            </button>
          </div>
        </div>
      </section>

      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItem={cartItem}
      />
    </>
  );
};

export default ProductPDP;
