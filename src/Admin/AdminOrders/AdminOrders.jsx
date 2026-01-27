import { useNavigate } from "react-router-dom";
import "./AdminOrders.css";

const AdminOrders = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-root">
      {/* SIDEBAR */}
   

      {/* MAIN */}
      <main className="admin-main">
        <h1 className="page-title">Orders Management</h1>

        <div className="orders-box">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User Email</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>#ORD001</td>
                <td>user1@gmail.com</td>
                <td>$145.00</td>
                <td className="status success">Completed</td>
              </tr>

              <tr>
                <td>#ORD002</td>
                <td>user2@gmail.com</td>
                <td>$80.00</td>
                <td className="status pending">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminOrders;
