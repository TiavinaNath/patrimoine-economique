import React from "react";
import { Link } from "react-router-dom";
import { Table, Button, Container } from "react-bootstrap";
import './css/PossessionList.css';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function PossessionList({ possessions, refetchPossessions }) {

  const formatNumber = (number) => {
    return new Intl.NumberFormat('fr-FR').format(number);
  };

  const closePossession = async (libelle) => {
    try {
      const response = await fetch(`${apiUrl}/possession/${libelle}/close`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      refetchPossessions();
    } catch (error) {
      console.error("Erreur lors de la récupération des données: ", error);
    }
  };

  return (
    <Container className="mt-4 custom-container">
      <h2 className="mb-4 text-center">Voici la liste de vos possessions: </h2>
      <Link to="/possession/create" className="btn btn-create-possession">
        Ajouter une Possession
      </Link>
      <div className="table-responsive">
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>Libellé</th>
              <th>Valeur Initiale (Ar)</th>
              <th>Date Début</th>
              <th>Date Fin</th>
              <th>Taux (%)</th>
              <th>Valeur Actuelle (Ar)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {possessions.map((possession, index) => (
              <tr key={index}>
                <td>{possession.libelle}</td>
                <td>
                  {possession.valeur
                    ? formatNumber(possession.valeur)
                    : formatNumber(possession.valeurConstante)}
                </td>
                <td>
                  {new Date(possession.dateDebut || Date.now()).toLocaleDateString()}
                </td>
                <td>
                  {possession.dateFin
                    ? new Date(possession.dateFin).toLocaleDateString()
                    : "_"}
                </td>
                <td>
                  {possession.tauxAmortissement !== null
                    ? possession.tauxAmortissement
                    : "_"}
                </td>
                <td>{formatNumber(possession.valeurActuelle)}</td>
                <td>
                  <Link
                    to={`/possession/${possession.libelle}/update`}
                    className="btn btn-outline-secondary me-2 edit"
                  >
                    Editer
                  </Link>
                  <Button
                    className="btn btn-cloture"
                    onClick={() => closePossession(possession.libelle)}
                  >
                    Clôturer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default PossessionList;
