import React from 'react';

const formatNumber = (number) => {
  return new Intl.NumberFormat('fr-FR').format(number);
};

const PossessionsTable = ({ possessions }) => {
  return (
    <div className='table-responsive'>
      <table className='table table-striped table-bordered table-hover table-responsive'>
        <thead className='thead-dark'>
          <tr>
            <th>Libellé</th>
            <th>Valeur Initiale (Ar)</th>
            <th>Date de Début</th>
            <th>Date de Fin</th>
            <th>Amortissement (%)</th>
            <th>Valeur Actuelle (Ar)</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession, index) => (
            <tr key={index}>
              <td>{possession.libelle}</td>
              <td>{formatNumber(possession.valeur)}</td>
              <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
              <td> {possession.dateFin? new Date(possession.dateFin).toLocaleDateString() : 'N/A'}</td>
              <td>{possession.tauxAmortissement || 'N/A'}</td>
              <td>{formatNumber(possession.getValeur(new Date()).toFixed(2))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default PossessionsTable;
