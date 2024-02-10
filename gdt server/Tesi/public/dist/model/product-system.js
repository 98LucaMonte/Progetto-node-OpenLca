import { ApiCalculation } from "../backend/apiCalculation.js";
import { modalCreaProductSystem01, creaModalInserisciInput, creaModalInserisciOutput, getFlow, creaModalConfermaNuovoProductSystem, creaModalNuovoFlowInput, creaModalNuovoFlowOutput, creaModalNuovoProductFine } from "../frontend/template/modal-view.js";
import { Flow } from "./flow.js";
const apiCalculation = new ApiCalculation();
const flow = new Flow();
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
                                let jsonProcess = await this.aggiungiFlowInputEsistenti(arrayInput);
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
    /*Metodo per scegliere i flow da aggiungere come input al product system.
    Premendo il button crea flow si può andare a creare un nuovo flow di input personalizzato.  */
    aggiungiFlowInputEsistenti = async (arrayInput) => {
        return new Promise(async (resolve, reject) => {
            try {
                await getFlow(apiCalculation, "Input");
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
                    buttonCreaFlow.addEventListener('click', async (event) => {
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
                                await this.getAll("location");
                                await this.getAll("flow-property");
                                let jsonNuovoFlow = await this.aggiungiFlowInput();
                                arrayFlowInput.push(jsonNuovoFlow);
                            }
                        }
                    });
                }
                //Una volta premuto tale button si chiude questo modale e si passa al modale successivo per aggiungere i flow di output
                if (buttonInserisciFlowOutput) {
                    buttonInserisciFlowOutput.addEventListener('click', async (event) => {
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
                                let jsonProcess = await this.aggiungiFlowOutputEsistenti(arrayInput);
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
    //Metodo usato per aggiungere un flow di input creato dall'utente 
    aggiungiFlowInput() {
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
                    buttonCreaFlowInput.addEventListener('click', async (event) => {
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
                    });
                }
            }
            catch {
                reject(Error);
            }
        });
    }
    /*Metodo per scegliere i flow da aggiungere come output al product system.
    Premendo il button crea flow si può andare a creare un nuovo flow di output personalizzato.  */
    aggiungiFlowOutputEsistenti = async (arrayInput) => {
        return new Promise(async (resolve, reject) => {
            try {
                await getFlow(apiCalculation, "Output");
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
                                await this.getAll("flow-property");
                                //raccogliere l'id del flow input creato
                                let jsonNuovoFlow = await this.aggiungiFlowOutput();
                                arrayFlowOutput.push(jsonNuovoFlow);
                            }
                        }
                    });
                }
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
    aggiungiFlowOutput() {
        return new Promise((resolve, reject) => {
            try {
                let divCreaFlowOutput = document.getElementById("creaFlowOutput");
                let buttonCreaFlowOutput = document.querySelector('.creaFlowOutput');
                let selectFlowType = document.getElementById("listaflow-type");
                let selectedOptionFlowType;
                let flowType = "selectedFlowType";
                let textNomeFlowOutput = document.getElementById("nomeFlowOutput");
                let nomeFlow;
                let selectLocation = document.getElementById("listalocation");
                let selectedOptionLocation;
                let idLocation;
                let nomeLocation;
                let selectFlowProperty = document.getElementById("listaflow-property");
                let selectedOptionFlowProperty;
                let idFlowProperty;
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
                    buttonCreaFlowOutput.addEventListener('click', async (event) => {
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
