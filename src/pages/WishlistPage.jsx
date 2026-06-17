import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";

function fmt(p) { return "₹" + (p / 100).toLocaleString("en-IN", { minimumFractionDigits: 0 }); }

export default function WishlistPage({ setPage }) {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  const items = PRODUCTS.filter(p => wishlist.has(p.id));

  if (items.length === 0) {
    return (
      <div className="page center-page">
        <div className="empty-state">
          <span className="empty-icon">♥</span>
          <h2>Your wishlist is empty</h2>
          <p>Save items you love by clicking the heart icon.</p>
          <button className="btn-primary" onClick={() => setPage("home")}>Browse Products</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Wishlist <span className="item-count-badge">{items.length}</span></h1>
      <div className="wishlist-grid">
        {items.map(product => (
          <div key={product.id} className="wishlist-card">
            <button className="wishlist-remove" onClick={() => toggleWishlist(product)} title="Remove from wishlist">×</button>
            <div className="wl-emoji">{product.emoji}</div>
            <div className="wl-info">
              <span className="wl-cat">{product.category}</span>
              <span className="wl-name">{product.name}</span>
              <span className="wl-price">{fmt(product.price)}</span>
            </div>
            <button className="btn-primary wl-add-btn" onClick={() => { addToCart(product); }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
