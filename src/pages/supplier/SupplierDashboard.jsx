import { useEffect, useMemo, useState } from "react";
import { Boxes, ClipboardList, Store, TrendingUp } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import OrderTable from "../../components/dashboard/OrderTable";
import RevenueChart from "../../components/dashboard/RevenueChart";
import { revenueData } from "../../data/stats";
import { getSupplierOrders } from "../../services/supplierService";
import EmptyState from "../../components/ui/EmptyState";

export default function SupplierDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const stats = useMemo(() => {
    const totalSales = orders.reduce(
      (sum, order) => sum + Number(order.subtotal || 0),
      0,
    );

    const uniqueRetailers = new Set(
      orders.map((order) => order.retailerBusinessName),
    ).size;

    const pendingOrders = orders.filter(
      (order) => order.status === "pending",
    ).length;

    return {
      totalOrders: orders.length,
      pendingOrders,
      uniqueRetailers,
      totalSales,
    };
  }, [orders]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getSupplierOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <DashboardLayout
      role="supplier"
      title="Supplier Dashboard"
      subtitle="Real supplier dashboard connected to MongoDB orders."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Incoming Orders"
          value={stats.totalOrders}
          change="+ live"
          icon={ClipboardList}
        />
        <StatCard
          label="Pending Orders"
          value={stats.pendingOrders}
          change="needs action"
          icon={Boxes}
        />
        <StatCard
          label="Retailer Shops"
          value={stats.uniqueRetailers}
          change="+ active"
          icon={Store}
        />
        <StatCard
          label="Total Sales"
          value={`৳${stats.totalSales.toLocaleString("en-BD")}`}
          change="+ real data"
          icon={TrendingUp}
        />
      </div>

      <div className="mt-6">
        <RevenueChart data={revenueData} />
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="rounded-[2rem] bg-white p-10 font-black">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            description="Retailer orders will appear here after submission."
          />
        ) : (
          <OrderTable orders={orders.slice(0, 8)} />
        )}
      </div>
    </DashboardLayout>
  );
}
