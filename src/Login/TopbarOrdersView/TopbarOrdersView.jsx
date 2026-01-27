import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./topbar-orders-view.css";
import Navbar from "../../Hero/Navbar";

// ✅ Updated API URL
const API_URL = "https://egoss.onrender.com/api/orders/my-orders";

const TopbarOrdersView = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /**
   * ============================
   * AUTH CHECK (VERY IMPORTANT)
   * ============================
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");

    // ❌ Not logged in → redirect to auth
    if (!token || !email) {
      navigate("/auth");
      return;
    }

    setUserEmail(email);
  }, [navigate]);

  /**
   * ============================
   * FETCH USER ORDERS (JWT)
   * ============================
   */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("❌ Failed to fetch orders");

        // Token expired / invalid → force logout
        if (error.response?.status === 401) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /**
   * ============================
   * LOGOUT
   * ============================
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setProfileMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <Navbar />

      {/* ================= TOP BAR ================= */}
      <header className="tbov-header-shell">
        <div className="tbov-header-container">
          <div className="tbov-header-left">
            <h1 className="tbov-brand-title">Egoss Shoes</h1>

            <nav className="tbov-nav-links">
              <span
                className="tbov-link-item"
                onClick={() => navigate("/")}
              >
                Shop
              </span>

              <span className="tbov-link-item tbov-link-active">
                Orders
              </span>
            </nav>
          </div>

          <div className="tbov-header-right">
            <button
              className="tbov-profile-trigger"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            >
              👤
            </button>

            {profileMenuOpen && (
              <div className="tbov-profile-dropdown">
                <div className="tbov-profile-identity">
                  <span className="tbov-profile-icon">👤</span>
                  <span className="tbov-profile-email">
                    {userEmail}
                  </span>
                </div>

                <div className="tbov-profile-action">Profile</div>
                <div className="tbov-profile-action">Settings</div>

                <div
                  className="tbov-profile-action tbov-logout-action"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  Sign out
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= ORDERS ================= */}
      <main className="tbov-orders-shell">
        <div className="tbov-orders-container">
          <h2 className="tbov-orders-heading">Orders</h2>

          {/* LOADING */}
          {loading && <p>Loading orders...</p>}

          {/* EMPTY STATE */}
          {!loading && orders.length === 0 && (
            <div className="tbov-orders-emptybox">
              <p className="tbov-empty-title">No orders yet</p>
              <p className="tbov-empty-subtitle">
                Go to store to place an order.
              </p>
            </div>
          )}

          {/* ORDERS LIST */}
          {!loading &&
            orders.map((order) => (
              <div key={order._id} className="tbov-order-card">
                <div>
                  <p>
                    <strong>Order ID:</strong>{" "}
                    {order._id.slice(-8)}
                  </p>

                  <p>
                    <strong>Amount:</strong> ₹{order.amount}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`tbov-status ${order.status}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </p>
                </div>

                <div className="tbov-order-date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default TopbarOrdersView;
