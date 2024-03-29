var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiCalculation } from "../backend/apiCalculation.js";
import { creaModalInserisciInput, creaModalInserisciOutput, getFlow, creaModalConfermaNuovoProductSystem, creaModalNuovoFlowInput, creaModalNuovoFlowOutput, creaModalNuovoProductFine, getAll, avanzamentoBarra } from "../frontend/template/modal-view.js";
import { Flow } from "../model/flow.js";
import { Exchange } from "../model/exchange.js";
import { Process } from "../model/process.js";
const apiCalculation = new ApiCalculation();
const flow = new Flow();
const exchange = new Exchange();
const process = new Process();
/*Metodo usato per prelevare i dati inseriti nel primo modal.
I dati prelevati sono nome del product system, descrizione e il luogo in cui viene prodotto */
export function creaModalInfoProductSystem() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let arrayInput;
                getAll("location");
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
                            divModal.insertAdjacentHTML('beforeend', creaModalInserisciInput());
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
/*Metodo per scegliere i flow da aggiungere come input al product system.
Premendo il button crea flow si può andare a creare un nuovo flow di input personalizzato.  */
function aggiungiFlowInputEsistenti(arrayInput) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield getFlow(apiCalculation, "Input");
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
                            modal.insertAdjacentHTML('beforeend', creaModalNuovoFlowInput());
                            let newModal = document.getElementById('creaFlowInput');
                            if (newModal) {
                                //@ts-ignore
                                let myModal = new bootstrap.Modal(newModal);
                                myModal.show();
                                //raccogliere l'id del flow input creato
                                getAll("location");
                                getAll("flow-property");
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
                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalInserisciOutput());
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
                yield getFlow(apiCalculation, "Output");
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
                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalNuovoFlowOutput());
                            let creaDivFlowOutput = document.getElementById('creaFlowOutput');
                            if (creaDivFlowOutput) {
                                //@ts-ignore
                                const myModal = new bootstrap.Modal(creaDivFlowOutput);
                                myModal.show();
                                getAll("location");
                                getAll("flow-property");
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
                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalConfermaNuovoProductSystem());
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
                                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalNuovoProductFine());
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
                avanzamentoBarra("25");
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
                avanzamentoBarra("50");
                let jsonProcess = process.creaJsonProcess(arrayInput, dataFormattata, exchanges);
                resolve(jsonProcess);
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
