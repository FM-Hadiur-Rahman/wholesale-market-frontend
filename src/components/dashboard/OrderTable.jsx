import Badge from "../ui/Badge";
import { formatCurrency } from "../../lib/utils";

const statusTone = {
  pending: "amber",
  confirmed: "blue",
  processing: "blue",
  delivered: "emerald",
  cancelled: "red",
};

export default function OrderTable({ orders = [] }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h3 className="text-xl font-black text-slate-950">Recent Orders</h3>
        <p className="mt-1 text-sm text-slate-500">
          Latest wholesale orders placed through the platform.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-slate-50 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            <tr>
              <th className="px-5 py-4">Order ID</th>
              <th className="px-5 py-4">Retailer</th>
              <th className="px-5 py-4">Items</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {orders.map((order) => (
              <tr key={order._id || order.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 text-sm font-black text-slate-950">
                  {(order._id || order.id)?.slice?.(-8) || order.id}
                </td>

                <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                  {order.retailerBusinessName || order.retailer}
                </td>

                <td className="px-5 py-4 text-sm text-slate-500">
                  {order.items?.length
                    ? `${order.items.length} items`
                    : order.supplier}
                </td>

                <td className="px-5 py-4 text-sm font-black text-slate-950">
                  {formatCurrency(order.subtotal || order.amount)}
                </td>

                <td className="px-5 py-4">
                  <Badge tone={statusTone[order.status] || "slate"}>
                    {order.status}
                  </Badge>
                </td>

                <td className="px-5 py-4 text-sm text-slate-500">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : order.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
