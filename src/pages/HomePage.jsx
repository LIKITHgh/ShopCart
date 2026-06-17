import { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { useCart } from "../context/CartContext";

function fmt(p) { return "₹" + (p / 100).toLocaleString("en-IN", { minimumFractionDigits: 0 }); }

function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? "star filled" : (i === full && half ? "star half" : "star")}>★</span>
      ))}
      <span className="rating-num">{rating}</span>
    </span>
  );
}

export default function HomePage({ setPage }) {
  const { cart, addToCart, toggleWishlist, wishlist } = useCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (category !== "All") list = list.filter(p => p.category === category);
    if (search.trim()) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, category, sort]);

  return (
    <div className="page home-page">
      {/* Hero */}
      <div className="hero">
        <div className="hero-text">
          <h1>Everything you need,<br /><span>delivered to your door.</span></h1>
          <p>Premium products, unbeatable prices.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <input
          className="search-input"
          type="search"
          placeholder="🔍  Search products…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="category-tabs">
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`cat-tab ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >{c}</button>
          ))}
        </div>
        <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">Sort: Featured</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Results */}
      <div className="results-bar">
        <span>{filtered.length} product{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="no-results">
          <span>😕</span>
          <p>No products match "{search}"</p>
          <button onClick={() => { setSearch(""); setCategory("All"); }}>Clear filters</button>
        </div>
      ) : (
        <div className="products-grid">
          {filtered.map(product => {
            const inCart = cart[product.id] || 0;
            const inWishlist = wishlist.has(product.id);
            return (
              <div key={product.id} className="product-card">
                {product.badge && <span className="product-badge">{product.badge}</span>}
                <button
                  className={`wishlist-btn ${inWishlist ? "active" : ""}`}
                  onClick={() => toggleWishlist(product)}
                  aria-label="Toggle wishlist"
                >♥</button>
                <div className="product-emoji">{product.emoji}</div>
                <div className="product-body">
                  <span className="product-cat">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <Stars rating={product.rating} />
                  <span className="product-reviews">({product.reviews.toLocaleString()} reviews)</span>
                  <div className="product-footer">
                    <span className="product-price">{fmt(product.price)}</span>
                    <button
                      className={`add-btn ${inCart ? "in-cart" : ""}`}
                      onClick={() => addToCart(product)}
                    >
                      {inCart ? `+1 · ${inCart} in cart` : "Add to cart"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
