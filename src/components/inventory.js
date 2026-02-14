import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import { useNavigate } from "react-router-dom";
export default function FeedInventory() {
  const navigate = useNavigate();

  const [stock, setStock] = useState({
    date: "",
    feed_type: "",
    quantity_in: "",
    notes: "",
  });

  const [usage, setUsage] = useState({
    date: "",
    feed_type: "",
    quantity_used: "",
  });

  const [remaining, setRemaining] = useState({});

  // Load remaining feed
  const loadRemaining = () => {
    axios.get("https://farm-pgi5.onrender.com/api/feed-remaining/")
      .then(res => setRemaining(res.data));
  };

  useEffect(() => {
    loadRemaining();
  }, []);

  const handleStockChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const handleUsageChange = (e) => {
    setUsage({ ...usage, [e.target.name]: e.target.value });
  };

  const submitStock = async (e) => {
    e.preventDefault();
    await axios.post("https://farm-pgi5.onrender.com/api/feed-stock/", stock);
    alert("Feed stock added");
    setStock({ date: "", feed_type: "", quantity_in: "", notes: "" });
    loadRemaining();
  };

  const submitUsage = async (e) => {
    e.preventDefault();
    await axios.post("https://farm-pgi5.onrender.com/api/feed-usage/", usage);
    alert("Feed usage saved");
    setUsage({ date: "", feed_type: "", quantity_used: "" });
    loadRemaining();
  };

  return (
    <>
    <Navbar></Navbar>
    <button 
        onClick={() => navigate(-1)} 
        style={{ margin: "10px",backgroundColor:"brown",color:"bisque",borderRadius:"10px" }}

      >
        ← Back
      </button>
    <h1 className="f1">Feed Inventory Dashboard</h1>
    <div className="feed">
        <div>

      {/* FEED STOCK */}
      <h2>Add Feed Stock</h2>
      <form onSubmit={submitStock} className="form1">
        <input type="date" name="date" value={stock.date} onChange={handleStockChange} />
        <input name="feed_type" placeholder="Feed type" value={stock.feed_type} onChange={handleStockChange} />
        <input name="quantity_in" placeholder="Quantity (kg)" value={stock.quantity_in} onChange={handleStockChange} />
        <input name="notes" placeholder="Notes" value={stock.notes} onChange={handleStockChange} />
        <button>Add Stock</button>
      </form></div><br></br>


      {/* FEED USAGE */}
      <div>
      <h2>Daily Feed Usage</h2>
      <form onSubmit={submitUsage}className="form1">
        <input type="date" name="date" value={usage.date} onChange={handleUsageChange} />
        <input name="feed_type" placeholder="Feed type" value={usage.feed_type} onChange={handleUsageChange} />
        <input name="quantity_used" placeholder="Used (kg)" value={usage.quantity_used} onChange={handleUsageChange} />
        <button>Save Usage</button>
      </form>
      </div>
      <div>
      {/* FEED REMAINING */}
      <h2>Feed Remaining</h2>
      <table border="1" width="50%"className="form1">
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
    </div></div></>
  );
}
