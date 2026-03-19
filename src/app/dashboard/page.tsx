"use client";

import {
  Package,
  ShoppingBag,
  Users,
  Store,
  IndianRupee,
  Clock,
  AlertTriangle,
  Wallet,
  ArrowUpRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { KpiCard } from "@/components/ui/kpicards";

const statCards = [
  {
    title: "Total Agents",
    value: "248",
    trend: "+12.4%",
    positive: true,
    icon: Users,
    accent: "indigo",
  },
  {
    title: "Total Retailers",
    value: "1,982",
    trend: "+8.1%",
    positive: true,
    icon: Store,
    accent: "emerald",
  },
  {
    title: "Total Products",
    value: "12,430",
    trend: "+2.3%",
    positive: true,
    icon: Package,
    accent: "sky",
  },
  {
    title: "Total Orders",
    value: "8,764",
    trend: "+18.9%",
    positive: true,
    icon: ShoppingBag,
    accent: "violet",
  },
  {
    title: "Total Revenue",
    value: "₹ 38.4L",
    trend: "+22.6%",
    positive: true,
    icon: IndianRupee,
    accent: "pink",
  },
  {
    title: "Pending Orders",
    value: "182",
    trend: "-4.1%",
    positive: false,
    icon: Clock,
    accent: "amber",
  },
  {
    title: "Low Stock Products",
    value: "37",
    trend: "+6.4%",
    positive: false,
    icon: AlertTriangle,
    accent: "rose",
  },
  {
    title: "Pending Withdrawals",
    value: "₹ 4.2L",
    trend: "+3.8%",
    positive: true,
    icon: Wallet,
    accent: "slate",
  },
] as const;

const revenueData = [
  { month: "Jan", revenue: 2.8 },
  { month: "Feb", revenue: 3.1 },
  { month: "Mar", revenue: 3.9 },
  { month: "Apr", revenue: 4.2 },
  { month: "May", revenue: 4.9 },
  { month: "Jun", revenue: 5.3 },
  { month: "Jul", revenue: 5.8 },
  { month: "Aug", revenue: 6.4 },
  { month: "Sep", revenue: 6.1 },
  { month: "Oct", revenue: 6.9 },
  { month: "Nov", revenue: 7.4 },
  { month: "Dec", revenue: 8.2 },
];

const recentOrders = [
  {
    id: "#ORD-94821",
    customer: "Ayush Sharma",
    amount: "₹ 12,480",
    status: "Delivered",
    date: "19 Mar, 2026",
  },
  {
    id: "#ORD-94793",
    customer: "True Beauty Mart",
    amount: "₹ 32,910",
    status: "Pending",
    date: "19 Mar, 2026",
  },
  {
    id: "#ORD-94752",
    customer: "Sanjay General Store",
    amount: "₹ 8,320",
    status: "Cancelled",
    date: "18 Mar, 2026",
  },
  {
    id: "#ORD-94718",
    customer: "Glow & Care Pharmacy",
    amount: "₹ 21,780",
    status: "Delivered",
    date: "18 Mar, 2026",
  },
  {
    id: "#ORD-94697",
    customer: "Beauty Hub Franchise",
    amount: "₹ 44,120",
    status: "Pending",
    date: "17 Mar, 2026",
  },
];

const lowStockProducts = [
  {
    name: "Herbal Skin Glow Serum 30ml",
    sku: "SKU-GLW-3021",
    stock: 9,
    threshold: 25,
    distributors: 18,
  },
  {
    name: "Ayurvedic Hair Oil 100ml",
    sku: "SKU-HR-1044",
    stock: 14,
    threshold: 30,
    distributors: 23,
  },
  {
    name: "Daily Wellness Capsules (60)",
    sku: "SKU-WL-6012",
    stock: 7,
    threshold: 20,
    distributors: 12,
  },
  {
    name: "Organic Green Tea Pack",
    sku: "SKU-GT-2011",
    stock: 4,
    threshold: 18,
    distributors: 9,
  },
];

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  const styles =
    normalized === "delivered"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : normalized === "pending"
        ? "bg-amber-50 text-amber-700 border-amber-100"
        : "bg-rose-50 text-rose-700 border-rose-100";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current/70 mr-1.5" />
      {status}
    </span>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-7 lg:space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
            Distributor Admin Overview
          </h1>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Live snapshot of network performance, orders and inventory health.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] text-gray-500 sm:text-xs">
          <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-pink-100">
            Current FY: <span className="ml-1 font-semibold text-gray-800">2025–26</span>
          </span>
          <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-gray-100">
            Updated <span className="ml-1 font-medium text-gray-700">2 mins ago</span>
          </span>
        </div>
      </div>

      <section aria-label="Key metrics" className="space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4 xl:grid-cols-4">
          {statCards.map((card) => (
            <KpiCard
              key={card.title}
              title={card.title}
              value={card.value}
              trendLabel={card.trend}
              trendPositive={card.positive}
              icon={card.icon}
              accent={card.accent}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] xl:gap-5">
        <article className="rounded-2xl border border-pink-50 bg-white/80 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
                Monthly Revenue
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Distributor network performance across the current financial year.
              </p>
            </div>
            <div className="flex items-end gap-2 text-right">
              <div className="text-xs text-gray-500">
                <p className="font-medium text-gray-700">₹ 8.2L</p>
                <p>Dec, 2025</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +27.3%
              </span>
            </div>
          </div>

          <div className="mt-4 h-56 w-full sm:mt-5 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{ top: 10, right: 12, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  stroke="#f1d4df"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  tickFormatter={(v) => `${v}L`}
                  width={32}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    borderColor: "#f9ccd9",
                    boxShadow:
                      "0 18px 45px rgba(236, 90, 135, 0.18)",
                    padding: "10px 12px",
                  }}
                  formatter={(value: number) => [`₹ ${value.toFixed(1)}L`, "Revenue"]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ec5a87"
                  strokeWidth={2.4}
                  dot={{
                    r: 3,
                    strokeWidth: 1.5,
                    stroke: "#ffffff",
                    fill: "#ec5a87",
                  }}
                  activeDot={{
                    r: 5,
                    strokeWidth: 2,
                    stroke: "#f9ccd9",
                    fill: "#ec5a87",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="flex flex-col rounded-2xl border border-amber-100 bg-amber-25/60 p-4 shadow-[0_10px_30px_rgba(245,158,11,0.10)] sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 sm:text-base">
                Low Stock Alerts
                <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700">
                  critical
                </span>
              </h2>
              <p className="mt-1 text-xs text-gray-600">
                Prioritize replenishment to avoid distributor and retailer stockouts.
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-amber-700 shadow-sm ring-1 ring-amber-100">
              <AlertTriangle className="h-3.5 w-3.5" />
              {lowStockProducts.length} products
            </div>
          </div>

          <div className="mt-4 space-y-2.5 overflow-hidden rounded-xl border border-amber-100 bg-white/40">
            {lowStockProducts.map((product, index) => (
              <div
                key={product.sku}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-xs sm:px-4 sm:py-3 ${
                  index !== lowStockProducts.length - 1
                    ? "border-b border-amber-50"
                    : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[13px] font-medium text-gray-900">
                    {product.name}
                  </p>
                  <p className="mt-0.5 text-[11px] text-gray-500">
                    {product.sku} • {product.distributors} active distributors
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 text-right">
                  <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
                    {product.stock} in stock
                  </span>
                  <span className="text-[10px] text-amber-700">
                    Threshold: {product.threshold} units
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[11px] text-gray-500">
            Auto-notifications are sent to distributors once inventory reaches{" "}
            <span className="font-semibold text-amber-700">
              80% of threshold
            </span>
            .
          </p>
        </article>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-5 lg:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
              Recent Orders
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Latest orders flowing in from distributor and retailer network.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500 sm:text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              62% delivered today
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1 font-medium text-gray-600">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              31% pending
            </span>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white/60">
          <div className="max-sm:-mx-4 max-sm:block max-sm:overflow-x-auto max-sm:px-4">
            <table className="min-w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-gray-100 bg-gray-50/60 text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">
                <tr>
                  <th className="px-4 py-3 sm:px-5">Order ID</th>
                  <th className="px-4 py-3 sm:px-5">Customer</th>
                  <th className="px-4 py-3 sm:px-5 text-right">Amount</th>
                  <th className="px-4 py-3 sm:px-5">Status</th>
                  <th className="px-4 py-3 sm:px-5 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/80">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="align-middle hover:bg-pink-50/40"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-[12px] font-semibold text-gray-900 sm:px-5 sm:text-sm">
                      {order.id}
                    </td>
                    <td className="max-w-[180px] truncate px-4 py-3 text-[12px] text-gray-700 sm:max-w-xs sm:px-5 sm:text-sm">
                      {order.customer}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-[12px] font-semibold text-gray-900 sm:px-5 sm:text-sm">
                      {order.amount}
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-[11px] text-gray-500 sm:px-5 sm:text-xs">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}