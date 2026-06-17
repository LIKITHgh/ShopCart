import { useState } from "react";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";

function fmt(p) { return "₹" + (p / 100).toLocaleString("en-IN", { minimumFractionDigits: 0 }); }

export default function CartPage({ setPage }) {
  const {
    cart, cartItems, itemCount,
    updateQty, removeFromCart, clearCart,
    appliedDiscount, appliedCode,
    applyDiscount, removeDiscount,
    placeOrder,
  } = useCart();

  const [discountInput, setDiscountInput] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const enriched = cartItems.map(({ id, qty }) => {
    const p = PRODUCTS.find(x => x.id === id);
    return { ...p, qty };
  });

  const subtotal = enriched.reduce((s, i) => s + i.price * i.qty, 0);

  const discountAmount = (() => {
    if (!appliedDiscount) return 0;
    if (appliedDiscount.type === "percent") return Math.round(subtotal * appliedDiscount.value / 100);
    return Math.min(appliedDiscount.value, subtotal);
  })();

  const shipping = subtotal >= 99900 ? 0 : 9900;
  const total = subtotal - discountAmount + shipping;

  function handleApply() {
    const result = applyDiscount(discountInput);
    if (result.error) { setDiscountError(result.error); }
    else { setDiscountError(""); setDiscountInput(""); }
  }

  function handlePlaceOrder() {
    placeOrder({ subtotal, discountAmount, shipping, total });
    setOrderPlaced(true);
    setTimeout(() => { setOrderPlaced(false); setPage("orders"); }, 2000);
  }

  if (orderPlaced) {
    return (
      <div className="page center-page">
        <div className="order-success">
          <span className="success-icon">🎉</span>
          <h2>Order Placed!</h2>
          <p>Redirecting to your orders…</p>
        </div>
      </div>
    );
  }

  if (enriched.length === 0) {
    return (
      <div className="page center-page">
        <div className="empty-state">
          <span className="empty-icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <button className="btn-primary" onClick={() => setPage("home")}>Start Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <div className="cart-page-header">
        <h1 className="page-title">Your Cart <span className="item-count-badge">{itemCount}</span></h1>
        <button className="text-btn danger" onClick={clearCart}>Clear cart</button>
      </div>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items-col">
          {enriched.map(item => (
            <div key={item.id} className="cart-row">
              <div className="cart-row-emoji">{item.emoji}</div>
              <div className="cart-row-info">
                <span className="cart-row-cat">{item.category}</span>
                <span className="cart-row-name">{item.name}</span>
                <span className="cart-row-unit">{fmt(item.price)} each</span>
              </div>
              <div className="qty-controls">
                <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                <span className="qty-val">{item.qty}</span>
                <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
              </div>
              <div className="cart-row-right">
                <span className="cart-row-total">{fmt(item.price * item.qty)}</span>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <button className="text-btn continue" onClick={() => setPage("home")}>← Continue shopping</button>
        </div>

        {/* Summary */}
        <div className="order-summary-col">
          <h2 className="summary-title">Order Summary</h2>

          {/* Discount */}
          <div className="discount-block">
            <div className="discount-label">Have a promo code?</div>
            {appliedDiscount ? (
              <div className="applied-code">
                <span>🏷️ <strong>{appliedCode}</strong> — {appliedDiscount.label}</span>
                <button className="text-btn" onClick={removeDiscount}>Remove</button>
              </div>
            ) : (
              <div className="code-row">
                <input
                  className="code-input"
                  type="text"
                  placeholder="Enter code"
                  value={discountInput}
                  onChange={e => { setDiscountInput(e.target.value); setDiscountError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleApply()}
                />
                <button className="apply-btn" onClick={handleApply}>Apply</button>
              </div>
            )}
            {discountError && <p className="code-error">{discountError}</p>}
            <p className="code-hint">Try: SAVE10 · SAVE20 · FLAT500 · WELCOME</p>
          </div>

          {/* Totals */}
          <div className="totals">
            <div className="total-row">
              <span>Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})</span>
              <span>{fmt(subtotal)}</span>
            </div>
            {appliedDiscount && (
              <div className="total-row discount">
                <span>Discount ({appliedDiscount.label})</span>
                <span className="green">−{fmt(discountAmount)}</span>
              </div>
            )}
            <div className="total-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? "green" : ""}>{shipping === 0 ? "Free" : fmt(shipping)}</span>
            </div>
            {subtotal < 99900 && (
              <p className="shipping-nudge">Add {fmt(99900 - subtotal)} more for free shipping</p>
            )}
            <div className="total-divider" />
            <div className="total-row grand">
              <span>Total</span>
              <span className="grand-price">{fmt(total)}</span>
            </div>
          </div>

          <button className="checkout-btn" onClick={handlePlaceOrder}>
            Place Order →
          </button>
          <p className="secure-note">🔒 Secure checkout · Free returns</p>
        </div>
      </div>
    </div>
  );
}
