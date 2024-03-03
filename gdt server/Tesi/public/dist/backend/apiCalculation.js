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
//docker run -p 3000:8080 -v $HOME/openLCA-data-1.4:/app/data --rm -d dbopenlca -db case_study
class ApiCalculation {
    constructor() {
        /** Questo metodo serve per selezionare la versione del db.
         *
         * @returns {Json} - Json che contiene informazioni sulla versione del db.
         */
        this.version = () => __awaiter(this, void 0, void 0, function* () {
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
        /** Questo metodo serve per selezionare dei dati dal db
         *
         * @param {string} type - Identificativo del Product system che si vuole calcolare.
         * @returns {json} - Json che contiene tutti i dati di un certo type.
         */
        this.getAllData = (type) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "data/" + type + "/all";
                console.log(url);
                let resp = yield fetch(url);
                let v = yield resp.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        /** Questo metodo serve per selezionare dei dati dal db
         *
         * @param {string} type - Identificativo del Product system che si vuole calcolare.
         * @returns {json} - Json che contiene tutti i dati di un certo type.
         */
        this.getData = (type) => __awaiter(this, void 0, void 0, function* () {
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
        /**Questo metodo serve per calcolare le caratteristiche di impatto di un Product system.
         *
         * @param {String} idProductSystem - Identificativo del Product system che si vuole calcolare.
         * @param {String} idImpactMethod - Identificativo del'Impact method che si vuole usare per effettuare il calcolo.
         * @param {String} idNewSet - Identificativo del newSets.
         * @returns {Json} - Json che contiene informazioni sul calcolo del product system (come ad esempio l'id del calcolo).
         */
        this.calcolaProductSystem = (idProductSystem, idImpactMethod, idNewSet) => __awaiter(this, void 0, void 0, function* () {
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
        /**Questo metodo serve per sapere lo stato del calcolo del Product system che si sta appunto calcolando.
         *
         * @param {String} idCalcolo - Identificativo del calcolo appena effettuato.
         * @returns {Json} - Json che contiene informazioni sullo stato del calcolo.
         */
        this.getStatoCalcolo = (idCalcolo) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "result/" + idCalcolo + "/state";
                console.log(url);
                console.log("Stiamo calcolando...");
                let resp = yield fetch(url);
                let v = yield resp.json();
                return v;
            }
            catch (error) {
                console.error('Errore durante la connessione:', error);
            }
        });
        /**Questo metodo serve per creare un Product system.
         *
         * @param {String} idProcess - Identificativo del process da associare al ProductSystem.
         * @returns {Json} - Json che contiene informazioni sullo stato del calcolo.
         */
        this.nuovoProductSystem = (idProcess) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "data/create-system";
                console.log(url);
                console.log(idProcess);
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
                //La richiesta ha avuto successo
                const responseData = yield response.json();
                return responseData;
            }
            catch (error) {
                console.log("errore");
                throw error;
            }
        });
        /**Questo metodo serve per creare un nuovo elemento che può essere un flow o un process.
         *
         * @param {String} type - Nome dell'elemento che si vuole creare.
         * @returns {Json} - Json che contiene informazioni sull'elemento appena creato.
         */
        this.putNuovoElement = (type, json) => __awaiter(this, void 0, void 0, function* () {
            try {
                let url = vps + "data/" + type + "/";
                console.log(url);
                console.log(json);
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
                console.error(error);
                throw error;
            }
        });
    }
}
exports.ApiCalculation = ApiCalculation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpQ2FsY3VsYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9iYWNrZW5kL2FwaUNhbGN1bGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFFQUFxRTtBQUNyRSxNQUFNLEdBQUcsR0FBVSx3QkFBd0IsQ0FBQyxDQUFDLGdHQUFnRztBQUM3SSw4RkFBOEY7QUFFOUYsTUFBYSxjQUFjO0lBQTNCO1FBRUk7OztXQUdHO1FBQ0gsWUFBTyxHQUFHLEdBQVMsRUFBRTtZQUNqQixJQUFJLENBQUM7Z0JBQ0QsK0NBQStDO2dCQUMvQyxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEdBQUcsYUFBYSxDQUFDLENBQUM7Z0JBQ2xELElBQUksUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2pDLE9BQU8sSUFBSSxDQUFDO29CQUNaLDREQUE0RDtnQkFDaEUsQ0FBQztxQkFBTSxDQUFDO29CQUNKLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztnQkFDbkQsQ0FBQztZQUNMLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0QsQ0FBQztRQUNMLENBQUMsQ0FBQSxDQUFBO1FBRUQ7Ozs7V0FJRztRQUNILGVBQVUsR0FBRyxDQUFNLElBQVcsRUFBQyxFQUFFO1lBQzdCLElBQUksQ0FBQztnQkFDRCxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFDLElBQUksR0FBQyxNQUFNLENBQUM7Z0JBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElB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