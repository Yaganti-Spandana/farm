import { useState,useCallback,useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import { useNavigate } from "react-router-dom";
import './components.css'
export default function FeedInventory() {
  const navigate = useNavigate();

  const [stock, setStock] = useState({
    date: "",
    feed_type: "",
    quantity_in: "",
    notes: "",
  });
  const [records, setRecords] = useState([]);
const [loading, setLoading] = useState(false);

const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");




  const [usage, setUsage] = useState({
    date: "",
    feed_type: "",
    quantity_used: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [remaining, setRemaining] = useState({});

  // Load remaining feed
  const loadRemaining = () => {
    axios
      .get("https://farm-pgi5.onrender.com/api/feed-remaining/")
      .then((res) => setRemaining(res.data));
  };

  const fetchRecords = useCallback(async () => {

  setLoading(true);

  try {

    let url = "https://farm-pgi5.onrender.com/api/feed-stock/?";

    if (fromDate) url += `from=${fromDate}&`;
    if (toDate) url += `to=${toDate}&`;

    const res = await axios.get(url);

    setRecords(res.data);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }

}, [fromDate, toDate]);

useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);
  const handleStockChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const handleUsageChange = (e) => {
    setUsage({ ...usage, [e.target.name]: e.target.value });
  };

  const submitStock = async (e) => {
  e.preventDefault();

  try {

    if (editingId) {
      await axios.put(
        `https://farm-pgi5.onrender.com/api/feed-stock/${editingId}/`,
        stock
      );
      alert("Feed stock updated");
      setEditingId(null);
    } else {
      await axios.post(
        "https://farm-pgi5.onrender.com/api/feed-stock/",
        stock
      );
      alert("Feed stock added");
    }

    setStock({
      date: "",
      feed_type: "",
      quantity_in: "",
      notes: "",
    });

    fetchRecords();
    loadRemaining();

  } catch (err) {
    console.error(err);
    alert("Save failed");
  }
};

const handleEdit = (r) => {
  setStock({
    date: r.date,
    feed_type: r.feed_type,
    quantity_in: r.quantity_in,
    notes: r.notes,
  });

  setEditingId(r.id);
};

const handleDelete = async (id) => {

  if (!window.confirm("Delete this record?")) return;

  try {
    await axios.delete(
      `https://farm-pgi5.onrender.com/api/feed-stock/${id}/`
    );

    fetchRecords();
    loadRemaining();

  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
};

  const submitUsage = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://farm-pgi5.onrender.com/api/feed-usage/",
      usage
    );
    alert("Feed usage saved");
    setUsage({ date: "", feed_type: "", quantity_used: "" });
    loadRemaining();
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1 className="head">Feed Inventory Dashboard</h1>

        <div className="inventory-grid">
          {/* FEED STOCK */}
          <div className="chart-card">
            <h2 className="section-title">Add Feed Stock</h2>
            <form onSubmit={submitStock} className="modern-form">
              <input
                type="date"
                name="date"
                value={stock.date}
                onChange={handleStockChange}
                required
              />
              <input
                name="feed_type"
                placeholder="Feed type"
                value={stock.feed_type}
                onChange={handleStockChange}
                required
              />
              <input
                name="quantity_in"
                placeholder="Quantity (kg)"
                value={stock.quantity_in}
                onChange={handleStockChange}
                required
              />
              <input
                name="notes"
                placeholder="Notes"
                value={stock.notes}
                onChange={handleStockChange}
              />
              <button>Add Stock</button>
            </form>
          </div>

          {/* FEED USAGE */}
          <div className="chart-card">
            <h2 className="section-title">Daily Feed Usage</h2>
            <form onSubmit={submitUsage} className="modern-form">
              <input
                type="date"
                name="date"
                value={usage.date}
                onChange={handleUsageChange}
                required
              />
              <input
                name="feed_type"
                placeholder="Feed type"
                value={usage.feed_type}
                onChange={handleUsageChange}
                required
              />
              <input
                name="quantity_used"
                placeholder="Used (kg)"
                value={usage.quantity_used}
                onChange={handleUsageChange}
                required
              />
              <button>Save Usage</button>
            </form>
          </div>

          {/* REMAINING */}
          <div className="chart-card">
            <h2 className="section-title">Feed Remaining</h2>

            <table className="animal-table">
              <thead>
                <tr>
                  <th>Feed Type</th>
                  <th>Remaining (kg)</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(remaining).length === 0 && (
                  <tr>
                    <td colSpan="2">No data</td>
                  </tr>
                )}

                {Object.entries(remaining).map(([feed, qty]) => (
                  <tr key={feed}>
                    <td>{feed}</td>
                    <td>{qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <h3 className="section-title" style={{marginTop:25}}>
Filter Feed Records
</h3>

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

  <button onClick={fetchRecords}>
    Search
  </button>

  <button
    onClick={()=>{
      setFromDate("");
      setToDate("");
      fetchRecords();
    }}
  >
    Reset
  </button>

</div>

<div className="animal-table-wrapper">

{loading ? (
  <p style={{textAlign:"center"}}>Loading...</p>
) : records.length === 0 ? (
  <p style={{textAlign:"center"}}>No feed records</p>
) : (

<table className="animal-table desktop-only">

<thead>
<tr>
<th>Date</th>
<th>Feed Type</th>
<th>Quantity</th>
<th>Notes</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{records.map((r)=>(
<tr key={r.id}>
<td>{r.date}</td>
<td>{r.feed_type}</td>
<td>{r.quantity_in}</td>
<td>{r.notes}</td>
<td>
<button
  className="edit-btn"
  onClick={() => handleEdit(r)}
>
Edit
</button>

<button
  className="delete-btn"
  onClick={() => handleDelete(r.id)}
>
Delete
</button>
</td>
</tr>
))}

</tbody>

</table>

)}
</div>

<div className="animal-cards mobile-only">

{records.map((r)=>(
<div key={r.id} className="animal-card">

<div className="card-header">
<strong>{r.feed_type}</strong>
<span>{r.date}</span>
</div>

<div className="card-grid">
<div><b>Quantity:</b> {r.quantity_in} kg</div>
<div><b>Notes:</b> {r.notes}</div>
<div className="card-actions">
<button onClick={() => handleEdit(r)} className="edit-btn">
Edit
</button>

<button onClick={() => handleDelete(r.id)} className="delete-btn">
Delete
</button>
</div>
</div>

</div>
))}

</div>
    </>
  );
}
