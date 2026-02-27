import { useEffect, useState } from "react";
import axios from "axios";
import AnimalStatusChart from "./AnimalStatusChart";
import Navbar from "./navbar/navbar";
import "./components.css";

function Overview() {
  const [summary, setSummary] = useState({});
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 7);
  });

  // ✅ fetch summary
  useEffect(() => {
    const fetchSummary = async () => {
      const [year, mon] = month.split("-");
      const from = `${year}-${mon}-01`;
      const lastDay = new Date(year, mon, 0).getDate();
      const to = `${year}-${mon}-${lastDay}`;

      const res = await axios.get(
        `https://farm-pgi5.onrender.com/api/monthly-report/?from=${from}&to=${to}`
      );

      setSummary(res.data);
    };

    fetchSummary();
  }, [month]);

  return (
    <>
      <Navbar />

      <div className="overview-container">

        {/* 🔥 FILTER */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>

        {/* ===== SUMMARY CARDS ===== */}
        <div className="summary-grid">

          <div className="card">
            <h3>Total Animals</h3>
            <p>{summary.total_animals ?? 0}</p>
          </div>

          <div className="card">
            <h3>Total Milk</h3>
            <p>{summary.total_milk ?? 0} L</p>
          </div>

          <div className="card">
            <h3>Total Sales</h3>
            <p>₹{summary.total_income ?? 0}</p>
          </div>

          <div className="card">
            <h3>Expenses</h3>
            <p>₹{summary.total_expenses ?? 0}</p>
          </div>

          <div className="card">
            <h3>Profit / Loss</h3>
            <p style={{
              color: summary.profit >= 0 ? "green" : "red"
            }}>
              ₹{summary.profit ?? 0}
            </p>
          </div>

        </div>

        {/* ===== CHART ===== */}
        <div className="chart-card">
          <AnimalStatusChart month={month} />
        </div>

      </div>
    </>
  );
}

export default Overview;
