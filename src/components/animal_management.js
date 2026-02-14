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

  const fetchAnimals = async () => {
    const res = await axios.get(
      "https://farm-pgi5.onrender.com/api/animals/",
      { params: filters }
    );
    setAnimals(res.data);
  };

  useEffect(() => {
  const fetchAnimals = async () => {
    const res = await fetch('/api/animals');
    const data = await res.json();
    setAnimals(data);
  };

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

    fetchAnimals();
  };

  return (
    <>
      <Navbar />

      <button onClick={() => navigate(-1)} className="back-btn">
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

      {/* Animal List */}
      <div className="animal-list">
        <h3>Animals</h3>
        {animals.map(a => (
          <div className="animal-card" key={a.id}>
            <b>{a.animal_id}</b> - {a.name} ({a.breed})  
            <div>Age: {a.age}</div>
            <div>Milk/Day: {a.milk_per_day} L</div>
            <div>Status: {a.status}</div>
            <div>Purchased: {a.purchase_date}</div>
          </div>
        ))}
      </div>
    </>
  );
}
