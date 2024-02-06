var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
import bootstrap from "bootstrap";
import { creaModalInserisciInput, creaModalInserisciOutput, getFlow, creaModalNuovoFlowInput, creaModalNuovoFlowOutput, creaModalConfermaNuovoProductSystem, creaModalNuovoProductFine } from "../templates/modal-view";
class ProductSystem {
    constructor() {
        this.creaModalInfoProductSystem = (vps, apiCalculation) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let arrayInput;
                    this.getAll(vps, apiCalculation, "location");
                    let modalElement = document.getElementById("creaProductSystemMain");
                    if (modalElement) {
                        modalElement.addEventListener('change', event => {
                            event.preventDefault();
                            const selectLocation = document.getElementById("listalocation");
                            if (selectLocation) {
                                let selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                                let idLocation = selectedOptionLocation.id;
                                let textProductSystem = document.getElementById("nomeProductSystem");
                                let textDescrizione = document.getElementById("descrizioneProductSystem");
                                let buttonNewInput = document.getElementById(".nuovoInput");
                                if (textProductSystem != null && textDescrizione != null && buttonNewInput != null) {
                                    if (textProductSystem.value === "" || textDescrizione.value === "" || idLocation === "") {
                                        buttonNewInput.disabled = true;
                                    }
                                    else {
                                        buttonNewInput.disabled = false;
                                    }
                                }
                            }
                        });
                    }
                    let buttonNewInput = document.getElementById(".nuovoInput");
                    if (buttonNewInput) {
                        buttonNewInput.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                            event.preventDefault();
                            let textNomeProductSystem = document.getElementById("nomeProductSystem");
                            let nomeProductSystem;
                            let textDescrizioneProductSystem = document.getElementById("descrizioneProductSystem");
                            let descrizioneProductSystem;
                            let selectLocation = document.getElementById("listalocation");
                            let selectedOptionLocation;
                            let idLocation;
                            if (textNomeProductSystem && textDescrizioneProductSystem && selectLocation) {
                                nomeProductSystem = textNomeProductSystem.value;
                                descrizioneProductSystem = textDescrizioneProductSystem.value;
                                selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                                idLocation = selectedOptionLocation.id;
                                arrayInput.push(nomeProductSystem, descrizioneProductSystem, idLocation);
                            }
                            let modalNuovoProductSystem = document.getElementById("modal");
                            if (modalNuovoProductSystem) {
                                modalNuovoProductSystem.innerHTML = '';
                                modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalInserisciInput());
                                let nuovoModal = document.getElementById('creaProductSystemInput');
                                if (nuovoModal) {
                                    const myModal = new bootstrap.Modal(nuovoModal);
                                    myModal.show();
                                    let jsonProcess = yield this.creaModalProductSystemFlowInput(vps, apiCalculation, arrayInput);
                                    let idProductSystem = yield this.creaProductSystem(vps, apiCalculation, jsonProcess);
                                    yield this.avanzamentoBarra("100");
                                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                        resolve(idProductSystem);
                                    }), 1500);
                                }
                            }
                        }));
                    }
                }
                catch (_a) {
                    reject(Error);
                }
            }));
        });
        this.creaModalProductSystemFlowInput = (vps, apiCalculation, arrayInput) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield getFlow(vps, apiCalculation, "Input");
                    let arrayFlowInput = [];
                    let addFlow = document.getElementById('creaProductSystemInput');
                    if (addFlow) {
                        addFlow.addEventListener('click', function (event) {
                            let button = event.target;
                            if (button) {
                                if (button.classList.contains('flowInputButton')) {
                                    let buttonId = event.target.id;
                                    event.target.disabled = true;
                                    arrayFlowInput.push(buttonId);
                                }
                            }
                        });
                    }
                    let addNewFlow = document.querySelector('.newFlowInput');
                    if (addNewFlow) {
                        addNewFlow.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                            event.preventDefault();
                            let modalNuovoProductSystem = document.getElementById("modal");
                            if (modalNuovoProductSystem) {
                                modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalNuovoFlowInput());
                                let newModal = document.getElementById('creaFlowInput');
                                if (newModal) {
                                    let myModal = new bootstrap.Modal(newModal);
                                    myModal.show();
                                    //raccogliere l'id del flow input creato
                                    yield this.getAll(vps, apiCalculation, "location");
                                    yield this.getAll(vps, apiCalculation, "category");
                                    yield this.getAll(vps, apiCalculation, "flow-property");
                                    let jsonNuovoFlow = yield this.creaModalFlowInput();
                                    arrayFlowInput.push(jsonNuovoFlow);
                                }
                            }
                        }));
                    }
                    let flowOutput = document.querySelector('.inserisciOutput');
                    if (flowOutput) {
                        flowOutput.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                            event.preventDefault();
                            arrayInput.push(arrayFlowInput);
                            let modalNuovoProductSystem = document.getElementById("modal");
                            if (modalNuovoProductSystem) {
                                modalNuovoProductSystem.innerHTML = '';
                                modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalInserisciOutput());
                                let newModal = document.getElementById('creaProductSystemOutput');
                                if (newModal) {
                                    const myModal = new bootstrap.Modal(newModal);
                                    myModal.show();
                                    let jsonProcess = yield this.creaModalProductSystemFlowOutput(vps, apiCalculation, arrayInput);
                                    resolve(jsonProcess);
                                }
                            }
                        }));
                    }
                }
                catch (_b) {
                    reject(Error);
                }
            }));
        });
        this.creaModalProductSystemFlowOutput = (vps, apiCalculation, arrayInput) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield getFlow(vps, apiCalculation, "Output");
                    let arrayFlowOutput = [];
                    let buttonCreaProductSystemOutput = document.getElementById('creaProductSystemOutput');
                    if (buttonCreaProductSystemOutput) {
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
                    let buttonCreaNewFlowOutput = document.querySelector('.newFlowOutput');
                    if (buttonCreaNewFlowOutput) {
                        buttonCreaNewFlowOutput.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                            event.preventDefault();
                            let modalNuovoProductSystem = document.getElementById("modal");
                            if (modalNuovoProductSystem) {
                                modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalNuovoFlowOutput());
                                let creaDivFlowOutput = document.getElementById('creaFlowOutput');
                                if (creaDivFlowOutput) {
                                    const myModal = new bootstrap.Modal(creaDivFlowOutput);
                                    myModal.show();
                                    yield this.getAll(vps, apiCalculation, "location");
                                    yield this.getAll(vps, apiCalculation, "category");
                                    yield this.getAll(vps, apiCalculation, "flow-property");
                                    //raccogliere l'id del flow input creato
                                    let jsonNuovoFlow = yield this.creaModalFlowOutput();
                                    arrayFlowOutput.push(jsonNuovoFlow);
                                }
                            }
                        }));
                    }
                    let buttonAggiungiFlowOutput = document.querySelector('.confermaCreaProductSystem');
                    if (buttonAggiungiFlowOutput) {
                        buttonAggiungiFlowOutput.addEventListener('click', event => {
                            event.preventDefault();
                            arrayInput.push(arrayFlowOutput);
                            let modalNuovoProductSystem = document.getElementById("modal");
                            if (modalNuovoProductSystem) {
                                modalNuovoProductSystem.innerHTML = '';
                                modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalConfermaNuovoProductSystem());
                                let newModal = document.getElementById('confermaCreaProductSystem');
                                if (newModal) {
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
                                                    const myModal = new bootstrap.Modal(divFinaleCreazioneProductSystem);
                                                    myModal.show();
                                                    let jsonProcess = yield this.creaModalMessaggioConferma(vps, apiCalculation, arrayInput);
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
                catch (_c) {
                    reject(Error);
                }
            }));
        });
        this.creaModalMessaggioConferma = (vps, apiCalculation, arrayInput) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let data = new Date();
                    let dataFormattata = data.toISOString();
                    let arrayFlowInput = arrayInput[3];
                    let arrayFlowOutput = arrayInput[4];
                    let exchanges = [];
                    for (let i = 0; i < arrayFlowInput.length; i++) {
                        if (typeof arrayFlowInput[i] === 'string') {
                            exchanges.push(this.creaExchanges(arrayFlowInput[i], true));
                        }
                        else {
                            let nuovoFlow = yield apiCalculation.putNuovoElement(vps, "flow", arrayFlowInput[i]);
                            exchanges.push(this.creaExchangesNuovoFlow(arrayFlowInput[i], true, nuovoFlow));
                        }
                    }
                    yield this.avanzamentoBarra("25");
                    for (let i = 0; i < arrayFlowOutput.length; i++) {
                        if (typeof arrayFlowOutput[i] === 'string') {
                            exchanges.push(this.creaExchanges(arrayFlowOutput[i], false));
                        }
                        else {
                            let nuovoFlow = yield apiCalculation.putNuovoElement(vps, "flow", arrayFlowOutput[i]);
                            exchanges.push(this.creaExchangesNuovoFlow(arrayFlowOutput[i], false, nuovoFlow));
                        }
                    }
                    yield this.avanzamentoBarra("50");
                    let jsonProcess = {
                        "@type": "Process",
                        "name": arrayInput[0],
                        "description": arrayInput[1],
                        "processType": "UNIT_PROCESS",
                        "location": {
                            "@type": "Location",
                            "@id": arrayInput[2]
                        },
                        "processDocumentation": {
                            "copyright": false,
                            "creationDate": dataFormattata
                        },
                        "exchanges": exchanges
                    };
                    console.log(exchanges);
                    resolve(jsonProcess);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
        this.getAll = (vps, apiCalculation, type) => __awaiter(this, void 0, void 0, function* () {
            const placeholder = document.getElementById(`selected${type}`);
            let lista = yield apiCalculation.getAll(vps, type);
            if (placeholder) {
                if (lista.length == 0) {
                    placeholder.innerHTML = `Non ci sono ${type} selezionabili`;
                }
                else {
                    const select = document.getElementById(`lista${type}`);
                    placeholder.innerHTML = `Seleziona una ${type}`;
                    if (select) {
                        for (let i = 0; i < lista.length; i++) {
                            let option = document.createElement("option");
                            option.value = lista[i].name;
                            option.text = lista[i].name;
                            option.id = lista[i]["@id"];
                            select.appendChild(option);
                        }
                    }
                }
            }
        });
        this.avanzamentoBarra = (width) => __awaiter(this, void 0, void 0, function* () {
            return new Promise(() => {
                let progressBar = document.getElementById('progressBar');
                setTimeout(function () {
                    if (progressBar)
                        progressBar.style.width = width + '%';
                }, 1500);
            });
        });
        this.creaProductSystem = (vps, apiCalculation, json) => __awaiter(this, void 0, void 0, function* () {
            let idProcess = yield apiCalculation.putNuovoElement(vps, "process", json);
            let idProductSystem = yield apiCalculation.nuovoProductSystem(vps, idProcess["@id"]);
            return idProductSystem;
        });
    }
    creaModalFlowInput() {
        return new Promise((resolve, reject) => {
            try {
                let divModal = document.getElementById("creaFlowInput");
                if (divModal) {
                    divModal.addEventListener('change', event => {
                        event.preventDefault();
                        let selectFlowType = document.getElementById("listaflow-type");
                        let selectedOptionFlowType;
                        let flowType = "selectedFlowType";
                        if (selectFlowType) {
                            selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                            flowType = selectedOptionFlowType.id;
                        }
                        let button = document.querySelector('.creaFlowInput');
                        let textNomeFlowInput = document.getElementById("nomeFlowInput");
                        if (button && textNomeFlowInput) {
                            if (textNomeFlowInput.value === "" || flowType === "selectedFlowType") {
                                button.disabled = true;
                            }
                            else {
                                button.disabled = false;
                            }
                        }
                    });
                }
                let buttonCreaFlowInput = document.querySelector('.creaFlowInput');
                if (buttonCreaFlowInput) {
                    buttonCreaFlowInput.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                        event.preventDefault();
                        let textInputNomeProductSystem = document.getElementById("nomeFlowInput");
                        let nomeProductSystem;
                        if (textInputNomeProductSystem) {
                            nomeProductSystem = textInputNomeProductSystem.value;
                        }
                        let selectLocation = document.getElementById("listalocation");
                        let selectedOptionLocation;
                        let idLocation;
                        let nomeLocation;
                        if (selectLocation) {
                            selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                            idLocation = selectedOptionLocation.id;
                            nomeLocation = selectedOptionLocation.value;
                        }
                        let selectFlowType = document.getElementById("listaflow-type");
                        let selectedOptionFlowType;
                        let flowType;
                        if (selectFlowType) {
                            selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                            flowType = selectedOptionFlowType.id;
                        }
                        let selectCategory = document.getElementById("listacategory");
                        let selectedCategory;
                        let idCategory;
                        if (selectCategory) {
                            selectedCategory = selectCategory.options[selectCategory.selectedIndex];
                            idCategory = selectedCategory.id;
                        }
                        let selectFlowProperty = document.getElementById("listaflow-property");
                        let selectedOptionFlowProperty;
                        let idFlowProperty;
                        let nomeFlowProperty;
                        if (selectFlowProperty) {
                            selectedOptionFlowProperty = selectFlowProperty.options[selectFlowProperty.selectedIndex];
                            idFlowProperty = selectedOptionFlowProperty.id;
                            nomeFlowProperty = selectedOptionFlowProperty.value;
                        }
                        let jsonFlow = {
                            "@type": "Flow",
                            "name": nomeProductSystem,
                            "flowType": flowType,
                            "location": {
                                "@type": "Location",
                                "@id": idLocation,
                                "name": nomeLocation
                            },
                            "flowProperties": [
                                {
                                    "@type": "FlowPropertyFactor",
                                    "isRefFlowProperty": true,
                                    "conversionFactor": 1.0,
                                    "flowProperty": {
                                        "@type": "FlowProperty",
                                        "@id": idFlowProperty,
                                        "name": nomeFlowProperty
                                    }
                                }
                            ]
                        };
                        resolve(jsonFlow);
                    }));
                }
            }
            catch (_a) {
                reject(Error);
            }
        });
    }
    creaModalFlowOutput() {
        return new Promise((resolve, reject) => {
            try {
                let divCreaFlowOutput = document.getElementById("creaFlowOutput");
                if (divCreaFlowOutput) {
                    divCreaFlowOutput.addEventListener('change', event => {
                        event.preventDefault();
                        let selectFlowType = document.getElementById("listaflow-type");
                        let selectedOptionFlowType;
                        let flowType;
                        let textNomeFlowOutput = document.getElementById("nomeFlowOutput");
                        let buttonCreaFlowOutput = document.querySelector('.creaFlowOutput');
                        if (selectFlowType && textNomeFlowOutput && buttonCreaFlowOutput) {
                            selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                            flowType = selectedOptionFlowType.id;
                            if (textNomeFlowOutput.value === "" || flowType === "selectedFlowType") {
                                buttonCreaFlowOutput.disabled = true;
                            }
                            else {
                                buttonCreaFlowOutput.disabled = false;
                            }
                        }
                    });
                }
                let buttonCreaFlowOutput = document.querySelector('.creaFlowOutput');
                if (buttonCreaFlowOutput) {
                    buttonCreaFlowOutput.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                        event.preventDefault();
                        let textNomeFlow = document.getElementById("nomeFlowOutput");
                        let nomeFlow;
                        if (textNomeFlow) {
                            nomeFlow = textNomeFlow.value;
                        }
                        let selectLocation = document.getElementById("listalocation");
                        let selectedOptionLocation;
                        let idLocation;
                        let nomeLocation;
                        if (selectLocation) {
                            selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                            idLocation = selectedOptionLocation.id;
                            nomeLocation = selectedOptionLocation.value;
                        }
                        let selectFlowType = document.getElementById("listaflow-type");
                        let selectedOptionFlowType;
                        let flowType;
                        if (selectFlowType) {
                            selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                            flowType = selectedOptionFlowType.id;
                        }
                        let selectCategory = document.getElementById("listacategory");
                        let selectedCategory;
                        let idCategory;
                        if (selectCategory) {
                            selectedCategory = selectCategory.options[selectCategory.selectedIndex];
                            idCategory = selectedCategory.id;
                        }
                        let selectFlowProperty = document.getElementById("listaflow-property");
                        let selectedOptionFlowProperty;
                        let idFlowProperty;
                        let nomeFlowProperty;
                        if (selectFlowProperty) {
                            selectedOptionFlowProperty = selectFlowProperty.options[selectFlowProperty.selectedIndex];
                            idFlowProperty = selectedOptionFlowProperty.id;
                            nomeFlowProperty = selectedOptionFlowProperty.value;
                        }
                        let jsonFlow = {
                            "@type": "Flow",
                            "name": nomeFlow,
                            "flowType": flowType,
                            "location": {
                                "@type": "Location",
                                "@id": idLocation,
                                "name": nomeLocation
                            },
                            "flowProperties": [
                                {
                                    "@type": "FlowPropertyFactor",
                                    "isRefFlowProperty": true,
                                    "conversionFactor": 1.0,
                                    "flowProperty": {
                                        "@type": "FlowProperty",
                                        "@id": idFlowProperty,
                                        "name": nomeFlowProperty
                                    }
                                }
                            ]
                        };
                        resolve(jsonFlow);
                    }));
                }
            }
            catch (_a) {
                reject(Error);
            }
        });
    }
    creaExchangesNuovoFlow(element, type, flow) {
        return {
            "@type": "Exchange",
            "internalId": 1,
            "amount": 1.0,
            "isAvoidedProduct": false,
            "isInput": type,
            "isQuantitativeReference": true,
            "flow": {
                "@type": "Flow",
                "@id": flow["@id"]
            },
            "flowProperty": {
                "@type": "FlowProperty",
                "@id": element.flowProperties[0].flowProperty["@id"],
                "name": element.flowProperties[0].flowProperty.name
            }
        };
    }
    creaExchanges(str, type) {
        return {
            "@type": "Exchange",
            "internalId": 1,
            "amount": 1.0,
            "isAvoidedProduct": false,
            "isInput": type,
            "isQuantitativeReference": true,
            "flow": {
                "@type": "Flow",
                "@id": str
            }
        };
    }
}
export { ProductSystem };
