import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import './components.css'
import { useNavigate } from "react-router-dom";

export default function MilkForm() {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
  const [record, setRecord] = useState({
    date: "",
    animal: "",
    morning_milk: "",
    evening_milk: "",
    milk_home: "",
    milk_sold: "",
    milk_wasted: "",
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
    navigate("/milk");   // go back to milk list
    setRecord({
    date: "",
    animal: "",
    morning_milk: "",
    evening_milk: "",
    milk_home: "",
    milk_sold: "",
    milk_wasted: "",
  });
  };

  return (
    <>
      <Navbar />

      {/* Back button */}
      <button 
        onClick={() => navigate(-1)} 
        style={{ margin: "10px",backgroundColor:"brown",color:"bisque",borderRadius:"10px" }}
      >
        ← Back
      </button>

      <form onSubmit={handleSubmit} className="form2">
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
          {animals.map(a => (
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
          placeholder="Milk Used at Home" 
          onChange={handleChange} 
        />
        <input 
          name="milk_sold" 
          value={record.milk_sold}
          placeholder="Milk Sold" 
          onChange={handleChange} 
        />
        <input 
          name="milk_wasted" 
          value={record.milk_wasted}
          placeholder="Milk Wasted" 
          onChange={handleChange} 
        />

        <button type="submit">Save</button>
      </form>
    </>
  );
}
