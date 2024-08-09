import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const formatNumber = (number) => {
  return new Intl.NumberFormat('fr-FR').format(number);
};

const PatrimoineCalculator = ({ patrimoine }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [valeurPatrimoine, setValeurPatrimoine] = useState(null);

  const calculerValeurPatrimoine = () => {
    const valeur = patrimoine.getValeur(selectedDate);
    setValeurPatrimoine(valeur.toFixed(2));
  };

  return (
    <div>
       <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        className="form-control custom-datepicker" 
      />
      <button onClick={calculerValeurPatrimoine} className="mt-3 ms-2">Valider</button>
      {valeurPatrimoine !== null && <p className='fs-4 mt-3'>Valeur du Patrimoine : {formatNumber(valeurPatrimoine) + ' Ar'}</p>}
    </div>
  );
};

export default PatrimoineCalculator;
