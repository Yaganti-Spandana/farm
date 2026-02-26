import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import "./components.css";

export default function AnimalForm() {
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
  // FORM HANDLERS
  // =========================
  const handleChange = (e) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.post(
        "https://farm-pgi5.onrender.com/api/animals/",
        animal
      );

      alert("Animal added!");

      // ✅ reset form
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

      // ✅ refresh table
      fetchAnimals();
    } catch (err) {
      console.error(err);
      alert("Failed to add animal");
    } finally {
      setSaving(false);
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

      <div style={{ padding: 20 }}>
        <h2>Animal Management</h2>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="form2">
          <h3>Add Animal</h3>

          <input name="animal_id" value={animal.animal_id} placeholder="Animal ID" onChange={handleChange} /><br/>
          <input name="name" value={animal.name} placeholder="Name" onChange={handleChange} /><br/>
          <input name="breed" value={animal.breed} placeholder="Breed" onChange={handleChange} /><br/>
          <input name="age" type="number" value={animal.age} placeholder="Age" onChange={handleChange} /><br/>
          <input name="purchase_date" type="date" value={animal.purchase_date} onChange={handleChange} /><br/>
          <input name="purchase_price" value={animal.purchase_price} placeholder="Price" onChange={handleChange} /><br/>
          <textarea name="health_records" value={animal.health_records} placeholder="Health Records" onChange={handleChange} /><br/>
          <input name="milk_per_day" value={animal.milk_per_day} placeholder="Milk per day (L)" onChange={handleChange} /><br/>

          <select name="status" value={animal.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="sold">Sold</option>
            <option value="dead">Dead</option>
          </select><br/>

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Animal"}
          </button>
        </form>

        <hr style={{ margin: "30px 0" }} />

        {/* ================= FILTERS ================= */}
        <h3>Filter Animals</h3>
        <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table border="1" cellPadding="8" width="100%">
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
              </tr>
            </thead>
            <tbody>
              {animals.length === 0 ? (
                <tr>
                  <td colSpan="9" align="center">No animals found</td>
                </tr>
              ) : (
                animals.map((a) => (
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}