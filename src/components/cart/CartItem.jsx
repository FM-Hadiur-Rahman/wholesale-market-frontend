import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../lib/utils";

export default function CartItem({ item }) {
  const { removeFromCart, updateQty } = useCart();

  return (
    <div className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-20 w-20 rounded-2xl object-cover"
      />

      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-black text-slate-950">{item.name}</h4>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {item.supplier}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => updateQty(item.id, "dec")}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200"
            >
              <Minus size={16} />
            </button>

            <span className="min-w-6 text-center text-sm font-black">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => updateQty(item.id, "inc")}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200"
            >
              <Plus size={16} />
            </button>
          </div>

          <p className="font-black text-slate-950">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
