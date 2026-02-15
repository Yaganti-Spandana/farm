import { useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import { useNavigate } from "react-router-dom";

export default function ExpenseForm() {
  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    date: "",
    category: "feed",
    amount: "",
    notes: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://farm-pgi5.onrender.com/api/expenses/", expense);
      alert("Expense recorded!");

      // reset form
      setExpense({
        date: "",
        category: "feed",
        amount: "",
        notes: "",
      });

      // optional: go back to expense list
      navigate("/expense");

    } catch (error) {
      console.log(error.response?.data);
      alert("Error saving expense");
    }
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
          placeholder="Notes (optional)" 
          onChange={handleChange} 
        />

        <button type="submit">Save expense</button>
      </form>
    </>
  );
}
