import { useEffect, useMemo, useState } from "react";
import { Boxes, PackageCheck, AlertTriangle, Wallet } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Input from "../../components/ui/Input";
import EmptyState from "../../components/ui/EmptyState";
import StatCard from "../../components/dashboard/StatCard";
import { formatCurrency } from "../../lib/utils";
import {
  getMySupplierProducts,
  updateMySupplierProduct,
} from "../../services/supplierService";

const stockTone = {
  available: "emerald",
  low_stock: "amber",
  out_of_stock: "red",
};

export default function SupplierProductsPage() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    price: "",
    stockStatus: "available",
    minOrder: "",
    deliveryTime: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const stats = useMemo(() => {
    const lowStock = products.filter(
      (p) => p.myStockStatus === "low_stock",
    ).length;
    const active = products.filter(
      (p) => p.myStockStatus !== "out_of_stock",
    ).length;
    const inventoryValue = products.reduce(
      (sum, p) => sum + Number(p.myPrice || 0) * Number(p.myMinOrder || 1),
      0,
    );

    return {
      total: products.length,
      active,
      lowStock,
      inventoryValue,
    };
  }, [products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getMySupplierProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({
      price: product.myPrice || "",
      stockStatus: product.myStockStatus || "available",
      minOrder: product.myMinOrder || "",
      deliveryTime: product.myDeliveryTime || "Same day",
    });
  };

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await updateMySupplierProduct(editing._id, {
        price: Number(form.price),
        stockStatus: form.stockStatus,
        minOrder: Number(form.minOrder),
        deliveryTime: form.deliveryTime,
      });

      setEditing(null);
      await loadProducts();
    } catch (err) {
      alert(err.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <DashboardLayout
      role="supplier"
      title="Supplier Products"
      subtitle="Manage your own product prices, stock status and delivery time."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="My Products" value={stats.total} icon={Boxes} />
        <StatCard
          label="Active Listings"
          value={stats.active}
          icon={PackageCheck}
        />
        <StatCard
          label="Low Stock"
          value={stats.lowStock}
          icon={AlertTriangle}
        />
        <StatCard
          label="Min Order Value"
          value={formatCurrency(stats.inventoryValue)}
          icon={Wallet}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <Button>Add New Product</Button>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="rounded-[2rem] bg-white p-10 font-black">
            Loading supplier products...
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            title="No products yet"
            description="Products supplied by your account will appear here."
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const priceDifference =
                Number(product.myPrice || 0) -
                Number(product.bestMarketPrice || 0);

              return (
                <div
                  key={product._id}
                  className={`overflow-hidden rounded-[2rem] border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                    product.myStockStatus === "low_stock"
                      ? "border-amber-200"
                      : product.myStockStatus === "out_of_stock"
                        ? "border-red-200"
                        : "border-slate-200"
                  }`}
                >
                  <div className="relative h-48 overflow-hidden rounded-3xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute left-4 top-4">
                      <Badge tone={stockTone[product.myStockStatus] || "slate"}>
                        {product.myStockStatus?.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-2 pt-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
                      {product.category}
                    </p>

                    <h3 className="mt-2 text-xl font-black text-slate-950">
                      {product.name}
                    </h3>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-emerald-50 p-4">
                        <p className="text-xs font-bold text-emerald-700">
                          Your Price
                        </p>
                        <p className="mt-1 text-xl font-black text-slate-950">
                          {formatCurrency(product.myPrice)}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-100 p-4">
                        <p className="text-xs font-bold text-slate-500">
                          Market Best
                        </p>
                        <p className="mt-1 text-xl font-black text-slate-950">
                          {formatCurrency(product.bestMarketPrice)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-blue-50 p-4">
                      <p className="text-sm font-bold text-blue-700">
                        Min Order: {product.myMinOrder} {product.unit}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-blue-600">
                        Delivery: {product.myDeliveryTime}
                      </p>
                    </div>

                    <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm font-bold text-slate-700">
                        Price Position
                      </p>
                      <p
                        className={`mt-1 text-sm font-black ${
                          priceDifference === 0
                            ? "text-emerald-700"
                            : "text-amber-700"
                        }`}
                      >
                        {priceDifference === 0
                          ? "You are offering the best market price"
                          : `${formatCurrency(priceDifference)} higher than best price`}
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <Button onClick={() => openEdit(product)}>
                        Edit Price
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => openEdit(product)}
                      >
                        Update Stock
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl">
            <h2 className="text-2xl font-black text-slate-950">Edit Product</h2>

            <p className="mt-1 text-sm font-semibold text-slate-500">
              {editing.name}
            </p>

            <div className="mt-6 grid gap-4">
              <Input
                label="Your Price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
              />

              <Input
                label="Minimum Order"
                name="minOrder"
                type="number"
                value={form.minOrder}
                onChange={handleChange}
              />

              <Input
                label="Delivery Time"
                name="deliveryTime"
                value={form.deliveryTime}
                onChange={handleChange}
              />

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Stock Status
                </span>

                <select
                  name="stockStatus"
                  value={form.stockStatus}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                >
                  <option value="available">Available</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setEditing(null)}
                disabled={saving}
              >
                Cancel
              </Button>

              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
