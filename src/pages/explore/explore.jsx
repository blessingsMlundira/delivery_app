import React, { useState, useMemo } from "react";
import "./explore.css";

// ---------------------------------------------------------------------------
// Mock data — swap these out for real API calls when ready.
// ---------------------------------------------------------------------------

const STORE_TYPES = ["All", "Supermarket", "Pharmacy", "Hardware", "Liquor"];

const CATEGORIES_BY_TYPE = {
  Supermarket: ["Fresh produce", "Dairy", "Bakery", "Beverages", "Snacks", "Frozen"],
  Pharmacy: ["Over-the-counter", "Prescription", "Baby care", "Personal care", "Vitamins"],
  Hardware: ["Tools", "Paint", "Plumbing", "Electrical", "Lumber", "Garden supplies"],
  Liquor: ["Wines", "Beers", "Spirits", "Mixers", "Premium selections"],
};

const CURATED_COLLECTIONS = [
  { id: "quick-essentials", title: "Quick essentials", subtitle: "Bread, milk, eggs, soap", storeType: "Supermarket", emoji: "🥖" },
  { id: "health-first", title: "Health first", subtitle: "First aid, meds, sanitizers", storeType: "Pharmacy", emoji: "💊" },
  { id: "diy-projects", title: "DIY projects", subtitle: "Paint, tools, nails", storeType: "Hardware", emoji: "🔨" },
  { id: "weekend-wind-down", title: "Weekend wind-down", subtitle: "Wine, beer, snacks", storeType: "Liquor", emoji: "🍷" },
  { id: "emergency-restock", title: "Emergency restock", subtitle: "Everything in 1 hour", storeType: "All", emoji: "⏱️" },
];

const MOCK_STORES = [
  {
    id: "s1",
    name: "FreshMart Central",
    type: "Supermarket",
    logoUrl: "",
    distanceKm: 0.8,
    rating: 4.6,
    reviews: 212,
    deliveryTimeMin: 30,
    deliveryFee: 0,
    minOrder: 0,
    openNow: true,
    hours: "7:00 AM – 9:00 PM",
    paymentMethods: ["Cash on delivery", "M-Pesa", "Card"],
    products: ["milk", "bread", "eggs", "soap"],
    offer: "10% off orders over MK 20,000",
    lowStock: ["fresh strawberries"],
  },
  {
    id: "s2",
    name: "CarePlus Pharmacy",
    type: "Pharmacy",
    logoUrl: "",
    distanceKm: 1.4,
    rating: 4.8,
    reviews: 156,
    deliveryTimeMin: 45,
    deliveryFee: 1500,
    minOrder: 0,
    openNow: true,
    hours: "24 hours",
    paymentMethods: ["Cash on delivery", "M-Pesa"],
    products: ["panadol", "sanitizer", "vitamins"],
    offer: "First order: free delivery",
    lowStock: [],
  },
  {
    id: "s3",
    name: "BuildRight Hardware",
    type: "Hardware",
    logoUrl: "",
    distanceKm: 3.2,
    rating: 4.3,
    reviews: 89,
    deliveryTimeMin: 60,
    deliveryFee: 3000,
    minOrder: 10000,
    openNow: false,
    hours: "8:00 AM – 6:00 PM",
    paymentMethods: ["Cash on delivery", "Card"],
    products: ["cement", "nails", "paint"],
    offer: null,
    lowStock: ["PVC pipe 2in"],
  },
  {
    id: "s4",
    name: "The Bottle Shop",
    type: "Liquor",
    logoUrl: "",
    distanceKm: 2.1,
    rating: 4.5,
    reviews: 134,
    deliveryTimeMin: 45,
    deliveryFee: 0,
    minOrder: 5000,
    openNow: true,
    hours: "10:00 AM – 10:00 PM",
    paymentMethods: ["Cash on delivery", "M-Pesa", "Card"],
    products: ["whiskey", "beer", "mixers"],
    offer: "Buy 2 get 1 free on selected beers",
    lowStock: [],
  },
  {
    id: "s5",
    name: "QuickStop Supermarket",
    type: "Supermarket",
    logoUrl: "",
    distanceKm: 1.9,
    rating: 4.1,
    reviews: 301,
    deliveryTimeMin: 30,
    deliveryFee: 500,
    minOrder: 0,
    openNow: true,
    hours: "6:30 AM – 10:00 PM",
    paymentMethods: ["Cash on delivery", "M-Pesa"],
    products: ["milk", "snacks", "frozen chicken"],
    offer: null,
    lowStock: ["frozen chicken"],
  },
  {
    id: "s6",
    name: "Wellness Pharmacy",
    type: "Pharmacy",
    logoUrl: "",
    distanceKm: 4.6,
    rating: 4.4,
    reviews: 67,
    deliveryTimeMin: 60,
    deliveryFee: 2000,
    minOrder: 0,
    openNow: false,
    hours: "8:00 AM – 8:00 PM",
    paymentMethods: ["Cash on delivery"],
    products: ["panadol", "baby formula"],
    offer: null,
    lowStock: [],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDistance(km) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

function formatFee(fee) {
  return fee === 0 ? "Free delivery" : `MK ${fee.toLocaleString()} fee`;
}

function matchesSearch(store, query) {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  return (
    store.name.toLowerCase().includes(q) ||
    store.products.some((p) => p.toLowerCase().includes(q))
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/**
 * Renders the store's logo image. Falls back to a colored initials badge
 * if no logoUrl is provided, or if the image fails to load.
 */
function StoreLogo({ name, logoUrl }) {
  const [failed, setFailed] = useState(false);
  const showFallback = !logoUrl || failed;

  return (
    <div className="store-logo">
      {showFallback ? (
        <span className="store-logo-fallback" aria-hidden="true">
          {getInitials(name)}
        </span>
      ) : (
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="store-logo-img"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Explore() {
  const [storeType, setStoreType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [view, setView] = useState("list"); // "list" | "map"

  // Categories shown depend on the selected store type.
  const visibleCategories = useMemo(() => {
    if (storeType === "All") {
      return Object.entries(CATEGORIES_BY_TYPE).flatMap(([type, cats]) =>
        cats.map((c) => ({ type, category: c }))
      );
    }
    return (CATEGORIES_BY_TYPE[storeType] || []).map((c) => ({
      type: storeType,
      category: c,
    }));
  }, [storeType]);

  const filteredStores = useMemo(() => {
    return MOCK_STORES.filter((store) => {
      if (storeType !== "All" && store.type !== storeType) return false;
      if (openNowOnly && !store.openNow) return false;
      if (!matchesSearch(store, searchQuery)) return false;
      return true;
    }).sort((a, b) => a.distanceKm - b.distanceKm);
  }, [storeType, openNowOnly, searchQuery]);

  const storesWithOffers = useMemo(
    () => filteredStores.filter((s) => s.offer),
    [filteredStores]
  );

  const relevantCollections = useMemo(
    () =>
      CURATED_COLLECTIONS.filter(
        (c) => c.storeType === "All" || c.storeType === storeType || storeType === "All"
      ),
    [storeType]
  );

  return (
    <div className="explore-page">
      {/* Header / search */}
      <header className="explore-header">
        <h1 className="explore-title">Explore stores near you</h1>

        <div className="search-bar">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder='Search stores or products — e.g. "milk", "panadol", "cement"'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search stores or products"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Store type filter */}
        <div className="store-type-filter" role="tablist" aria-label="Store type">
          {STORE_TYPES.map((type) => (
            <button
              key={type}
              role="tab"
              aria-selected={storeType === type}
              className={`store-type-chip ${storeType === type ? "active" : ""}`}
              onClick={() => {
                setStoreType(type);
                setActiveCategory(null);
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="explore-toolbar">
          <label className="open-now-toggle">
            <input
              type="checkbox"
              checked={openNowOnly}
              onChange={(e) => setOpenNowOnly(e.target.checked)}
            />
            <span className="toggle-track" aria-hidden="true">
              <span className="toggle-thumb" />
            </span>
            Open now
          </label>

          <div className="view-switch" role="tablist" aria-label="View mode">
            <button
              role="tab"
              aria-selected={view === "list"}
              className={`view-switch-btn ${view === "list" ? "active" : ""}`}
              onClick={() => setView("list")}
            >
              List
            </button>
            <button
              role="tab"
              aria-selected={view === "map"}
              className={`view-switch-btn ${view === "map" ? "active" : ""}`}
              onClick={() => setView("map")}
            >
              Map
            </button>
          </div>
        </div>
      </header>

      {/* Quick categories */}
      {visibleCategories.length > 0 && (
        <section className="explore-section">
          <h2 className="section-title">Browse categories</h2>
          <div className="category-scroll">
            {visibleCategories.map(({ type, category }) => (
              <button
                key={`${type}-${category}`}
                className={`category-chip ${activeCategory === category ? "active" : ""}`}
                onClick={() =>
                  setActiveCategory(activeCategory === category ? null : category)
                }
              >
                {category}
                {storeType === "All" && <span className="category-chip-type">{type}</span>}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Curated collections */}
      <section className="explore-section">
        <h2 className="section-title">Curated for you</h2>
        <div className="collections-scroll">
          {relevantCollections.map((c) => (
            <button
              key={c.id}
              className="collection-card"
              onClick={() => c.storeType !== "All" && setStoreType(c.storeType)}
            >
              <span className="collection-emoji" aria-hidden="true">{c.emoji}</span>
              <span className="collection-title">{c.title}</span>
              <span className="collection-subtitle">{c.subtitle}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Offers */}
      {storesWithOffers.length > 0 && (
        <section className="explore-section">
          <h2 className="section-title">Deals & promotions</h2>
          <div className="offers-scroll">
            {storesWithOffers.map((store) => (
              <div key={store.id} className="offer-card">
                <div className="offer-badge">DEAL</div>
                <div className="offer-store-name">{store.name}</div>
                <div className="offer-text">{store.offer}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Nearby stores */}
      <section className="explore-section">
        <div className="section-header-row">
          <h2 className="section-title">
            Nearby stores <span className="result-count">({filteredStores.length})</span>
          </h2>
        </div>

        {view === "map" ? (
          <div className="map-placeholder">
            <p>🗺️ Map view</p>
            <p className="map-placeholder-sub">
              Plug in your map provider (Google Maps, Mapbox, etc.) here.
              {" "}Showing {filteredStores.length} store{filteredStores.length !== 1 ? "s" : ""}.
            </p>
          </div>
        ) : filteredStores.length === 0 ? (
          <div className="empty-state">
            <p>No stores match your search right now.</p>
            <p className="empty-state-sub">Try a different store type, or clear your filters.</p>
          </div>
        ) : (
          <div className="store-list">
            {filteredStores.map((store) => (
              <article key={store.id} className="store-card">
                <StoreLogo name={store.name} logoUrl={store.logoUrl} />

                <div className="store-card-main">
                  <div className="store-card-top">
                    <h3 className="store-name">{store.name}</h3>
                    <span className={`store-status ${store.openNow ? "open" : "closed"}`}>
                      {store.openNow ? "Open" : "Closed"}
                    </span>
                  </div>

                  <div className="store-meta">
                    <span className="store-type-tag">{store.type}</span>
                    <span className="store-distance">📍 {formatDistance(store.distanceKm)}</span>
                    <span className="store-rating">
                      ⭐ {store.rating.toFixed(1)} <span className="store-reviews">({store.reviews})</span>
                    </span>
                  </div>

                  <div className="store-delivery-info">
                    <span className="delivery-chip">🚚 {store.deliveryTimeMin} min</span>
                    <span className="delivery-chip">{formatFee(store.deliveryFee)}</span>
                    {store.minOrder > 0 ? (
                      <span className="delivery-chip">
                        Min. order MK {store.minOrder.toLocaleString()}
                      </span>
                    ) : (
                      <span className="delivery-chip">No minimum</span>
                    )}
                  </div>

                  {store.lowStock.length > 0 && (
                    <div className="low-stock-note">
                      ⚠️ Low stock: {store.lowStock.join(", ")}
                    </div>
                  )}

                  {store.offer && <div className="store-offer-inline">🔥 {store.offer}</div>}
                </div>

                <button className="store-card-cta">View store</button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
