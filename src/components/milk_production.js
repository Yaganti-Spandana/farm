import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import "./components.css";
import { useNavigate } from "react-router-dom";

export default function MilkForm() {

  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
   const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
  const [record, setRecord] = useState({
    date: "",
    animal: "",
    morning_milk: "",
    evening_milk: "",
    milk_home: "",
    milk_sold: "",
    milk_wasted: "",
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  // =========================
  // FETCH ANIMALS
  // =========================

  useEffect(() => {
    axios
      .get("https://farm-pgi5.onrender.com/api/animals/")
      .then((res) => setAnimals(res.data));
  }, []);

  // =========================
  // FETCH MILK RECORDS
  // =========================

  
  const fetchRecords = useCallback(async () => {
  setLoading(true);

  try {

    let url = "https://farm-pgi5.onrender.com/api/milk/?";

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

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {
        await axios.put(
          `https://farm-pgi5.onrender.com/api/milk/${editingId}/`,
          record
        );
        alert("Milk record updated");
        setEditingId(null);
      } else {
        await axios.post(
          "https://farm-pgi5.onrender.com/api/milk/",
          record
        );
        alert("Milk record added");
      }

      setRecord({
        date: "",
        animal: "",
        morning_milk: "",
        evening_milk: "",
        milk_home: "",
        milk_sold: "",
        milk_wasted: "",
      });

      fetchRecords();

    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

 

  // =========================
  // EDIT
  // =========================

  const handleEdit = (r) => {
    setRecord({
      date: r.date,
      animal: r.animal,
      morning_milk: r.morning_milk,
      evening_milk: r.evening_milk,
      milk_home: r.milk_home,
      milk_sold: r.milk_sold,
      milk_wasted: r.milk_wasted,
    });

    setEditingId(r.id);
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this record?")) return;

    try {
      await axios.delete(
        `https://farm-pgi5.onrender.com/api/milk/${id}/`
      );

      fetchRecords();

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <>
      <Navbar />

      <div className="page-container">

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2 className="head">🥛 Milk Records</h2>

        {/* ================= FORM ================= */}

        <div className="chart-card">

          <form onSubmit={handleSubmit} className="modern-form">

            <h3 className="section-title">
              {editingId ? "Edit Milk Record" : "Add Milk Record"}
            </h3>

            <input
              type="date"
              name="date"
              value={record.date}
              onChange={handleChange}
            />

            <select
              name="animal"
              value={record.animal}
              onChange={handleChange}
            >
              <option value="">Select Animal</option>

              {animals.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.animal_id} - {a.name}
                </option>
              ))}
            </select>

            <input
              name="morning_milk"
              value={record.morning_milk}
              placeholder="Morning Milk (L)"
              onChange={handleChange}
            />

            <input
              name="evening_milk"
              value={record.evening_milk}
              placeholder="Evening Milk (L)"
              onChange={handleChange}
            />

            <input
              name="milk_home"
              value={record.milk_home}
              placeholder="Home Use"
              onChange={handleChange}
            />

            <input
              name="milk_sold"
              value={record.milk_sold}
              placeholder="Sold"
              onChange={handleChange}
            />

            <input
              name="milk_wasted"
              value={record.milk_wasted}
              placeholder="Wasted"
              onChange={handleChange}
            />

            <button type="submit">
              {editingId ? "Update Record" : "Save Record"}
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

        {/* ================= TABLE ================= */}

        <div className="animal-table-wrapper">

          {loading ? (
            <p style={{ textAlign: "center" }}>Loading...</p>
          ) : records.length === 0 ? (
            <p style={{ textAlign: "center" }}>No milk records</p>
          ) : (
            <>
              <table className="animal-table desktop-only">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Animal</th>
                    <th>Morning</th>
                    <th>Evening</th>
                    <th>Total</th>
                    <th>Home</th>
                    <th>Sold</th>
                    <th>Wasted</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {records.map((r) => (
                    <tr key={r.id}>
                      <td>{r.date}</td>
                      <td>{r.animal_name}</td>
                      <td>{r.morning_milk}</td>
                      <td>{r.evening_milk}</td>
                      <td>{r.total_milk}</td>
                      <td>{r.milk_home}</td>
                      <td>{r.milk_sold}</td>
                      <td>{r.milk_wasted}</td>

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

              <div className="animal-cards mobile-only">
{records.map((r) => (
  <div key={r.id} className="animal-card">

    <div className="card-header">
      <strong>{r.animal_name}</strong>
      <span>{r.date}</span>
    </div>

    <div className="card-grid">
      <div><b>Morning:</b> {r.morning_milk} L</div>
      <div><b>Evening:</b> {r.evening_milk} L</div>
      <div><b>Total:</b> {r.total_milk} L</div>
      <div><b>Sold:</b> {r.milk_sold}</div>
      <div><b>Home:</b> {r.milk_home}</div>
      <div><b>Waste:</b> {r.milk_wasted}</div>
    </div>

    <div className="card-actions">
      <button onClick={() => handleEdit(r)} className="edit-btn">Edit</button>
      <button onClick={() => handleDelete(r.id)} className="delete-btn">Delete</button>
    </div>

  </div>
))}
</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}