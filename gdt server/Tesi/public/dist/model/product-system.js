import { ApiCalculation } from "../backend/apiCalculation.js";
import { modalCreaProductSystem01, creaModalInserisciInput, creaModalInserisciOutput, getFlow, creaModalConfermaNuovoProductSystem, creaModalNuovoFlowInput, creaModalNuovoFlowOutput, creaModalNuovoProductFine } from "../frontend/template/modal-view.js";
const apiCalculation = new ApiCalculation();
export class ProductSystem {
    //Metodo usato per creare un nuovo product system tramite gli input ricevuti con l'interazione con gli utenti
    async creaProductSystem() {
        return new Promise(async (resolve, reject) => {
            try {
                let modalNuovoProductSystem = document.getElementById("modal");
                if (modalNuovoProductSystem) {
                    modalNuovoProductSystem.insertAdjacentHTML('beforeend', modalCreaProductSystem01());
                    //@ts-ignore
                    let myModal = new bootstrap.Modal(document.getElementById('creaProductSystemMain'));
                    myModal.show();
                    let json = await this.creaModalInfoProductSystem();
                    let idProcess = await apiCalculation.putNuovoElement("process", json);
                    let idProductSystem = await apiCalculation.nuovoProductSystem(idProcess["@id"]);
                    await this.avanzamentoBarra("100");
                    resolve(idProductSystem);
                }
            }
            catch {
                reject(Error);
            }
        });
    }
    /*Metodo usato per prelevare i dati inseriti nel primo modal.
    I dati prelevati sono nome del product system, descrizione e il luogo in cui viene prodotto */
    creaModalInfoProductSystem = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let arrayInput;
                await this.getAll("location");
                // Elementi del modal usati per prelevare le informazioni
                let modalElement = document.getElementById("creaProductSystemMain");
                let buttonNewInput = document.querySelector(".nuovoInput");
                //Elementi per estrarre la location
                let selectLocation = document.getElementById("listalocation");
                let selectedOptionLocation;
                let idLocation = "";
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
                                if (textNomeProductSystem.value === "" || textDescrizioneProductSystem.value === "" || idLocation === "")
                                    buttonNewInput.disabled = true;
                                else
                                    buttonNewInput.disabled = false;
                            }
                        }
                    });
                }
                if (buttonNewInput) {
                    buttonNewInput.addEventListener('click', async (event) => {
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
                                let jsonProcess = await this.creaModalProductSystemFlowInput(arrayInput);
                                setTimeout(async () => {
                                    resolve(jsonProcess);
                                }, 1500);
                            }
                        }
                    });
                }
            }
            catch {
                reject(Error);
            }
        });
    };
    creaModalProductSystemFlowInput = async (arrayInput) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("array");
                console.log(arrayInput);
                await getFlow(apiCalculation, "Input");
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
                    addNewFlow.addEventListener('click', async (event) => {
                        event.preventDefault();
                        let modalNuovoProductSystem = document.getElementById("modal");
                        if (modalNuovoProductSystem) {
                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalNuovoFlowInput());
                            let newModal = document.getElementById('creaFlowInput');
                            if (newModal) {
                                //@ts-ignore
                                let myModal = new bootstrap.Modal(newModal);
                                myModal.show();
                                //raccogliere l'id del flow input creato
                                await this.getAll("location");
                                await this.getAll("category");
                                await this.getAll("flow-property");
                                let jsonNuovoFlow = await this.creaModalFlowInput();
                                arrayFlowInput.push(jsonNuovoFlow);
                            }
                        }
                    });
                }
                let flowOutput = document.querySelector('.inserisciOutput');
                if (flowOutput) {
                    flowOutput.addEventListener('click', async (event) => {
                        event.preventDefault();
                        arrayInput.push(arrayFlowInput);
                        let modalNuovoProductSystem = document.getElementById("modal");
                        if (modalNuovoProductSystem) {
                            modalNuovoProductSystem.innerHTML = '';
                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalInserisciOutput());
                            let newModal = document.getElementById('creaProductSystemOutput');
                            if (newModal) {
                                //@ts-ignore
                                const myModal = new bootstrap.Modal(newModal);
                                myModal.show();
                                let jsonProcess = await this.creaModalProductSystemFlowOutput(arrayInput);
                                resolve(jsonProcess);
                            }
                        }
                    });
                }
            }
            catch {
                reject(Error);
            }
        });
    };
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
                    buttonCreaFlowInput.addEventListener('click', async (event) => {
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
                    });
                }
            }
            catch {
                reject(Error);
            }
        });
    }
    creaModalProductSystemFlowOutput = async (arrayInput) => {
        return new Promise(async (resolve, reject) => {
            try {
                await getFlow(apiCalculation, "Output");
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
                    buttonCreaNewFlowOutput.addEventListener('click', async (event) => {
                        event.preventDefault();
                        let modalNuovoProductSystem = document.getElementById("modal");
                        if (modalNuovoProductSystem) {
                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalNuovoFlowOutput());
                            let creaDivFlowOutput = document.getElementById('creaFlowOutput');
                            if (creaDivFlowOutput) {
                                //@ts-ignore
                                const myModal = new bootstrap.Modal(creaDivFlowOutput);
                                myModal.show();
                                await this.getAll("location");
                                await this.getAll("category");
                                await this.getAll("flow-property");
                                //raccogliere l'id del flow input creato
                                let jsonNuovoFlow = await this.creaModalFlowOutput();
                                arrayFlowOutput.push(jsonNuovoFlow);
                            }
                        }
                    });
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
                                //@ts-ignore
                                let myModal = new bootstrap.Modal(newModal);
                                myModal.show();
                                let buttonConfermaCreazione = document.querySelector('.creaProductSystem');
                                if (buttonConfermaCreazione) {
                                    buttonConfermaCreazione.addEventListener('click', async (event) => {
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
                                                let jsonProcess = await this.creaModalMessaggioConferma(arrayInput);
                                                resolve(jsonProcess);
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
            catch {
                reject(Error);
            }
        });
    };
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
                    buttonCreaFlowOutput.addEventListener('click', async (event) => {
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
                    });
                }
            }
            catch {
                reject(Error);
            }
        });
    }
    creaModalMessaggioConferma = async (arrayInput) => {
        return new Promise(async (resolve, reject) => {
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
                        let nuovoFlow = await apiCalculation.putNuovoElement("flow", arrayFlowInput[i]);
                        exchanges.push(this.creaExchangesNuovoFlow(arrayFlowInput[i], true, nuovoFlow));
                    }
                }
                await this.avanzamentoBarra("25");
                for (let i = 0; i < arrayFlowOutput.length; i++) {
                    if (typeof arrayFlowOutput[i] === 'string') {
                        exchanges.push(this.creaExchanges(arrayFlowOutput[i], false));
                    }
                    else {
                        let nuovoFlow = await apiCalculation.putNuovoElement("flow", arrayFlowOutput[i]);
                        exchanges.push(this.creaExchangesNuovoFlow(arrayFlowOutput[i], false, nuovoFlow));
                    }
                }
                await this.avanzamentoBarra("50");
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
        });
    };
    getAll = async (type) => {
        const placeholder = document.getElementById(`selected${type}`);
        let lista = await apiCalculation.getAllData(type);
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
    };
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
    avanzamentoBarra = async (width) => {
        return new Promise(() => {
            let progressBar = document.getElementById('progressBar');
            setTimeout(function () {
                if (progressBar)
                    progressBar.style.width = width + '%';
            }, 1500);
        });
    };
}
