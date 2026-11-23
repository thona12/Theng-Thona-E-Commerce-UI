
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("techstore-cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("techstore-cart", JSON.stringify(cart));
  }, [cart]);

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

  const removeFromCart = (id) => {
    setCart((oldCart) =>
      oldCart.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
