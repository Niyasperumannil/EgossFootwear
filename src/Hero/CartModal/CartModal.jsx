import { useEffect, useState } from "react";
import "./CartModal.css";

const CartModal = ({ open, onClose, cartItem }) => {
  const [cart, setCart] = useState([]);

  // 🔐 GET LOGGED-IN USER
  const userEmail = localStorage.getItem("userEmail");
  const cartKey = userEmail ? `cart_${userEmail}` : "cart_guest";

  // ================= LOAD USER CART =================
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(savedCart);
  }, [cartKey]);

  // ================= ADD ITEM TO USER CART =================
  useEffect(() => {
    if (!cartItem) return;

    const updatedCart = [...cart];
    const index = updatedCart.findIndex(
      (item) => item._id === cartItem._id
    );

    if (index !== -1) {
      updatedCart[index].qty += 1;
    } else {
      updatedCart.push({ ...cartItem, qty: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
  }, [cartItem]);

  if (!open || cart.length === 0) return null;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart-overlay">
      <aside className="cart-modal">

        {/* HEADER */}
        <div className="cart-header">
          <h3>Your Cart ({cart.length} items)</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* OFFER BAR */}
        <div className="cart-offer-bar">
          <p>SHOP MORE, SAVE MORE!</p>
          <p>SHOP MORE, SAVE MORE!</p>
        </div>

        {/* PROGRESS */}
        <div className="cart-progress">
          <div className="step active">
            <span></span>
            <p>BUY 1 GET<br /><b>5%</b></p>
          </div>
          <div className="step">
            <span></span>
            <p>BUY 2 GET<br /><b>5%</b></p>
          </div>
          <div className="step">
            <span></span>
            <p>BUY 3 GET<br /><b>10%</b></p>
          </div>
        </div>

        {/* ITEMS */}
        {cart.map((item) => (
          <div className="cart-item" key={item._id}>
            <img
              src={`https://egoss.onrender.com${item.images[0]}`}
              alt={item.name}
            />

            <div className="cart-item-info">
              <p className="title">{item.name}</p>
              <p className="price">₹{item.price}</p>

              <div className="cart-options">
                <select>
                  <option>36</option>
                </select>
                <select>
                  <option>{item.category}</option>
                </select>
              </div>
            </div>

            <div className="cart-qty">
              <button
                onClick={() => {
                  const updated = cart.map((p) =>
                    p._id === item._id
                      ? { ...p, qty: Math.max(1, p.qty - 1) }
                      : p
                  );
                  setCart(updated);
                  localStorage.setItem(cartKey, JSON.stringify(updated));
                }}
              >
                -
              </button>

              <span>{item.qty}</span>

              <button
                onClick={() => {
                  const updated = cart.map((p) =>
                    p._id === item._id
                      ? { ...p, qty: p.qty + 1 }
                      : p
                  );
                  setCart(updated);
                  localStorage.setItem(cartKey, JSON.stringify(updated));
                }}
              >
                +
              </button>

              <button
                className="remove"
                onClick={() => {
                  const updated = cart.filter(
                    (p) => p._id !== item._id
                  );
                  setCart(updated);
                  localStorage.setItem(cartKey, JSON.stringify(updated));
                }}
              >
                🗑
              </button>
            </div>
          </div>
        ))}

        {/* FOOTER */}
        <div className="cart-footer">
          <div className="total">
            <span>Estimated Total</span>
            <b>₹{total}</b>
          </div>

          <button className="checkout-btn">
            CHECKOUT
          </button>

          <p className="rating">
            EGOSS Seller Rating : ★★★★★ (2025-26)
          </p>
        </div>

      </aside>
    </div>
  );
};

export default CartModal;
