import React, { useEffect, useState } from 'react';
import Argent from '../../models/possessions/Argent';
import BienMateriel from '../../models/possessions/BienMateriel';
import Flux from '../../models/possessions/Flux';
import Possession from '../../models/possessions/Possession';
import Patrimoine from '../../models/Patrimoine';
import Personne from '../../models/Personne';
import PossessionsTable from './components/PossessionsTable';
import PatrimoineCalculator from './components/PatrimoineCalculator';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {

    const [patrimoine, setPatrimoine] = useState(null);
  
    useEffect(() => {
      fetch('/data.json')
        .then((res) => res.json())
        .then((data) => {
          const personneData = data.find(item => item.model === 'Personne').data;
          const possessionsData = data.find(item => item.model === 'Patrimoine').data.possessions;
  
          const personne = new Personne(personneData.nom);
          const possessions = possessionsData.map((item) => {
            if (item.jour) {
              return new Flux (
                personne, 
                item.libelle,
                item.valeurConstante, 
                new Date(item.dateDebut), 
                item.dateFin? new Date(item.dateFin) : null,
                item.tauxAmortissement, 
                item.jour);
            } else {
              return new Possession (
                personne, 
                item.libelle, 
                item.valeur, 
                new Date(item.dateDebut), 
                item.dateFin? new Date(item.dateFin) : null, 
                item.tauxAmortissement);
            }
          });
  
          const patrimoineInstance = new Patrimoine(personne, possessions);
          setPatrimoine(patrimoineInstance);
        });
    }, []);
  
    if (!patrimoine) {
      return <div>Chargement en cours...</div>;
    }
  
    return (
      <div className='vh-100 d-flex flex-column justify-content-center align-items-center'>
        <div className='container text-center'>
        <h1 className='mb-4'>Patrimoine de {patrimoine.possesseur.nom}</h1>
          <PossessionsTable possessions={patrimoine.possessions} />
          <PatrimoineCalculator patrimoine={patrimoine} />
        </div>
      </div>
    );
  }
  
  export default App;
