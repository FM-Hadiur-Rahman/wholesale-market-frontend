import { Link } from "react-router-dom";
import { ArrowRight, Package, TrendingDown } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { formatCurrency } from "../../lib/utils";

export default function ProductCard({ product }) {
  return (
    <Card className="group overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4">
          <Badge tone={product.stock === "Low stock" ? "amber" : "emerald"}>
            {product.stock}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
              {product.category}
            </p>

            <h3 className="mt-2 text-lg font-black text-slate-950">
              {product.name}
            </h3>
          </div>

          <div className="rounded-2xl bg-slate-100 p-3 text-slate-600">
            <Package size={20} />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="text-xs font-bold text-emerald-700">Best Price</p>
            <p className="mt-1 text-xl font-black text-slate-950">
              {formatCurrency(product.bestPrice)}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-4">
            <p className="text-xs font-bold text-slate-500">Min Order</p>
            <p className="mt-1 text-xl font-black text-slate-950">
              {product.minOrder} {product.unit}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">
          <TrendingDown size={18} />
          Compare {product.suppliers.length} supplier prices
        </div>

        <Link to={`/products/${product.id}`} className="mt-5 block">
          <Button className="w-full">
            View Details <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
