import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import { useNavigate } from "react-router-dom";
import './components.css'
export default function ProfitLoss() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    total_income: 0,
    total_expenses: 0,
    profit: 0,
  });

  useEffect(() => {
    axios
      .get("https://farm-pgi5.onrender.com/api/profit-loss/")
      .then((res) => setData(res.data));
  }, []);

  return (
    <>
      <Navbar />

      <div className="page-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1 className="head">Profit & Loss Report</h1>

        <div className="summary-grid">
          <div className="card">
            <h3>Total Income</h3>
            <p>₹ {data.total_income}</p>
          </div>

          <div className="card">
            <h3>Total Expenses</h3>
            <p>₹ {data.total_expenses}</p>
          </div>

          <div className="card">
            <h3>Profit / Loss</h3>
            <p
              style={{
                color: data.profit >= 0 ? "#16a34a" : "#dc2626",
              }}
            >
              ₹ {data.profit}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
