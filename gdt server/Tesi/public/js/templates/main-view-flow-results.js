function creaViewTableInventoryResultInput() {
    return `
        <table class="table table-striped table-bordered table-scrollabile">
            <thead>
                <tr>
                    <th scope="col">#5.6.1</th>
                    <th scope="col">Input</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità di misura</th>
                </tr>
            </thead>
            <tbody id="datiTabellaInventoryResultInput">
            </tbody>
        </table>  
    `;
}
  
function creaViewTableInventoryResultOutput() {
    return `
        <table class="table table-striped table-bordered table-scrollabile">
            <thead>
                <tr>
                    <th scope="col">#5.6.1</th>
                    <th scope="col">Input</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità di misura</th>
                </tr>
            </thead>
            <tbody id="datiTabellaInventoryResultOutput">
            </tbody>
        </table>  
    `;
}
  
function creaViewRowInventoryResult(element,num){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.enviFlow.isInput}</td>
        <td>${element.enviFlow.flow.name}</td>
        <td>${element.enviFlow.flow.category}</td> 
        <td>${element.amount}</td> 
        <td>${element.enviFlow.flow.refUnit}</td>      
    </tr>
    `;
}

function creaViewRowFlowContributionsOf(element,num){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.techFlow.provider.name}</td>
        <td>${element.techFlow.flow.name}</td>
        <td>${element.techFlow.flow.category}</td>
        <td>${element.amount}</td> 
        <td>${element.techFlow.flow.refUnit}</td>      
    </tr>
    `;
}

function creaViewTableFlowContributionsOf() {
    return `
        <table class="table table-striped table-bordered table-scrollabile">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Input</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità di misura</th>
                </tr>
            </thead>
            <tbody id="datiTabellaInventoryResultInput">
            </tbody>
        </table>  
    `;
}
  
function creaTabellaInventoryResult(listaInventoryResult){
    console.log("creaTabellaInventoryResult");
    console.log(listaInventoryResult);
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di envi flow value</h5>`);

    const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
    tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableInventoryResultInput());
    tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableInventoryResultOutput());

    const tabellaRigheInput = document.getElementById("datiTabellaInventoryResultInput");
    const tabellaRigheOutput = document.getElementById("datiTabellaInventoryResultOutput");
    
    let numInput = 0;
    let numOutput = 0;

    listaInventoryResult.forEach(element => {

        if(element.enviFlow.isInput){
            numInput++;
            const riga = creaViewRowInventoryResult(element, numInput);
            tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
        }
        else{
            numOutput++;
            const riga = creaViewRowInventoryResult(element, numOutput);
            tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
        }
        
    });    
}

function isIterable(obj) {
    // Verifica se l'oggetto ha il metodo Symbol.iterator
    return obj !== null && typeof obj !== 'undefined' && typeof obj[Symbol.iterator] === 'function';
}

function creaTabellaTotalFlowValueOf(listaEnviFlow){
    console.log("listaTotalFlowValueOf");
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di envi flow value</h5>`);
    const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    tabellaRisultatiRicercaInput.innerHTML = '';
    const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
    tabellaRisultatiRicercaOutput.innerHTML = '';
    tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableInventoryResultInput());
    tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableInventoryResultOutput());

    const tabellaRigheInput = document.getElementById("datiTabellaInventoryResultInput");
    const tabellaRigheOutput = document.getElementById("datiTabellaInventoryResultOutput");
    
    let numInput = 0;
    let numOutput = 0;
    
    if(!isIterable(listaEnviFlow)){

        if(listaEnviFlow.enviFlow.isInput){
            numInput++;
            const riga = creaViewRowInventoryResult(listaEnviFlow, numInput);
            tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
        }
        else{
            numOutput++;
            const riga = creaViewRowInventoryResult(listaEnviFlow, numOutput);
            tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
        } 
    }
    else{
        for(let element of listaEnviFlow){
            
            if(element.enviFlow.isInput){
                numInput++;
                const riga = creaViewRowInventoryResult(element, numInput);
                tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
            }
            else{
                numOutput++;
                const riga = creaViewRowInventoryResult(element, numOutput);
                tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
            }
        }
    }
    
    if(numInput === 0){
        tabellaRisultatiRicercaInput.innerHTML="";
        tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di input</p>`);
    }
    if(numOutput === 0){
        tabellaRisultatiRicercaOutput.innerHTML="";
        tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di output</p>`) 
    }

}

function creaTabellaFlowContributionsOf(listaEnviFlow){
    console.log("creaTabellaFlowContributionsOf");
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di Tech Flow value</h5>`);
  
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableFlowContributionsOf());

    const tabellaRighe = document.getElementById("datiTabellaInventoryResultInput");
    
    let num = 0;

    if(!isIterable(listaEnviFlow)){
        num++;
        const riga = creaViewRowFlowContributionsOf(listaEnviFlow, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    }
    else{
        for(let element of listaEnviFlow){
            num++;
            const riga = creaViewRowFlowContributionsOf(element, num);
            tabellaRighe.insertAdjacentHTML('beforeend', riga);
        }
    }
    
    if(num === 0){
        tabellaRisultatiRicerca.innerHTML="";
        tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di input</p>`);
    }
   
}

function creaTabellaDirectInterventionsOf(listaDirectInterventionsOf){
    console.log("listaDirectInterventionsOf");
    console.log(listaDirectInterventionsOf);
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di envi flow value</h5>`);
  
    const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
    tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableInventoryResultInput());
    tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableInventoryResultOutput());

    const tabellaRigheInput = document.getElementById("datiTabellaInventoryResultInput");
    const tabellaRigheOutput = document.getElementById("datiTabellaInventoryResultOutput");

    let numInput = 0;
    let numOutput = 0;

    listaDirectInterventionsOf.forEach(element => {

        if(element.enviFlow.isInput){
            numInput++;
            const riga = creaViewRowInventoryResult(element, numInput);
            tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
        }
        else{
            numOutput++;
            const riga = creaViewRowInventoryResult(element, numOutput);
            tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
        }
        
    });

}

function creaTabellaDirectInterventionsOfEnviFlowTechFlow(enviFlowValue){
    console.log("listaDirectInterventionsOfEnviFlowTechFlow");
    console.log(enviFlowValue);

    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di envi flow value</h5>`);
  
    const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    tabellaRisultatiRicercaInput.innerHTML = '';
    const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
    tabellaRisultatiRicercaOutput.innerHTML = '';
    tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableInventoryResultInput());
    tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableInventoryResultOutput());

    const tabellaRigheInput = document.getElementById("datiTabellaInventoryResultInput");
    const tabellaRigheOutput = document.getElementById("datiTabellaInventoryResultOutput");

    let numInput = 0;
    let numOutput = 0;
    
    if(enviFlowValue.enviFlow.isInput){
        numInput++;
        const riga = creaViewRowInventoryResult(enviFlowValue, numInput);
        tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
    }
    else{
        numOutput++;
        const riga = creaViewRowInventoryResult(enviFlowValue, numOutput);
        tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
    }
    
    if(numInput === 0){
        tabellaRisultatiRicercaInput.innerHTML="";
        tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di input</p>`);
    }
    if(numOutput === 0){
        tabellaRisultatiRicercaOutput.innerHTML="";
        tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di output</p>`) 
    }
}

function creaTabellaFlowIntesitiesOf(listaFlowIntesitiesOf){
    console.log("listaFlowIntesitiesOf");
    console.log(listaFlowIntesitiesOf);
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Lista di enviflowValue dato un tech flow</h5>`);
  
    const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    tabellaRisultatiRicercaInput.innerHTML = '';
    const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
    tabellaRisultatiRicercaOutput.innerHTML = '';
    tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableInventoryResultInput());
    tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableInventoryResultOutput());

    const tabellaRigheInput = document.getElementById("datiTabellaInventoryResultInput");
    const tabellaRigheOutput = document.getElementById("datiTabellaInventoryResultOutput");

    let numInput = 0;
    let numOutput = 0;

    listaFlowIntesitiesOf.forEach(element => {

        if(element.enviFlow.isInput){
            numInput++;
            const riga = creaViewRowInventoryResult(element, numInput);
            tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
        }
        else{
            numOutput++;
            const riga = creaViewRowInventoryResult(element, numOutput);
            tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
        }
        
    });

    if(numInput === 0){
        tabellaRisultatiRicercaInput.innerHTML="";
        tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di input</p>`);
    }
    if(numOutput === 0){
        tabellaRisultatiRicercaOutput.innerHTML="";
        tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di output</p>`) 
    }

}

function creaTabellaFlowIntesitiesOfEnviFlowTechFlow(listaFlowIntesitiesOf){
    console.log("TabellaFlowIntesitiesOfEnviFlowTechFlow");
    console.log(listaFlowIntesitiesOf);
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Lista di enviflowValue dato un tech flow</h5>`);
  
    const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    tabellaRisultatiRicercaInput.innerHTML = '';
    const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
    tabellaRisultatiRicercaOutput.innerHTML = '';
    tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableInventoryResultInput());
    tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableInventoryResultOutput());

    const tabellaRigheInput = document.getElementById("datiTabellaInventoryResultInput");
    const tabellaRigheOutput = document.getElementById("datiTabellaInventoryResultOutput");

    let numInput = 0;
    let numOutput = 0;

    if(isIterable(listaFlowIntesitiesOf)){
        listaFlowIntesitiesOf.forEach(element => {

            if(element.enviFlow.isInput){
                numInput++;
                const riga = creaViewRowInventoryResult(element, numInput);
                tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
            }
            else{
                numOutput++;
                const riga = creaViewRowInventoryResult(element, numOutput);
                tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
            }
            
        });
    }
    else{
        if(listaFlowIntesitiesOf.enviFlow.isInput){
            numInput++;
            const riga = creaViewRowInventoryResult(listaFlowIntesitiesOf, numInput);
            tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
        }
        else{
            numOutput++;
            const riga = creaViewRowInventoryResult(listaFlowIntesitiesOf, numOutput);
            tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
        }
    }

    if(numInput === 0){
        tabellaRisultatiRicercaInput.innerHTML="";
        tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di input</p>`);
    }
    if(numOutput === 0){
        tabellaRisultatiRicercaOutput.innerHTML="";
        tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di output</p>`) 
    }

}


export {creaTabellaInventoryResult, creaTabellaTotalFlowValueOf, creaTabellaFlowContributionsOf, 
        creaTabellaDirectInterventionsOf, creaTabellaDirectInterventionsOfEnviFlowTechFlow,
        creaTabellaFlowIntesitiesOf,creaTabellaFlowIntesitiesOfEnviFlowTechFlow};