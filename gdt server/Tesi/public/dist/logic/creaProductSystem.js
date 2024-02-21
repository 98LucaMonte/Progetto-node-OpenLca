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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYVByb2R1Y3RTeXN0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9sb2dpYy9jcmVhUHJvZHVjdFN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFOUQsT0FBTyxFQUFFLHVCQUF1QixFQUFDLHdCQUF3QixFQUFDLE9BQU8sRUFBQyxtQ0FBbUMsRUFDNUYsdUJBQXVCLEVBQUMsd0JBQXdCLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxFQUFDLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFeEosT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHOUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztBQUM1QyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ3hCLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7QUFDaEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUUxQjs4RkFDOEY7QUFDOUYsTUFBTSxVQUFnQiwwQkFBMEI7O1FBRTVDLE9BQU8sSUFBSSxPQUFPLENBQWMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdEQsSUFBSSxDQUFDO2dCQUNELElBQUksVUFBb0QsQ0FBQztnQkFDekQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUVuQix5REFBeUQ7Z0JBQ3pELElBQUksWUFBWSxHQUEwQixRQUFRLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUEwQixDQUFDO2dCQUNwSCxJQUFJLGNBQWMsR0FBNkIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFh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