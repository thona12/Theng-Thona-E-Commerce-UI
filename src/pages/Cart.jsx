
import { Link } from "react-router-dom";

function Cart({
  cart,
  updateQuantity,
  removeFromCart,
  cartTotal
}) {
  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <h1>Shopping Cart</h1>

        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>You haven't added any products yet.</p>

          <Link to="/products" className="checkout-btn">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>${item.price}</p>

                <div className="quantity-control">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>

              <strong>
                ${(item.price * item.quantity).toFixed(2)}
              </strong>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <div className="summary-row">
            <span>Total</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>

          <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>

        
          <Link to="/products" className="continue-link">
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Cart;
