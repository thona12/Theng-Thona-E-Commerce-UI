
import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>

      <div className="product-info">
        <span className="category">{product.category}</span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="product-bottom">
          <strong>${product.price}</strong>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
