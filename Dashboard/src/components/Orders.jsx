import React ,{useState,useEffect}from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/allOrders")
      .then((response) => setOrders(response.data));
  }, []);
 
  const removeOrder = (id) => {
   axios.delete(`http://localhost:3000/deleteOrder/${id}`).then(() => {
     setOrders(orders.filter((order) => order._id !== id));
   });
  };

  return (
    <div className="orders">
      <div className="no-orders">
        {orders.length === 0 ? (
          <div className="no-orders-content">
            <h2>No orders yet</h2>
          </div>
        ) : (
          <div className="orders-content">
            <h2>Orders</h2>
            <table className="orders-table table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Mode</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>{order.price}</td>
                    <td>{order.mode}</td>
                    <td>
                      <button className="btn btn-danger small p-1" style={{ fontSize: "0.9rem" }} onClick={() => removeOrder(order._id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Link to={"/"} className="btn">
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Orders;