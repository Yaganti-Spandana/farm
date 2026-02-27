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
const renderLabel = ({ name, value }) => {
  return `${name}: ${value}`;
};

export default function AnimalStatusChart({ month }) {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const [year, mon] = month.split("-");
      const from = `${year}-${mon}-01`;
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
        if (counts[a.status] !== undefined) {
          counts[a.status]++;
        }
      });

      setData([
        { name: "Active", value: counts.active },
        { name: "Sold", value: counts.sold },
        { name: "Dead", value: counts.dead },
      ]);
    } catch (err) {
      console.error("Animal chart error", err);
    }
  }, [month]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ width: "100%", height: 360 }}>
      <h2 style={{ textAlign: "center",color:"orange"  }}>Animal Status</h2>

      <ResponsiveContainer width="80%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            innerRadius={60}   
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
