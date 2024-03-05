var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//const vps:string = 'http://109.205.180.220:3000/'; //indirizzo vps 
const vps = 'http://127.0.0.1:3000/'; // docker run -p 3000:8080 -v $HOME/openLCA-data-1.4:/app/data --rm -d gdt-server -db case_study
export class ApiFlowResults {
    constructor() {
        /**Questo metodo ritorna l'inventario dei flussi del Product system calcolato.
         *
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
         */
        this.getInventoryResult = (idCalcolo) => __awaiter(this, void 0, void 0, function* () {
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
        this.getTotalFlowValueOf = (idCalcolo, element) => __awaiter(this, void 0, void 0, function* () {
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
        this.getFlowContributionsOf = (idCalcolo, element) => __awaiter(this, void 0, void 0, function* () {
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
        this.getDirectInterventionsOf = (idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
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
        this.getDirectInterventionsOfEnviFlowTechFlow = (idCalcolo, element, techFlow) => __awaiter(this, void 0, void 0, function* () {
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
        this.getFlowIntensitiesOf = (idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
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
        this.getFlowIntensityOfEnviFlowTechFlow = (idCalcolo, idEnviFlow, techFlow) => __awaiter(this, void 0, void 0, function* () {
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
        this.getTotalInterventionsOf = (idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
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
        this.getTotalInterventionOfEnviFlowTechFlow = (idCalcolo, enviFlow, techFlow) => __awaiter(this, void 0, void 0, function* () {
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
        this.getUpstreamInterventionsOf = (idCalcolo, enviFlow) => __awaiter(this, void 0, void 0, function* () {
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
