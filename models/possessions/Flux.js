import Possession from "./Possession.js";

export default class Flux extends Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    this.valeur = 0;
    this.jour = jour;
    this.valeurConstante = valeur;
  }

  getValeur(date) {
    // Reset the value to the initial constant value before calculating
    let accumulatedValue = 0;

    const nombreDeMois = (debut, dateEvaluation, jourJ) => {
      let compteur = 0;

      if (debut.getDate() < jourJ) {
        compteur++;
      }

      if (dateEvaluation.getDate() >= jourJ && !(debut.getFullYear() === dateEvaluation.getFullYear() && debut.getMonth() === dateEvaluation.getMonth())) {
        compteur++;
      }

      let totalMois = (dateEvaluation.getFullYear() - debut.getFullYear()) * 12 + (dateEvaluation.getMonth() - debut.getMonth()) - 1;

      compteur += Math.max(0, totalMois);

      return compteur;
    };

    accumulatedValue += nombreDeMois(this.dateDebut, date, this.jour) * this.valeurConstante;

    return accumulatedValue;
  }
}
