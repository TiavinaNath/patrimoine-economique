import React, { useState } from "react";
import Chart from "../dumbComponents/patrimoine/Chart";
import DateDay from "../dumbComponents/patrimoine/DateDay";
import GetValue from "../dumbComponents/patrimoine/GetValue";
import "../css/PatrimoinePage.css";

function PatrimoinePage() {
  const [dateDebut, setDateDebut] = useState(null);
  const [dateFin, setDateFin] = useState(null);
  const [jour, setJour] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [valuePatrimoine, setValuePatrimoine] = useState(0);
  const [dateSelected, setDateSelected] = useState(null);

  const handleValidateRange = async () => {
    const response = await fetch("http://localhost:3000/patrimoine/range", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "month", dateDebut, dateFin, jour }),
    });
    const data = await response.json();
    setChartData(data.valeur);
  };

  const handleGetValeur = async (date) => {
    const response = await fetch(`http://localhost:3000/patrimoine/${date.toISOString()}`);
    const data = await response.json();
    setValuePatrimoine(data.valeur);
  };

  return (
    <div className="container">
      <h2>Page Patrimoine</h2>
      <div className="row">
        <div className="col-md-4">
          <DateDay
            dateDebut={dateDebut}
            setDateDebut={setDateDebut}
            dateFin={dateFin}
            setDateFin={setDateFin}
            jour={jour}
            setJour={setJour}
            handleValidateRange={handleValidateRange}
          />
        </div>
        <div className="col-md-8">
          {chartData && <Chart data={chartData} x={parseInt(jour)} />}
          <GetValue
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
            handleGetValeur={handleGetValeur}
            valuePatrimoine={valuePatrimoine}
          />
        </div>
      </div>
    </div>
  );
}

export default PatrimoinePage;
