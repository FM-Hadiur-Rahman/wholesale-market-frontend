import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import OrderTable from "../../components/dashboard/OrderTable";
import EmptyState from "../../components/ui/EmptyState";
import { getMyOrders } from "../../services/orderService";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <DashboardLayout
      role="retailer"
      title="My Orders"
      subtitle="Track all wholesale orders placed from your shop account."
    >
      {loading ? (
        <div className="rounded-[2rem] bg-white p-10 font-black">
          Loading orders...
        </div>
      ) : error ? (
        <EmptyState title="Failed to load orders" description={error} />
      ) : (
        <OrderTable orders={orders} />
      )}
    </DashboardLayout>
  );
}
