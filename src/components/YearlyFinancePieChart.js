import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function YearlyFinancePieChart({ data }) {

  const profitValue = data.profit || 0;

  const chartData = [
    {
      name: profitValue >= 0 ? "Profit" : "Loss",
      value: Math.abs(profitValue),
    },
  ];

  const color = profitValue >= 0 ? "#28a745" : "#dc3545";

  return (
    <div style={{ width: "100%", height: 360 }}>
      <h2 style={{ textAlign: "center", color: "orange" }}>
        Yearly Profit / Loss
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
              <Cell key={index} fill={color} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}