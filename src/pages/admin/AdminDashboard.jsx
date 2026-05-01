import { Building2, ClipboardList, Store, Wallet } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import OrderTable from "../../components/dashboard/OrderTable";
import RevenueChart from "../../components/dashboard/RevenueChart";
import { orders } from "../../data/orders";
import { revenueData } from "../../data/stats";

export default function AdminDashboard() {
  return (
    <DashboardLayout
      role="admin"
      title="Admin Dashboard"
      subtitle="Monitor suppliers, retailers, orders and platform revenue."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Retailers" value="342" change="+27%" icon={Store} />
        <StatCard label="Suppliers" value="28" change="+9%" icon={Building2} />
        <StatCard
          label="Orders"
          value="1,284"
          change="+18%"
          icon={ClipboardList}
        />
        <StatCard label="GMV" value="৳18.4L" change="+31%" icon={Wallet} />
      </div>

      <div className="mt-6">
        <RevenueChart data={revenueData} />
      </div>

      <div className="mt-6">
        <OrderTable orders={orders} />
      </div>
    </DashboardLayout>
  );
}
