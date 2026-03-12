import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#28a745", "#dc3545"];

export default function YearlyFinancePieChart({ data }) {

  const chartData = [
    { name: "Profit", value: data.profit || 0 },

  ];

  return (
    <div style={{ width: "100%", height: 360 }}>
      <h2 style={{ textAlign: "center", color: "orange" }}>
        Yearly Profit vs Expenses
      </h2>

      <ResponsiveContainer width="100%" height="300">
        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={85}
            innerRadius={70}
            paddingAngle={3}
            label={({ name, value }) => `${name}: ₹${value}`}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
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