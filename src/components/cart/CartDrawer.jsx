import { X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";
import { formatCurrency } from "../../lib/utils";
import { createOrder } from "../../services/orderService";

export default function CartDrawer({ open, onClose }) {
  const { cart, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleSubmitOrder = async () => {
    try {
      setSubmitting(true);

      const payload = {
        paymentType: "cash",
        paidAmount: 0,
        items: cart.map((item) => ({
          productId: item.productId,
          supplierId: item.supplierId,
          quantity: item.quantity,
        })),
      };

      const data = await createOrder(payload);

      const firstSupplierPhone = cart[0]?.supplierWhatsapp || "8801700000000";

      window.open(
        `https://wa.me/${firstSupplierPhone}?text=${data.whatsappText}`,
        "_blank",
      );

      clearCart();
      onClose();
    } catch (err) {
      alert(err.message || "Failed to submit order. Please login as retailer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-slate-50 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white p-5">
          <div>
            <h2 className="text-xl font-black text-slate-950">Order Cart</h2>
            <p className="text-sm font-semibold text-slate-500">
              Save order in DB, then send WhatsApp to supplier.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <EmptyState
              title="Your cart is empty"
              description="Browse wholesale products and add items to your order cart."
            />
          ) : (
            cart.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        <div className="border-t border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500">Subtotal</span>
            <span className="text-2xl font-black text-slate-950">
              {formatCurrency(subtotal)}
            </span>
          </div>

          <Button
            className="w-full"
            size="lg"
            disabled={cart.length === 0 || submitting}
            onClick={handleSubmitOrder}
          >
            {submitting ? "Submitting..." : "Submit Order + WhatsApp"}
          </Button>

          <p className="mt-3 text-center text-xs font-semibold text-slate-500">
            Payment and delivery can continue through supplier’s usual process.
          </p>
        </div>
      </aside>
    </div>
  );
}
