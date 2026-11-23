
import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Products({ addToCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category))
  ];

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || product.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <section className="section">
      <h1>All Products</h1>
      <p>Find the perfect technology for you.</p>

      <input
        className="search-input"
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="categories">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "active" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </section>
  );
}

export default Products;
