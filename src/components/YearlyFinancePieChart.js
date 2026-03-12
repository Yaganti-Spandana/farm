import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#007bff", "#dc3545", "#28a745"];

export default function FinancePieChart({ summary }) {

  const data = [
    { name: "Sales", value: summary.total_sales || 0 },
    { name: "Expenses", value: summary.total_expenses || 0 },
    { name: "Profit", value: summary.profit || 0 },
  ];

  const renderLabel = ({ name, value }) => {
    return `${name}: ₹${value}`;
  };

  return (
    <div style={{ width: "100%", height: 360 }}>
      <h2 style={{ textAlign: "center", color: "orange" }}>
        Finance Distribution
      </h2>

      <ResponsiveContainer width="100%" height="300">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            innerRadius={70}
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