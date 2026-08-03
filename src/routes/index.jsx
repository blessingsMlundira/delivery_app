import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import StoresPage from "../pages/StoresPage";
import StoreProductsPage from "../pages/StoreProductsPage";
import StoreDetail from "../pages/StoreDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/stores/:storeName" element={<StoreProductsPage />} />
        <Route path="/store" element={<StoreDetail />} />
      </Route>
    </Routes>
  );
}