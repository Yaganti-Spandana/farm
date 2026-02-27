import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#28a745", "#007bff", "#dc3545"];

export default function MilkPieChart({ summary }) {
  const data = [
    { name: "Milk Sold", value: summary.milk_sold || 0 },
    { name: "Home Use", value: summary.milk_home || 0 },
    { name: "Wasted", value: summary.milk_wasted || 0 },
  ];

  return (
    <div style={{ width: "100%", height: 360 }}>
      <h2 style={{ textAlign: "center" }}>Milk Distribution</h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            innerRadius={80}   // ✅ donut style
            paddingAngle={3}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
