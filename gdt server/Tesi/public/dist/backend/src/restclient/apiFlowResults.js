var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ApiFlowResults {
    constructor() {
        /**(5.6.1) testato
         * Questo metodo ritorna l'inventario dei flussi del Product system calcolato.
         *
         * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
         */
        this.getInventoryResult = (vps, idCalcolo) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/total-flows";
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getTotalFlowValueOf = (vps, idCalcolo, element) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/total-flow-value-of/" + element + "::";
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getFlowContributionsOf = (vps, idCalcolo, element) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/flow-contributions-of/" + element;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getDirectInterventionsOf = (vps, idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/direct-interventions-of/" + techFlow;
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getDirectInterventionsOfEnviFlowTechFlow = (vps, idCalcolo, element, techFlow) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/direct-intervention-of/" + element + "/" + techFlow;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getFlowIntensitiesOf = (vps, idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/flow-intensities-of/" + techFlow;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getFlowIntensityOfEnviFlowTechFlow = (vps, idCalcolo, idEnviFlow, techFlow) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/flow-intensity-of/" + idEnviFlow + "/" + techFlow;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getTotalInterventionsOf = (vps, idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/total-interventions-of/" + techFlow;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getTotalInterventionOfEnviFlowTechFlow = (vps, idCalcolo, enviFlow, techFlow) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/total-intervention-of/" + enviFlow + "/" + techFlow;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        //not found url
        this.getUpstreamInterventionsOf = (vps, idCalcolo, enviFlow) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/upstream-interventions-of/" + enviFlow + "::";
                console.log(url);
                let response = yield fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
    }
}
export default ApiFlowResults;
