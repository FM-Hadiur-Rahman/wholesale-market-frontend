import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { formatCurrency } from "../../lib/utils";
import {
  getSupplierOrders,
  updateOrderStatus,
} from "../../services/supplierService";

const statusTone = {
  pending: "amber",
  confirmed: "blue",
  processing: "blue",
  delivered: "emerald",
  cancelled: "red",
};

export default function SupplierOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getSupplierOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);

      const updatedOrder = await updateOrderStatus(orderId, status);

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? updatedOrder : order)),
      );
    } catch (err) {
      alert(err.message || "Failed to update status");
    } finally {
      setUpdatingId("");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <DashboardLayout
      role="supplier"
      title="Supplier Orders"
      subtitle="Accept, process and track retailer orders from MongoDB."
    >
      {loading ? (
        <div className="rounded-[2rem] bg-white p-10 font-black">
          Loading supplier orders...
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          title="No supplier orders"
          description="When retailers submit orders, they will appear here."
        />
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-black text-slate-950">
                      Order #{order._id.slice(-8)}
                    </h3>

                    <Badge tone={statusTone[order.status] || "slate"}>
                      {order.status}
                    </Badge>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    {order.retailerBusinessName} · {order.retailerPhone} ·{" "}
                    {order.retailerArea}
                  </p>
                </div>

                <div className="text-left lg:text-right">
                  <p className="text-sm font-bold text-slate-500">Subtotal</p>
                  <p className="text-2xl font-black text-slate-950">
                    {formatCurrency(order.subtotal)}
                  </p>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200">
                <table className="w-full min-w-[720px] text-left">
                  <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                    <tr>
                      <th className="px-5 py-4">Product</th>
                      <th className="px-5 py-4">Supplier</th>
                      <th className="px-5 py-4">Qty</th>
                      <th className="px-5 py-4">Price</th>
                      <th className="px-5 py-4">Total</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {order.items?.map((item, index) => (
                      <tr key={`${item.product}-${index}`}>
                        <td className="px-5 py-4 text-sm font-black text-slate-950">
                          {item.productName}
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-500">
                          {item.supplierName}
                        </td>
                        <td className="px-5 py-4 text-sm font-bold">
                          {item.quantity}
                        </td>
                        <td className="px-5 py-4 text-sm">
                          {formatCurrency(item.price)}
                        </td>
                        <td className="px-5 py-4 text-sm font-black">
                          {formatCurrency(item.lineTotal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button
                  size="sm"
                  disabled={updatingId === order._id}
                  onClick={() => handleStatus(order._id, "confirmed")}
                >
                  Accept
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  disabled={updatingId === order._id}
                  onClick={() => handleStatus(order._id, "processing")}
                >
                  Mark Processing
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  disabled={updatingId === order._id}
                  onClick={() => handleStatus(order._id, "delivered")}
                >
                  Delivered
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  disabled={updatingId === order._id}
                  onClick={() => handleStatus(order._id, "cancelled")}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
