
import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <main className="checkout-page">
        <h2>Order information not found.</h2>
        <Link to="/">Go Home</Link>
      </main>
    );
  }

  return (
    <main className="order-success">
      <div className="success-icon">✓</div>

      <h1>Order Placed Successfully!</h1>

      <p>Thank you for shopping with TechStore.</p>

      <h3>Order ID: {order.id}</h3>

      <p>Customer: {order.customer.fullName}</p>

      <p>Total: ${order.total.toFixed(2)}</p>

      <p>Payment: {order.customer.payment}</p>

      <Link to="/products" className="checkout-btn">
        Continue Shopping
      </Link>
    </main>
  );
}

export default OrderSuccess;
