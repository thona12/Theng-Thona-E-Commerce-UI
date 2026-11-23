
import { Link } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Home({ addToCart }) {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span>WELCOME TO TECHSTORE</span>
          <h1>Technology for Your Everyday Life.</h1>
          <p>
            Discover the latest laptops, accessories,
            smartphones and more.
          </p>

          <Link to="/products" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span>OUR COLLECTION</span>
            <h2>Featured Products</h2>
          </div>

          <Link to="/products">View All →</Link>
        </div>

        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
