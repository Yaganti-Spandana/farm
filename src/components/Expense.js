import { useState, useCallback } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import "./components.css";
import { useNavigate } from "react-router-dom";

export default function ExpenseManagement() {

  const navigate = useNavigate();
const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
  const [expense, setExpense] = useState({
    date: "",
    category: "feed",
    amount: "",
    notes: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  // ================= FETCH =================

  const fetchExpenses = useCallback(async () => {
try {
  let url = "https://farm-pgi5.onrender.com/api/expenses/?";

  if (statusFilter) url += `status=${statusFilter}&`;
      if (fromDate) url += `from=${fromDate}&`;
      if (toDate) url += `to=${toDate}&`;

      const res = await axios.get(url);
      setExpense(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, fromDate, toDate]);

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await axios.put(
          `https://farm-pgi5.onrender.com/api/expenses/${editingId}/`,
          expense
        );

        alert("Expense updated");

      } else {

        await axios.post(
          "https://farm-pgi5.onrender.com/api/expenses/",
          expense
        );

        alert("Expense added");
      }

      setExpense({
        date: "",
        category: "feed",
        amount: "",
        notes: "",
      });

      setEditingId(null);

      fetchExpenses();

    } catch (err) {

      console.error(err);
      alert("Save failed");

    }
  };

  // ================= EDIT =================

  const handleEdit = (e) => {

    setExpense({
      date: e.date,
      category: e.category,
      amount: e.amount,
      notes: e.notes
    });

    setEditingId(e.id);
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this expense?")) return;

    await axios.delete(
      `https://farm-pgi5.onrender.com/api/expenses/${id}/`
    );

    fetchExpenses();
  };

  return (
    <>
      <Navbar />

      <div className="page-container">

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2 className="head">💸 Expenses</h2>

        <div className="chart-card">

          <form onSubmit={handleSubmit} className="modern-form">

            <h3 className="section-title">
              {editingId ? "Edit Expense" : "Add Expense"}
            </h3>

            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
            />

            <select
              name="category"
              value={expense.category}
              onChange={handleChange}
            >

              <option value="feed">Feed</option>
              <option value="veterinary">Veterinary</option>
              <option value="medicines">Medicines</option>
              <option value="labor">Labor</option>
              <option value="electricity">Electricity</option>
              <option value="water">Water</option>
              <option value="equipment">Equipment</option>
              <option value="animal_purchase">Animal Purchase</option>
              <option value="maintenance">Maintenance</option>

            </select>

            <input
              name="amount"
              value={expense.amount}
              placeholder="Amount"
              onChange={handleChange}
            />

            <textarea
              name="notes"
              value={expense.notes}
              placeholder="Notes"
              onChange={handleChange}
            />

            <button type="submit">
              {editingId ? "Update Expense" : "Save Expense"}
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

  <button onClick={fetchExpenses}>Search</button>

  <button
    onClick={()=>{
      setFromDate("");
      setToDate("");
      fetchExpenses();
    }}
  >
    Reset
  </button>

</div>
        {/* TABLE */}

        <div className="animal-table-wrapper">

          <table className="animal-table">

            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {expenses.map((e) => (

                <tr key={e.id}>

                  <td>{e.date}</td>
                  <td>{e.category}</td>
                  <td>{e.amount}</td>
                  <td>{e.notes}</td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(e)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

<div className="animal-cards mobile-only">
{expenses.map((e) => (
  <div key={e.id} className="animal-card">

    <div className="card-header">
      <strong>{e.category}</strong>
      <span>₹{e.amount}</span>
    </div>

    <div className="card-grid">
      <div><b>Date:</b> {e.date}</div>
      <div><b>Notes:</b> {e.notes}</div>
    </div>

    <div className="card-actions">
      <button onClick={() => handleEdit(e)} className="edit-btn">Edit</button>
      <button onClick={() => handleDelete(e.id)} className="delete-btn">Delete</button>
    </div>

  </div>
))}
</div>
      </div>
    </>
  );
}