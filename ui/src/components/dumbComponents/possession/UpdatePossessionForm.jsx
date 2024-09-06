import React from 'react';
import './css/UpdatePossessionForm.css';

const UpdatePossessionForm = ({ libelle, dateFin, setDateFin, newLibelle, setNewLibelle, handleSubmit }) => {
  return (
    <div className="form-container">
      <h2>Mettre à jour la Possession: {libelle}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nouveau nom du libellé</label>
          <input 
            type="text" 
            value={newLibelle} 
            onChange={(e) => setNewLibelle(e.target.value)} 
            className="form-control" 
          />
          <label>Date Fin</label>
          <input 
            type="date" 
            value={dateFin} 
            onChange={(e) => setDateFin(e.target.value)} 
            className="form-control" 
          />
        </div>
        <button type="submit" className="btn custom-button">
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default UpdatePossessionForm;
