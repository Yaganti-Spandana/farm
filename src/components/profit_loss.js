import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";

export default function ProfitLoss() {
  const [data, setData] = useState({
    total_income: 0,
    total_expenses: 0,
    profit: 0,
  });

  useEffect(() => {
    axios.get("https://farm-pgi5.onrender.com/api/profit-loss/")
      .then(res => setData(res.data));
  }, []);

  return (
    <><Navbar></Navbar>
    <button 
        onClick={() => navigate(-1)} 
        style={{ margin: "10px",backgroundColor:"brown",color:"bisque",borderRadius:"10px" }}

      >
        ← Back
      </button>
    <div style={{ padding: 0}} className="profit">
      <h1 className="head">Profit & Loss Report</h1>
      <div className="rep">
      <h2>Total Income: ₹ {data.total_income}</h2>
      <h2>Total Expenses: ₹ {data.total_expenses}</h2>
      <h2 style={{ 
        color: data.profit >= 0 ? "green" : "red" 
      }} className="head1">
        Profit: ₹ {data.profit}
      </h2></div>

    </div></>
  );
}
