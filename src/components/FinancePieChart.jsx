import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#3b82f6"];

// ✅ label formatter
const renderLabel = ({ name, value }) => {
  return `${name}: ₹${value}`;
};

function FinancePieChart({ summary }) {
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
      <h3 style={{ marginBottom: "10px",textAlign:"center",color:"orange" }}>
        Sales vs Expenses vs Profit/Loss
      </h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={3}
            label={renderLabel}   // ✅ numbers ON chart
            labelLine={false}     // ✅ cleaner look
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

          <Tooltip formatter={(v) => `₹${v}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FinancePieChart;
