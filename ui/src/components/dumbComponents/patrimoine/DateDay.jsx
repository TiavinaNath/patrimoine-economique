import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let array = [];
for (let i = 1; i <= 31; i++) {
  array.push(i);
}

function DateDay({
  dateDebut,
  setDateDebut,
  dateFin,
  setDateFin,
  jour,
  setJour,
  handleValidateRange,
}) {
  return (
    <div className="range">
      <div className="mb-3">
        <p>Date de début :</p>
        <DatePicker
          selected={dateDebut}
          onChange={setDateDebut}
          className="date-picker"
        />
      </div>
      <div className="mb-3">
        <p>Date fin :</p>
        <DatePicker
          selected={dateFin}
          onChange={setDateFin}
          className="date-picker"
        />
      </div>
      <div className="mb-3">
        <p>Jour :</p>
        <select
          value={jour}
          onChange={(e) => setJour(parseInt(e.target.value))}
          className="date-picker jour-select jour"
        >
          {array.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          className="btn custom-button mt-5 ms-0"
          onClick={handleValidateRange}
        >
          Valider
        </button>
      </div>
    </div>
  );
}

export default DateDay;
