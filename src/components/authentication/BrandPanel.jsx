import React from "react";

export default function BrandPanel({ heading, body }) {
  return (
    <div className="auth-brand">
      <div className="auth-brand__mark">
        Express<span>Delivery</span>
      </div>

      <div className="auth-brand__copy">
        <h1>{heading}</h1>
        <p>{body}</p>

        <div className="route-line" aria-hidden="true">
          <svg viewBox="0 0 360 120" xmlns="http://www.w3.org/2000/svg">
            {/* Route path */}
            <path
              className="path"
              d="M20,90 C 90,90 90,30 150,30 S 250,90 340,30"
            />
            
            {/* Shop emoji */}
            <text x="12" y="88" fontSize="20" fontFamily="Apple Color Emoji, Segoe UI Emoji, sans-serif">
              🏪
            </text>

            {/* Home emoji */}
            <text x="334" y="28" fontSize="20" fontFamily="Apple Color Emoji, Segoe UI Emoji, sans-serif">
              🏠
            </text>
          </svg>
        </div>
      </div>

      <div />
    </div>
  );
}