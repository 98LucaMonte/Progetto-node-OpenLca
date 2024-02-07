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
class ApiCalculation {
    constructor() {
        /** Questo metodo serve per selezionare la versione del db.
         *
         * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
         * @returns {Json} - Json che contiene informazioni sulla versione del db.
         */
        this.version = (vps) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Esegui una richiesta verso il tuo server VPS
                const response = yield fetch(vps + "api/version");
                if (response.ok) {
                    console.log('Connessione riuscita');
                    let data = yield response.json();
                    return data;
                    // Puoi fare qualcos'altro qui se la connessione ha successo
                }
                else {
                    console.error('Errore durante la connessione');
                }
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        /**Questo metodo serve per selezionare i Product System disponibili.
         *
         * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
         * @returns {Json} - Json che contiene i product system.
         */
        this.getProductSystem = (vps) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "data/product-system/all";
                console.log(url);
                let resp = yield fetch(url);
                let v = yield resp.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        /**Questo metodo serve per selezionare gli impact Method disponibili.
        *
        * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
        * @returns {Json} - Json che contiene gli impact method.
        */
        this.getImpactMethod = (vps) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "data/impact-method/all";
                console.log(url);
                let resp = yield fetch(url);
                let v = yield resp.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        /**Questo metodo serve per calcolare le caratteristiche di impatto di un Product system.
         *
         * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
         * @param {String} idProductSystem - Identificativo del Product system che si vuole calcolare.
         * @param {String} idImpactMethod - Identificativo del'Impact method che si vuole usare per effettuare il calcolo.
         * @param {String} idNewSet - Identificativo del newSets.
         * @returns {Json} - Json che contiene informazioni sul calcolo del product system (come ad esempio l'id del calcolo).
         */
        this.calcolaProductSystem = (vps, idProductSystem, idImpactMethod, idNewSet) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/calculate";
                console.log(url);
                let response = yield fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        target: {
                            "@type": "ProductSystem",
                            "@id": idProductSystem
                        },
                        impactMethod: {
                            "@id": idImpactMethod
                        },
                        nwSet: {
                            "@id": idNewSet
                        },
                        withCosts: true,
                        amount: 1.0
                    })
                });
                if (response.ok) {
                    //La richiesta ha avuto successo
                    const responseData = yield response.json();
                    return responseData;
                }
                else {
                    //Gestisco l'errore se la richiesta non ha avuto successo
                    console.error('Errore nella risposta HTTP:', response.status, response.statusText);
                    return response;
                }
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        /**Questo metodo serve per sapere lo stato del Product system calcolato.
         *
         * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
         * @param {String} idCalcolo - Identificativo del calcolo appena effettuato.
         * @returns {Json} - Json che contiene informazioni sullo stato del calcolo.
         */
        this.getStatoCalcolo = (vps, idCalcolo) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/state";
                console.log(url);
                console.log("Stiamo calcolando...");
                let resp = yield fetch(url);
                let v = yield resp.json();
                return v.isReady;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.nuovoProductSystem = (vps, idProcess) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "data/create-system";
                console.log(url);
                let response = yield fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "process": {
                            "@id": idProcess
                        }
                    })
                });
                if (response.ok) {
                    //La richiesta ha avuto successo
                    const responseData = yield response.json();
                    return responseData;
                }
                else {
                    //Gestisco l'errore se la richiesta non ha avuto successo
                    console.error('Errore nella risposta HTTP:', response.status, response.statusText);
                    return response;
                }
            }
            catch (error) {
                console.log("sono qui");
                console.error('Errore durante la connessione:', error);
            }
        });
        this.getAll = (vps, type) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "data/" + type + "/";
                console.log(url);
                let resp = yield fetch(url);
                let v = yield resp.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        this.putNuovoElement = (vps, type, json) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "data/" + type + "/";
                console.log(url);
                let response = yield fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(json)
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
exports.default = ApiCalculation;
