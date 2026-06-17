import { useCart } from "../context/CartContext";

export default function Navbar({ page, setPage }) {
  const { itemCount, wishlist } = useCart();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button className="logo" onClick={() => setPage("home")}>
          <span>🛒</span> ShopCart
        </button>
        <nav className="nav-links">
          <button className={`nav-link ${page === "home" ? "active" : ""}`} onClick={() => setPage("home")}>
            Shop
          </button>
          <button className={`nav-link ${page === "wishlist" ? "active" : ""}`} onClick={() => setPage("wishlist")}>
            Wishlist
            {wishlist.size > 0 && <span className="nav-badge">{wishlist.size}</span>}
          </button>
          <button className={`nav-link ${page === "orders" ? "active" : ""}`} onClick={() => setPage("orders")}>
            Orders
          </button>
        </nav>
        <button className="cart-btn" onClick={() => setPage("cart")}>
          <span className="cart-icon">🛍️</span>
          {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          <span className="cart-label">Cart</span>
        </button>
      </div>
    </header>
  );
}
