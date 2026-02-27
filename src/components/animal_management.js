import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar/navbar";
import { useNavigate } from "react-router-dom";
import './components.css'
export default function AnimalManagement() {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ default month filter
  const today = new Date();
  const defaultMonth = today.toISOString().slice(0, 7);

  const [filterMonth, setFilterMonth] = useState(defaultMonth);

  // ================= FETCH DATA =================
  const fetchAnimals = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://farm-pgi5.onrender.com/api/animals/"
      );
      setAnimals(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  // ================= FILTER LOGIC =================
  const filteredAnimals = animals.filter((a) => {
    if (!filterMonth) return true;
    if (!a.purchase_date) return true;
    return a.purchase_date.startsWith(filterMonth);
  });

  return (
    <>
      <Navbar />

      <button
        onClick={() => navigate(-1)}
        className="back-btn"
      >
        ← Back
      </button>

      <h1 className="page-title">Animal Management</h1>

      {/* ================= FILTER ================= */}
      <div className="filter-bar">
        <label>Filter by Month:</label>
        <input
          type="month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        />
      </div>

      {/* ================= DATA VIEW ================= */}
      <div className="animal-table-wrapper">
        {loading ? (
          <p className="center-text">Loading...</p>
        ) : filteredAnimals.length === 0 ? (
          <p className="center-text">No animals found</p>
        ) : (
          <>
            {/* ================= DESKTOP TABLE ================= */}
            <table className="animal-table desktop-only">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Animal ID</th>
                  <th>Name</th>
                  <th>Breed</th>
                  <th>Age</th>
                  <th>Purchase Date</th>
                  <th>Price</th>
                  <th>Milk/Day</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAnimals.map((a) => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.animal_id}</td>
                    <td>{a.name}</td>
                    <td>{a.breed}</td>
                    <td>{a.age}</td>
                    <td>{a.purchase_date}</td>
                    <td>₹{a.purchase_price}</td>
                    <td>{a.milk_per_day} L</td>
                    <td>
                      <span className={`status-badge ${a.status}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ================= MOBILE CARDS ================= */}
            <div className="animal-cards mobile-only">
              {filteredAnimals.map((a) => (
                <div key={a.id} className="animal-card">
                  <div className="card-header">
                    <strong>{a.name}</strong>
                    <span className={`status-badge ${a.status}`}>
                      {a.status}
                    </span>
                  </div>

                  <div className="card-grid">
                    <div><b>ID:</b> {a.animal_id}</div>
                    <div><b>Breed:</b> {a.breed}</div>
                    <div><b>Age:</b> {a.age}</div>
                    <div><b>Milk/Day:</b> {a.milk_per_day} L</div>
                    <div><b>Price:</b> ₹{a.purchase_price}</div>
                    <div><b>Purchase:</b> {a.purchase_date}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
