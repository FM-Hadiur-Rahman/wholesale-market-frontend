import { useEffect, useMemo, useState } from "react";
import ProductFilters from "../components/products/ProductFilters";
import ProductGrid from "../components/products/ProductGrid";
import EmptyState from "../components/ui/EmptyState";
import { getProducts } from "../services/productService";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts({ search, category });
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-600">
          Wholesale catalog
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
          Compare prices and order from verified suppliers.
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600">
          Products are now coming from your real MongoDB Atlas backend.
        </p>
      </div>

      <ProductFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      <div className="mt-8">
        {loading ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="font-black text-slate-950">Loading products...</p>
          </div>
        ) : error ? (
          <EmptyState title="Failed to load products" description={error} />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </section>
  );
}
