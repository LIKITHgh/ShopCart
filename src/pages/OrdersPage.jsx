import { useState } from "react";
import { useCart } from "../context/CartContext";

function fmt(p) { return "₹" + (p / 100).toLocaleString("en-IN", { minimumFractionDigits: 0 }); }

const STATUS_COLOR = {
  Delivered:  "status-delivered",
  Shipped:    "status-shipped",
  Processing: "status-processing",
  Cancelled:  "status-cancelled",
};

export default function OrdersPage({ setPage }) {
  const { orders } = useCart();
  const [expanded, setExpanded] = useState(null);

  if (orders.length === 0) {
    return (
      <div className="page center-page">
        <div className="empty-state">
          <span className="empty-icon">📦</span>
          <h2>No orders yet</h2>
          <p>Your placed orders will appear here.</p>
          <button className="btn-primary" onClick={() => setPage("home")}>Start Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">
        My Orders <span className="item-count-badge">{orders.length}</span>
      </h1>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div
              className="order-header"
              onClick={() => setExpanded(expanded === order.id ? null : order.id)}
            >
              <div className="order-meta">
                <span className="order-id">{order.id}</span>
                <span className="order-date">{order.date}</span>
              </div>
              <div className="order-right">
                <span className={`order-status ${STATUS_COLOR[order.status]}`}>{order.status}</span>
                <span className="order-total">{fmt(order.total)}</span>
                <span className="order-chevron">{expanded === order.id ? "▲" : "▼"}</span>
              </div>
            </div>

            {expanded === order.id && (
              <div className="order-items">
                {order.items.map((item, i) => (
                  <div key={i} className="order-item-row">
                    <span className="oi-emoji">{item.emoji}</span>
                    <span className="oi-name">{item.name}</span>
                    <span className="oi-qty">× {item.qty}</span>
                    <span className="oi-price">{fmt(item.price * item.qty)}</span>
                  </div>
                ))}
                <div className="order-breakdown">
                  <div className="breakdown-row">
                    <span>Subtotal</span>
                    <span>{fmt(order.subtotal)}</span>
                  </div>
                  {order.discountLabel && (
                    <div className="breakdown-row green">
                      <span>Discount ({order.discountLabel})</span>
                      <span>−{fmt(order.discountAmount)}</span>
                    </div>
                  )}
                  <div className="breakdown-row">
                    <span>Shipping</span>
                    <span className={order.shipping === 0 ? "green" : ""}>{order.shipping === 0 ? "Free" : fmt(order.shipping)}</span>
                  </div>
                  <div className="breakdown-row grand">
                    <span>Total paid</span>
                    <span>{fmt(order.total)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
