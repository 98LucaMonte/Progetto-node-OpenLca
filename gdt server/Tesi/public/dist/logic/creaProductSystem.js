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
exports.creaModalInfoProductSystem = void 0;
const apiCalculation_js_1 = require("../backend/apiCalculation.js");
const modal_view_js_1 = require("../frontend/template/modal-view.js");
const flow_js_1 = require("../model/flow.js");
const exchange_js_1 = require("../model/exchange.js");
const process_js_1 = require("../model/process.js");
const apiCalculation = new apiCalculation_js_1.ApiCalculation();
const flow = new flow_js_1.Flow();
const exchange = new exchange_js_1.Exchange();
const process = new process_js_1.Process();
/*Metodo usato per prelevare i dati inseriti nel primo modal.
I dati prelevati sono nome del product system, descrizione e il luogo in cui viene prodotto */
function creaModalInfoProductSystem() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let arrayInput;
                (0, modal_view_js_1.getAll)("location");
                // Elementi del modal usati per prelevare le informazioni
                let modalElement = document.getElementById("creaProductSystemMain");
                let buttonNewInput = document.querySelector(".nuovoInput");
                //Elementi per estrarre la location
                let selectLocation = document.getElementById("listalocation");
                let selectedOptionLocation;
                let idLocation = "selectedlocation";
                //Elementi per estrarre il nome e la descrizione 
                let textNomeProductSystem = document.getElementById("nomeProductSystem");
                let textDescrizioneProductSystem = document.getElementById("descrizioneProductSystem");
                if (modalElement) {
                    modalElement.addEventListener('change', (event) => {
                        event.preventDefault();
                        if (selectLocation) {
                            selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                            idLocation = selectedOptionLocation.id;
                            if (textNomeProductSystem && textDescrizioneProductSystem && buttonNewInput) {
                                if (textNomeProductSystem.value === "" || textDescrizioneProductSystem.value === "" || idLocation === "selectedlocation")
                                    buttonNewInput.disabled = true;
                                else
                                    buttonNewInput.disabled = false;
                            }
                        }
                    });
                }
                if (buttonNewInput) {
                    buttonNewInput.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                        event.preventDefault();
                        if (textNomeProductSystem && textDescrizioneProductSystem && selectLocation) {
                            selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                            idLocation = selectedOptionLocation.id;
                            arrayInput = [textNomeProductSystem.value, textDescrizioneProductSystem.value, idLocation, [], []];
                        }
                        let divModal = document.getElementById("modal");
                        if (divModal) {
                            divModal.innerHTML = '';
                            divModal.insertAdjacentHTML('beforeend', (0, modal_view_js_1.creaModalInserisciInput)());
                            let nuovoModal = document.getElementById('creaProductSystemInput');
                            if (nuovoModal) {
                                //@ts-ignore
                                const myModal = new bootstrap.Modal(nuovoModal);
                                myModal.show();
                                let jsonProcess = yield aggiungiFlowInputEsistenti(arrayInput);
                                if (jsonProcess === null) {
                                    reject(new Error('Errore nel caricamento dei dati'));
                                }
                                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                    resolve(jsonProcess);
                                }), 1500);
                            }
                        }
                    }));
                }
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
exports.creaModalInfoProductSystem = creaModalInfoProductSystem;
/*Metodo per scegliere i flow da aggiungere come input al product system.
Premendo il button crea flow si può andare a creare un nuovo flow di input personalizzato.  */
function aggiungiFlowInputEsistenti(arrayInput) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, modal_view_js_1.getFlow)(apiCalculation, "Input");
                let arrayFlowInput = [];
                //Modal(div) in cui sono presenti tutti i flow esistenti nel sistema 
                let divFlowEsistenti = document.getElementById('creaProductSystemInput');
                //button per creare un nuovo flow
                let buttonCreaFlow = document.querySelector('.newFlowInput');
                //button per andare aprire un modal dove si possono selezionare i flow da inserire come output
                let buttonInserisciFlowOutput = document.querySelector('.inserisciOutput');
                if (divFlowEsistenti) {
                    /*
                    Se viene premuto un button per aggiungere un flow tale button viene disattivato
                    e l'id del flow relativo al button premuto viene aggiunto alla lista degli arrayFlowInput
                    */
                    divFlowEsistenti.addEventListener('click', function (event) {
                        let buttonAggiungiFlow = event.target;
                        if (buttonAggiungiFlow) {
                            if (buttonAggiungiFlow.classList.contains('flowInputButton')) {
                                let buttonId = event.target.id;
                                event.target.disabled = true;
                                arrayFlowInput.push(buttonId);
                            }
                        }
                    });
                }
                //Una volta premuto tale button viene aperto un nuovo modal per poter creare un nuovo flow personalizzato
                if (buttonCreaFlow) {
                    buttonCreaFlow.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                        event.preventDefault();
                        let modal = document.getElementById("modal");
                        if (modal) {
                            modal.insertAdjacentHTML('beforeend', (0, modal_view_js_1.creaModalNuovoFlowInput)());
                            let newModal = document.getElementById('creaFlowInput');
                            if (newModal) {
                                //@ts-ignore
                                let myModal = new bootstrap.Modal(newModal);
                                myModal.show();
                                //raccogliere l'id del flow input creato
                                (0, modal_view_js_1.getAll)("location");
                                (0, modal_view_js_1.getAll)("flow-property");
                                let jsonNuovoFlow = yield aggiungiFlowInput();
                                arrayFlowInput.push(jsonNuovoFlow);
                                console.log(arrayFlowInput);
                            }
                        }
                    }));
                }
                //Una volta premuto tale button si chiude questo modale e si passa al modale successivo per aggiungere i flow di output
                if (buttonInserisciFlowOutput) {
                    buttonInserisciFlowOutput.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                        event.preventDefault();
                        arrayInput[3] = arrayFlowInput;
                        console.log(arrayInput);
                        let modalNuovoProductSystem = document.getElementById("modal");
                        if (modalNuovoProductSystem) {
                            modalNuovoProductSystem.innerHTML = '';
                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', (0, modal_view_js_1.creaModalInserisciOutput)());
                            let newModal = document.getElementById('creaProductSystemOutput');
                            if (newModal) {
                                //@ts-ignore
                                const myModal = new bootstrap.Modal(newModal);
                                myModal.show();
                                let jsonProcess = yield aggiungiFlowOutputEsistenti(arrayInput);
                                if (jsonProcess === null) {
                                    reject(new Error("Errore nella generazione del Process"));
                                }
                                resolve(jsonProcess);
                            }
                        }
                    }));
                }
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
//Metodo usato per aggiungere un flow di input creato dall'utente 
function aggiungiFlowInput() {
    return new Promise((resolve, reject) => {
        try {
            /*Prendo l'id del div per vedere se ci sono dei cambiamenti all'interno
            del modal e se tutti gli input sono stati inseriti abilito il button avanti*/
            let divModal = document.getElementById("creaFlowInput");
            let buttonCreaFlowInput = document.querySelector('.creaFlowInput');
            //Elementi per predere i dati per creare il flow dal modal 
            let selectFlowType = document.getElementById("listaflow-type");
            let selectedOptionFlowType;
            let flowType = "selectedFlowType";
            let textNomeFlowInput = document.getElementById("nomeFlowInput");
            let nomeProductSystem = "";
            let selectLocation = document.getElementById("listalocation");
            let selectedOptionLocation;
            let idLocation = "selectedlocation";
            let nomeLocation;
            let selectFlowProperty = document.getElementById("listaflow-property");
            let selectedOptionFlowProperty;
            let idFlowProperty = "selectedflow-property";
            let nomeFlowProperty;
            if (divModal) {
                divModal.addEventListener('change', event => {
                    event.preventDefault();
                    if (textNomeFlowInput) {
                        nomeProductSystem = textNomeFlowInput.value;
                    }
                    if (selectFlowType) {
                        selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                        flowType = selectedOptionFlowType.id;
                    }
                    if (selectLocation) {
                        selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                        idLocation = selectedOptionLocation.value;
                        nomeLocation = selectedOptionLocation.text;
                    }
                    if (selectFlowProperty) {
                        selectedOptionFlowProperty = selectFlowProperty.options[selectFlowProperty.selectedIndex];
                        idFlowProperty = selectedOptionFlowProperty.value;
                        nomeFlowProperty = selectedOptionFlowProperty.text;
                    }
                    if (buttonCreaFlowInput && textNomeFlowInput && selectFlowType && selectLocation && selectFlowProperty) {
                        if (nomeProductSystem === "" || flowType === "selectedFlowType" || nomeLocation === "" || nomeFlowProperty === "")
                            buttonCreaFlowInput.disabled = true;
                        else
                            buttonCreaFlowInput.disabled = false;
                    }
                });
            }
            if (buttonCreaFlowInput) {
                buttonCreaFlowInput.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                    event.preventDefault();
                    if (textNomeFlowInput) {
                        nomeProductSystem = textNomeFlowInput.value;
                    }
                    if (selectLocation) {
                        selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                        idLocation = selectedOptionLocation.id;
                        nomeLocation = selectedOptionLocation.value;
                    }
                    if (selectFlowType) {
                        selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                        flowType = selectedOptionFlowType.id;
                    }
                    if (selectFlowProperty) {
                        selectedOptionFlowProperty = selectFlowProperty.options[selectFlowProperty.selectedIndex];
                        idFlowProperty = selectedOptionFlowProperty.id;
                        nomeFlowProperty = selectedOptionFlowProperty.value;
                    }
                    let jsonFlow = flow.creaJsonFlow(nomeProductSystem, flowType, idLocation, nomeLocation, idFlowProperty, nomeFlowProperty);
                    console.log(jsonFlow);
                    if (textNomeFlowInput && selectLocation && selectFlowType && selectFlowProperty) {
                        textNomeFlowInput.value = "";
                        selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                        selectedOptionLocation.value = "";
                        selectedOptionLocation.id = "";
                        selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                        selectedOptionFlowType.id = "";
                        selectedOptionFlowProperty = selectFlowProperty.options[selectFlowProperty.selectedIndex];
                        selectedOptionFlowProperty.id = "";
                        selectedOptionFlowProperty.value = "";
                    }
                    resolve(jsonFlow);
                }));
            }
        }
        catch (error) {
            reject(error);
        }
    });
}
/*Metodo per scegliere i flow da aggiungere come output al product system.
Premendo il button avanti si va al modal di conferma per chiedere all'utente
se è sicuro che vuole creare il product system.  */
function aggiungiFlowOutputEsistenti(arrayInput) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, modal_view_js_1.getFlow)(apiCalculation, "Output");
                let arrayFlowOutput = [];
                let buttonCreaProductSystemOutput = document.getElementById('creaProductSystemOutput');
                let buttonCreaNewFlowOutput = document.querySelector('.newFlowOutput');
                let buttonAggiungiFlowOutput = document.querySelector('.confermaCreaProductSystem');
                if (buttonCreaProductSystemOutput) {
                    /*
                    Se viene premuto un button per aggiungere un flow tale button viene disattivato
                    e l'id del flow relativo al button premuto viene aggiunto alla lista degli arrayFlowOutput
                    */
                    buttonCreaProductSystemOutput.addEventListener('click', function (event) {
                        let button = event.target;
                        if (button) {
                            if (button.classList.contains('flowInputButton')) {
                                let buttonId = event.target.id;
                                event.target.disabled = true;
                                arrayFlowOutput.push(buttonId);
                            }
                        }
                    });
                }
                if (buttonCreaNewFlowOutput) {
                    buttonCreaNewFlowOutput.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                        event.preventDefault();
                        let modalNuovoProductSystem = document.getElementById("modal");
                        if (modalNuovoProductSystem) {
                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', (0, modal_view_js_1.creaModalNuovoFlowOutput)());
                            let creaDivFlowOutput = document.getElementById('creaFlowOutput');
                            if (creaDivFlowOutput) {
                                //@ts-ignore
                                const myModal = new bootstrap.Modal(creaDivFlowOutput);
                                myModal.show();
                                (0, modal_view_js_1.getAll)("location");
                                (0, modal_view_js_1.getAll)("flow-property");
                                //raccogliere l'id del flow input creato
                                let jsonNuovoFlow = yield aggiungiFlowOutput();
                                arrayFlowOutput.push(jsonNuovoFlow);
                            }
                        }
                    }));
                }
                if (buttonAggiungiFlowOutput) {
                    buttonAggiungiFlowOutput.addEventListener('click', event => {
                        event.preventDefault();
                        arrayInput[4] = arrayFlowOutput;
                        let modalNuovoProductSystem = document.getElementById("modal");
                        if (modalNuovoProductSystem) {
                            modalNuovoProductSystem.innerHTML = '';
                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', (0, modal_view_js_1.creaModalConfermaNuovoProductSystem)());
                            let newModal = document.getElementById('confermaCreaProductSystem');
                            if (newModal) {
                                //@ts-ignore
                                let myModal = new bootstrap.Modal(newModal);
                                myModal.show();
                                let buttonConfermaCreazione = document.querySelector('.creaProductSystem');
                                if (buttonConfermaCreazione) {
                                    buttonConfermaCreazione.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                                        event.preventDefault();
                                        const modalNuovoProductSystem = document.getElementById("modal");
                                        if (modalNuovoProductSystem) {
                                            modalNuovoProductSystem.innerHTML = '';
                                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', (0, modal_view_js_1.creaModalNuovoProductFine)());
                                            let divFinaleCreazioneProductSystem = document.getElementById('creaProductSystemFine');
                                            if (divFinaleCreazioneProductSystem) {
                                                //@ts-ignore
                                                const myModal = new bootstrap.Modal(divFinaleCreazioneProductSystem);
                                                myModal.show();
                                                let jsonProcess = yield creaDatiPerProductSystem(arrayInput);
                                                resolve(jsonProcess);
                                            }
                                        }
                                    }));
                                }
                            }
                        }
                    });
                }
            }
            catch (_a) {
                reject(Error);
            }
        }));
    });
}
;
//Metodo usato per aggiungere un flow di output creato dall'utente
function aggiungiFlowOutput() {
    return new Promise((resolve, reject) => {
        try {
            let divCreaFlowOutput = document.getElementById("creaFlowOutput");
            let buttonCreaFlowOutput = document.querySelector('.creaFlowOutput');
            let selectFlowType = document.getElementById("listaflow-type");
            let selectedOptionFlowType;
            let flowType = "selectedFlowType";
            let textNomeFlowOutput = document.getElementById("nomeFlowOutput");
            let nomeFlow = "";
            let selectLocation = document.getElementById("listalocation");
            let selectedOptionLocation;
            let idLocation = "selectedlocation";
            let nomeLocation;
            let selectFlowProperty = document.getElementById("listaflow-property");
            let selectedOptionFlowProperty;
            let idFlowProperty = "selectedflow-property";
            let nomeFlowProperty;
            if (divCreaFlowOutput) {
                divCreaFlowOutput.addEventListener('change', event => {
                    event.preventDefault();
                    if (selectFlowProperty && selectLocation && selectFlowType && textNomeFlowOutput && buttonCreaFlowOutput) {
                        selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                        flowType = selectedOptionFlowType.id;
                        nomeFlow = textNomeFlowOutput.value;
                        selectedOptionFlowProperty = selectFlowProperty.options[selectFlowProperty.selectedIndex];
                        idFlowProperty = selectedOptionFlowProperty.id;
                        selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                        idLocation = selectedOptionLocation.id;
                        if (nomeFlow === "" || flowType === "selectedFlowType") {
                            buttonCreaFlowOutput.disabled = true;
                        }
                        else {
                            buttonCreaFlowOutput.disabled = false;
                        }
                    }
                });
            }
            if (buttonCreaFlowOutput) {
                buttonCreaFlowOutput.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                    event.preventDefault();
                    if (textNomeFlowOutput) {
                        nomeFlow = textNomeFlowOutput.value;
                    }
                    if (selectLocation) {
                        selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                        idLocation = selectedOptionLocation.id;
                        nomeLocation = selectedOptionLocation.value;
                    }
                    if (selectFlowType) {
                        selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                        flowType = selectedOptionFlowType.id;
                    }
                    if (selectFlowProperty) {
                        selectedOptionFlowProperty = selectFlowProperty.options[selectFlowProperty.selectedIndex];
                        idFlowProperty = selectedOptionFlowProperty.id;
                        nomeFlowProperty = selectedOptionFlowProperty.value;
                    }
                    let jsonFlow = flow.creaJsonFlow(nomeFlow, idLocation, nomeLocation, flowType, idFlowProperty, nomeFlowProperty);
                    console.log(jsonFlow);
                    if (textNomeFlowOutput && selectLocation && selectFlowType && selectFlowProperty) {
                        textNomeFlowOutput.value = "";
                        selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                        selectedOptionLocation.value = "";
                        selectedOptionLocation.id = "";
                        selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                        selectedOptionFlowType.id = "";
                        selectedOptionFlowProperty = selectFlowProperty.options[selectFlowProperty.selectedIndex];
                        selectedOptionFlowProperty.id = "";
                        selectedOptionFlowProperty.value = "";
                    }
                    resolve(jsonFlow);
                }));
            }
        }
        catch (_a) {
            reject(Error);
        }
    });
}
/*Metodo usato per creare i dati (Flow e Exchange) che andranno a formare il
Process che apparterrà al Product system.  */
function creaDatiPerProductSystem(arrayInput) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = new Date();
                let dataFormattata = data.toISOString();
                let arrayFlowInput = arrayInput[3];
                let arrayFlowOutput = arrayInput[4];
                let exchanges = [];
                for (let i = 0; i < arrayFlowInput.length; i++) {
                    if (typeof arrayFlowInput[i] === 'string') {
                        //exchanges.push(this.creaExchanges(arrayFlowInput[i], true));
                        exchanges.push(exchange.creaJsonExchange(true, arrayFlowInput[i]));
                    }
                    else {
                        console.log(arrayFlowInput[i]);
                        //let json = exchange.creaJsonNuovoExchange(true,nuovoFlow,arrayFlowInput[i]);
                        //console.log(json);
                        let jsonFlow = arrayFlowInput[i];
                        console.log(jsonFlow);
                        let nuovoFlow = yield apiCalculation.putNuovoElement("flow", jsonFlow);
                        if (nuovoFlow["status"] == "OK") {
                            //exchanges.push(this.creaExchangesNuovoFlow(arrayFlowInput[i], true, nuovoFlow));
                            let json = exchange.creaJsonNuovoExchange(true, nuovoFlow, arrayFlowInput[i]);
                            console.log(json);
                            exchanges.push(json);
                        }
                        else {
                            reject(new Error("Errore nella creazione del flusso"));
                        }
                    }
                }
                (0, modal_view_js_1.avanzamentoBarra)("25");
                for (let i = 0; i < arrayFlowOutput.length; i++) {
                    if (typeof arrayFlowOutput[i] === 'string') {
                        //exchanges.push(this.creaExchanges(arrayFlowOutput[i], false));
                        exchanges.push(exchange.creaJsonExchange(false, arrayFlowOutput[i]));
                    }
                    else {
                        let nuovoFlow = yield apiCalculation.putNuovoElement("flow", arrayFlowOutput[i]);
                        if (nuovoFlow["status"] == "OK") {
                            //exchanges.push(this.creaExchangesNuovoFlow(arrayFlowOutput[i], false, nuovoFlow));
                            exchanges.push(exchange.creaJsonNuovoExchange(false, nuovoFlow, arrayFlowOutput[i]));
                        }
                        else {
                            reject(new Error("Errore nella creazione del flusso"));
                        }
                    }
                }
                (0, modal_view_js_1.avanzamentoBarra)("50");
                let jsonProcess = process.creaJsonProcess(arrayInput, dataFormattata, exchanges);
                resolve(jsonProcess);
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYVByb2R1Y3RTeXN0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9sb2dpYy9jcmVhUHJvZHVjdFN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxvRUFBOEQ7QUFFOUQsc0VBQ3dKO0FBRXhKLDhDQUF3QztBQUN4QyxzREFBZ0Q7QUFDaEQsb0RBQThDO0FBRzlDLE1BQU0sY0FBYyxHQUFHLElBQUksa0NBQWMsRUFBRSxDQUFDO0FBQzVDLE1BQU0sSUFBSSxHQUFHLElBQUksY0FBSSxFQUFFLENBQUM7QUFDeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxzQkFBUSxFQUFFLENBQUM7QUFDaEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxvQkFBTyxFQUFFLENBQUM7QUFFMUI7OEZBQzhGO0FBQzlGLFNBQXNCLDBCQUEwQjs7UUFFNUMsT0FBTyxJQUFJLE9BQU8sQ0FBYyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0RCxJQUFJLENBQUM7Z0JBQ0QsSUFBSSxVQUFvRCxDQUFDO2dCQUN6RCxJQUFBLHNCQUFNLEVBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRW5CLHlEQUF5RDtnQkFDekQsSUFBSSxZQUFZLEdBQTBCLFFBQVEsQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQTBCLENBQUM7Z0JBQ3BILElBQUksY0FBYyxHQUE2QixRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBNkIsQ0FBQztnQkFFakgsbUNBQW1DO2dCQUNuQyxJQUFJLGNBQWMsR0FBNkIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQTZCLENBQUM7Z0JBQ3BILElBQUksc0JBQXNCLENBQUM7Z0JBQzNCLElBQUksVUFBVSxHQUFVLGtCQUFrQixDQUFDO2dCQUUzQyxpREFBaUQ7Z0JBQ2pELElBQUkscUJBQXFCLEdBQTRCLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQTRCLENBQUM7Z0JBQzdILElBQUksNEJBQTRC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