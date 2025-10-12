// src/pages/Dashboard/DefaultDashboard.jsx
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const KPI_CARDS = [
  { id: "customers", title: "Customers", value: "3,781", meta: "+11.01%" },
  { id: "orders", title: "Orders", value: "1,219", meta: "-0.03%" },
  { id: "revenue", title: "Revenue", value: "$695", meta: "+15.03%" },
  { id: "growth", title: "Growth", value: "30.1%", meta: "+6.08%" },
];

const PROJECTIONS = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 18 },
  { month: "Mar", value: 15 },
  { month: "Apr", value: 20 },
  { month: "May", value: 13 },
  { month: "Jun", value: 19 },
];

const REVENUE_SERIES = [
  { month: "Jan", previous: 10, current: 11 },
  { month: "Feb", previous: 14, current: 15 },
  { month: "Mar", previous: 13, current: 12 },
  { month: "Apr", previous: 16, current: 18 },
  { month: "May", previous: 15, current: 14 },
  { month: "Jun", previous: 18, current: 20 },
];

const TOP_PRODUCTS = [
  { name: "ASOS Ridley High Waist", price: "$79.49", qty: 82, amount: "$6,518.18" },
  { name: "Marco Lightweight Shirt", price: "$128.50", qty: 37, amount: "$4,754.50" },
  { name: "Half Sleeve Shirt", price: "$39.99", qty: 64, amount: "$2,559.36" },
  { name: "Lightweight Jacket", price: "$20.00", qty: 184, amount: "$3,680.00" },
  { name: "Marco Shoes", price: "$79.49", qty: 64, amount: "$1,965.81" },
];

const DONUT_DATA = [
  { name: "Direct", value: 38.6 },
  { name: "Affiliate", value: 17.3 },
  { name: "Sponsored", value: 19.8 },
  { name: "E-mail", value: 24.3 },
];
const DONUT_COLORS = ["#22c55e", "#60a5fa", "#f97316", "#7c3aed"];



const KPI = ({ title, value, meta }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm  border-gray-100 w-50.5 ">
    <div className="text-xs text-gray-500" >{title}</div>
    <div className="mt-3 flex items-center justify-between  hover:flex-row-reverse">
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{meta}</div>
    </div>
  </div>
);

const ProjectionsCard = ({ data }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 h-full">
    <div className="text-sm font-medium text-gray-800 mb-3">Projections vs Actuals</div>
    <div style={{ height: 120 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }} />
          <CartesianGrid vertical={false} stroke="#F3F4F6" />
          <Bar dataKey="value" fill="#DBEAFE" radius={[6, 6, 0, 0]} barSize={12} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const RevenueArea = ({ data }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
    <div className="text-sm font-medium text-gray-800 mb-3">Revenue</div>
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#F3F4F6" strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fill: "#9CA3AF" }} />
          <YAxis tick={{ fill: "#9CA3AF" }} />
          <Tooltip />
          <Line type="monotone" dataKey="previous" stroke="#BFDBFE" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="current" stroke="#2563EB" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const MapAndLocations = () => (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 h-full">
    <div className="text-sm font-medium text-gray-800 mb-3">Revenue by Location</div>
    <div className="flex gap-3">
      <div className="w-36 h-24 rounded bg-gray-50 flex items-center justify-center">
        {/* Minimal map placeholder (keeps small and clean) */}
        <svg viewBox="0 0 160 100" className="w-full h-full" aria-hidden>
          <rect x="0" y="0" width="160" height="100" rx="6" fill="transparent" />
          <circle cx="110" cy="30" r="3.5" fill="#2563EB" />
          <circle cx="95" cy="60" r="3.5" fill="#2563EB" />
          <circle cx="50" cy="40" r="3.5" fill="#2563EB" />
          <circle cx="135" cy="65" r="3.5" fill="#2563EB" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="text-sm mb-2">New York <span className="float-right text-gray-500">72K</span></div>
        <div className="h-2 bg-gray-100 rounded mb-3">
          <div className="h-full bg-blue-300 rounded" style={{ width: "60%" }} />
        </div>

        <div className="text-sm mb-2">San Francisco <span className="float-right text-gray-500">39K</span></div>
        <div className="h-2 bg-gray-100 rounded mb-3">
          <div className="h-full bg-blue-300 rounded" style={{ width: "32%" }} />
        </div>

        <div className="text-sm mb-2">Sydney <span className="float-right text-gray-500">25K</span></div>
        <div className="h-2 bg-gray-100 rounded mb-3">
          <div className="h-full bg-blue-300 rounded" style={{ width: "20%" }} />
        </div>

        <div className="text-sm mb-2">Singapore <span className="float-right text-gray-500">61K</span></div>
        <div className="h-2 bg-gray-100 rounded">
          <div className="h-full bg-blue-300 rounded" style={{ width: "51%" }} />
        </div>
      </div>
    </div>
  </div>
);

const ProductsTable = ({ data }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
    <div className="text-sm font-medium text-gray-800 mb-4">Top Selling Products</div>
    <table className="w-full text-sm">
      <thead className="text-gray-400">
        <tr>
          <th className="text-left pb-3">Name</th>
          <th className="text-left pb-3">Price</th>
          <th className="text-left pb-3">Quantity</th>
          <th className="text-left pb-3">Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.name} className="border-b last:border-0 border-gray-100">
            <td className="py-3">{row.name}</td>
            <td className="py-3">{row.price}</td>
            <td className="py-3">{row.qty}</td>
            <td className="py-3">{row.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const DonutCard = ({ data }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center">
    <div className="text-sm font-medium text-gray-800 mb-3">Total Sales</div>
    <div style={{ width: 150, height: 150 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={40} outerRadius={60} paddingAngle={3} labelLine={false}>
            {data.map((entry, idx) => (
              <Cell key={entry.name} fill={DONUT_COLORS[idx % DONUT_COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>

    <div className="mt-3 w-full text-sm text-gray-600">
      {data.map((d, i) => (
        <div key={d.name} className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: DONUT_COLORS[i] }} />
            <span>{d.name}</span>
          </div>
          <div className="text-sm font-medium">{d.value}%</div>
        </div>
      ))}
    </div>
  </div>
);

/* --------------------------
   Main component
   -------------------------- */
export default function DefaultDashboard() {
  return (
    <main className="w-full p-6  ">
  {/* Header */}
  <div className="mb-6">
    <h3 className="text-base font-semibold text-gray-900">eCommerce</h3>
  </div>

  {/* KPI row + Projections */}
  <div className="flex flex-col lg:flex-row mb-4 gap-4">
    <div className="flex flex-wrap gap-4 w-108 h-63  justify-evenly">
      {KPI_CARDS.map((k) => (
        <KPI key={k.id} {...k} />
      ))}
    </div>

    <div className="max-w-[100%] w-full ">
      <ProjectionsCard data={PROJECTIONS} />
    </div>
  </div>

  {/* Revenue chart + Map */}
  <div className="flex flex-col lg:flex-row gap-4 mb-4">
    <div className="w-full  ">
      <RevenueArea data={REVENUE_SERIES} />
    </div>

    <div className="w-[202px] ">
      <MapAndLocations />
    </div>
  </div>

  {/* Bottom: table + donut */}
  <div className="flex flex-col lg:flex-row gap-4 h-full">
    <div className="flex- lg:w-full h-full  ">
      <ProductsTable data={TOP_PRODUCTS} />
    </div>

    <div className="flex-shrink-0 w-[202px] ">
      <DonutCard data={DONUT_DATA} />
    </div>
  </div>
</main>

  );
}
