import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinners from "../../../Components/LoadingSpinners";

const COLORS = ["#4ade80", "#facc15", "#f87171", "#a78bfa", "#60a5fa"];


const AdminStatusPieChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data: summary = {}, isLoading } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/summary");
      return res?.data;
    },
  });

  const users = summary?.users || {};
  const products = summary?.products || {};

  const cards = [
    { label: "Total Users", value: users.total, color: "indigo" },
    { label: "Admins", value: users.admins, color: "red" },
    { label: "Moderators", value: users.moderators, color: "blue" },
    { label: "Regular Users", value: users.regular, color: "gray" },
    { label: "Total Products", value: products.total, color: "purple" },
    { label: "Accepted", value: products.accepted, color: "green" },
    { label: "Pending", value: products.pending, color: "yellow" },
    { label: "Rejected", value: products.rejected, color: "rose" },
  ];

  const pieData = [
    { name: "Accepted", value: products.accepted || 0, fill: COLORS[0] },
    { name: "Pending", value: products.pending || 0, fill: COLORS[1] },
    { name: "Rejected", value: products.rejected || 0, fill: COLORS[2] },
    { name: "Review", value: products.review || 0, fill: COLORS[3] },
    { name: "Total Users", value: users.total || 0, fill: COLORS[4] },
  ];

  if (isLoading) return <LoadingSpinners />;

  return (
    <div className="p-4 space-y-8 max-w-7xl mx-auto">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        data-aos="fade-up"
      >
        {cards.map((item, idx) => (
          <div
            key={idx}
            className={`bg-white shadow-md rounded-lg p-5 border-l-4 border-${item.color}-500`}
            data-aos="zoom-in"
            data-aos-delay={idx * 100}
          >
            <h3 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase mb-1">
              {item.label}
            </h3>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">
              {item.value ?? 0}
            </p>
          </div>
        ))}
      </div>

      <div
        className="w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-white rounded-xl shadow-md p-4 py-8 sm:py-10"
        data-aos="fade-up"
        data-aos-delay={500}
      >
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center text-base-content">
          Product Status Distribution
        </h3>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [value, name]}
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminStatusPieChart;
