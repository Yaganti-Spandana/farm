import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import "./components.css";
import { useNavigate } from "react-router-dom";

export default function AnimalForm() {
  const navigate = useNavigate();

  const [animal, setAnimal] = useState({
    animal_id: "",
    name: "",
    breed: "",
    age: "",
    purchase_date: "",
    purchase_price: "0",
    health_records: "",
    milk_per_day: "",
    status: "active",
  });

  const [animals, setAnimals] = useState([]);

  const [filters, setFilters] = useState({
    status: "",
    from: "",
    to: "",
  });

  // 🔥 Single source of truth for fetching
  const fetchAnimals = async () => {
    const res = await axios.get(
      "https://farm-pgi5.onrender.com/api/animals/",
      { params: filters }
    );
    setAnimals(res.data);
  };

 useEffect(() => {
  async function fetchAnimals() {
    const res = await fetch("https://farm-pgi5.onrender.com/api/animals/")
    const data = await res.json();
    setAnimals(data);
  }
  fetchAnimals();
}, []);

  const handleChange = (e) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...animal,
      age: Number(animal.age),
      purchase_price: Number(animal.purchase_price),
      milk_per_day: Number(animal.milk_per_day),
    };

    await axios.post(
      "https://farm-pgi5.onrender.com/api/animals/",
      payload
    );

    alert("Animal added!");

    setAnimal({
      animal_id: "",
      name: "",
      breed: "",
      age: "",
      purchase_date: "",
      purchase_price: "0",
      health_records: "",
      milk_per_day: "",
      status: "active",
    });

    // Refresh table
    fetchAnimals();
  };

  return (
    <>
      <Navbar />

      <button onClick={() => navigate(-1)} style={{ margin: "10px",backgroundColor:"brown",color:"bisque",borderRadius:"10px" }}>
        ← Back
      </button>

      {/* Animal Form */}
      <form onSubmit={handleSubmit} className="form2">
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

        <button type="submit">Save</button>
      </form>

      {/* Filters */}
      <div className="animal-filters">
        <select onChange={e => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="sold">Sold</option>
          <option value="dead">Dead</option>
        </select>

        <input type="date" onChange={e => setFilters({ ...filters, from: e.target.value })} />
        <input type="date" onChange={e => setFilters({ ...filters, to: e.target.value })} />

        <button onClick={fetchAnimals}>Apply Filters</button>
      </div>

      {/* Animal Table */}
      <div className="animal-table-wrapper">
        <h3>Animals</h3>

        <table className="animal-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Milk/Day</th>
              <th>Status</th>
              <th>Purchase Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {animals.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No animals found
                </td>
              </tr>
            ) : (
              animals.map(a => (
                <tr key={a.id}>
  <td data-label="ID">{a.animal_id}</td>
  <td data-label="Name">{a.name}</td>
  <td data-label="Breed">{a.breed}</td>
  <td data-label="Age">{a.age}</td>
  <td data-label="Milk/Day">{a.milk_per_day} L</td>
  <td data-label="Status">{a.status}</td>
  <td data-label="Purchase Date">{a.purchase_date}</td>
  <td data-label="Price">₹{a.purchase_price}</td>
</tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

