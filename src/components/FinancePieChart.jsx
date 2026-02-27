import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#3b82f6"];

function FinancePieChart({ summary }) {
  // ✅ prepare data safely
  const data = [
    {
      name: "Sales",
      value: summary.total_income || 0,
    },
    {
      name: "Expenses",
      value: summary.total_expenses || 0,
    },
    {
      name: summary.profit >= 0 ? "Profit" : "Loss",
      value: Math.abs(summary.profit || 0),
    },
  ];

  return (
    <div>
      <h3 style={{ marginBottom: "10px" }}>
        Sales vs Expenses vs Profit/Loss
      </h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}   // ✅ no color inside (donut)
            outerRadius={110}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="#fff"
                strokeWidth={3}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FinancePieChart;
