"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCalculation = void 0;
//const vps:string = 'http://109.205.180.220:3000/'; //indirizzo vps 
const vps = 'http://127.0.0.1:3000/'; // docker run -p 3000:8080 -v $HOME/openLCA-data-1.4:/app/data --rm -d gdt-server -db case_study
class ApiCalculation {
    constructor() {
        /**
         * Un sistema di prodotto viene calcolato per un singolo valore di domanda per un flusso della tecnosfera:
         * un prodotto in uscita o un input di rifiuti del sistema. È il riferimento quantitativo del sistema.
         * Nel caso generale, un sistema può avere più valori di domanda organizzati in un
         * vettore di domanda finale f che è indicizzato allo stesso modo della matrice tecnologica (si noti che un sistema a domanda multipla
         * può essere trasformato in un sistema a domanda singola semplicemente aggiungendo un colonna di processo aggiuntiva alla matrice tecnologica).
         *
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
         */
        this.getRichiestaFinale = (idCalcolo) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/demand";
                console.log(url);
                let resp = yield fetch(url);
                let v = yield resp.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        /**
         * Questo metodo restituisce gli n flussi di tecnosfera di un risultato. Questi
         * sono i flussi attraverso i quali sono collegati i processi del sistema calcolato.
         * Ogni flusso della tecnosfera è una coppia di un prodotto o flusso di rifiuti e
         * un fornitore in cui il fornitore è tipicamente un processo ma può anche essere un sistema di prodotto
         * (un sottosistema) o anche un altro risultato.
         *
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
         */
        this.getTechnosphereFlows = (idCalcolo) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/tech-flows";
                console.log(url);
                let resp = yield fetch(url);
                let v = yield resp.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        /**
         * Questo metodo restituisce i flussi di intervento m di un risultato.
         * Questi sono i flussi che attraversano il confine con l'ambiente del sistema calcolato
         * (ecco perché il nome abbreviato è EnviFlow nell'API). Nei calcoli regionalizzati questi flussi possono essere coppie di flussi e luoghi,
         * lo stesso flusso può verificarsi in luoghi diversi (con fattori di caratterizzazione possibilmente diversi).
         *
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
         */
        this.getInterventionFlows = (idCalcolo) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/envi-flows";
                console.log(url);
                let resp = yield fetch(url);
                let v = yield resp.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        /**
         * Questo metodo restituisce le categorie di impatto di un risultato.
         * Le righe della matrice di impatto C sono indicizzate in base a queste categorie
         * di impatto e le colonne in base agli m flussi di intervento del sistema.
         * Contiene i rispettivi fattori di caratterizzazione dei flussi di intervento.
         *
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
         */
        this.getImpactCategories = (idCalcolo) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/impact-categories";
                console.log(url);
                let resp = yield fetch(url);
                let v = yield resp.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
    }
}
exports.ApiCalculation = ApiCalculation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpUmVzdWx0UXVlcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzL2JhY2tlbmQvYXBpUmVzdWx0UXVlcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxRUFBcUU7QUFDckUsTUFBTSxHQUFHLEdBQVUsd0JBQXdCLENBQUMsQ0FBQyxnR0FBZ0c7QUFFN0ksTUFBYSxjQUFjO0lBQTNCO1FBRUk7Ozs7Ozs7OztXQVNHO1FBQ0gsdUJBQWtCLEdBQUcsQ0FBTyxTQUFnQixFQUFFLEVBQUU7WUFDNUMsSUFBSSxDQUFDO2dCQUNELElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUMsU0FBUyxHQUFDLFNBQVMsQ0FBQztnQkFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxQixPQUFPLENBQUMsQ0FBQztZQUNiLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0QsQ0FBQztRQUNMLENBQUMsQ0FBQSxDQUFBO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0gseUJBQW9CLEdBQUcsQ0FBTyxTQUFnQixFQUFFLEVBQUU7WUFDOUMsSUFBSSxDQUFDO2dCQUNELElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUMsU0FBUyxHQUFDLGFBQWEsQ0FBQztnQkFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxQixPQUFPLENBQUMsQ0FBQztZQUNiLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0QsQ0FBQztRQUNMLENBQUMsQ0FBQSxDQUFBO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSCx5QkFBb0IsR0FBRyxDQUFPLFNBQWdCLEVBQUUsRUFBRTtZQUM5QyxJQUFJLENBQUM7Z0JBQ0QsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLFNBQVMsR0FBQyxTQUFTLEdBQUMsYUFBYSxDQUFDO2dCQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxDQUFDO1lBQ2IsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMzRCxDQUFDO1FBQ0wsQ0FBQyxDQUFBLENBQUE7UUFFRDs7Ozs7Ozs7V0FRRztRQUNILHdCQUFtQixHQUFHLENBQU8sU0FBZ0IsRUFBRSxFQUFFO1lBQzdDLElBQUksQ0FBQztnQkFDRCxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFDLFNBQVMsR0FBQyxvQkFBb0IsQ0FBQztnQkFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxQixPQUFPLENBQUMsQ0FBQztZQUNiLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0QsQ0FBQztRQUNMLENBQUMsQ0FBQSxDQUFBO0lBQ0wsQ0FBQztDQUFBO0FBdkZELHdDQXVGQyJ9