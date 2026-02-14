import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import './components.css'
export default function MilkForm() {
  const [animals, setAnimals] = useState([]);
  const [record, setRecord] = useState({
    date: "",
    animal: "",
    morning_milk: "",
    evening_milk: "",
    milk_home: 0,
    milk_sold: 0,
    milk_wasted: 0,
  });

  useEffect(() => {
    axios.get("https://farm-pgi5.onrender.com/api/animals/")
      .then(res => setAnimals(res.data));
  }, []);

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://farm-pgi5.onrender.com/api/milk/", record);
    alert("Milk record saved!");
  };

  return (
    <>
    <Navbar></Navbar>
    <form onSubmit={handleSubmit} className="form2">
      <input type="date" name="date" onChange={handleChange} />

      <select name="animal" onChange={handleChange}>
        <option>Select Animal</option>
        {animals.map(a => (
          <option key={a.id} value={a.id}>
            {a.animal_id} - {a.name}
          </option>
        ))}
      </select>

      <input name="morning_milk" placeholder="Morning Milk (L)" onChange={handleChange} />
      <input name="evening_milk" placeholder="Evening Milk (L)" onChange={handleChange} />

      <input name="milk_home" placeholder="Milk Used at Home" onChange={handleChange} />
      <input name="milk_sold" placeholder="Milk Sold" onChange={handleChange} />
      <input name="milk_wasted" placeholder="Milk Wasted" onChange={handleChange} />

      <button type="submit">Save</button>
    </form></>
  );
}
