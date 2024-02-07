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
class ApiImpactResults {
    constructor() {
        /**(5.6.1) testato
         * Questo metodo ritorna l'inventario dei flussi del Product system calcolato.
         *
         * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
         * @param {String} idCalcolo - Identificativo del calcolo di un product system.
         * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
         */
        this.getTotalImpacts = (vps, idCalcolo) => __awaiter(this, void 0, void 0, function* () {
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
        this.getTotalImpactsNormalized = (vps, idCalcolo) => __awaiter(this, void 0, void 0, function* () {
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
        this.getTotalImpactsWeighted = (vps, idCalcolo) => __awaiter(this, void 0, void 0, function* () {
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
        this.getTotalImpactValueOf = (vps, idCalcolo, idImpactCategory) => __awaiter(this, void 0, void 0, function* () {
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
        this.getImpactContributionsOf = (vps, idCalcolo, idImpactCategory) => __awaiter(this, void 0, void 0, function* () {
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
        this.getDirectImpactsOf = (vps, idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
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
        this.getDirectImpactOfImpactCategoryTechFlow = (vps, idCalcolo, techFlow, idImpactCategory) => __awaiter(this, void 0, void 0, function* () {
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
        this.getImpactIntensitiesOf = (vps, idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
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
        this.getDirectImpactIntensityOfImpactCategoryTechFlow = (vps, idCalcolo, techFlow, idImpactCategory) => __awaiter(this, void 0, void 0, function* () {
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
        this.getTotalImpactsOf = (vps, idCalcolo, techFlow) => __awaiter(this, void 0, void 0, function* () {
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
        this.getTotalImpactOfImpactCategoryTechFlow = (vps, idCalcolo, techFlow, idImpactCategory) => __awaiter(this, void 0, void 0, function* () {
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
        this.getImpactFactorsOf = (vps, idCalcolo, idImpactCategory) => __awaiter(this, void 0, void 0, function* () {
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
        this.getImpactFactorsOfImpactCategoryEnviFlow = (vps, idCalcolo, idImpactCategory, element) => __awaiter(this, void 0, void 0, function* () {
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
        this.getFlowImpactsOf = (vps, idCalcolo, idImpactCategory) => __awaiter(this, void 0, void 0, function* () {
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
        this.getFlowImpactOfImpactCategoryEnviFlow = (vps, idCalcolo, idImpactCategory, element) => __awaiter(this, void 0, void 0, function* () {
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
exports.default = ApiImpactResults;
