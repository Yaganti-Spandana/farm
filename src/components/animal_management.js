import { useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import './components.css'
export default function AnimalForm() {
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
    await axios.post("http://localhost:8000/api/animals/", animal);
    alert("Animal added!");
  };

  return (
    <>
    <Navbar></Navbar>
    <form onSubmit={handleSubmit} className="form2">
      <input name="animal_id" placeholder="Animal ID" onChange={handleChange} /><br></br>
      <input name="name" placeholder="Name" onChange={handleChange} /><br></br>
      <input name="breed" placeholder="Breed" onChange={handleChange} /><br></br>
      <input name="age" type="number" placeholder="Age" onChange={handleChange} /><br></br>
      <input name="purchase_date" type="date" onChange={handleChange} /><br></br>
      <input name="purchase_price" placeholder="Price" onChange={handleChange} /><br></br>
      <textarea name="health_records" placeholder="Health Records" onChange={handleChange} /><br></br>
      <input name="milk_per_day" placeholder="Milk per day (L)" onChange={handleChange} /><br></br>

      <select name="status" onChange={handleChange}>
        <option value="active">Active</option>
        <option value="sold">Sold</option>
        <option value="dead">Dead</option>
      </select><br></br>

      <button type="submit">Save</button>
    </form></>
  );
}
