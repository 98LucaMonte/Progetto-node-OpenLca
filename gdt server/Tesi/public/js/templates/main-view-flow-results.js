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

async function creaTabellaTotalFlowValueOf(vps,idCalcolo,apiFlowResults){
    console.log("listaTotalFlowValueOf");
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di envi flow value</h5>`);
    const listaInventoryResult = await apiFlowResults.getInventoryResult(vps,idCalcolo);
    const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
    tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableInventoryResultInput());
    tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableInventoryResultOutput());

    const tabellaRigheInput = document.getElementById("datiTabellaInventoryResultInput");
    const tabellaRigheOutput = document.getElementById("datiTabellaInventoryResultOutput");
    
    let numInput = 0;
    let numOutput = 0;

    for(let enviFlow of listaInventoryResult){
        console.log(enviFlow);
        const element = await apiFlowResults.getTotalFlowValueOf(vps, idCalcolo,enviFlow); 
        console.log(element); 
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

async function creaTabellaFlowContributionsOf(vps,idCalcolo,apiFlowResults){
    console.log("creaTabellaFlowContributionsOf");
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di envi flow value</h5>`);
  
    const listaInventoryResult = await apiFlowResults.getInventoryResult(vps,idCalcolo);
    const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableFlowContributionsOf());

    const tabellaRigheInput = document.getElementById("datiTabellaInventoryResultInput");
    
    let num=0;

    for(let enviFlow of listaInventoryResult){
        console.log(enviFlow);
        const element = await apiFlowResults.getFlowContributionsOf(vps, idCalcolo,enviFlow);  
        console.log(element); 
        num++;
        const riga = creaViewRowInventoryResult(element, num);
        tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
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

async function creaTabellaDirectInterventionsOfEnviFlowTechFlow(listaInventoryResult,techFlow,apiFlowResults,vps,idCalcolo){
    console.log("listaDirectInterventionsOfEnviFlowTechFlow");
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

    for(let element of listaInventoryResult){
        const enviFlowValue = await apiFlowResults.getDirectInterventionsOfEnviFlowTechFlow(vps, idCalcolo,element,techFlow.techFlow);

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
    const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
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

}

export {creaTabellaInventoryResult, creaTabellaTotalFlowValueOf, creaTabellaFlowContributionsOf, 
        creaTabellaDirectInterventionsOf, creaTabellaDirectInterventionsOfEnviFlowTechFlow,creaTabellaFlowIntesitiesOf};