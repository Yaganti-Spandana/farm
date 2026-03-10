import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import "./components.css";
import { useNavigate } from "react-router-dom";

export default function AnimalForm() {
  const navigate = useNavigate();

  // ✅ form state
  const [animal, setAnimal] = useState({
    animal_id: "",
    name: "",
    breed: "",
    age: "",
    purchase_date: "",
    purchase_price: "",
    health_records: "",
    milk_per_day: "",
    status: "active",
  });

  // ✅ table/filter state
  const [animals, setAnimals] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // =========================
  // FORM HANDLER
  // =========================
  const handleChange = (e) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value });
  };
  const [editingId, setEditingId] = useState(null);
  const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);

  try {
    if (editingId) {
      await axios.put(
        `https://farm-pgi5.onrender.com/api/animals/${editingId}/`,
        animal
      );
      alert("Animal updated!");
      setEditingId(null);
    } else {
      await axios.post(
        "https://farm-pgi5.onrender.com/api/animals/",
        animal
      );
      alert("Animal added!");
    }

    setAnimal({
      animal_id: "",
      name: "",
      breed: "",
      age: "",
      purchase_date: "",
      purchase_price: "",
      health_records: "",
      milk_per_day: "",
      status: "active",
    });

    fetchAnimals();
  } catch (err) {
    console.error(err);
    alert("Save failed");
  } finally {
    setSaving(false);
  }
};

const handleEdit = (a) => {
  setAnimal({
    animal_id: a.animal_id,
    name: a.name,
    breed: a.breed,
    age: a.age,
    purchase_date: a.purchase_date,
    purchase_price: a.purchase_price,
    health_records: a.health_records,
    milk_per_day: a.milk_per_day,
    status: a.status,
  });

  setEditingId(a.id);
};

const handleDelete = async (id) => {
  if (!window.confirm("Delete this animal?")) return;

  try {
    await axios.delete(
      `https://farm-pgi5.onrender.com/api/animals/${id}/`
    );
    alert("Animal deleted");
    fetchAnimals();
  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
};

  // =========================
  // FETCH ANIMALS
  // =========================
  const fetchAnimals = useCallback(async () => {
    setLoading(true);
    try {
      let url = "https://farm-pgi5.onrender.com/api/animals/?";

      if (statusFilter) url += `status=${statusFilter}&`;
      if (fromDate) url += `from=${fromDate}&`;
      if (toDate) url += `to=${toDate}&`;

      const res = await axios.get(url);
      setAnimals(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, fromDate, toDate]);

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  // =========================
  // UI
  // =========================
  return (
    <>
      <Navbar />

      <div className="page-container">
        {/* ✅ NEW BACK BUTTON */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2 className="head">🐄 Animal Management</h2>

        {/* ================= FORM ================= */}
        <div className="chart-card">
          <form onSubmit={handleSubmit} className="modern-form">
            <h3 className="section-title">Add Animal</h3>

            <input name="animal_id" value={animal.animal_id} placeholder="Animal ID" onChange={handleChange} />
            <input name="name" value={animal.name} placeholder="Name" onChange={handleChange} />
            <input name="breed" value={animal.breed} placeholder="Breed" onChange={handleChange} />
            <input name="age" type="number" value={animal.age} placeholder="Age" onChange={handleChange} />
            <input name="purchase_date" type="date" value={animal.purchase_date} onChange={handleChange} />
            <input name="purchase_price" value={animal.purchase_price} placeholder="Price" onChange={handleChange} />
            <textarea name="health_records" value={animal.health_records} placeholder="Health Records" onChange={handleChange} />
            <input name="milk_per_day" value={animal.milk_per_day} placeholder="Milk per day (L)" onChange={handleChange} />

            <select name="status" value={animal.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="sold">Sold</option>
              <option value="dead">Dead</option>
            </select>

            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Animal"}
            </button>
          </form>
        </div>

        {/* ================= FILTERS ================= */}
        <h3 className="section-title" style={{ marginTop: 25 }}>
          Filter Animals
        </h3>

        <div className="animal-filters">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="sold">Sold</option>
            <option value="dead">Dead</option>
          </select>

          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

          <button onClick={fetchAnimals}>Search</button>
        </div>

        {/* ================= TABLE ================= */}
        <div className="animal-table-wrapper">
  {loading ? (
    <p style={{ textAlign: "center" }}>Loading...</p>
  ) : animals.length === 0 ? (
    <p style={{ textAlign: "center" }}>No animals found</p>
  ) : (
    <>
      {/* ================= DESKTOP TABLE ================= */}
      <table className="animal-table desktop-only">
        <thead>
          <tr>
            <th>ID</th>
            <th>Animal ID</th>
            <th>Name</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Purchase Date</th>
            <th>Price</th>
            <th>Milk/Day</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.animal_id}</td>
              <td>{a.name}</td>
              <td>{a.breed}</td>
              <td>{a.age}</td>
              <td>{a.purchase_date}</td>
              <td>{a.purchase_price}</td>
              <td>{a.milk_per_day}</td>
              <td>{a.status}</td>
              <td>
  <button
    className="edit-btn"
    onClick={() => handleEdit(a)}
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => handleDelete(a.id)}
  >
    Delete
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= MOBILE CARDS ================= */}
      <div className="animal-cards mobile-only">
        {animals.map((a) => (
          <div key={a.id} className="animal-card">
            <div className="card-header">
              <strong>{a.name}</strong>
              <span className={`status-badge ${a.status}`}>
                {a.status}
              </span>
            </div>

            <div className="card-grid">
              <div><b>ID:</b> {a.animal_id}</div>
              <div><b>Breed:</b> {a.breed}</div>
              <div><b>Age:</b> {a.age}</div>
              <div><b>Milk/Day:</b> {a.milk_per_day} L</div>
              <div><b>Price:</b> ₹{a.purchase_price}</div>
              <div><b>Purchase:</b> {a.purchase_date}</div>
            </div>
            <div className="card-actions">
  <button onClick={() => handleEdit(a)}>Edit</button>
  <button onClick={() => handleDelete(a.id)}>Delete</button>
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
