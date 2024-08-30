import { readFile, writeFile } from '../data/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import Patrimoine from "../models/Patrimoine.js";
import Personne from "../models/Personne.js";
import Possession from "../models/possessions/Possession.js";
import Flux from "../models/possessions/Flux.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../data/data.json');


const createPossessionInstance = (personne, possessionData) => {
    if (possessionData.jour) {
        return new Flux(
            personne,
            possessionData.libelle,
            possessionData.valeurConstante,
            new Date(possessionData.dateDebut),
            possessionData.dateFin ? new Date(possessionData.dateFin) : null,
            possessionData.tauxAmortissement,
            possessionData.jour
        );
    }
    return new Possession(
        personne,
        possessionData.libelle,
        possessionData.valeur,
        new Date(possessionData.dateDebut),
        possessionData.dateFin ? new Date(possessionData.dateFin) : null,
        possessionData.tauxAmortissement
    );
};


export const getPossessions = async (req, res) => {
    const result = await readFile(dataFilePath);
    if (result.status !== "OK") {
        return res.status(500).json(result.error);
    }

    const personneData = result.data.find(item => item.model === "Personne")?.data;
    if (!personneData) return res.status(404).json({ message: "Personne non trouvée" });

    const patrimoineData = result.data.find(item => item.model === "Patrimoine")?.data;
    if (!patrimoineData) return res.status(404).json({ message: "Patrimoine non trouvé" });

    const personne = new Personne(personneData.nom);
    const possessionsInstances = patrimoineData.possessions.map(possessionData =>
        createPossessionInstance(personne, possessionData)
    );

    possessionsInstances.forEach(possession => {
        possession.valeurActuelle = possession.getValeur(new Date()).toFixed(2);
    });

    res.json(possessionsInstances);
};


export const createPossession = async (req, res) => {
    const result = await readFile(dataFilePath);
    if (result.status !== "OK") {
        return res.status(500).json(result.error);
    }

    const personneData = result.data.find(item => item.model === "Personne")?.data;
    if (!personneData) return res.status(404).json({ message: "Personne non trouvée" });

    const patrimoineEntry = result.data.find(entry => entry.model === "Patrimoine");
    if (!patrimoineEntry) return res.status(404).json({ message: "Patrimoine non trouvé" });

    const personne = new Personne(personneData.nom);
    const possessions = patrimoineEntry.data.possessions.map(possessionData =>
        createPossessionInstance(personne, possessionData)
    );

    const patrimoine = new Patrimoine(personne, possessions);
    const newPossession = createPossessionInstance(personne, req.body);

    patrimoine.addPossession(newPossession);
    patrimoineEntry.data.possessions = patrimoine.possessions;

    const writeResult = await writeFile(dataFilePath, result.data);
    if (writeResult.status === "OK") {
        res.status(201).json(newPossession);
    } else {
        res.status(500).json(writeResult.error);
    }
};

export const updatePossession = async (req, res) => {
    const { libelle } = req.params;
    const { dateFin, newLibelle } = req.body;

    const result = await readFile(dataFilePath);
    if (result.status !== "OK") {
        return res.status(500).json(result.error);
    }

    const personneData = result.data.find(item => item.model === "Personne")?.data;
    if (!personneData) return res.status(404).json({ message: "Personne non trouvée" });

    const patrimoineEntry = result.data.find(entry => entry.model === "Patrimoine");
    if (!patrimoineEntry) return res.status(404).json({ message: "Patrimoine non trouvé" });

    const personne = new Personne(personneData.nom);
    const possession = patrimoineEntry.data.possessions.find(p => p.libelle === libelle);
    if (!possession) return res.status(404).json({ message: "Possession non trouvée" });

    if (newLibelle) possession.libelle = newLibelle;
    if (dateFin) possession.dateFin = dateFin;

    const writeResult = await writeFile(dataFilePath, result.data);
    if (writeResult.status === "OK") {
        res.json(possession);
    } else {
        res.status(500).json(writeResult.error);
    }
};


export const closePossession = async (req, res) => {
    const { libelle } = req.params;
    
    const result = await readFile(dataFilePath);
    if (result.status !== "OK") {
        return res.status(500).json(result.error);
    }

    const patrimoineEntry = result.data.find(entry => entry.model === "Patrimoine");
    if (!patrimoineEntry) return res.status(404).json({ message: "Patrimoine non trouvé" });

    const possession = patrimoineEntry.data.possessions.find(p => p.libelle === libelle);
    if (!possession) return res.status(404).json({ message: "Possession non trouvée" });

    possession.dateFin = new Date().toISOString();

    const writeResult = await writeFile(dataFilePath, result.data);
    if (writeResult.status === "OK") {
        res.json(possession);
    } else {
        res.status(500).json(writeResult.error);
    }
};
