import { useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import { useNavigate } from "react-router-dom";

export default function SaleForm() {
  const navigate = useNavigate();

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

    try {
      await axios.post("https://farm-pgi5.onrender.com/api/sales/", sale);
      alert("Sale recorded!");

      // reset form
      setSale({
        date: "",
        quantity_sold: "",
        price_per_liter: "",
        buyer: "",
        payment_received: false,
      });

      // optional: go back to sales list
      navigate("/sales");

    } catch (error) {
      console.log(error.response?.data);
      alert("Error saving sale");
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
          value={sale.date}
          onChange={handleChange} 
        />

        <input 
          name="quantity_sold" 
          value={sale.quantity_sold}
          placeholder="Quantity Sold (L)" 
          onChange={handleChange} 
        />

        <input 
          name="price_per_liter" 
          value={sale.price_per_liter}
          placeholder="Price per Liter" 
          onChange={handleChange} 
        />

        <input 
          name="buyer" 
          value={sale.buyer}
          placeholder="Buyer (optional)" 
          onChange={handleChange} 
        />

        <label className="lab">
          Payment Received?
          <input 
            type="checkbox" 
            name="payment_received" 
            checked={sale.payment_received}
            onChange={handleChange} 
          />
        </label>

        <h3 className="h3">
          Daily Milk Income = {totalIncome}
        </h3>

        <button type="submit">Save Sale</button>
      </form>
    </>
  );
}
