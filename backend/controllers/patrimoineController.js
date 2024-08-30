import { readFile, writeFile } from '../data/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import Patrimoine from '../models/Patrimoine.js';
import Possession from '../models/possessions/Possession.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../data/data.json');

// Récupère la valeur du patrimoine sur une période donnée avec une granularité de jours
export const getValeurPatrimoineRange = async (req, res) => {
  const { dateDebut, dateFin, jour } = req.body;
  const parsedDateDebut = new Date(dateDebut);
  const parsedDateFin = new Date(dateFin);

  if (isNaN(parsedDateDebut) || isNaN(parsedDateFin)) {
    return res.status(400).json({ message: 'Dates invalides' });
  }

  try {
    const result = await readFile(dataFilePath);

    if (result.status !== 'OK') {
      return res.status(500).json(result.error);
    }

    const patrimoineData = result.data.find(entry => entry.model === 'Patrimoine');
    if (!patrimoineData) {
      return res.status(404).json({ message: 'Patrimoine non trouvé' });
    }

    const possessions = patrimoineData.data.possessions.map(p =>
      new Possession(
        p.possesseur,
        p.libelle,
        p.valeur,
        new Date(p.dateDebut),
        p.dateFin ? new Date(p.dateFin) : null,
        p.tauxAmortissement
      )
    );

    const patrimoine = new Patrimoine(patrimoineData.data.possesseur, possessions);

    let valeurPatrimoines = [];
    let currentDate = new Date(parsedDateDebut);

    while (currentDate <= parsedDateFin) {
      valeurPatrimoines.push(patrimoine.getValeur(currentDate));
      currentDate.setDate(currentDate.getDate() + jour);
    }

    res.json({ valeur: valeurPatrimoines });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du traitement des données', error });
  }
};

// Récupère la valeur du patrimoine à une date précise
export const getValeurPatrimoine = async (req, res) => {
  const { date } = req.params;
  const parsedDate = new Date(date);

  if (isNaN(parsedDate)) {
    return res.status(400).json({ message: 'Date invalide' });
  }

  try {
    const result = await readFile(dataFilePath);

    if (result.status !== 'OK') {
      return res.status(500).json(result.error);
    }

    const patrimoineData = result.data.find(entry => entry.model === 'Patrimoine');
    if (!patrimoineData) {
      return res.status(404).json({ message: 'Patrimoine non trouvé' });
    }

    const possessions = patrimoineData.data.possessions.map(p =>
      new Possession(
        p.possesseur,
        p.libelle,
        p.valeur,
        new Date(p.dateDebut),
        p.dateFin ? new Date(p.dateFin) : null,
        p.tauxAmortissement
      )
    );

    const patrimoine = new Patrimoine(patrimoineData.data.possesseur, possessions);
    const totalValeur = patrimoine.getValeur(parsedDate);

    res.json({ valeur: totalValeur });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du traitement des données', error });
  }
};
