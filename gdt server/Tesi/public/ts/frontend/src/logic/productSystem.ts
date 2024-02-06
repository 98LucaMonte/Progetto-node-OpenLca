// @ts-ignore
import bootstrap from "bootstrap";
import ApiCalculation from "../../../backend/src/restclient/apiCalculation";
import {
    creaModalInserisciInput, creaModalInserisciOutput,
    getFlow, creaModalNuovoFlowInput, creaModalNuovoFlowOutput,
    creaModalConfermaNuovoProductSystem, creaModalNuovoProductFine
} from "../templates/modal-view";

class ProductSystem {

    creaModalInfoProductSystem = async (vps: string, apiCalculation: ApiCalculation) => {

        return new Promise(async (resolve, reject) => {
            try {
                let arrayInput: [string,string,string,string[],string[]];
                this.getAll(vps, apiCalculation, "location");

                let modalElement: HTMLElement | null = document.getElementById("creaProductSystemMain") as HTMLElement | null;

                if (modalElement) {
                    modalElement.addEventListener('change', event => {
                        event.preventDefault();
                        const selectLocation: HTMLSelectElement | null = document.getElementById("listalocation") as HTMLSelectElement | null;
                        if (selectLocation) {
                            let selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                            let idLocation = selectedOptionLocation.id;
                            
                            let textProductSystem: HTMLInputElement | null = document.getElementById("nomeProductSystem") as HTMLInputElement | null;
                            let textDescrizione: HTMLInputElement | null = document.getElementById("descrizioneProductSystem") as HTMLInputElement | null;
                            let buttonNewInput: HTMLButtonElement | null = document.getElementById(".nuovoInput") as HTMLButtonElement | null;
                            
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

                let buttonNewInput: HTMLButtonElement | null = document.getElementById(".nuovoInput") as HTMLButtonElement | null;

                if (buttonNewInput) {
                    buttonNewInput.addEventListener('click', async (event) => {
                        event.preventDefault();

                        let textNomeProductSystem: HTMLInputElement | null = document.getElementById("nomeProductSystem") as HTMLInputElement | null;
                        let nomeProductSystem;

                        let textDescrizioneProductSystem: HTMLInputElement | null = document.getElementById("descrizioneProductSystem") as HTMLInputElement | null;
                        let descrizioneProductSystem;

                        let selectLocation: HTMLSelectElement | null = document.getElementById("listalocation") as HTMLSelectElement | null;
                        let selectedOptionLocation;
                        let idLocation;

                        if (textNomeProductSystem && textDescrizioneProductSystem && selectLocation) {
                            nomeProductSystem = textNomeProductSystem.value;
                            descrizioneProductSystem = textDescrizioneProductSystem.value;
                            selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                            idLocation = selectedOptionLocation.id;
                            arrayInput.push(nomeProductSystem, descrizioneProductSystem, idLocation);
                        }

                        let modalNuovoProductSystem: HTMLDivElement | null = document.getElementById("modal") as HTMLDivElement | null;
                        if (modalNuovoProductSystem) {
                            modalNuovoProductSystem.innerHTML = '';
                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalInserisciInput());
                            let nuovoModal: HTMLElement | null = document.getElementById('creaProductSystemInput') as HTMLElement | null;
                            if (nuovoModal) {
                                const myModal = new bootstrap.Modal(nuovoModal);
                                myModal.show();
                                let jsonProcess:any = await this.creaModalProductSystemFlowInput(vps, apiCalculation, arrayInput);
                                let idProductSystem = await this.creaProductSystem(vps, apiCalculation, jsonProcess);
                                await this.avanzamentoBarra("100");
                                setTimeout(async () => {
                                    resolve(idProductSystem);
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

    creaModalProductSystemFlowInput = async (vps:string, apiCalculation:ApiCalculation, arrayInput:[string,string,string,string[],string[]]) => {

        return new Promise(async (resolve, reject) => {

            try {
                await getFlow(vps, apiCalculation, "Input");
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
                                let myModal = new bootstrap.Modal(newModal);
                                myModal.show();
                                //raccogliere l'id del flow input creato
                                await this.getAll(vps, apiCalculation, "location");
                                await this.getAll(vps, apiCalculation, "category");
                                await this.getAll(vps, apiCalculation, "flow-property");
        
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
                                const myModal = new bootstrap.Modal(newModal);
                                myModal.show();
                                let jsonProcess = await this.creaModalProductSystemFlowOutput(vps, apiCalculation, arrayInput);
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

    creaModalFlowInput() {

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

    creaModalProductSystemFlowOutput = async (vps:string, apiCalculation:ApiCalculation, arrayInput:[string,string,string,string[],string[]]) => {

        return new Promise(async (resolve, reject) => {
            try {
                await getFlow(vps, apiCalculation, "Output");

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
                                const myModal = new bootstrap.Modal(creaDivFlowOutput);
                                myModal.show();
                                await this.getAll(vps, apiCalculation, "location");
                                await this.getAll(vps, apiCalculation, "category");
                                await this.getAll(vps, apiCalculation, "flow-property");
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
                                                const myModal = new bootstrap.Modal(divFinaleCreazioneProductSystem);
                                                myModal.show();
                                                let jsonProcess = await this.creaModalMessaggioConferma(vps, apiCalculation, arrayInput);
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

    creaModalFlowOutput() {

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

    creaModalMessaggioConferma = async (vps:string, apiCalculation:ApiCalculation, arrayInput:[string,string,string,string[],string[]]) => {
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
                        let nuovoFlow = await apiCalculation.putNuovoElement(vps, "flow", arrayFlowInput[i]);
                        exchanges.push(this.creaExchangesNuovoFlow(arrayFlowInput[i], true, nuovoFlow));
                    }
                }

                await this.avanzamentoBarra("25");

                for (let i = 0; i < arrayFlowOutput.length; i++) {
                    if (typeof arrayFlowOutput[i] === 'string') {
                        exchanges.push(this.creaExchanges(arrayFlowOutput[i], false));
                    } else {
                        let nuovoFlow = await apiCalculation.putNuovoElement(vps, "flow", arrayFlowOutput[i]);
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

    getAll = async (vps:string, apiCalculation:ApiCalculation, type:string) => {
        const placeholder:HTMLOptionElement | null = document.getElementById(`selected${type}`) as HTMLOptionElement | null;
        let lista = await apiCalculation.getAll(vps, type);

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

    creaExchangesNuovoFlow(element:any, type:boolean, flow:any) {
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

    creaExchanges(str:string, type:boolean) {

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

    avanzamentoBarra = async (width:string) => {
        
        return new Promise(() => {
            let progressBar:HTMLElement | null = document.getElementById('progressBar') as HTMLElement | null;
            
            setTimeout(function () {
                if(progressBar)
                    progressBar.style.width = width + '%';
            }, 1500);
            
        });
    }

    creaProductSystem = async (vps:string,apiCalculation:ApiCalculation, json:object) => {

        let idProcess = await apiCalculation.putNuovoElement(vps, "process", json);
        let idProductSystem = await apiCalculation.nuovoProductSystem(vps, idProcess["@id"]);
        return idProductSystem;
    }

}

export { ProductSystem }