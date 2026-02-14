import { useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";

export default function ExpenseForm() {
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
    await axios.post("https://farm-pgi5.onrender.com/api/expenses/", expense);
    alert("Expense recorded!");
  };

  return (
    <><Navbar></Navbar>
    <form onSubmit={handleSubmit} className="form2">
      <input type="date" name="date" onChange={handleChange} />

      <select name="category" onChange={handleChange}>
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

      <input name="amount" placeholder="Amount" onChange={handleChange} />
      <textarea name="notes" placeholder="Notes (optional)" onChange={handleChange} />

      <button type="submit">Save expense</button>
    </form></>
  );
}
