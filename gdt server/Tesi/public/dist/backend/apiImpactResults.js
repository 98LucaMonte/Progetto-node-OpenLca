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
exports.ApiImpactResults = void 0;
//const vps:string = 'http://109.205.180.220:3000/'; //indirizzo vps 
const vps = 'http://127.0.0.1:3000/'; // docker run -p 3000:8080 -v $HOME/openLCA-data-1.4:/app/data --rm -d gdt-server -db case_study
class ApiImpactResults {
    constructor() {
        /**Questo metodo ritorna l'inventario dei flussi del Product system calcolato.
         *
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
         */
        this.getTotalImpacts = (idCalcolo) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/total-impacts";
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getTotalImpactsNormalized = (idCalcolo) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/total-impacts/normalized";
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getTotalImpactsWeighted = (idCalcolo) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/total-impacts/weighted/";
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getTotalImpactValueOf = (idCalcolo, idImpactCategory) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/total-impact-value-of/" + idImpactCategory;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getImpactContributionsOf = (idCalcolo, idImpactCategory) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/impact-contributions-of/" + idImpactCategory;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getDirectImpactsOf = (idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/direct-impacts-of/" + techFlow;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getDirectImpactOfImpactCategoryTechFlow = (idCalcolo, techFlow, idImpactCategory) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/direct-impact-of/" + idImpactCategory + "/" + techFlow;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getImpactIntensitiesOf = (idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/impact-intensities-of/" + techFlow;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getDirectImpactIntensityOfImpactCategoryTechFlow = (idCalcolo, techFlow, idImpactCategory) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/impact-intensity-of/" + idImpactCategory + "/" + techFlow;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getTotalImpactsOf = (idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/total-impacts-of/" + techFlow;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getTotalImpactOfImpactCategoryTechFlow = (idCalcolo, techFlow, idImpactCategory) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/total-impact-of/" + idImpactCategory + "/" + techFlow;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getImpactFactorsOf = (idCalcolo, idImpactCategory) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/impact-factors-of/" + idImpactCategory;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getImpactFactorsOfImpactCategoryEnviFlow = (idCalcolo, idImpactCategory, element) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/impact-factor-of/" + idImpactCategory + "/" + element;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getFlowImpactsOf = (idCalcolo, idImpactCategory) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/flow-impacts-of/" + idImpactCategory;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getFlowImpactOfImpactCategoryEnviFlow = (idCalcolo, idImpactCategory, element) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/flow-impact-of/" + idImpactCategory + "/" + element;
                console.log(url);
                let response = yield fetch(url);
                let v = yield response.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
    }
}
exports.ApiImpactResults = ApiImpactResults;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpSW1wYWN0UmVzdWx0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzL2JhY2tlbmQvYXBpSW1wYWN0UmVzdWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxRUFBcUU7QUFDckUsTUFBTSxHQUFHLEdBQVUsd0JBQXdCLENBQUMsQ0FBQyxnR0FBZ0c7QUFFN0ksTUFBYSxnQkFBZ0I7SUFBN0I7UUFFSTs7OztXQUlHO1FBQ0gsb0JBQWUsR0FBRyxDQUFPLFNBQWdCLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUM7Z0JBQ0QsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLFNBQVMsR0FBQyxTQUFTLEdBQUMsZ0JBQWdCLENBQUM7Z0JBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDOUIsT0FBTyxDQUFDLENBQUM7WUFDYixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzNELENBQUM7UUFDTCxDQUFDLENBQUEsQ0FBQTtRQUVELDhCQUF5QixHQUFHLENBQU8sU0FBZ0IsRUFBRSxFQUFFO1lBQ25ELElBQUksQ0FBQztnQkFDRCxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFDLFNBQVMsR0FBQywyQkFBMkIsQ0FBQztnQkFDaEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxD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