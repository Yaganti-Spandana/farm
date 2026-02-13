import { useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";

export default function SaleForm() {
  const [sale, setSale] = useState({
    date: "",
    quantity_sold: "",
    price_per_liter: "",
    buyer: "",
    payment_received: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSale({
      ...sale,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const totalIncome =
    (sale.quantity_sold || 0) * (sale.price_per_liter || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/sales/", sale);
    alert("Sale recorded!");
  };

  return (
    <><Navbar></Navbar>
    <form onSubmit={handleSubmit} className="form2">
      <input type="date" name="date" onChange={handleChange} />
      <input name="quantity_sold" placeholder="Quantity Sold (L)" onChange={handleChange} />
      <input name="price_per_liter" placeholder="Price per Liter" onChange={handleChange} />
      <input name="buyer" placeholder="Buyer (optional)" onChange={handleChange} />

      <label className="lab">
        Payment Received?
        <input type="checkbox" name="payment_received" onChange={handleChange} />
      </label>


      <h3 className="h3">
        Daily Milk Income = {totalIncome} 
      </h3>

      <button type="submit">Save Sale</button>
    </form></>
  );
}

