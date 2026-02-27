import { useEffect, useState } from "react";
import axios from "axios";
import AnimalStatusChart from "./AnimalStatusChart";
import Navbar from "./navbar/navbar";
import "./components.css";
import MilkPieChart from "./MilkPieChart";
import FinancePieChart from "./FinancePieChart";
function Overview() {
  // ✅ default = current month
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 7);
  });

  const [summary, setSummary] = useState({});

  // ✅ fetch summary based on month
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [year, mon] = month.split("-");
        const from = `${year}-${mon}-01`;
        const lastDay = new Date(year, mon, 0).getDate();
        const to = `${year}-${mon}-${lastDay}`;

        const res = await axios.get(
          `https://farm-pgi5.onrender.com/api/monthly-report/?from=${from}&to=${to}`
        );

        setSummary(res.data);
      } catch (err) {
        console.error("Summary fetch error", err);
      }
    };

    fetchSummary();
  }, [month]);

  return (
    <>
      <Navbar />

      <div className="overview-container">

        {/* ===== MONTH FILTER ===== */}
        <div className="filter-box">
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
            <p
              style={{
                color: summary.profit >= 0 ? "green" : "red",
              }}
            >
              ₹{summary.profit ?? 0}
            </p>
          </div>

        </div>

       <div className="charts-grid">

  <div className="chart-card">
    <AnimalStatusChart month={month} />
  </div>

  <div className="chart-card">
    <MilkPieChart summary={summary} />
  </div>

  <div className="chart-card">
    <FinancePieChart summary={summary} />
  </div>

</div>

      </div>
    </>
  );
}

export default Overview;
