export default function FinancePieChart({ data }) {

  const chartData = [
    { name: "Profit", value: data.profit || 0 },
    { name: "Expenses", value: data.total_expenses || 0 },
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
            outerRadius={80}
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