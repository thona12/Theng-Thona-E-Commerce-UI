
import { useParams, Link } from "react-router-dom";
import products from "../data/products";

function ProductDetails({ addToCart }) {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="section">
        <h2>Product not found</h2>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  return (
    <section className="details">
      <img src={product.image} alt={product.name} />

      <div>
        <span className="category">{product.category}</span>
        <h1>{product.name}</h1>
        <h2>${product.price}</h2>
        <p>{product.description}</p>

        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>

        <p>
          <Link to="/products">← Back to Products</Link>
        </p>
      </div>
    </section>
  );
}

export default ProductDetails;
