import { Check, CheckCircle2, Clock, ShoppingCart, Truck } from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { formatCurrency } from "../../lib/utils";

export default function PriceCompareCard({ entry, best, onAdd, added }) {
  const supplier = entry.supplier;

  return (
    <div
      className={`rounded-3xl border bg-white p-5 shadow-sm transition ${
        added ? "border-emerald-300 ring-4 ring-emerald-50" : "border-slate-200"
      }`}
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-black text-slate-950">
              {supplier?.name}
            </h3>

            {best && <Badge>Best price</Badge>}
            {supplier?.isVerified && <Badge tone="blue">Verified</Badge>}
            {added && <Badge tone="emerald">Added to cart</Badge>}
          </div>

          <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold text-slate-500">
            <span className="flex items-center gap-2">
              <Truck size={16} /> {entry.deliveryTime}
            </span>

            <span className="flex items-center gap-2">
              <Clock size={16} /> Min order: {entry.minOrder}
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} /> {entry.stockStatus}
            </span>
          </div>
        </div>

        <div className="text-left md:text-right">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            Wholesale price
          </p>

          <p className="mt-1 text-3xl font-black text-slate-950">
            {formatCurrency(entry.price)}
          </p>

          <Button
            onClick={onAdd}
            className={`mt-4 w-full md:w-auto ${
              added ? "bg-emerald-700 hover:bg-emerald-700" : ""
            }`}
          >
            {added ? <Check size={18} /> : <ShoppingCart size={18} />}
            {added ? "Added" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
}
