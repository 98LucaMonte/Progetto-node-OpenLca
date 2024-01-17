import  {   creaModalInserisciInput,creaModalInserisciOutput,
            getFlow,creaModalNuovoFlowInput,creaModalNuovoFlowOutput,
            creaModalConfermaNuovoProductSystem,creaModalNuovoProductFine}from "../templates/modal-view.js";

class ProductSystem {

    creaModalInfoProductSystem = async (vps,apiCalculation,arrayInput) => {

        return new Promise(async (resolve, reject) => {
            try{
                this.getAll(vps,apiCalculation,"location");
    
                document.getElementById("creaProductSystemMain").addEventListener('change', event =>{
                    event.preventDefault();
                    const selectLocation = document.getElementById("listalocation");
                    const selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                    const idLocation = selectedOptionLocation.id;
                    if(document.getElementById("nomeProductSystem").value === "" || 
                       document.getElementById("descrizioneProductSystem").value === "" || idLocation === ""){
                        document.querySelector('.nuovoInput').disabled = true;
                    }
                    else{
                        document.querySelector('.nuovoInput').disabled = false;
                    }
                });
            
                document.querySelector('.nuovoInput').addEventListener('click',async (event) =>{
                    event.preventDefault();
                    let nomeProductSystem = document.getElementById("nomeProductSystem").value;
            
                    let descrizioneProductSystem = document.getElementById("descrizioneProductSystem").value;
            
                    const selectLocation = document.getElementById("listalocation");
                    const selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                    const idLocation = selectedOptionLocation.id;
            
                    arrayInput.push(nomeProductSystem,descrizioneProductSystem,idLocation);
            
                    const modalNuovoProductSystem = document.getElementById("modal");
                    modalNuovoProductSystem.innerHTML = '';
                    modalNuovoProductSystem.insertAdjacentHTML('beforeend',creaModalInserisciInput());
                    const myModal = new bootstrap.Modal(document.getElementById('creaProductSystemInput'));
                    myModal.show();
                    
                    let jsonProcess = await this.creaModalProductSystemFlowInput(vps,apiCalculation,arrayInput);
                    let idProductSystem = await this.creaProductSystem(vps,apiCalculation,jsonProcess);
                    await this.avanzamentoBarra(100);
                    
                    setTimeout(async () => {
                        resolve(idProductSystem);
                    }, 1500);
                    
                });
            }
            catch{
                reject(error)
            }
        });
   
    }
    
    creaModalProductSystemFlowInput = async (vps,apiCalculation,arrayInput) =>{ 
        
        return new Promise(async (resolve, reject) => {

            try{
                await getFlow(vps,apiCalculation,"Input");
                let arrayFlowInput = [];
            
                document.getElementById('creaProductSystemInput').addEventListener('click', function(event) {
                    if (event.target.classList.contains('flowInputButton')) {
                    let buttonId = event.target.id;
                    event.target.disabled = true;
                    arrayFlowInput.push(buttonId);
                    }
                });
            
                document.querySelector('.newFlowInput').addEventListener('click',async (event) =>{
                    event.preventDefault();
                    
                    const modalNuovoProductSystem = document.getElementById("modal");
                    modalNuovoProductSystem.insertAdjacentHTML('beforeend',creaModalNuovoFlowInput());
                    const myModal = new bootstrap.Modal(document.getElementById('creaFlowInput'));
                    myModal.show();
                    //raccogliere l'id del flow input creato
                    await this.getAll(vps,apiCalculation,"location");
                    await this.getAll(vps,apiCalculation,"category");
                    await this.getAll(vps,apiCalculation,"flow-property");
            
                    let jsonNuovoFlow = await this.creaModalFlowInput();
                    arrayFlowInput.push(jsonNuovoFlow);
                });
            
                document.querySelector('.inserisciOutput').addEventListener('click',async (event) =>{
                    event.preventDefault();
                    arrayInput.push(arrayFlowInput);
                    const modalNuovoProductSystem = document.getElementById("modal");
                    modalNuovoProductSystem.innerHTML = '';
                    modalNuovoProductSystem.insertAdjacentHTML('beforeend',creaModalInserisciOutput());
                    const myModal = new bootstrap.Modal(document.getElementById('creaProductSystemOutput'));
                    myModal.show();
                    let jsonProcess = await this.creaModalProductSystemFlowOutput(vps,apiCalculation,arrayInput);
                    resolve(jsonProcess);
                });
            }
            catch{
                reject(error);
            }
            
        })
        
    }
    
    creaModalFlowInput(){
    
        return new Promise((resolve, reject) => {
            try{
                document.getElementById("creaFlowInput").addEventListener('change', event =>{
                    event.preventDefault();
        
                    const selectFlowType = document.getElementById("listaflow-type");
                    const selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                    const flowType = selectedOptionFlowType.id;
                    if(document.getElementById("nomeFlowInput").value === "" ||  flowType === "selectedFlowType"){
                        document.querySelector('.creaFlowInput').disabled = true;
                    }
                    else{
                        document.querySelector('.creaFlowInput').disabled = false;
                    }
                });
        
                document.querySelector('.creaFlowInput').addEventListener('click',async (event) =>{
                    event.preventDefault();
                    let nomeProductSystem = document.getElementById("nomeFlowInput").value;
                    
                    const selectLocation = document.getElementById("listalocation");
                    const selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                    const idLocation = selectedOptionLocation.id;
                    const nomeLocation = selectedOptionLocation.value;
        
                    const selectFlowType = document.getElementById("listaflow-type");
                    const selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                    const flowType= selectedOptionFlowType.id;
                    
                    const selectCategory = document.getElementById("listacategory");
                    const selectedCategory = selectCategory.options[selectCategory.selectedIndex];
                    const idCategory = selectedCategory.id;
        
                    const selectFlowProperty = document.getElementById("listaflow-property");
                    const selectedOptionFlowProperty = selectFlowProperty.options[selectFlowProperty.selectedIndex];
                    const idFlowProperty = selectedOptionFlowProperty.id;
                    const nomeFlowProperty = selectedOptionFlowProperty.value;
        
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
            catch{
                reject(error)
            }
        });
        
    }
    
    creaModalProductSystemFlowOutput = async (vps,apiCalculation,arrayInput) =>{
        

        return new Promise(async (resolve, reject) => {
            try{
                await getFlow(vps,apiCalculation,"Output");
        
                let arrayFlowOutput = [];
            
                document.getElementById('creaProductSystemOutput').addEventListener('click', function(event) {
                    if (event.target.classList.contains('flowInputButton')) {
                    let buttonId = event.target.id;
                    event.target.disabled = true;
                    arrayFlowOutput.push(buttonId);
                    console.log(arrayFlowOutput)
                    }
                });
            
                document.querySelector('.newFlowOutput').addEventListener('click',async (event) =>{
                    event.preventDefault();
                    
                    const modalNuovoProductSystem = document.getElementById("modal");
                    modalNuovoProductSystem.insertAdjacentHTML('beforeend',creaModalNuovoFlowOutput());
                    const myModal = new bootstrap.Modal(document.getElementById('creaFlowOutput'));
                    myModal.show();
                    await this.getAll(vps,apiCalculation,"location");
                    await this.getAll(vps,apiCalculation,"category");
                    await this.getAll(vps,apiCalculation,"flow-property");
                    //raccogliere l'id del flow input creato
                    let jsonNuovoFlow = await this.creaModalFlowOutput();
                    console.log(jsonNuovoFlow);
                    arrayFlowOutput.push(jsonNuovoFlow);
                    console.log(arrayFlowOutput)
                });
            
                document.querySelector('.confermaCreaProductSystem').addEventListener('click',event =>{
                    event.preventDefault();
                    arrayInput.push(arrayFlowOutput);
                    const modalNuovoProductSystem = document.getElementById("modal");
                    modalNuovoProductSystem.innerHTML = '';
                    modalNuovoProductSystem.insertAdjacentHTML('beforeend',creaModalConfermaNuovoProductSystem());
                    const myModal = new bootstrap.Modal(document.getElementById('confermaCreaProductSystem'));
                    myModal.show();
            
                    document.querySelector('.creaProductSystem').addEventListener('click',async (event) =>{
                        event.preventDefault();
                        const modalNuovoProductSystem = document.getElementById("modal");
                        modalNuovoProductSystem.innerHTML = '';
                        modalNuovoProductSystem.insertAdjacentHTML('beforeend',creaModalNuovoProductFine());
                        const myModal = new bootstrap.Modal(document.getElementById('creaProductSystemFine'));
                        myModal.show();
                        let jsonProcess = await this.creaModalMessaggioConferma(vps,apiCalculation,arrayInput);
                        resolve(jsonProcess);
                    });
                
                });
            }catch{
                reject(error);
            }
        })

    }
    
    creaModalFlowOutput(){
    
        return new Promise((resolve, reject) => {
            try{
                document.getElementById("creaFlowOutput").addEventListener('change', event =>{
                    event.preventDefault();
                    const selectFlowType = document.getElementById("listaflow-type");
                    const selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                    const flowType = selectedOptionFlowType.id;
                    if(document.getElementById("nomeFlowOutput").value === "" ||  flowType === "selectedFlowType"){
                        document.querySelector('.creaFlowOutput').disabled = true;
                    }
                    else{
                        document.querySelector('.creaFlowOutput').disabled = false;
                    }
                });
        
                document.querySelector('.creaFlowOutput').addEventListener('click',async (event) =>{
                    event.preventDefault();
                    let nomeProductSystem = document.getElementById("nomeFlowOutput").value;
                    
                    const selectLocation = document.getElementById("listalocation");
                    const selectedOptionLocation = selectLocation.options[selectLocation.selectedIndex];
                    const idLocation = selectedOptionLocation.id;
                    const nomeLocation = selectedOptionLocation.value;
                    
                    const selectFlowType = document.getElementById("listaflow-type");
                    const selectedOptionFlowType = selectFlowType.options[selectFlowType.selectedIndex];
                    const flowType= selectedOptionFlowType.id;
                    
                    const selectCategory = document.getElementById("listacategory");
                    const selectedCategory = selectCategory.options[selectCategory.selectedIndex];
                    const idCategory = selectedCategory.id;
        
                    const selectFlowProperty = document.getElementById("listaflow-property");
                    const selectedOptionFlowProperty = selectFlowProperty.options[selectFlowProperty.selectedIndex];
                    const idFlowProperty = selectedOptionFlowProperty.id;
                    const nomeFlowProperty = selectedOptionFlowProperty.value;
        
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
            catch{
                reject(error);
            }

        });
        
    
    }
    
    creaModalMessaggioConferma = async(vps, apiCalculation, arrayInput) =>{
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
    
    getAll = async (vps,apiCalculation,type)  =>{
        const placeholder = document.getElementById(`selected${type}`);
        let lista = await apiCalculation.getAll(vps,type);
       
        if (lista.length == 0) {
            placeholder.innerHTML =  `Non ci sono ${type} selezionabili`;
        } else {
            const select = document.getElementById(`lista${type}`);
            placeholder.innerHTML =  `Seleziona una ${type}`;
            for (let i = 0; i < lista.length; i++) {
                let option = document.createElement("option");
                option.value = lista[i].name;
                option.text = lista[i].name;
                option.id = lista[i]["@id"];
                select.appendChild(option);
            }
        }
    }

    creaExchangesNuovoFlow(element,type,flow){
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
    
    creaExchanges(str,type){
    
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
    
    avanzamentoBarra = async(width) => {
        console.log("avanzamento "+width)
        let progressBar = document.getElementById('progressBar');
        return new Promise((resolve) => {
            setTimeout(function () {
                progressBar.style.width = width + '%';
                resolve();
            }, 1500);
        });
    }

    creaProductSystem = async(vps,apiCalculation,json)=>{

        let idProcess = await apiCalculation.putNuovoElement(vps, "process", json);
        let idProductSystem = await apiCalculation.nuovoProductSystem(vps,idProcess["@id"]);
        return idProductSystem;
    }

}

export{ProductSystem}