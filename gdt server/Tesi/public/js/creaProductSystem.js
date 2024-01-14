import  {   creaModalInserisciInput,creaModalInserisciOutput,
            getFlow,creaModalNuovoFlowInput,creaModalNuovoFlowOutput,
            creaModalConfermaNuovoProductSystem,creaModalNuovoProductFine}from "./templates/modal-view.js";

async function getAll(vps,apiCalculation,type){
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

async function creaProductSystem(vps,apiCalculation,arrayInput){
    getAll(vps,apiCalculation,"location");

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
        
        let idProductSystem = await creaProductSystemFlowInput(vps,apiCalculation,arrayInput);
        return idProductSystem;
    });
    
}

async function creaProductSystemFlowInput(vps,apiCalculation,arrayInput){ 

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
        await getAll(vps,apiCalculation,"location");
        await getAll(vps,apiCalculation,"category");
        await getAll(vps,apiCalculation,"flow-property");

        let jsonNuovoFlow = await creaFlowInput();
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
        let idProductSystem = await creaProductSystemFlowOutput(vps,apiCalculation,arrayInput);
        return idProductSystem;
    });

}

async function creaFlowInput(){

    return new Promise((resolve, reject) => {

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
    });
    
}

async function creaProductSystemFlowOutput(vps,apiCalculation,arrayInput) {

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
        await getAll(vps,apiCalculation,"location");
        await getAll(vps,apiCalculation,"category");
        await getAll(vps,apiCalculation,"flow-property");
        //raccogliere l'id del flow input creato
        let jsonNuovoFlow = await creaFlowOutput();
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
            let idProductSystem = await creaProductSystemFine(vps,apiCalculation,arrayInput);
            return idProductSystem;
        });
    
    });

}

async function creaFlowOutput(){

    return new Promise((resolve, reject) => {

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
    });
    

}

async function creaProductSystemFine(vps,apiCalculation,arrayInput){
     
    let data = new Date();
    let dataFormattata = data.toISOString();
    let arrayFlowInput = arrayInput[3];
    let arrayFlowOutput = arrayInput[4];
    let exchanges = [];

    for(let i=0;i<arrayFlowInput.length;i++){
        if (typeof arrayFlowInput[i] === 'string'){
            exchanges.push(creaExchanges(arrayFlowInput[i],true));
        }
        else{
            let nuovoFlow = await apiCalculation.putNuovoElement(vps,"flow",arrayFlowInput[i]);
            console.log(nuovoFlow);
            exchanges.push(creaExchangesNuovoFlow(arrayFlowInput[i],true,nuovoFlow));
        }
    }

    await avanzamentoBarra("25");

    for(let i=0;i<arrayFlowOutput.length;i++){
        if (typeof arrayFlowOutput[i] === 'string'){
            exchanges.push(creaExchanges(arrayFlowOutput[i],false));
        }
        else{
            let nuovoFlow = await apiCalculation.putNuovoElement(vps,"flow",arrayFlowOutput[i]);
            console.log(nuovoFlow);
            exchanges.push(creaExchangesNuovoFlow(arrayFlowOutput[i],false,nuovoFlow));
        }
    }

    await avanzamentoBarra("50");


    let json = {
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
        "exchanges": [exchanges]
    }
      
    console.log(exchanges);

    let idProcess = await apiCalculation.putNuovoElement(vps,"process",json);
    await avanzamentoBarra("75");
    console.log(idProcess)
    let idProductSystem = await apiCalculation.nuovoProductSystem(vps,idProcess["@id"]);
    console.log(idProductSystem)

    await avanzamentoBarra("100");

    return idProductSystem;

}

function creaExchangesNuovoFlow(element,type,flow){
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

function creaExchanges(str,type){

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

async function avanzamentoBarra(width) {
    console.log("avanzamento "+width)
    let progressBar = document.getElementById('progressBar');
    return new Promise((resolve) => {
        setTimeout(function () {
            progressBar.style.width = width + '%';
            resolve();
        }, 1500);
    });
}

export{creaProductSystem}