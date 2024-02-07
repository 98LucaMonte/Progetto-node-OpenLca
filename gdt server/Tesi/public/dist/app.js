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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiCalculation_js_1 = __importDefault(require("./backend/src/restclient/apiCalculation.js"));
const apiResultQueries_js_1 = __importDefault(require("./backend/src/restclient/apiResultQueries.js"));
const apiTechnosphereFlows_js_1 = __importDefault(require("./backend/src/restclient/apiTechnosphereFlows.js"));
const apiFlowResults_js_1 = __importDefault(require("./backend/src/restclient/apiFlowResults.js"));
const apiImpactResults_js_1 = __importDefault(require("./backend/src/restclient/apiImpactResults.js"));
const productSystem_js_1 = require("./frontend/src/logic/productSystem.js");
const calcolaProductSystem_js_1 = require("./frontend/src/logic/calcolaProductSystem.js");
const modal_view_js_1 = require("./frontend/src/templates/modal-view.js");
const main_view_js_1 = require("./frontend/src/templates/main-view.js");
const main_view_tabelle_row_js_1 = require("./frontend/src/templates/main-view-tabelle-row.js");
const header_view_js_1 = require("./frontend/src/templates/header-view.js");
// @ts-ignore
const page_mjs_1 = __importDefault(require("//unpkg.com/page/page.mjs"));
// @ts-ignore
const bootstrap_1 = __importDefault(require("bootstrap"));
const apiCalculation = new apiCalculation_js_1.default();
const apiResultQueries = new apiResultQueries_js_1.default();
const apiTechnosphereFlows = new apiTechnosphereFlows_js_1.default();
const apiFlowResults = new apiFlowResults_js_1.default();
const apiImpactResults = new apiImpactResults_js_1.default();
const productSystem = new productSystem_js_1.ProductSystem();
const calcolaProductSystem = new calcolaProductSystem_js_1.CalcolaProductSystem();
class App {
    constructor(header, main, footer) {
        //const vps1 = 'http://109.205.180.220:3000/'; //indirizzo vps 
        const vps1 = 'http://127.0.0.1:3000/'; // docker run -p 3000:8080 -v $HOME/openLCA-data-1.4:/app/data --rm -d gdt-server -db case_study
        let idCalcolo;
        //Inizio pagina di presentazione
        (0, page_mjs_1.default)('/', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            main.innerHTML = '';
            footer.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeader)());
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMain)());
            //Prendo i product system disponibili dal db
            yield (0, main_view_js_1.getProductSystem)(apiCalculation, vps1);
            //Prendo gli impact method disponibili dal db
            yield (0, main_view_js_1.getImpactMethod)(apiCalculation, vps1);
            let buttonCreaProductSystem = document.getElementById('creaProductSystem');
            if (buttonCreaProductSystem) {
                buttonCreaProductSystem.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                    event.preventDefault();
                    let modalNuovoProductSystem = document.getElementById("modal");
                    if (modalNuovoProductSystem) {
                        modalNuovoProductSystem.insertAdjacentHTML('beforeend', (0, modal_view_js_1.creaModalNuovoProductSystem)());
                        let myModal = new bootstrap_1.default.Modal(document.getElementById('creaProductSystemMain'));
                        myModal.show();
                        let result = yield productSystem.creaModalInfoProductSystem(vps1, apiCalculation);
                        location.reload();
                        console.log("id del product system appena creato " + result["@id"]);
                    }
                }));
            }
            let buttonCalcolaProductSystem = document.getElementById('buttonCalcolaProductSystem');
            if (buttonCalcolaProductSystem) {
                buttonCalcolaProductSystem.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                    event.preventDefault();
                    idCalcolo = yield calcolaProductSystem.calcola(apiCalculation, vps1);
                    if (idCalcolo !== undefined) {
                        let messaggio = document.getElementById("risultatiRicerca");
                        if (messaggio) {
                            messaggio.innerHTML = '';
                            messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-success" role="alert">Calcolo finito!!</h3>`);
                        }
                        let modalPdf = document.getElementById("modal");
                        if (modalPdf) {
                            modalPdf.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaModalForPDF)());
                            let myModal = new bootstrap_1.default.Modal(document.getElementById('modalPdf'));
                            myModal.show();
                        }
                        let buttonNonCreaPdf = document.getElementById("chiudiPdf");
                        if (buttonNonCreaPdf) {
                            buttonNonCreaPdf.addEventListener('click', event => {
                                console.log("chiudi");
                                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                    if (messaggio) {
                                        messaggio.innerHTML = '';
                                    }
                                    page_mjs_1.default.redirect('/resultQueries/technosphereFlows');
                                }), 3000);
                            });
                        }
                        let buttonCreaPdf = document.getElementById("salvaPdf");
                        if (buttonCreaPdf) {
                            buttonCreaPdf.addEventListener('click', event => {
                                //creaPDF(vps1,idCalcolo,apiImpactResults);
                                console.log("salva");
                                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                    if (messaggio) {
                                        messaggio.innerHTML = '';
                                    }
                                    page_mjs_1.default.redirect('/resultQueries/technosphereFlows');
                                }), 3000);
                            });
                        }
                    }
                }));
            }
        }));
        (0, page_mjs_1.default)('/resultQueries/technosphereFlows', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            let divMainResult = document.getElementById("main01");
            if (divMainResult) {
                divMainResult.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultati)());
                const listaTechnosphereFlows = yield apiResultQueries.getTechnosphereFlows(vps1, idCalcolo);
                if (listaTechnosphereFlows.length != 0) {
                    let msg = "Lista di provider e di TechFlow dato l'id del Product System appena calcolato";
                    (0, main_view_tabelle_row_js_1.creaTabellaProviderFlow)(listaTechnosphereFlows, msg);
                }
            }
        }));
        (0, page_mjs_1.default)('/resultQueries/finalDemand', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            let divMainResult = document.getElementById("main01");
            if (divMainResult) {
                divMainResult.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultati)());
                const richiestaFinale = yield apiResultQueries.getRichiestaFinale(vps1, idCalcolo);
                if (richiestaFinale.length != 0) {
                    let msg = "Tech Flow con quantità dato l'id del Product System appena calcolato";
                    (0, main_view_tabelle_row_js_1.creaTabellaTechFlowValue)(richiestaFinale, msg);
                }
            }
        }));
        (0, page_mjs_1.default)('/resultQueries/interventionFlows', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            let divMainResult = document.getElementById("main01");
            if (divMainResult) {
                divMainResult.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiDoppiaTabella)());
                const listaInterventionFlows = yield apiResultQueries.getInterventionFlows(vps1, idCalcolo);
                if (listaInterventionFlows.length != 0) {
                    let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato";
                    (0, main_view_tabelle_row_js_1.creaTabellaEnviFlowsInputOutput)(listaInterventionFlows, msg);
                }
            }
        }));
        (0, page_mjs_1.default)('/resultQueries/impactCategories', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            let divMainResult = document.getElementById("main01");
            if (divMainResult) {
                divMainResult.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultati)());
                const listaImpactCategories = yield apiResultQueries.getImpactCategories(vps1, idCalcolo);
                if (listaImpactCategories.length != 0) {
                    let msg = "Lista di Impact Category dato l'id del Product System appena calcolato";
                    (0, main_view_tabelle_row_js_1.creaTabellaImpactCategory)(listaImpactCategories, msg);
                }
            }
        }));
        (0, page_mjs_1.default)('/technosphereFlows/totalRequirements', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            let divMainResult = document.getElementById("main01");
            if (divMainResult) {
                divMainResult.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultati)());
                const listaTotalRequirements = yield apiTechnosphereFlows.getTotalRequirements(vps1, idCalcolo);
                if (listaTotalRequirements.length != 0) {
                    let msg = "Lista di Tech Flow Value dato l'id del Product System appena calcolato";
                    (0, main_view_tabelle_row_js_1.creaTabellaTechFlowValue)(listaTotalRequirements, msg);
                }
            }
        }));
        (0, page_mjs_1.default)('/technosphereFlows/totalRequirementsOfFlows', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            let divMainResult = document.getElementById("main01");
            if (divMainResult) {
                divMainResult.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiSingoloInput)());
            }
            //Prendo i tech flow disponibili dal db
            yield (0, main_view_tabelle_row_js_1.getTechFlow)(apiResultQueries, vps1, idCalcolo);
            let buttonMostraRisultati = document.getElementById('button');
            if (buttonMostraRisultati) {
                buttonMostraRisultati.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                    let selectTechFlow = document.getElementById("listaInput01");
                    let selectedOptionTechFlow;
                    let idTechFlow = "selectedInput01";
                    if (selectTechFlow) {
                        selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                        idTechFlow = selectedOptionTechFlow.id;
                    }
                    if (idTechFlow === "selectedInput01") {
                        let messaggio = document.getElementById("informazioniDati");
                        if (messaggio) {
                            messaggio.innerHTML = '';
                            messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow.</h3>`);
                        }
                    }
                    else {
                        let listatotalRequirementsOfFlows = yield apiTechnosphereFlows.getTotalRequirementsOfFlows(vps1, idCalcolo, idTechFlow);
                        if (listatotalRequirementsOfFlows.length != 0) {
                            let msg = "Lista di Tech Flow Value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                            (0, main_view_tabelle_row_js_1.creaTabellaTechFlowValue)(listatotalRequirementsOfFlows, msg);
                        }
                    }
                }));
            }
        }));
        (0, page_mjs_1.default)('/technosphereFlows/scalingFactors', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            let divMainResult = document.getElementById("main01");
            if (divMainResult) {
                divMainResult.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultati)());
                let listaScalingFactors = yield apiTechnosphereFlows.getScalingFactors(vps1, idCalcolo);
                if (listaScalingFactors.length != 0) {
                    let msg = "Lista di Tech Flow Value dato l'id del Product System appena calcolato";
                    (0, main_view_tabelle_row_js_1.creaTabellaTechFlowValue)(listaScalingFactors, msg);
                }
            }
        }));
        (0, page_mjs_1.default)('/technosphereFlows/scaledTechFlowsOf', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            let divMainResult = document.getElementById("main01");
            if (divMainResult) {
                divMainResult.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiSingoloInput)());
            }
            //Prendo i tech flow disponibili dal db
            yield (0, main_view_tabelle_row_js_1.getTechFlow)(apiResultQueries, vps1, idCalcolo);
            let buttonMostraRisultati = document.getElementById('button');
            if (buttonMostraRisultati) {
                buttonMostraRisultati.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                    let selectTechFlow = document.getElementById("listaInput01");
                    let selectedOptionTechFlow;
                    let idTechFlow = "selectedInput01";
                    if (selectTechFlow) {
                        selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                        idTechFlow = selectedOptionTechFlow.id;
                    }
                    if (idTechFlow === "selectedInput01") {
                        let messaggio = document.getElementById("informazioniDati");
                        if (messaggio) {
                            messaggio.innerHTML = '';
                            messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow.</h3>`);
                        }
                    }
                    else {
                        let listaScaledTechFlowsOf = yield apiTechnosphereFlows.getScaledTechFlowsOf(vps1, idCalcolo, idTechFlow);
                        if (listaScaledTechFlowsOf.length != 0) {
                            let msg = "Lista di Tech Flow Value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                            (0, main_view_tabelle_row_js_1.creaTabellaTechFlowValue)(listaScaledTechFlowsOf, msg);
                        }
                    }
                }));
            }
        }));
        (0, page_mjs_1.default)('/technosphereFlows/unscaledTechFlowsOf', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            let divMainResult = document.getElementById("main01");
            if (divMainResult) {
                divMainResult.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiSingoloInput)());
            }
            yield (0, main_view_tabelle_row_js_1.getTechFlow)(apiResultQueries, vps1, idCalcolo);
            let buttonMostraRisultati = document.getElementById('button');
            if (buttonMostraRisultati) {
                buttonMostraRisultati.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                    let selectTechFlow = document.getElementById("listaInput01");
                    let selectedOptionTechFlow;
                    let idTechFlow = "selectedInput01";
                    if (selectTechFlow) {
                        selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                        idTechFlow = selectedOptionTechFlow.id;
                    }
                    if (idTechFlow === "selectedInput01") {
                        let messaggio = document.getElementById("informazioniDati");
                        if (messaggio) {
                            messaggio.innerHTML = '';
                            messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow.</h3>`);
                        }
                    }
                    else {
                        let listaUnscaledTechFlowsOf = yield apiTechnosphereFlows.getUnscaledTechFlowsOf(vps1, idCalcolo, idTechFlow);
                        if (listaUnscaledTechFlowsOf.length != 0) {
                            let msg = "Lista di Tech Flow Value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                            (0, main_view_tabelle_row_js_1.creaTabellaTechFlowValue)(listaUnscaledTechFlowsOf, msg);
                        }
                    }
                }));
            }
        }));
        (0, page_mjs_1.default)('/flowResults/inventoryResult', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            let divMainResult = document.getElementById("main01");
            if (divMainResult) {
                divMainResult.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiDoppiaTabella)());
            }
            let listaInventoryResult = yield apiFlowResults.getInventoryResult(vps1, idCalcolo);
            if (listaInventoryResult.length != 0) {
                let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato";
                (0, main_view_tabelle_row_js_1.creaTabellaEnviFlowsInputOutputValue)(listaInventoryResult, msg);
            }
        }));
        (0, page_mjs_1.default)('/flowResults/totalFlowValueOf', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            let divMainResult = document.getElementById("main01");
            if (divMainResult) {
                divMainResult.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiSingoloInputDoppiaTabella)());
            }
            yield (0, main_view_tabelle_row_js_1.getEnviFlow)(apiFlowResults, vps1, idCalcolo);
            let buttonMostraRisultati = document.getElementById('button');
            if (buttonMostraRisultati) {
                buttonMostraRisultati.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                    let selectEnviFlow = document.getElementById("listaInput01");
                    let selectedOptionEnviFlow;
                    let idEnviFlow = "selectedInput01";
                    if (selectEnviFlow) {
                        selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                        idEnviFlow = selectedOptionEnviFlow.id;
                    }
                    if (idEnviFlow === "selectedInput01") {
                        let messaggio = document.getElementById("informazioniDati");
                        if (messaggio) {
                            messaggio.innerHTML = '';
                            messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un envi flow.</h3>`);
                        }
                    }
                    else {
                        const listaEnviFlow = yield apiFlowResults.getTotalFlowValueOf(vps1, idCalcolo, idEnviFlow);
                        if (listaEnviFlow.length != 0) {
                            let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato e l'id dell'Envi Flow selezionato";
                            (0, main_view_tabelle_row_js_1.creaTabellaEnviFlowsInputOutputValue)(listaEnviFlow, msg);
                        }
                    }
                }));
            }
        }));
        (0, page_mjs_1.default)('/flowResults/flowContributionsOf', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            let divMainResult = document.getElementById("main01");
            if (divMainResult) {
                divMainResult.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiSingoloInput)());
            }
            yield (0, main_view_tabelle_row_js_1.getEnviFlow)(apiFlowResults, vps1, idCalcolo);
            let buttonMostraRisultati = document.getElementById('button');
            if (buttonMostraRisultati) {
                buttonMostraRisultati.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                    let selectEnviFlow = document.getElementById("listaInput01");
                    let selectedOptionEnviFlow;
                    let idEnviFlow = "selectedInput01";
                    if (selectEnviFlow) {
                        selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                        idEnviFlow = selectedOptionEnviFlow.id;
                    }
                    if (idEnviFlow === "selectedInput01") {
                        let messaggio = document.getElementById("informazioniDati");
                        if (messaggio) {
                            messaggio.innerHTML = '';
                            messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un envi flow.</h3>`);
                        }
                    }
                    else {
                        let listaEnviFlow = yield apiFlowResults.getFlowContributionsOf(vps1, idCalcolo, idEnviFlow);
                        if (listaEnviFlow.length != 0) {
                            let msg = "Lista di Tech Flow Value dato l'id del Product System appena calcolato e l'id dell'Envi Flow selezionato";
                            (0, main_view_tabelle_row_js_1.creaTabellaTechFlowValue)(listaEnviFlow, msg);
                        }
                    }
                }));
            }
        }));
        (0, page_mjs_1.default)('/flowResults/directInterventionsOf', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            let divMainResult = document.getElementById("main01");
            if (divMainResult) {
                divMainResult.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiSingoloInputDoppiaTabella)());
            }
            yield (0, main_view_tabelle_row_js_1.getTechFlow)(apiResultQueries, vps1, idCalcolo);
            let buttonMostraRisultati = document.getElementById('button');
            if (buttonMostraRisultati) {
                buttonMostraRisultati.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                    let selectTechFlow = document.getElementById("listaInput01");
                    let selectedOptionTechFlow;
                    let idTechFlow = "selectedInput01";
                    if (selectTechFlow) {
                        selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                        idTechFlow = selectedOptionTechFlow.id;
                    }
                    if (idTechFlow === "selectedInput01") {
                        let messaggio = document.getElementById("informazioniDati");
                        if (messaggio) {
                            messaggio.innerHTML = '';
                            messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow.</h3>`);
                        }
                    }
                    else {
                        let listaDirectInterventionsOf = yield apiFlowResults.getDirectInterventionsOf(vps1, idCalcolo, idTechFlow);
                        if (listaDirectInterventionsOf.length != 0) {
                            let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                            (0, main_view_tabelle_row_js_1.creaTabellaEnviFlowsInputOutputValue)(listaDirectInterventionsOf, msg);
                        }
                    }
                }));
            }
        }));
        (0, page_mjs_1.default)('/flowResults/directInterventionsOfEnviFlowTechFlow', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiDoppioInputDoppiaTabella)());
            yield (0, main_view_tabelle_row_js_1.getTechFlowEnviFlow)(apiResultQueries, apiFlowResults, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;
                const selectEnviFlow = document.getElementById("listaInput02");
                const selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                const idEnviFlow = selectedOptionEnviFlow.id;
                console.log(idTechFlow);
                if (idTechFlow === "selectedInput01" || idEnviFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow.</h3>`);
                }
                else {
                    const enviFlowValue = yield apiFlowResults.getDirectInterventionsOfEnviFlowTechFlow(vps1, idCalcolo, idEnviFlow, idTechFlow);
                    if (enviFlowValue.length != 0) {
                        console.log(enviFlowValue);
                        let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato,l'id dell'Envi Flow selezionato e l'id del Tech Flow selezionato";
                        (0, main_view_tabelle_row_js_1.creaTabellaEnviFlowsInputOutputValue)(enviFlowValue, msg);
                    }
                }
            }));
        }));
        (0, page_mjs_1.default)('/flowResults/flowIntensitiesOf', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiSingoloInputDoppiaTabella)());
            yield (0, main_view_tabelle_row_js_1.getTechFlow)(apiResultQueries, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;
                console.log(idTechFlow);
                if (idTechFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow.</h3>`);
                }
                else {
                    const listaFlowIntesitiesOf = yield apiFlowResults.getFlowIntensitiesOf(vps1, idCalcolo, idTechFlow);
                    if (listaFlowIntesitiesOf.length != 0) {
                        console.log(listaFlowIntesitiesOf);
                        let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                        (0, main_view_tabelle_row_js_1.creaTabellaEnviFlowsInputOutputValue)(listaFlowIntesitiesOf, msg);
                    }
                }
            }));
        }));
        (0, page_mjs_1.default)('/flowResults/flowIntensityOfEnviFlowTechFlow', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiDoppioInputDoppiaTabella)());
            yield (0, main_view_tabelle_row_js_1.getTechFlowEnviFlow)(apiResultQueries, apiFlowResults, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;
                const selectEnviFlow = document.getElementById("listaInput02");
                const selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                const idEnviFlow = selectedOptionEnviFlow.id;
                console.log(idTechFlow);
                if (idTechFlow === "selectedInput01" || idEnviFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow e un EnviFlow.</h3>`);
                }
                else {
                    const listaFlowIntesitiesOfEnviFlowTechFlow = yield apiFlowResults.getFlowIntensityOfEnviFlowTechFlow(vps1, idCalcolo, idEnviFlow, idTechFlow);
                    console.log(listaFlowIntesitiesOfEnviFlowTechFlow);
                    if (listaFlowIntesitiesOfEnviFlowTechFlow.length != 0) {
                        let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato,l'id dell'Envi Flow selezionato e l'id del Tech Flow selezionato";
                        (0, main_view_tabelle_row_js_1.creaTabellaEnviFlowsInputOutputValue)(listaFlowIntesitiesOfEnviFlowTechFlow, msg);
                    }
                }
            }));
        }));
        (0, page_mjs_1.default)('/flowResults/totalInterventionsOf', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiSingoloInputDoppiaTabella)());
            yield (0, main_view_tabelle_row_js_1.getTechFlow)(apiResultQueries, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;
                console.log(idTechFlow);
                if (idTechFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow.</h3>`);
                }
                else {
                    const listaTotalInterventionsOf = yield apiFlowResults.getTotalInterventionsOf(vps1, idCalcolo, idTechFlow);
                    console.log(listaTotalInterventionsOf);
                    if (listaTotalInterventionsOf.length != 0) {
                        let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                        (0, main_view_tabelle_row_js_1.creaTabellaEnviFlowsInputOutputValue)(listaTotalInterventionsOf, msg);
                    }
                }
            }));
        }));
        (0, page_mjs_1.default)('/flowResults/totalInterventionOfEnviFlowTechFlow', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiDoppioInputDoppiaTabella)());
            yield (0, main_view_tabelle_row_js_1.getTechFlowEnviFlow)(apiResultQueries, apiFlowResults, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;
                const selectEnviFlow = document.getElementById("listaInput02");
                const selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                const idEnviFlow = selectedOptionEnviFlow.id;
                console.log(idTechFlow);
                if (idTechFlow === "selectedInput01" || idEnviFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow e un EnviFlow.</h3>`);
                }
                else {
                    const listaTotalInterventionOfEnviFlowTechFlow = yield apiFlowResults.getTotalInterventionOfEnviFlowTechFlow(vps1, idCalcolo, idEnviFlow, idTechFlow);
                    console.log(listaTotalInterventionOfEnviFlowTechFlow);
                    if (listaTotalInterventionOfEnviFlowTechFlow.length != 0) {
                        let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato, l'id dell'Envi Flow e l'id del Tech Flow selezionato";
                        (0, main_view_tabelle_row_js_1.creaTabellaEnviFlowsInputOutputValue)(listaTotalInterventionOfEnviFlowTechFlow, msg);
                    }
                }
            }));
        }));
        /*Not found url
        page('/flowResults/upstreamInterventionsOf', async () => {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', creaViewMainRisultatiSingoloInput());
            await getEnviFlow(apiFlowResults,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                
                const selectEnviFlow = document.getElementById("listaInput01");
                const selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                const idEnviFlow = selectedOptionEnviFlow.id;
                if(idEnviFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend',
                    `<h3 class="alert alert-danger" role="alert">Seleziona un EnviFlow.</h3>`);
                }
                else{
                    const listaUpstreamInterventionsOf = await apiFlowResults.getUpstreamInterventionsOf(vps1,idCalcolo,idEnviFlow);
                    console.log(listaUpstreamInterventionsOf);
                    if (listaUpstreamInterventionsOf.length != 0) {
                        creaTabellaTotalInterventionOfEnviFlowTechFlow(listaUpstreamInterventionsOf);
                    }
                }
            });
        });*/
        (0, page_mjs_1.default)('/impactResults/totalImpacts', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultati)());
            const listaTotalImpacts = yield apiImpactResults.getTotalImpacts(vps1, idCalcolo);
            if (listaTotalImpacts.length != 0) {
                console.log(listaTotalImpacts);
                let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato";
                (0, main_view_tabelle_row_js_1.creaTabellaImpactCategoryValue)(listaTotalImpacts, msg);
            }
        }));
        (0, page_mjs_1.default)('/impactResults/totalImpactsNormalized', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultati)());
            const listaTotalImpactsNormalized = yield apiImpactResults.getTotalImpactsNormalized(vps1, idCalcolo);
            if (listaTotalImpactsNormalized.length != 0) {
                console.log(listaTotalImpactsNormalized);
                let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato";
                (0, main_view_tabelle_row_js_1.creaTabellaImpactCategoryValue)(listaTotalImpactsNormalized, msg);
            }
        }));
        (0, page_mjs_1.default)('/impactResults/totalImpactsWeighted', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultati)());
            const listaTotalImpactsWeighted = yield apiImpactResults.getTotalImpactsWeighted(vps1, idCalcolo);
            if (listaTotalImpactsWeighted.length != 0) {
                console.log(listaTotalImpactsWeighted);
                let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato";
                (0, main_view_tabelle_row_js_1.creaTabellaImpactCategoryValue)(listaTotalImpactsWeighted, msg);
            }
        }));
        (0, page_mjs_1.default)('/impactResults/totalImpactValueOf', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiSingoloInput)());
            yield (0, main_view_tabelle_row_js_1.getImpactCategory)(apiResultQueries, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory = selectedOptionImpactCategory.id;
                console.log(idImpactCategory);
                if (idImpactCategory === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un Impact Category.</h3>`);
                }
                else {
                    const listaImpactCategory = yield apiImpactResults.getTotalImpactValueOf(vps1, idCalcolo, idImpactCategory);
                    if (listaImpactCategory.length != 0) {
                        console.log(listaImpactCategory);
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato e l'id dell'impact category selezionato";
                        (0, main_view_tabelle_row_js_1.creaTabellaImpactCategoryValue)(listaImpactCategory, msg);
                    }
                }
            }));
        }));
        (0, page_mjs_1.default)('/impactResults/impactContributionsOf', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiSingoloInput)());
            yield (0, main_view_tabelle_row_js_1.getImpactCategory)(apiResultQueries, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory = selectedOptionImpactCategory.id;
                console.log(idImpactCategory);
                if (idImpactCategory === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un Impact Category.</h3>`);
                }
                else {
                    const listaImpactContributionsOf = yield apiImpactResults.getImpactContributionsOf(vps1, idCalcolo, idImpactCategory);
                    if (listaImpactContributionsOf.length != 0) {
                        console.log(listaImpactContributionsOf);
                        let msg = "Lista di Tech Flow value dato l'id del Product System appena calcolato e l'id dell'impact category selezionato";
                        (0, main_view_tabelle_row_js_1.creaTabellaTechFlowValue)(listaImpactContributionsOf, msg);
                    }
                }
            }));
        }));
        (0, page_mjs_1.default)('/impactResults/directImpactsOf', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiSingoloInput)());
            yield (0, main_view_tabelle_row_js_1.getTechFlow)(apiResultQueries, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;
                console.log(idTechFlow);
                if (idTechFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un TechFlow.</h3>`);
                }
                else {
                    const listaDirectImpactsOf = yield apiImpactResults.getDirectImpactsOf(vps1, idCalcolo, idTechFlow);
                    if (listaDirectImpactsOf.length != 0) {
                        console.log(listaDirectImpactsOf);
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                        (0, main_view_tabelle_row_js_1.creaTabellaImpactCategoryValue)(listaDirectImpactsOf, msg);
                    }
                }
            }));
        }));
        (0, page_mjs_1.default)('/impactResults/directImpactOfImpactCategoryTechFlow', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiDoppioInput)());
            yield (0, main_view_tabelle_row_js_1.getImpactCategoryTechFlow)(apiResultQueries, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory = selectedOptionImpactCategory.id;
                const selectTechFlow = document.getElementById("listaInput02");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;
                console.log(idTechFlow);
                if (idImpactCategory === "selectedInput01" || idTechFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow e un Impact Category.</h3>`);
                }
                else {
                    const listaDirectImpactOfImpactCategoryTechFlow = yield apiImpactResults.getDirectImpactOfImpactCategoryTechFlow(vps1, idCalcolo, idTechFlow, idImpactCategory);
                    if (listaDirectImpactOfImpactCategoryTechFlow.length != 0) {
                        console.log(listaDirectImpactOfImpactCategoryTechFlow);
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato, l'id del Tech Flow selezionato e l'id dell'impact category selezionato";
                        (0, main_view_tabelle_row_js_1.creaTabellaImpactCategoryValue)(listaDirectImpactOfImpactCategoryTechFlow, msg);
                    }
                }
            }));
        }));
        (0, page_mjs_1.default)('/impactResults/impactIntensitiesOf', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiSingoloInput)());
            yield (0, main_view_tabelle_row_js_1.getTechFlow)(apiResultQueries, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;
                console.log(idTechFlow);
                if (idTechFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un TechFlow.</h3>`);
                }
                else {
                    const listaImpactIntensitiesOf = yield apiImpactResults.getImpactIntensitiesOf(vps1, idCalcolo, idTechFlow);
                    if (listaImpactIntensitiesOf.length != 0) {
                        console.log(listaImpactIntensitiesOf);
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                        (0, main_view_tabelle_row_js_1.creaTabellaImpactCategoryValue)(listaImpactIntensitiesOf, msg);
                    }
                }
            }));
        }));
        (0, page_mjs_1.default)('/impactResults/directImpactIntensityOfImpactCategoryTechFlow', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiDoppioInput)());
            yield (0, main_view_tabelle_row_js_1.getImpactCategoryTechFlow)(apiResultQueries, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory = selectedOptionImpactCategory.id;
                const selectTechFlow = document.getElementById("listaInput02");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;
                console.log(idTechFlow);
                if (idImpactCategory === "selectedInput01" || idTechFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow e un Impact Category.</h3>`);
                }
                else {
                    const listaDirectImpactIntensityOfImpactCategoryTechFlow = yield apiImpactResults.getDirectImpactIntensityOfImpactCategoryTechFlow(vps1, idCalcolo, idTechFlow, idImpactCategory);
                    if (listaDirectImpactIntensityOfImpactCategoryTechFlow.length != 0) {
                        console.log(listaDirectImpactIntensityOfImpactCategoryTechFlow);
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato, l'id del Tech Flow selezionato e l'id dell'impact category selezionato";
                        (0, main_view_tabelle_row_js_1.creaTabellaImpactCategoryValue)(listaDirectImpactIntensityOfImpactCategoryTechFlow, msg);
                    }
                }
            }));
        }));
        (0, page_mjs_1.default)('/impactResults/totalImpactsOf', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiSingoloInput)());
            yield (0, main_view_tabelle_row_js_1.getTechFlow)(apiResultQueries, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;
                console.log(idTechFlow);
                if (idTechFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un TechFlow.</h3>`);
                }
                else {
                    const listaTotalImpactsOf = yield apiImpactResults.getTotalImpactsOf(vps1, idCalcolo, idTechFlow);
                    if (listaTotalImpactsOf.length != 0) {
                        console.log(listaTotalImpactsOf);
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                        (0, main_view_tabelle_row_js_1.creaTabellaImpactCategoryValue)(listaTotalImpactsOf, msg);
                    }
                }
            }));
        }));
        (0, page_mjs_1.default)('/impactResults/totalImpactOfImpactCategoryTechFlow', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiDoppioInput)());
            yield (0, main_view_tabelle_row_js_1.getImpactCategoryTechFlow)(apiResultQueries, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory = selectedOptionImpactCategory.id;
                const selectTechFlow = document.getElementById("listaInput02");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;
                console.log(idTechFlow);
                if (idImpactCategory === "selectedInput01" || idTechFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow e un Impact Category.</h3>`);
                }
                else {
                    const listaTotalImpactOfImpactCategoryTechFlow = yield apiImpactResults.getTotalImpactOfImpactCategoryTechFlow(vps1, idCalcolo, idTechFlow, idImpactCategory);
                    if (listaTotalImpactOfImpactCategoryTechFlow.length != 0) {
                        console.log(listaTotalImpactOfImpactCategoryTechFlow);
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato, l'id del Tech Flow selezionato e l'id dell'impact category selezionato";
                        (0, main_view_tabelle_row_js_1.creaTabellaImpactCategoryValue)(listaTotalImpactOfImpactCategoryTechFlow, msg);
                    }
                }
            }));
        }));
        (0, page_mjs_1.default)('/impactResults/impactFactorsOf', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiSingoloInputDoppiaTabella)());
            yield (0, main_view_tabelle_row_js_1.getImpactCategory)(apiResultQueries, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory = selectedOptionImpactCategory.id;
                console.log(idImpactCategory);
                if (idImpactCategory === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un Impact Category.</h3>`);
                }
                else {
                    const listaImpactFactorsOf = yield apiImpactResults.getImpactFactorsOf(vps1, idCalcolo, idImpactCategory);
                    if (listaImpactFactorsOf.length != 0) {
                        console.log(listaImpactFactorsOf);
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato e l'id dell'impact category selezionato";
                        (0, main_view_tabelle_row_js_1.creaTabellaEnviFlowsInputOutputValue)(listaImpactFactorsOf, msg);
                    }
                }
            }));
        }));
        (0, page_mjs_1.default)('/impactResults/impactFactorsOfImpactCategoryEnviFlow', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiDoppioInputDoppiaTabella)());
            yield (0, main_view_tabelle_row_js_1.getImpactCategoryEnviFlow)(apiResultQueries, apiFlowResults, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory = selectedOptionImpactCategory.id;
                const selectEnviFlow = document.getElementById("listaInput02");
                const selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                const idEnviFlow = selectedOptionEnviFlow.id;
                if (idImpactCategory === "selectedInput01" || idEnviFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un Envi flow e un Impact Category.</h3>`);
                }
                else {
                    const listaImpactFactorsOfImpactCategoryEnviFlow = yield apiImpactResults.getImpactFactorsOfImpactCategoryEnviFlow(vps1, idCalcolo, idImpactCategory, idEnviFlow);
                    if (listaImpactFactorsOfImpactCategoryEnviFlow.length != 0) {
                        console.log(listaImpactFactorsOfImpactCategoryEnviFlow);
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato, l'id dell'impact category selezionato e l'id dell'Envi Flow";
                        (0, main_view_tabelle_row_js_1.creaTabellaEnviFlowsInputOutputValue)(listaImpactFactorsOfImpactCategoryEnviFlow, msg);
                    }
                }
            }));
        }));
        (0, page_mjs_1.default)('/impactResults/flowImpactsOf', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiSingoloInputDoppiaTabella)());
            yield (0, main_view_tabelle_row_js_1.getImpactCategory)(apiResultQueries, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory = selectedOptionImpactCategory.id;
                console.log(idImpactCategory);
                if (idImpactCategory === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un Impact Category.</h3>`);
                }
                else {
                    const listaFlowImpactsOf = yield apiImpactResults.getFlowImpactsOf(vps1, idCalcolo, idImpactCategory);
                    if (listaFlowImpactsOf.length != 0) {
                        console.log(listaFlowImpactsOf);
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato e l'id dell'impact category selezionato";
                        (0, main_view_tabelle_row_js_1.creaTabellaEnviFlowsInputOutputValue)(listaFlowImpactsOf, msg);
                    }
                }
            }));
        }));
        (0, page_mjs_1.default)('/impactResults/flowImpactOfImpactCategoryEnviFlow', () => __awaiter(this, void 0, void 0, function* () {
            header.innerHTML = '';
            header.insertAdjacentHTML('beforeend', (0, header_view_js_1.creaViewHeaderRisultati)());
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', (0, main_view_js_1.creaLateralNavbar)());
            document.getElementById("main01").insertAdjacentHTML('beforeend', (0, main_view_js_1.creaViewMainRisultatiDoppioInputDoppiaTabella)());
            yield (0, main_view_tabelle_row_js_1.getImpactCategoryEnviFlow)(apiResultQueries, apiFlowResults, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory = selectedOptionImpactCategory.id;
                const selectEnviFlow = document.getElementById("listaInput02");
                const selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                const idEnviFlow = selectedOptionEnviFlow.id;
                if (idImpactCategory === "selectedInput01" || idEnviFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Seleziona un Envi flow e un Impact Category.</h3>`);
                }
                else {
                    const listaFlowImpactOfImpactCategoryEnviFlow = yield apiImpactResults.getFlowImpactOfImpactCategoryEnviFlow(vps1, idCalcolo, idImpactCategory, idEnviFlow);
                    if (listaFlowImpactOfImpactCategoryEnviFlow.length != 0) {
                        console.log(listaFlowImpactOfImpactCategoryEnviFlow);
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato, l'id dell'impact category selezionato e l'id dell'Envi Flow";
                        (0, main_view_tabelle_row_js_1.creaTabellaEnviFlowsInputOutputValue)(listaFlowImpactOfImpactCategoryEnviFlow, msg);
                    }
                }
            }));
        }));
        (0, page_mjs_1.default)();
    }
}
exports.default = App;
