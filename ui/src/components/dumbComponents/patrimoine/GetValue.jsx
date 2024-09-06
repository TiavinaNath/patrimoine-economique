import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function GetValue({ dateSelected, setDateSelected, handleGetValeur, valuePatrimoine }) {
  
  const formatNumber = (number) => {
    return new Intl.NumberFormat('fr-FR').format(number);
  };

  return (
    <div className="GetValue">
      <div className="input-section">
        <DatePicker
          selected={dateSelected}
          onChange={setDateSelected}
          className="date-picker"
        />
        <button className="btn custom-button" onClick={() => handleGetValeur(dateSelected)}>
          Valider
        </button>
      </div>
      <p className="value-result">
        La valeur du patrimoine est : {formatNumber(valuePatrimoine)} Ar
      </p>
    </div>
  );
}

export default GetValue;
