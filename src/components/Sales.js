import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import "./components.css";
import { useNavigate } from "react-router-dom";

export default function SaleManagement() {

  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
  const [sale, setSale] = useState({
    date: "",
    quantity_sold: "",
    price_per_liter: "",
    buyer: "",
    payment_received: false,
  });

  const [sales, setSales] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSale({
      ...sale,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const totalIncome =
    (sale.quantity_sold || 0) * (sale.price_per_liter || 0);

  // ================= FETCH SALES =================

  const fetchSales = useCallback(async () => {

  setLoading(true);

  try {

    let url = "https://farm-pgi5.onrender.com/api/sales/?";

    if (fromDate) url += `from=${fromDate}&`;
    if (toDate) url += `to=${toDate}&`;

    const res = await axios.get(url);

    setSales(res.data);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }

}, [fromDate, toDate]);

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        await axios.put(
          `https://farm-pgi5.onrender.com/api/sales/${editingId}/`,
          sale
        );

        alert("Sale updated");

      } else {

        await axios.post(
          "https://farm-pgi5.onrender.com/api/sales/",
          sale
        );

        alert("Sale recorded");
      }

      setSale({
        date: "",
        quantity_sold: "",
        price_per_liter: "",
        buyer: "",
        payment_received: false,
      });

      setEditingId(null);

      fetchSales();

    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  // ================= EDIT =================

  const handleEdit = (s) => {

    setSale({
      date: s.date,
      quantity_sold: s.quantity_sold,
      price_per_liter: s.price_per_liter,
      buyer: s.buyer,
      payment_received: s.payment_received
    });

    setEditingId(s.id);
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this sale?")) return;

    try {

      await axios.delete(
        `https://farm-pgi5.onrender.com/api/sales/${id}/`
      );

      fetchSales();

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2 className="head">💰 Milk Sales</h2>

        {/* FORM */}

        <div className="chart-card">

          <form onSubmit={handleSubmit} className="modern-form">

            <h3 className="section-title">
              {editingId ? "Edit Sale" : "Add Sale"}
            </h3>

            <input type="date" name="date" value={sale.date} onChange={handleChange} />

            <input
              name="quantity_sold"
              value={sale.quantity_sold}
              placeholder="Quantity Sold (L)"
              onChange={handleChange}
            />

            <input
              name="price_per_liter"
              value={sale.price_per_liter}
              placeholder="Price per Liter"
              onChange={handleChange}
            />

            <input
              name="buyer"
              value={sale.buyer}
              placeholder="Buyer"
              onChange={handleChange}
            />

            <label>
              Payment Received
              <input
                type="checkbox"
                name="payment_received"
                checked={sale.payment_received}
                onChange={handleChange}
              />
            </label>

            <h3>Income = ₹{totalIncome}</h3>

            <button type="submit">
              {editingId ? "Update Sale" : "Save Sale"}
            </button>

          </form>
        </div>

        <h3 className="section-title" style={{marginTop:20}}>
Filter Records
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

  <button onClick={fetchSales}>Search</button>

  <button
    onClick={()=>{
      setFromDate("");
      setToDate("");
      fetchSales();
    }}
  >
    Reset
  </button>

</div>

        {/* TABLE */}

        <div className="animal-table-wrapper">

          {loading ? (
            <p style={{ textAlign: "center" }}>Loading...</p>
          ) : sales.length === 0 ? (
            <p style={{ textAlign: "center" }}>No sales found</p>
          ) : (

            <table className="animal-table">

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Buyer</th>
                  <th>Payment</th>
                  <th>Income</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {sales.map((s) => (

                  <tr key={s.id}>

                    <td>{s.date}</td>
                    <td>{s.quantity_sold}</td>
                    <td>{s.price_per_liter}</td>
                    <td>{s.buyer}</td>
                    <td>{s.payment_received ? "Yes" : "No"}</td>
                    <td>{s.total_income}</td>

                    <td>

                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(s)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(s.id)}
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
{sales.map((s) => (
  <div key={s.id} className="animal-card">

    <div className="card-header">
      <strong>{s.date}</strong>
      <span>₹{s.total_income}</span>
    </div>

    <div className="card-grid">
      <div><b>Quantity:</b> {s.quantity_sold} L</div>
      <div><b>Price:</b> ₹{s.price_per_liter}</div>
      <div><b>Buyer:</b> {s.buyer}</div>
      <div><b>Paid:</b> {s.payment_received ? "Yes" : "No"}</div>
    </div>

    <div className="card-actions">
      <button onClick={() => handleEdit(s)} className="edit-btn">Edit</button>
      <button onClick={() => handleDelete(s.id)} className="delete-btn">Delete</button>
    </div>

  </div>
))}
</div>

      </div>
    </>
  );
}