import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#28a745", "#ffc107", "#dc3545"];

export default function AnimalStatusChart({ month }) {
  const [data, setData] = useState([]);

  // ✅ renamed to avoid collision
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 7);
  });

  // ✅ wrap in useCallback
  const fetchData = useCallback(async () => {
    const [year, mon] = selectedMonth.split("-");
    const from = `${year}-${mon}-01`;

    // ✅ correct last day of month
    const lastDay = new Date(year, mon, 0).getDate();
    const to = `${year}-${mon}-${lastDay}`;

    const res = await axios.get(
      `https://farm-pgi5.onrender.com/api/animals/?from=${from}&to=${to}`
    );

    const animals = res.data;

    const counts = {
      active: 0,
      sold: 0,
      dead: 0,
    };

    animals.forEach((a) => {
      counts[a.status]++;
    });

    setData([
      { name: "Active", value: counts.active },
      { name: "Sold", value: counts.sold },
      { name: "Dead", value: counts.dead },
    ]);
  }, [selectedMonth]); // ✅ depends on selectedMonth

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ width: "100%", height: 360 }}>
      <h2 style={{ textAlign: "center" }}>Animal Status (Monthly)</h2>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            innerRadius={80}
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
