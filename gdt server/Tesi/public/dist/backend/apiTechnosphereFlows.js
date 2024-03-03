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
exports.ApiTechnosphereFlows = void 0;
//const vps:string = 'http://109.205.180.220:3000/'; //indirizzo vps 
const vps = 'http://127.0.0.1:3000/'; // docker run -p 3000:8080 -v $HOME/openLCA-data-1.4:/app/data --rm -d gdt-server -db case_study
class ApiTechnosphereFlows {
    constructor() {
        /**
         * Questo metodo restituisce i requisiti totali dei flussi della tecnosfera
         * necessari per soddisfare la domanda del sistema di prodotto calcolato.
         *
         *
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
         */
        this.getTotalRequirements = (idCalcolo) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/total-requirements";
                console.log(url);
                let resp = yield fetch(url);
                let v = yield resp.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        /** I requisiti diretti di un processo j sono gli input e gli output in scala
         * del prodotto collegato e i flussi di rifiuti di quel processo relativi alla domanda finale del sistema di prodotto.
         *
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
         */
        this.getTotalRequirementsOfFlows = (idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/total-requirements-of/" + techFlow;
                console.log(url);
                let resp = yield fetch(url);
                let v = yield resp.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        /**Il vettore di scala s contiene per ciascun processo j
         * un fattore sj in base al quale il processo deve essere scalato per soddisfare la domanda del sistema di prodotto.
         *
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
         */
        this.getScalingFactors = (idCalcolo) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/scaling-factors";
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
         *
         *
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
         */
        this.getScaledTechFlowsOf = (idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/scaled-tech-flows-of/" + techFlow;
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
         *
         *
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
         */
        this.getUnscaledTechFlowsOf = (idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/unscaled-tech-flows-of/" + techFlow;
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
exports.ApiTechnosphereFlows = ApiTechnosphereFlows;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpVGVjaG5vc3BoZXJlRmxvd3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9iYWNrZW5kL2FwaVRlY2hub3NwaGVyZUZsb3dzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFFQUFxRTtBQUNyRSxNQUFNLEdBQUcsR0FBVSx3QkFBd0IsQ0FBQyxDQUFDLGdHQUFnRztBQUU3SSxNQUFhLG9CQUFvQjtJQUFqQztRQUVJOzs7Ozs7O1dBT0c7UUFDSCx5QkFBb0IsR0FBRyxDQUFPLFNBQWdCLEVBQUUsRUFBRTtZQUM5QyxJQUFJLENBQUM7Z0JBQ0QsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLFNBQVMsR0FBQyxTQUFTLEdBQUMscUJBQXFCLENBQUM7Z0JBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDMUIsT0FBTyxDQUFDLENBQUM7WUFDYixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzNELENBQUM7UUFDTCxDQUFDLENBQUEsQ0FBQTtRQUVEOzs7OztXQUtHO1FBQ0gsZ0NBQTJCLEdBQUcsQ0FBUSxTQUFnQixFQUFFLFFBQWUsRUFBRSxFQUFFO1lBQ3ZFLElBQUksQ0FBQztnQkFFRCxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLFNBQVMsR0FBRyx5QkFBeUIsR0FBRyxRQUFRLENBQUM7Z0JBQzdFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dC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