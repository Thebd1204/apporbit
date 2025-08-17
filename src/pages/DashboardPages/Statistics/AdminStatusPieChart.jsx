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

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, name }) => {
  const radius = outerRadius + 25; // Position labels outside the pie
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#6b7280" // Use a neutral color for the labels
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs sm:text-sm font-semibold"
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

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
  ].filter(item => item.value > 0); // Filter out items with zero value

  if (isLoading) return <LoadingSpinners />;

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        data-aos="fade-up"
      >
        {cards.map((item, idx) => (
          <div
            key={idx}
            className={`bg-white shadow-lg rounded-xl p-6 border-l-4 border-${item.color}-500 transition-transform transform hover:scale-105`}
            data-aos="zoom-in"
            data-aos-delay={idx * 100}
          >
            <h3 className="text-sm sm:text-base font-semibold text-gray-600 uppercase mb-2">
              {item.label}
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
              {item.value ?? 0}
            </p>
          </div>
        ))}
      </div>

      <div
        className="w-full h-[500px] sm:h-[600px] md:h-[700px] bg-white rounded-xl shadow-lg p-6 sm:p-8"
        data-aos="fade-up"
        data-aos-delay={500}
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-center text-gray-800">
          Product Status Distribution
        </h3>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 20, bottom: 60, left: 20 }}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="70%" // Adjust outer radius to make space for labels
              labelLine={true} // Show lines connecting labels to slices
              label={renderCustomizedLabel}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  stroke={entry.fill}
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [value, name]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: '40px' }} // Add padding to the legend
              iconSize={14}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminStatusPieChart;



