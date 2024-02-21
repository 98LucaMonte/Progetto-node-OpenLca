import { ApiCalculation } from "../backend/apiCalculation.js";

import { creaModalInserisciInput,creaModalInserisciOutput,getFlow,creaModalConfermaNuovoProductSystem,
         creaModalNuovoFlowInput,creaModalNuovoFlowOutput,creaModalNuovoProductFine,getAll,avanzamentoBarra } from "../frontend/template/modal-view.js";

import { Flow } from "../model/flow.js";
import { Exchange } from "../model/exchange.js";
import { Process } from "../model/process.js"; 
import { JsonFlow, JsonProcess } from "../model/types.js";

const apiCalculation = new ApiCalculation();
const flow = new Flow();
const exchange = new Exchange();
const process = new Process();

    /*Metodo usato per prelevare i dati inseriti nel primo modal. 
    I dati prelevati sono nome del product system, descrizione e il luogo in cui viene prodotto */
    export async function creaModalInfoProductSystem (){

        return new Promise<JsonProcess>(async (resolve, reject) => {
            try {
                let arrayInput: [string,string,string,string[],string[]];
                getAll("location");

                // Elementi del modal usati per prelevare le informazioni
                let modalElement: HTMLDivElement | null = document.getElementById("creaProductSystemMain") as HTMLDivElement | null;
                let buttonNewInput: HTMLButtonElement | null = document.querySelector(".nuovoInput") as HTMLButtonElement | null;
                
                //Elementi per estrarre la location
                let selectLocation: HTMLSelectElement | null = document.getElementById("listalocation") as HTMLSelectElement | null;
                let selectedOptionLocation;
                let idLocation:string = "selectedlocation";

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
                                if (textNomeProductSystem.value === "" || textDescrizioneProductSystem.value === "" || idLocation === "selectedlocation") 
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
                                let jsonProcess:JsonProcess = await aggiungiFlowInputEsistenti(arrayInput);
                                if(jsonProcess === null){
                                    reject(new Error('Errore nel caricamento dei dati'));
                                }

                                setTimeout(async () => {
                                    resolve(jsonProcess);
                                }, 1500);
                            }

                        }
                    });
                }
            }
            catch(error) {
                reject(error)
            }
        });

    }

    /*Metodo per scegliere i flow da aggiungere come input al product system.
    Premendo il button crea flow si può andare a creare un nuovo flow di input personalizzato.  */
    async function aggiungiFlowInputEsistenti(arrayInput:[string,string,string,string[],string[]]) {

        return new Promise<JsonProcess>(async (resolve, reject) => {

            try {
                
                await getFlow(apiCalculation, "Input");
                let arrayFlowInput: string[] = [];

                //Modal(div) in cui sono presenti tutti i flow esistenti nel sistema 
                let divFlowEsistenti :HTMLDivElement | null= document.getElementById('creaProductSystemInput') as HTMLDivElement | null;
                //button per creare un nuovo flow
                let buttonCreaFlow:HTMLButtonElement | null = document.querySelector('.newFlowInput') as HTMLButtonElement | null;
                //button per andare aprire un modal dove si possono selezionare i flow da inserire come output
                let buttonInserisciFlowOutput: HTMLButtonElement | null =  document.querySelector('.inserisciOutput') as HTMLButtonElement | null;

                if(divFlowEsistenti){
                    /*
                    Se viene premuto un button per aggiungere un flow tale button viene disattivato
                    e l'id del flow relativo al button premuto viene aggiunto alla lista degli arrayFlowInput
                    */
                    divFlowEsistenti.addEventListener('click', function (event) {
                        let buttonAggiungiFlow: HTMLButtonElement | null = event.target as HTMLButtonElement | null;
                        if(buttonAggiungiFlow){
                            if (buttonAggiungiFlow.classList.contains('flowInputButton')) {
                                let buttonId: string = (event.target as HTMLElement).id;
                                (event.target as HTMLButtonElement).disabled = true;
                                arrayFlowInput.push(buttonId);
                            }
                        } 
                    });
                }
               
                //Una volta premuto tale button viene aperto un nuovo modal per poter creare un nuovo flow personalizzato
                if(buttonCreaFlow){
                    buttonCreaFlow.addEventListener('click', async (event) => {
                        event.preventDefault();
    
                        let modal:HTMLDivElement |null = document.getElementById("modal") as HTMLDivElement | null;
                        if(modal){
                            modal.insertAdjacentHTML('beforeend', creaModalNuovoFlowInput());
                            let newModal: HTMLDivElement | null = document.getElementById('creaFlowInput') as HTMLDivElement | null;
                            if(newModal){
                                //@ts-ignore
                                let myModal = new bootstrap.Modal(newModal);
                                myModal.show();
                                //raccogliere l'id del flow input creato
                                getAll("location");
                                getAll("flow-property");
        
                                let jsonNuovoFlow:any = await aggiungiFlowInput();
                                arrayFlowInput.push(jsonNuovoFlow);
                                console.log(arrayFlowInput)
                            }
                        }
                    });
                }
                                
                //Una volta premuto tale button si chiude questo modale e si passa al modale successivo per aggiungere i flow di output
                if(buttonInserisciFlowOutput){

                    buttonInserisciFlowOutput.addEventListener('click', async (event) => {
                        
                        event.preventDefault();
                        arrayInput[3]=arrayFlowInput;
                        console.log(arrayInput);
                        let modalNuovoProductSystem = document.getElementById("modal");
                        if(modalNuovoProductSystem){
                            modalNuovoProductSystem.innerHTML = '';
                            modalNuovoProductSystem.insertAdjacentHTML('beforeend', creaModalInserisciOutput());
                            let newModal: HTMLDivElement | null = document.getElementById('creaProductSystemOutput') as HTMLDivElement | null;
                            if(newModal){
                                //@ts-ignore
                                const myModal = new bootstrap.Modal(newModal);
                                myModal.show();
                                let jsonProcess:JsonProcess = await aggiungiFlowOutputEsistenti(arrayInput);
                                if(jsonProcess === null){
                                    reject(new Error( "Errore nella generazione del Process")); 
                                }
                                resolve(jsonProcess);
                            }
                        }
                    });
                }
            }
            catch(error) {
                reject(error);
            }

        })

    }

    //Metodo usato per aggiungere un flow di input creato dall'utente 
    function aggiungiFlowInput() {

        return new Promise<JsonFlow>((resolve, reject) => {
            try {

                /*Prendo l'id del div per vedere se ci sono dei cambiamenti all'interno 
                del modal e se tutti gli input sono stati inseriti abilito il button avanti*/
                let divModal: HTMLElement | null = document.getElementById("creaFlowInput") as HTMLElement | null;
                let buttonCreaFlowInput: HTMLButtonElement | null = document.querySelector('.creaFlowInput') as HTMLButtonElement | null; 

                //Elementi per predere i dati per creare il flow dal modal 
                let selectFlowType:HTMLSelectElement | null = document.getElementById("listaflow-type")as HTMLSelectElement | null;
                let selectedOptionFlowType;
                let flowType = "selectedFlowType";
                
                let textNomeFlowInput: HTMLInputElement | null = document.getElementById("nomeFlowInput") as HTMLInputElement | null;
                let nomeProductSystem:string = "";

                let selectLocation: HTMLSelectElement | null = document.getElementById("listalocation") as HTMLSelectElement | null;
                let selectedOptionLocation;
                let idLocation:string = "selectedlocation";
                let nomeLocation:string;

                let selectFlowProperty:HTMLSelectElement | null = document.getElementById("listaflow-property") as HTMLSelectElement | null;
                let selectedOptionFlowProperty;
                let idFlowProperty:string = "selectedflow-property";
                let nomeFlowProperty:string;

                if(divModal){
                    divModal.addEventListener('change', event => {
                        event.preventDefault();
                        
                        if(textNomeFlowInput){
                            nomeProductSystem = textNomeFlowInput.value;
                        }

                        if(selectFlowType){
                            selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                            flowType = selectedOptionFlowType.id;
                        }

                        if(selectLocation){
                            selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                            idLocation =  selectedOptionLocation.value;
                            nomeLocation = selectedOptionLocation.text;
                        }

                        if(selectFlowProperty){
                            selectedOptionFlowProperty = selectFlowProperty.options[selectFlowProperty.selectedIndex];
                            idFlowProperty  = selectedOptionFlowProperty.value;
                            nomeFlowProperty = selectedOptionFlowProperty.text;
                        }
                        
                        if(buttonCreaFlowInput && textNomeFlowInput && selectFlowType && selectLocation && selectFlowProperty){
                            if ( nomeProductSystem === "" || flowType === "selectedFlowType" || nomeLocation === "" || nomeFlowProperty === "")  
                                buttonCreaFlowInput.disabled = true;
                            else 
                                buttonCreaFlowInput.disabled = false;
                        }
                        
                    });
                }

                if(buttonCreaFlowInput){
                    buttonCreaFlowInput.addEventListener('click', async (event) => {
                        event.preventDefault();
                        
                        if(textNomeFlowInput){
                            nomeProductSystem = textNomeFlowInput.value;
                        }
                        
                        if(selectLocation){
                            selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                            idLocation = selectedOptionLocation.id;
                            nomeLocation = selectedOptionLocation.value;
                        }
    
                        if(selectFlowType){
                            selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                            flowType = selectedOptionFlowType.id;
                        }
    
                        if(selectFlowProperty){
                            selectedOptionFlowProperty = selectFlowProperty.options[selectFlowProperty.selectedIndex];
                            idFlowProperty = selectedOptionFlowProperty.id;
                            nomeFlowProperty = selectedOptionFlowProperty.value;
                        }

                        let jsonFlow:JsonFlow = flow.creaJsonFlow(nomeProductSystem,flowType,idLocation,nomeLocation,idFlowProperty,nomeFlowProperty);
                        console.log(jsonFlow)

                        if(textNomeFlowInput && selectLocation && selectFlowType && selectFlowProperty){
                            textNomeFlowInput.value=""; 

                            selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                            selectedOptionLocation.value=""; 
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
            catch(error) {
                reject(error);
            }
        });

    }

    /*Metodo per scegliere i flow da aggiungere come output al product system.
    Premendo il button avanti si va al modal di conferma per chiedere all'utente 
    se è sicuro che vuole creare il product system.  */
    async function aggiungiFlowOutputEsistenti(arrayInput:[string,string,string,string[],string[]]) {

        return new Promise<JsonProcess>(async (resolve, reject) => {
            try {
                await getFlow(apiCalculation, "Output");

                let arrayFlowOutput:string[] = [];
                let buttonCreaProductSystemOutput:HTMLButtonElement | null = document.getElementById('creaProductSystemOutput') as HTMLButtonElement | null;
                let buttonCreaNewFlowOutput: HTMLButtonElement | null = document.querySelector('.newFlowOutput') as HTMLButtonElement | null;
                let buttonAggiungiFlowOutput: HTMLButtonElement | null = document.querySelector('.confermaCreaProductSystem') as HTMLButtonElement | null;

                if(buttonCreaProductSystemOutput){
                    /*
                    Se viene premuto un button per aggiungere un flow tale button viene disattivato
                    e l'id del flow relativo al button premuto viene aggiunto alla lista degli arrayFlowOutput
                    */
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
                                getAll("location");
                                getAll("flow-property");
                                //raccogliere l'id del flow input creato
                                let jsonNuovoFlow:any = await aggiungiFlowOutput();
                                arrayFlowOutput.push(jsonNuovoFlow);
                            }
                            
                        }
                        
                    });
                }
                
                if(buttonAggiungiFlowOutput){
                    buttonAggiungiFlowOutput.addEventListener('click', event => {
                        event.preventDefault();
                        arrayInput[4] = arrayFlowOutput;
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
                                                let jsonProcess = await creaDatiPerProductSystem(arrayInput);
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

    };

    //Metodo usato per aggiungere un flow di output creato dall'utente
    function aggiungiFlowOutput() {

        return new Promise<JsonFlow>((resolve, reject) => {
            try {
                let divCreaFlowOutput: HTMLDivElement | null =  document.getElementById("creaFlowOutput") as HTMLDivElement | null;
                let buttonCreaFlowOutput: HTMLButtonElement | null = document.querySelector('.creaFlowOutput') as HTMLButtonElement | null;
                
                let selectFlowType:HTMLSelectElement | null = document.getElementById("listaflow-type") as HTMLSelectElement | null;
                let selectedOptionFlowType;
                let flowType:string = "selectedFlowType";

                let textNomeFlowOutput: HTMLInputElement | null = document.getElementById("nomeFlowOutput") as HTMLInputElement | null;
                let nomeFlow:string = "";

                let selectLocation:HTMLSelectElement | null = document.getElementById("listalocation") as HTMLSelectElement | null;
                let selectedOptionLocation;
                let idLocation:string = "selectedlocation";
                let nomeLocation:string;

                let selectFlowProperty:HTMLSelectElement | null = document.getElementById("listaflow-property") as HTMLSelectElement | null;
                let selectedOptionFlowProperty;
                let idFlowProperty:string ="selectedflow-property"; 
                let nomeFlowProperty:string;

                if(divCreaFlowOutput){
                    divCreaFlowOutput.addEventListener('change', event => {
                        event.preventDefault();
                                                
                        if(selectFlowProperty && selectLocation && selectFlowType && textNomeFlowOutput && buttonCreaFlowOutput){
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
               
                if(buttonCreaFlowOutput){
                    buttonCreaFlowOutput.addEventListener('click', async (event) => {
                        event.preventDefault();
                        
                        if(textNomeFlowOutput){
                            nomeFlow = textNomeFlowOutput.value;
                        }
                        
                        if(selectLocation){
                            selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                            idLocation = selectedOptionLocation.id;
                            nomeLocation = selectedOptionLocation.value;
                        }
                        
                        if(selectFlowType){
                            selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                            flowType = selectedOptionFlowType.id;
                        }

                        if(selectFlowProperty){
                            selectedOptionFlowProperty = selectFlowProperty.options[selectFlowProperty.selectedIndex];
                            idFlowProperty = selectedOptionFlowProperty.id;
                            nomeFlowProperty = selectedOptionFlowProperty.value;
                        }

                        let jsonFlow:JsonFlow = flow.creaJsonFlow(nomeFlow, idLocation, nomeLocation, flowType, idFlowProperty, nomeFlowProperty);
                        
                        console.log(jsonFlow)

                        if(textNomeFlowOutput && selectLocation && selectFlowType && selectFlowProperty){
                            textNomeFlowOutput.value=""; 

                            selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                            selectedOptionLocation.value=""; 
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

    /*Metodo usato per creare i dati (Flow e Exchange) che andranno a formare il 
    Process che apparterrà al Product system.  */
    async function creaDatiPerProductSystem(arrayInput:[string,string,string,string[],string[]]) {
        return new Promise<JsonProcess>(async (resolve, reject) => {
            try {
                let data = new Date();
                let dataFormattata = data.toISOString();
                let arrayFlowInput:any = arrayInput[3];
                let arrayFlowOutput:any = arrayInput[4];
                let exchanges:any = [];

                for (let i = 0; i < arrayFlowInput.length; i++) {
                    if (typeof arrayFlowInput[i] === 'string') {
                        //exchanges.push(this.creaExchanges(arrayFlowInput[i], true));
                        exchanges.push(exchange.creaJsonExchange(true,arrayFlowInput[i]));
                    } else {
                        console.log(arrayFlowInput[i])
                        //let json = exchange.creaJsonNuovoExchange(true,nuovoFlow,arrayFlowInput[i]);
                        //console.log(json);
                        let jsonFlow:JsonFlow = arrayFlowInput[i]; 
                        console.log(jsonFlow);
                        let nuovoFlow = await apiCalculation.putNuovoElement("flow", jsonFlow);
                        if(nuovoFlow["status"] == "OK"){
                        //exchanges.push(this.creaExchangesNuovoFlow(arrayFlowInput[i], true, nuovoFlow));
                        let json = exchange.creaJsonNuovoExchange(true,nuovoFlow,arrayFlowInput[i]);
                        console.log(json);
                        exchanges.push(json);
                        }
                        else{
                            reject(new Error("Errore nella creazione del flusso")); 
                        }

                    }
                }

                avanzamentoBarra("25");

                for (let i = 0; i < arrayFlowOutput.length; i++) {
                    if (typeof arrayFlowOutput[i] === 'string') {
                        //exchanges.push(this.creaExchanges(arrayFlowOutput[i], false));
                        exchanges.push(exchange.creaJsonExchange(false,arrayFlowOutput[i]));
                    } else {
                        let nuovoFlow = await apiCalculation.putNuovoElement("flow", arrayFlowOutput[i]);
                        if(nuovoFlow["status"] == "OK"){
                        //exchanges.push(this.creaExchangesNuovoFlow(arrayFlowOutput[i], false, nuovoFlow));
                        exchanges.push(exchange.creaJsonNuovoExchange(false,nuovoFlow,arrayFlowOutput[i]));
                        }
                        else{
                            reject(new Error("Errore nella creazione del flusso")); 
                        }
                    }
                }

                avanzamentoBarra("50");

                let jsonProcess:JsonProcess = process.creaJsonProcess(arrayInput,dataFormattata,exchanges);

                resolve(jsonProcess);
            } catch (error) {
                reject(error);
            }
        });
    }