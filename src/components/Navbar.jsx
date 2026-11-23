
import { Link } from "react-router-dom";

function Navbar({ cartCount = 0 }) {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo">
          Tech<span>Store</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/products">Products</Link>

          <Link to="/cart" className="cart-link">
            Cart ({cartCount})
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
