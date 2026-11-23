
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout({ cart, cartTotal, clearCart }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery"
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("Your cart is empty!");
      return;
    }

    const order = {
      id: Date.now(),
      customer: form,
      items: cart,
      total: cartTotal,
      date: new Date().toLocaleString()
    };

    const oldOrders = JSON.parse(
      localStorage.getItem("techstore-orders") || "[]"
    );

    localStorage.setItem(
      "techstore-orders",
      JSON.stringify([...oldOrders, order])
    );

    clearCart();

    navigate("/order-success", {
      state: { order }
    });
  };

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <h1>Your Cart is Empty</h1>
        <Link to="/products">Continue Shopping</Link>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>
      <p>Complete your information to place your order.</p>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Customer Information</h2>

          <label>Full Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />

          <label>Shipping Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />

          <h2>Payment Method</h2>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              checked={form.payment === "Cash on Delivery"}
              onChange={handleChange}
            />
            Cash on Delivery
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Bank Transfer"
              checked={form.payment === "Bank Transfer"}
              onChange={handleChange}
            />
            Bank Transfer
          </label>

          {error && <p className="checkout-error">{error}</p>}

          <button type="submit" className="checkout-btn">
            Place Order
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <strong>
                ${(item.price * item.quantity).toFixed(2)}
              </strong>
            </div>
          ))}

          <hr />

          <div className="summary-row">
            <strong>Total</strong>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
