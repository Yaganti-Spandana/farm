import AnimalStatusChart from "./AnimalStatusChart";
import Navbar from "./navbar/navbar";
import "./overview.css";

function Overview() {
  return (
    <>
      <Navbar />

      <div className="overview-container">

        {/* ===== SUMMARY CARDS ===== */}
        <div className="summary-grid">
          <div className="card">
            <h3>Total Animals</h3>
            <p>120</p>
          </div>

          <div className="card">
            <h3>Milk Today</h3>
            <p>85 L</p>
          </div>

          <div className="card">
            <h3>Today Sales</h3>
            <p>₹4,200</p>
          </div>

          <div className="card">
            <h3>Expenses</h3>
            <p>₹1,100</p>
          </div>
        </div>

        {/* ===== CHART SECTION ===== */}
        <div className="chart-card">
          <AnimalStatusChart />
        </div>

      </div>
    </>
  );
}

export default Overview;
