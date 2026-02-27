import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#28a745", "#007bff", "#dc3545"];
const renderLabel = ({ name, value }) => {
  return `${name}: ${value}Ltrs`;
};
export default function MilkPieChart({ summary }) {
  const data = [
    { name: "Sold", value: summary.milk_sold || 0 },
    { name: "Used", value: summary.milk_home || 0 },
    { name: "Wasted", value: summary.milk_wasted || 0 },
  ];

  return (
    <div style={{ width: "100%", height: 360 }}>
      <h2 style={{ textAlign: "center",color:"orange"  }}>Milk Distribution</h2>

      <ResponsiveContainer width="100%" height="300">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            innerRadius={70}   // ✅ donut style
            paddingAngle={3}
            label={renderLabel}
            labelLine={false}
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
