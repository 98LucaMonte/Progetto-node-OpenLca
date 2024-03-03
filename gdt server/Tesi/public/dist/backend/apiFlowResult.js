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
exports.ApiFlowResults = void 0;
//const vps:string = 'http://109.205.180.220:3000/'; //indirizzo vps 
const vps = 'http://127.0.0.1:3000/'; // docker run -p 3000:8080 -v $HOME/openLCA-data-1.4:/app/data --rm -d gdt-server -db case_study
class ApiFlowResults {
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
exports.ApiFlowResults = ApiFlowResults;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpRmxvd1Jlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzL2JhY2tlbmQvYXBpRmxvd1Jlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxRUFBcUU7QUFDckUsTUFBTSxHQUFHLEdBQVUsd0JBQXdCLENBQUMsQ0FBQyxnR0FBZ0c7QUFHN0ksTUFBYSxjQUFjO0lBQTNCO1FBRUk7Ozs7V0FJRztRQUNILHVCQUFrQixHQUFHLENBQU8sU0FBZ0IsRUFBRSxFQUFFO1lBQzVDLElBQUksQ0FBQztnQkFDRCxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFDLFNBQVMsR0FBQyxjQUFjLENBQUM7Z0JBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDOUIsT0FBTyxDQUFDLENBQUM7WUFDYixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzNELENBQUM7UUFDTCxDQUFDLENBQUEsQ0FBQTtRQUVELHdCQUFtQixHQUFHLENBQU8sU0FBZ0IsRUFBQyxPQUFjLEVBQUUsRUFBRTtZQUM1RCxJQUFJLENBQUM7Z0JBRUQsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLFNBQVMsR0FBQyxTQUFTLEdBQUMsdUJBQXVCLEdBQUUsT0FBTyxHQUFDLElBQUksQ0FBQztnQkFDMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxHQUFHLE1BQU0s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