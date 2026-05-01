import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, PackageCheck, ShoppingCart } from "lucide-react";
import PriceCompareCard from "../components/products/PriceCompareCard";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import EmptyState from "../components/ui/EmptyState";
import { formatCurrency } from "../lib/utils";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart, isInCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || "Product not found");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <p className="font-black">Loading product...</p>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <EmptyState title="Product not found" description={error} />
      </section>
    );
  }

  const sortedSuppliers = [...(product.suppliers || [])].sort(
    (a, b) => a.price - b.price,
  );

  const bestEntry = sortedSuppliers[0];

  const handleAddToCart = (entry) => {
    if (!entry) return;

    addToCart(product, entry);
    setSuccessMessage(`${product.name} added to cart`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  };

  const bestEntryAdded = bestEntry ? isInCart(product, bestEntry) : false;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <Link
        to="/products"
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-emerald-700"
      >
        <ArrowLeft size={18} />
        Back to products
      </Link>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="h-[420px] w-full object-cover"
          />
        </div>

        <div>
          <Badge>{product.category}</Badge>

          <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-950">
            {product.name}
          </h1>

          <p className="mt-4 max-w-xl text-slate-600">
            {product.description ||
              "Compare wholesale supplier prices and send your order digitally."}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-emerald-50 p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
                Best Price
              </p>
              <p className="mt-2 text-3xl font-black text-slate-950">
                {formatCurrency(product.bestPrice || bestEntry?.price || 0)}
              </p>
            </div>

            <div className="rounded-3xl bg-slate-100 p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                Minimum Order
              </p>
              <p className="mt-2 text-3xl font-black text-slate-950">
                {bestEntry?.minOrder || 1}
              </p>
            </div>

            <div className="rounded-3xl bg-blue-50 p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">
                Unit
              </p>
              <p className="mt-2 text-3xl font-black text-slate-950">
                {product.unit}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              disabled={!bestEntry}
              onClick={() => handleAddToCart(bestEntry)}
              className={
                bestEntryAdded ? "bg-emerald-700 hover:bg-emerald-700" : ""
              }
            >
              <ShoppingCart size={20} />
              {bestEntryAdded ? "✓ Added to Cart" : "Add Best Price"}
            </Button>

            <Button size="lg" variant="outline">
              <PackageCheck size={20} />
              Request Availability
            </Button>
          </div>

          {successMessage && (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
              ✅ {successMessage}
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <div className="mb-5">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-600">
            Supplier comparison
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-950">
            Choose the best wholesale supplier.
          </h2>
        </div>

        <div className="space-y-4">
          {sortedSuppliers.map((entry, index) => (
            <PriceCompareCard
              key={entry.supplier?._id || index}
              entry={entry}
              best={index === 0}
              added={isInCart(product, entry)}
              onAdd={() => handleAddToCart(entry)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
