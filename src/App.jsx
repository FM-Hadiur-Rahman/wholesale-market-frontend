import { Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import RetailerDashboard from "./pages/retailer/RetailerDashboard";
import MyOrdersPage from "./pages/retailer/MyOrdersPage";

import SupplierDashboard from "./pages/supplier/SupplierDashboard";
import SupplierProductsPage from "./pages/supplier/SupplierProductsPage";
import SupplierOrdersPage from "./pages/supplier/SupplierOrdersPage";

import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/retailer/dashboard" element={<RetailerDashboard />} />
          <Route path="/retailer/orders" element={<MyOrdersPage />} />

          <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
          <Route path="/supplier/products" element={<SupplierProductsPage />} />
          <Route path="/supplier/orders" element={<SupplierOrdersPage />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
