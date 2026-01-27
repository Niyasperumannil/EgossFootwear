import { useNavigate } from "react-router-dom";
import "./AdminDetails.css";

const AdminDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-root">
      {/* SIDEBAR */}
      {/* <aside className="admin-sidebar">
        <h2 className="admin-title">Admin Panel</h2>

        <nav className="admin-nav">
          <button
            className="admin-nav-item"
            onClick={() => navigate("/admin/products")}
          >
            ⬛ Products
          </button>

          <button
            className="admin-nav-item"
            onClick={() => navigate("/admin/orders")}
          >
            🛒 Orders
          </button>

          <button className="admin-nav-item active">
            👤 Admin Details
          </button>
        </nav>
      </aside> */}

      {/* MAIN */}
      <main className="admin-main">
        <h1 className="page-title">Admin Details</h1>

        <div className="admin-profile-card">
          <div className="admin-avatar">👤</div>

          <div className="admin-info">
            <p><strong>Name:</strong> Admin User</p>
            <p><strong>Email:</strong> admin@egosshoes.com</p>
            <p><strong>Role:</strong> Super Admin</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDetails;
