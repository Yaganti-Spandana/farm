import { useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import './components.css'
import { useNavigate } from "react-router-dom";

export default function AnimalForm() {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://farm-pgi5.onrender.com/api/animals/", animal);
    alert("Animal added!");
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
   
    navigate("/animal");   // go back to animal list
  };
   

  return (
    <>
      <Navbar />

      {/* Back button */}
      <button 
        onClick={() => navigate(-1)} 
        style={{ margin: "10px" }}
      >
        ← Back
      </button>

      <form onSubmit={handleSubmit} className="form2">
        <input name="animal_id" placeholder="Animal ID" onChange={handleChange} /><br />
        <input name="name" placeholder="Name" onChange={handleChange} /><br />
        <input name="breed" placeholder="Breed" onChange={handleChange} /><br />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} /><br />
        <input name="purchase_date" type="date" onChange={handleChange} /><br />
        <input name="purchase_price" placeholder="Price" onChange={handleChange} /><br />
        <textarea name="health_records" placeholder="Health Records" onChange={handleChange} /><br />
        <input name="milk_per_day" placeholder="Milk per day (L)" onChange={handleChange} /><br />

        <select name="status" onChange={handleChange}>
          <option value="active">Active</option>
          <option value="sold">Sold</option>
          <option value="dead">Dead</option>
        </select><br />

        <button type="submit">Save</button>
      </form>
    </>
  );
}

