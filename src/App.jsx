
import { useState } from "react";
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((oldCart) => {
      const found = oldCart.find(
        (item) => item.id === product.id
      );

      if (found) {
        return oldCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...oldCart, { ...product, quantity: 1 }];
    });
  };

  // Update quantity
  const updateQuantity = (id, amount) => {
    setCart((oldCart) =>
      oldCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + amount)
            }
          : item
      )
    );
  };

  // Remove product
  const removeFromCart = (id) => {
    setCart((oldCart) =>
      oldCart.filter((item) => item.id !== id)
    );
  };

  // Cart count
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <HashRouter>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} />}
        />

        <Route
          path="/products"
          element={<Products addToCart={addToCart} />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              cartTotal={cartTotal}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              cartTotal={cartTotal}
              clearCart={clearCart}
            />
          }
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        <Route
          path="*"
          element={
            <div style={{ padding: "60px", textAlign: "center" }}>
              <h1>404 - Page Not Found</h1>
              <a href="#/">Go Home</a>
            </div>
          }
        />
      </Routes>

      <Footer />
    </HashRouter>
  );
}

export default App;
