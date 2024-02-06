var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ApiTechnosphereFlows {
    constructor() {
        /** (5.5.2) testato
         * Questo metodo restituisce i requisiti totali dei flussi della tecnosfera
         * necessari per soddisfare la domanda del sistema di prodotto calcolato.
         *
         * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
         */
        this.getTotalRequirements = (vps, idCalcolo) => __awaiter(this, void 0, void 0, function* () {
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
        /** testato
         * I requisiti diretti di un processo j sono gli input e gli output in scala
         * del prodotto collegato e i flussi di rifiuti di quel processo relativi alla domanda finale del sistema di prodotto.
         *
         * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
         */
        this.getTotalRequirementsOfFlows = (vps, idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
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
        /** (5.5.4) testato
         * Il vettore di scala s contiene per ciascun processo j
         * un fattore sj in base al quale il processo deve essere scalato per soddisfare la domanda del sistema di prodotto.
         *
         * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
         */
        this.getScalingFactors = (vps, idCalcolo) => __awaiter(this, void 0, void 0, function* () {
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
        /** testato
         *
         * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
         */
        this.getScaledTechFlowsOf = (vps, idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
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
        /** testato
         *
         * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
         */
        this.getUnscaledTechFlowsOf = (vps, idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
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
export default ApiTechnosphereFlows;
