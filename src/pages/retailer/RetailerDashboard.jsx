import {
  ClipboardList,
  PackageSearch,
  ShoppingCart,
  Truck,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import OrderTable from "../../components/dashboard/OrderTable";
import RevenueChart from "../../components/dashboard/RevenueChart";
import Button from "../../components/ui/Button";
import { orders } from "../../data/orders";
import { revenueData } from "../../data/stats";

export default function RetailerDashboard() {
  return (
    <DashboardLayout
      role="retailer"
      title="Retailer Dashboard"
      subtitle="Search wholesale products, compare supplier prices and track your shop orders."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="My Orders"
          value="42"
          change="+12%"
          icon={ClipboardList}
        />
        <StatCard label="Pending" value="6" change="+3%" icon={ShoppingCart} />
        <StatCard label="Suppliers" value="14" change="+8%" icon={Truck} />
        <StatCard
          label="Saved Products"
          value="89"
          change="+18%"
          icon={PackageSearch}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <RevenueChart data={revenueData} />

        <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">
            Quick Order
          </p>

          <h3 className="mt-3 text-3xl font-black">Need stock today?</h3>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            Find pharma and shop products from verified suppliers and send order
            requests instantly.
          </p>

          <Button className="mt-6 w-full" size="lg">
            Browse Wholesale Products
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <OrderTable orders={orders} />
      </div>
    </DashboardLayout>
  );
}
