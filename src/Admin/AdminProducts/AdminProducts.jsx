import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminProducts.css";

// Updated to use deployed backend
const API_PRODUCTS_URL = "https://egoss.onrender.com/api/products";
const API_ORDERS_URL = "https://egoss.onrender.com/api/orders/my-orders";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("products");

  // ================= PRODUCT STATES =================
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Men");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);

  // ================= ORDERS STATES =================
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // ================ FETCH PRODUCTS ================
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_PRODUCTS_URL);
      setProducts(res.data);
    } catch (error) {
      console.error("Fetch products failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================ FETCH ORDERS ================
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");

    if (!token || !email) {
      navigate("/auth");
      return;
    }

    try {
      setOrdersLoading(true);

      const res = await axios.get(API_ORDERS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("❌ Failed to fetch orders");
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (activeSection === "orders") {
      fetchOrders();
    }
  }, [activeSection]);

  // ================ IMAGE HANDLER ================
  const handleImageUpload = (e) => {
    setImages(e.target.files);
  };

  // ================ ADD PRODUCT ================
  const addProduct = async () => {
    if (!name || !price || !stock) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("stock", stock);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      await axios.post(API_PRODUCTS_URL, formData);
      fetchProducts();

      setName("");
      setPrice("");
      setStock("");
      setImages([]);
    } catch (error) {
      alert("Product upload failed");
    }
  };

  return (
    <div className="admin-root">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="admin-title">Admin Panel</h2>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${
              activeSection === "products" ? "active" : ""
            }`}
            onClick={() => setActiveSection("products")}
          >
            ⬛ Products
          </button>

          <button
            className={`admin-nav-item ${
              activeSection === "orders" ? "active" : ""
            }`}
            onClick={() => setActiveSection("orders")}
          >
            🛒 Orders
          </button>

          <button
            className={`admin-nav-item ${
              activeSection === "admin" ? "active" : ""
            }`}
            onClick={() => setActiveSection("admin")}
          >
            👤 Admin Details
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        {/* ================= PRODUCTS ================= */}
        {activeSection === "products" && (
          <>
            <h1 className="page-title">Product Management</h1>

            <button className="add-product-btn" onClick={addProduct}>
              Add New Product
            </button>

            <div className="product-form">
              <div className="form-left">
                <label>Product Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Men</option>
                  <option>Women</option>
                </select>

                <label>Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <label>Stock</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="form-right">
                <label>Product Images</label>
                <div className="image-upload">
                  <input type="file" multiple onChange={handleImageUpload} />
                </div>
              </div>
            </div>

            <table className="product-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Images</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>{p._id.slice(-5)}</td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>₹{p.price}</td>
                    <td>{p.stock}</td>
                    <td>
                      {p.images.map((img, i) => (
                        <img
                          key={i}
                          src={`https://egoss.onrender.com${img}`}
                          alt="product"
                        />
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* ================= ORDERS ================= */}
        {activeSection === "orders" && (
          <>
            <h1 className="page-title">Orders Management</h1>

            {ordersLoading ? (
              <p>Loading orders...</p>
            ) : orders.length === 0 ? (
              <p>No orders yet</p>
            ) : (
              <div className="tbov-orders-container">
                {orders.map((order) => (
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
            )}
          </>
        )}

        {/* ================= ADMIN DETAILS ================= */}
        {activeSection === "admin" && (
          <>
            <h1 className="page-title">Admin Details</h1>

            <div className="product-form">
              <div className="form-left">
                <label>Name</label>
                <input value="Admin User" readOnly />
              </div>

              <div className="form-left">
                <label>Email</label>
                <input value="admin@example.com" readOnly />
              </div>

              <div className="form-left">
                <label>Role</label>
                <input value="Super Admin" readOnly />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminProducts;
