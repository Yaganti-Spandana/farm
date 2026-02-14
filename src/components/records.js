import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import './records.css'
export default function AccountDashboard() {
  const [report, setReport] = useState({});
  const [animals, setAnimals] = useState([]);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    animal: ""
  });

  useEffect(() => {
    axios.get("https://farm-pgi5.onrender.com/api/animals/")
      .then(res => setAnimals(res.data));
  }, []);

  const fetchReport = async () => {
    const res = await axios.get(
      "https://farm-pgi5.onrender.com/api/monthly-report/",
      { params: filters }
    );
    setReport(res.data);
  };

  return (
    <>
      <Navbar />

      <h2>Accounts / Monthly Report</h2>

      {/* Filters */}
      <div className="filters">
        <input type="date"
          onChange={e => setFilters({...filters, from: e.target.value})}
        />
        <input type="date"
          onChange={e => setFilters({...filters, to: e.target.value})}
        />

        <select
          onChange={e => setFilters({...filters, animal: e.target.value})}
        >
          <option value="">All Animals</option>
          {animals.map(a => (
            <option key={a.id} value={a.id}>
              {a.animal_id} - {a.name}
            </option>
          ))}
        </select>

        <button onClick={fetchReport}>Apply</button>
      </div>

      <div className="dashboard">
  <div>Total Milk: {report.total_milk} L</div>
  <div>Milk Sold: {report.milk_sold} L</div>
  <div>Total Income: ₹{report.total_income}</div>
  <div>Total Expenses: ₹{report.total_expenses}</div>
  <div><b>Profit: ₹{report.profit}</b></div>

  <h3>Expenses by Category</h3>
  {report.expenses_by_category?.map((e, i) => (
    <div key={i}>
      {e.category}: ₹{e.total}
    </div>
  ))}
</div></>
