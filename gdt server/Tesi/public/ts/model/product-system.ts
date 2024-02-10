import { ApiCalculation } from "../backend/apiCalculation.js";
import { modalCreaProductSystem01,creaModalInserisciInput,
         creaModalInserisciOutput,getFlow,creaModalConfermaNuovoProductSystem,
         creaModalNuovoFlowInput,creaModalNuovoFlowOutput,creaModalNuovoProductFine} from "../frontend/template/modal-view.js";

const apiCalculation = new ApiCalculation();

export class ProductSystem{
    
    //Metodo usato per creare un nuovo product system tramite gli input ricevuti con l'interazione con gli utenti
    async creaProductSystem(){
        
        return new Promise(async (resolve, reject) => {
            try {
                let modalNuovoProductSystem: HTMLDivElement | null = document.getElementById("modal") as HTMLDivElement | null;
                if(modalNuovoProductSystem){
                    modalNuovoProductSystem.insertAdjacentHTML('beforeend',modalCreaProductSystem01());
                    //@ts-ignore
                    let myModal = new bootstrap.Modal(document.getElementById('creaProductSystemMain'));
                    myModal.show();

                    let json:any = await this.creaModalInfoProductSystem();
                    let idProcess = await apiCalculation.putNuovoElement("process", json);
                    let idProductSystem = await apiCalculation.nuovoProductSystem(idProcess["@id"]);
                    await this.avanzamentoBarra("100");
                    resolve(idProductSystem);
                }
            }
            catch {
                reject(Error)
            }
        });

    }

    /*Metodo usato per prelevare i dati inseriti nel primo modal. 
    I dati prelevati sono nome del product system, descrizione e il luogo in cui viene prodotto */
    private creaModalInfoProductSystem = async () => {

        return new Promise(async (resolve, reject) => {
            try {
                let arrayInput: [string,string,string,string[],string[]];
                await this.getAll("location");

                // Elementi del modal usati per prelevare le informazioni
                let modalElement: HTMLDivElement | null = document.getElementById("creaProductSystemMain") as HTMLDivElement | null;
                let buttonNewInput: HTMLButtonElement | null = document.querySelector(".nuovoInput") as HTMLButtonElement | null;
                
                //Elementi per estrarre la location
                let selectLocation: HTMLSelectElement | null = document.getElementById("listalocation") as HTMLSelectElement | null;
                let selectedOptionLocation;
                let idLocation:string = "";

                //Elementi per estrarre il nome e la descrizione 
                let textNomeProductSystem: HTMLInputElement | null = document.getElementById("nomeProductSystem") as HTMLInputElement | null;
                let textDescrizioneProductSystem: HTMLInputElement | null = document.getElementById("descrizioneProductSystem") as HTMLInputElement | null;
                        
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

                        let divModal: HTMLDivElement | null = document.getElementById("modal") as HTMLDivElement | null;
                        
                        if (divModal) {
                            
                            divModal.innerHTML = '';
                            divModal.insertAdjacentHTML('beforeend', creaModalInserisciInput());
                            let nuovoModal: HTMLDivElement | null = document.getElementById('creaProductSystemInput') as HTMLDivElement | null;
                            
                            if (nuovoModal) {
                                
                                //@ts-ignore
                                const myModal = new bootstrap.Modal(nuovoModal);
                                myModal.show();
                                let jsonProcess:any = await this.creaModalProductSystemFlowInput(arrayInput);
                                
                                setTimeout(async () => {
                                    resolve(jsonProcess);
                                }, 1500);
                            }

                        }
                    });
                }
            }
            catch {
                reject(Error)
            }
        });

    }

    private creaModalProductSystemFlowInput = async (arrayInput:[string,string,string,string[],string[]]) => {

        return new Promise(async (resolve, reject) => {

            try {
                console.log("array");
                console.log(arrayInput);
                await getFlow(apiCalculation, "Input");
                let arrayFlowInput: string[] = [];

                let addFlow :HTMLDivElement | null= document.getElementById('creaProductSystemInput') as HTMLDivElement | null;

                if(addFlow){
                    addFlow.addEventListener('click', function (event) {
                        let button: HTMLButtonElement | null = event.target as HTMLButtonElement | null;
                        if(button){
                            if (button.classList.contains('flowInputButton')) {
                                let buttonId: string = (event.target as HTMLElement).id;
                                (event.target as HTMLButtonElement).disabled = true;
                                arrayFlowInput.push(buttonId);
                            }
                        } 
                    });
                }
               
                let addNewFlow:HTMLButtonElement | null = document.querySelector('.newFlowInput') as HTMLButtonElement | null;
                
                if(addNewFlow){
                    addNewFlow.addEventListener('click', async (event) => {
                        event.preventDefault();
    
                        let modalNuovoProductSystem:HTMLDivElement |null = document.getElementById("modal") as HTMLDivElement | null;
                        if(modalNuovoProductSystem){
                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalNuovoFlowInput());
                            let newModal: HTMLDivElement | null =document.getElementById('creaFlowInput') as HTMLDivElement | null;
                            if(newModal){
                                //@ts-ignore
                                let myModal = new bootstrap.Modal(newModal);
                                myModal.show();
                                //raccogliere l'id del flow input creato
                                await this.getAll("location");
                                await this.getAll("category");
                                await this.getAll("flow-property");
        
                                let jsonNuovoFlow:any = await this.creaModalFlowInput();
                                arrayFlowInput.push(jsonNuovoFlow);
                            }
                        }
                    });
                }
                
                let flowOutput: HTMLButtonElement | null =  document.querySelector('.inserisciOutput') as HTMLButtonElement | null;
                
                if(flowOutput){
                    flowOutput.addEventListener('click', async (event) => {
                        event.preventDefault();
                        arrayInput.push(arrayFlowInput);
                        let modalNuovoProductSystem = document.getElementById("modal");
                        if(modalNuovoProductSystem){
                            modalNuovoProductSystem.innerHTML = '';
                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalInserisciOutput());
                            let newModal: HTMLDivElement | null = document.getElementById('creaProductSystemOutput') as HTMLDivElement | null;
                            if(newModal){
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

        })

    }

    private creaModalFlowInput() {

        return new Promise((resolve, reject) => {
            try {

                let divModal: HTMLElement | null = document.getElementById("creaFlowInput") as HTMLElement | null;
                
                if(divModal){
                    divModal.addEventListener('change', event => {
                        event.preventDefault();
                        let selectFlowType:HTMLSelectElement | null = document.getElementById("listaflow-type")as HTMLSelectElement | null;
                        let selectedOptionFlowType;
                        let flowType = "selectedFlowType";
                        if(selectFlowType){
                            selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                            flowType = selectedOptionFlowType.id;
                        }
                        
                        let button: HTMLButtonElement | null = document.querySelector('.creaFlowInput') as HTMLButtonElement | null; 
                        let textNomeFlowInput: HTMLInputElement | null = document.getElementById("nomeFlowInput") as HTMLInputElement | null;
                        if(button && textNomeFlowInput){
                            if (textNomeFlowInput.value === "" || flowType === "selectedFlowType") {
                                button.disabled = true;
                            }
                            else {
                                button.disabled = false;
                            }
                        }
                        
                    });
                }

                let buttonCreaFlowInput: HTMLButtonElement | null =  document.querySelector('.creaFlowInput') as HTMLButtonElement | null;

                if(buttonCreaFlowInput){
                    buttonCreaFlowInput.addEventListener('click', async (event) => {
                        event.preventDefault();
                        
                        let textInputNomeProductSystem: HTMLInputElement | null = document.getElementById("nomeFlowInput") as HTMLInputElement | null;
                        let nomeProductSystem;
                        if(textInputNomeProductSystem){
                            nomeProductSystem = textInputNomeProductSystem.value;
                        }
                        
                        let selectLocation: HTMLSelectElement | null = document.getElementById("listalocation") as HTMLSelectElement | null;
                        let selectedOptionLocation;
                        let idLocation;
                        let nomeLocation;
                        if(selectLocation){
                            selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                            idLocation = selectedOptionLocation.id;
                            nomeLocation = selectedOptionLocation.value;
                        }
    
                        let selectFlowType:HTMLSelectElement | null = document.getElementById("listaflow-type") as HTMLSelectElement | null;
                        let selectedOptionFlowType;
                        let flowType;
                        if(selectFlowType){
                            selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                            flowType = selectedOptionFlowType.id;
                        }
    
                        let selectCategory:HTMLSelectElement | null = document.getElementById("listacategory") as HTMLSelectElement | null;
                        let selectedCategory;
                        let idCategory;
                        if(selectCategory){
                            selectedCategory = selectCategory.options[selectCategory.selectedIndex];
                            idCategory = selectedCategory.id;
                        }

                        let selectFlowProperty:HTMLSelectElement | null = document.getElementById("listaflow-property") as HTMLSelectElement | null;
                        let selectedOptionFlowProperty;
                        let idFlowProperty;
                        let nomeFlowProperty;
                        if(selectFlowProperty){
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

    private creaModalProductSystemFlowOutput = async (arrayInput:[string,string,string,string[],string[]]) => {

        return new Promise(async (resolve, reject) => {
            try {
                await getFlow(apiCalculation, "Output");

                let arrayFlowOutput:string[] = [];
                let buttonCreaProductSystemOutput:HTMLButtonElement | null = document.getElementById('creaProductSystemOutput') as HTMLButtonElement | null;

                if(buttonCreaProductSystemOutput){
                    buttonCreaProductSystemOutput.addEventListener('click', function (event) {
                        let button: HTMLButtonElement | null = event.target as HTMLButtonElement | null;
                        if(button){
                            if (button.classList.contains('flowInputButton')) {
                                let buttonId: string = (event.target as HTMLElement).id;
                                (event.target as HTMLButtonElement).disabled = true;
                                arrayFlowOutput.push(buttonId);
                            }
                        }
                        
                    });
                }
                
                let buttonCreaNewFlowOutput: HTMLButtonElement | null = document.querySelector('.newFlowOutput') as HTMLButtonElement | null;

                if(buttonCreaNewFlowOutput){
                    buttonCreaNewFlowOutput.addEventListener('click', async (event) => {
                        event.preventDefault();
    
                        let modalNuovoProductSystem = document.getElementById("modal");
                        if(modalNuovoProductSystem){
                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalNuovoFlowOutput());
                            let creaDivFlowOutput: HTMLDivElement | null = document.getElementById('creaFlowOutput') as HTMLDivElement | null;
                            
                            if(creaDivFlowOutput){
                                //@ts-ignore
                                const myModal = new bootstrap.Modal(creaDivFlowOutput);
                                myModal.show();
                                await this.getAll("location");
                                await this.getAll("category");
                                await this.getAll("flow-property");
                                //raccogliere l'id del flow input creato
                                let jsonNuovoFlow:any = await this.creaModalFlowOutput();
                                arrayFlowOutput.push(jsonNuovoFlow);
                            }
                            
                        }
                        
                    });
                }
                
                let buttonAggiungiFlowOutput: HTMLButtonElement | null = document.querySelector('.confermaCreaProductSystem') as HTMLButtonElement | null;
                if(buttonAggiungiFlowOutput){
                    buttonAggiungiFlowOutput.addEventListener('click', event => {
                        event.preventDefault();
                        arrayInput.push(arrayFlowOutput);
                        let modalNuovoProductSystem:HTMLDivElement | null = document.getElementById("modal") as HTMLDivElement | null;
                        if(modalNuovoProductSystem){
                            
                            modalNuovoProductSystem.innerHTML = '';
                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalConfermaNuovoProductSystem());
                            let newModal: HTMLDivElement | null = document.getElementById('confermaCreaProductSystem') as HTMLDivElement | null;
                            
                            if(newModal){
                                //@ts-ignore
                                let myModal = new bootstrap.Modal(newModal);
                                myModal.show();
                                
                                let buttonConfermaCreazione:HTMLButtonElement | null = document.querySelector('.creaProductSystem') as HTMLButtonElement | null;
                                if(buttonConfermaCreazione){
                                    buttonConfermaCreazione.addEventListener('click', async (event) => {
                                        event.preventDefault();
                                        const modalNuovoProductSystem = document.getElementById("modal");
                                        if(modalNuovoProductSystem){
                                            modalNuovoProductSystem.innerHTML = '';
                                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalNuovoProductFine());
                                            let divFinaleCreazioneProductSystem:HTMLDivElement | null = document.getElementById('creaProductSystemFine')as HTMLDivElement | null; 
                                            if(divFinaleCreazioneProductSystem){
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
                
            } catch {
                reject(Error);
            }
        })

    }

    private creaModalFlowOutput() {

        return new Promise((resolve, reject) => {
            try {
                let divCreaFlowOutput: HTMLDivElement | null =  document.getElementById("creaFlowOutput") as HTMLDivElement | null;
               
                if(divCreaFlowOutput){
                    divCreaFlowOutput.addEventListener('change', event => {
                        event.preventDefault();
                        let selectFlowType:HTMLSelectElement | null = document.getElementById("listaflow-type") as HTMLSelectElement | null;
                        let selectedOptionFlowType;
                        let flowType;

                        let textNomeFlowOutput: HTMLInputElement | null = document.getElementById("nomeFlowOutput") as HTMLInputElement | null;
                        let buttonCreaFlowOutput: HTMLButtonElement | null = document.querySelector('.creaFlowOutput') as HTMLButtonElement | null;
                        if(selectFlowType && textNomeFlowOutput && buttonCreaFlowOutput){
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
               
                let buttonCreaFlowOutput: HTMLButtonElement | null = document.querySelector('.creaFlowOutput') as HTMLButtonElement | null;

                if(buttonCreaFlowOutput){
                    buttonCreaFlowOutput.addEventListener('click', async (event) => {
                        event.preventDefault();
                        let textNomeFlow:HTMLInputElement | null = document.getElementById("nomeFlowOutput") as HTMLInputElement | null;
                        let nomeFlow;
                        if(textNomeFlow){
                            nomeFlow = textNomeFlow.value;
                        }
                        
                        let selectLocation:HTMLSelectElement | null = document.getElementById("listalocation") as HTMLSelectElement | null;
                        let selectedOptionLocation;
                        let idLocation;
                        let nomeLocation;
                        if(selectLocation){
                            selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                            idLocation = selectedOptionLocation.id;
                            nomeLocation = selectedOptionLocation.value;
                        }
                        
    
                        let selectFlowType:HTMLSelectElement | null = document.getElementById("listaflow-type") as HTMLSelectElement | null;
                        let selectedOptionFlowType;
                        let flowType;
                        if(selectFlowType){
                            selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                            flowType = selectedOptionFlowType.id;
                        }

                        let selectCategory:HTMLSelectElement | null  = document.getElementById("listacategory")as HTMLSelectElement | null ;
                        let selectedCategory;
                        let idCategory;
                        if(selectCategory){
                            selectedCategory = selectCategory.options[selectCategory.selectedIndex];
                            idCategory = selectedCategory.id;   
                        }

                        let selectFlowProperty:HTMLSelectElement | null = document.getElementById("listaflow-property") as HTMLSelectElement | null;
                        let selectedOptionFlowProperty;
                        let idFlowProperty;
                        let nomeFlowProperty;
                        if(selectFlowProperty){
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

    private creaModalMessaggioConferma = async (arrayInput:[string,string,string,string[],string[]]) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = new Date();
                let dataFormattata = data.toISOString();
                let arrayFlowInput:any = arrayInput[3];
                let arrayFlowOutput:any = arrayInput[4];
                let exchanges = [];

                for (let i = 0; i < arrayFlowInput.length; i++) {
                    if (typeof arrayFlowInput[i] === 'string') {
                        exchanges.push(this.creaExchanges(arrayFlowInput[i], true));
                    } else {
                        let nuovoFlow = await apiCalculation.putNuovoElement("flow", arrayFlowInput[i]);
                        exchanges.push(this.creaExchangesNuovoFlow(arrayFlowInput[i], true, nuovoFlow));
                    }
                }

                await this.avanzamentoBarra("25");

                for (let i = 0; i < arrayFlowOutput.length; i++) {
                    if (typeof arrayFlowOutput[i] === 'string') {
                        exchanges.push(this.creaExchanges(arrayFlowOutput[i], false));
                    } else {
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
            } catch (error) {
                reject(error);
            }
        });
    }

    private getAll = async (type:string) => {
        const placeholder:HTMLOptionElement | null = document.getElementById(`selected${type}`) as HTMLOptionElement | null;
        let lista = await apiCalculation.getAllData(type);

        if(placeholder){
            if (lista.length == 0) {
                placeholder.innerHTML = `Non ci sono ${type} selezionabili`;
            } else {
                const select:HTMLSelectElement | null = document.getElementById(`lista${type}`) as HTMLSelectElement | null;
                placeholder.innerHTML = `Seleziona una ${type}`;
                if(select){
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
        
    }

    private creaExchangesNuovoFlow(element:any, type:boolean, flow:any) {
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

    private creaExchanges(str:string, type:boolean) {

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

    private avanzamentoBarra = async (width:string) => {
        
        return new Promise(() => {
            let progressBar:HTMLElement | null = document.getElementById('progressBar') as HTMLElement | null;
            
            setTimeout(function () {
                if(progressBar)
                    progressBar.style.width = width + '%';
            }, 1500);
            
        });
    }
}

