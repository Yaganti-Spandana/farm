import { useEffect, useState,useCallback } from "react";
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
  const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
const fetchReport = useCallback(async () => {

  let url = "https://farm-pgi5.onrender.com/api/profit-loss/?";

  if (fromDate) url += `from=${fromDate}&`;
  if (toDate) url += `to=${toDate}&`;

  const res = await axios.get(url);
  setData(res.data);

}, [fromDate, toDate]);
useEffect(() => {
  fetchReport();
}, [fetchReport]);

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
        <h3 className="section-title">Filter Report</h3>

<div className="animal-filters">

<input
  type="date"
  value={fromDate}
  onChange={(e)=>setFromDate(e.target.value)}
/>

<input
  type="date"
  value={toDate}
  onChange={(e)=>setToDate(e.target.value)}
/>

<button onClick={fetchReport}>
Search
</button>

<button
  onClick={()=>{
    setFromDate("");
    setToDate("");
    fetchReport();
  }}
>
Reset
</button>

</div>
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
