function creaViewTableFinalDemand() {
    return `
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">#5.5.2</th>
                    <th scope="col">Nome Provider</th>
                    <th scope="col">Categoria Provider</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria Flow</th>
                    <th scope="col">Quantità</th>
                </tr>
            </thead>
            <tbody id="datiTabellaFinalDemand">
            </tbody>
        </table>  
    `;
}
  
function creaViewRowFinalDemand(element,num){
return `
<tr class="color-row-table">
    <th scope="row">${num}</th>
    <td>${element.techFlow.provider.name}</td>
    <td>${element.techFlow.provider.category}</td>      
    <td>${element.techFlow.flow.name}</td>
    <td>${element.techFlow.flow.category}</td>
    <td>${element.amount}</td>
</tr>
`;
}

function creaViewTableTechnosphereFlows() {
    return `
        <table class="table table-striped table-bordered table-scrollabile">
            <thead>
                <tr>
                    <th scope="col">#5.5</th>
                    <th scope="col">Nome Provider</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Unità</th>
                </tr>
            </thead>
            <tbody id="datiTabellaTechnosphereFlows">
            </tbody>
        </table>  
    `;
}
  
function creaViewRowTechnosphereFlows(element,num){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.provider.name}</td>
        <td>${element.flow.name}</td>
        <td>${element.flow.refUnit}</td>      
    </tr>
    `;
}

function creaViewTableInterventionFlowsInput() {
    return `
        <table class="table table-striped table-bordered table-scrollabile">
            <thead>
                <tr>
                    <th scope="col">#5.6</th>
                    <th scope="col">Input</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Unità di misura</th>
                </tr>
            </thead>
            <tbody id="datiTabellaInterventionFlowsInput">
            </tbody>
        </table>  
    `;
}
  
function creaViewTableInterventionFlowsOutput() {
    return `
        <table class="table table-striped table-bordered table-scrollabile">
            <thead>
                <tr>
                    <th scope="col">#5.6</th>
                    <th scope="col">Input</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Unità di misura</th>
                </tr>
            </thead>
            <tbody id="datiTabellaInterventionFlowsOutput">
            </tbody>
        </table>  
    `;
}
  
function creaViewRowInterventionFlows(element,num){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.isInput}</td>
        <td>${element.flow.name}</td>
        <td>${element.flow.category}</td> 
        <td>${element.flow.refUnit}</td>      
    </tr>
    `;
}
/*
function creaViewTableImpactCategories() {
    return `
        <table class="table table-striped table-bordered table-scrollabile"">
            <thead>
                <tr>
                    <th scope="col">#5.7</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Unità</th>
                </tr>
            </thead>
            <tbody id="datiTabellaImpactCategories">
            </tbody>
        </table>  
    `;
}
  
function creaViewRowImpactCategories(element,num){
return `
<tr class="color-row-table">
    <th scope="row">${num}</th>
    <td>${element.name}</td>
    <td>${element.category}</td>
    <td>${element.refUnit}</td>
</tr>
`;
}*/

import {creaViewTableTechFlow,creaViewRowTechFlow,creaViewTableTechFlowValue,creaViewRowTechFlowValue,
    creaViewTableEnviFlowsInputOutput,creaViewRowEnviInputOutput,creaViewTableEnviFlowsInputOutputValue,
    creaViewRowEnviInputOutputValue,creaViewTableImpactCategories,creaViewRowImpactCategories,
    creaViewTableImpactCategoriesValue,creaViewRowImpactCategoriesValue} from "./main-view-tabelle-row.js";

function isIterable(obj) {
    // Verifica se l'oggetto ha il metodo Symbol.iterator
    return obj !== null && typeof obj !== 'undefined' && typeof obj[Symbol.iterator] === 'function';
}

function creaTabellaTechnosphereFlows(listaTechnosphereFlows) {
    console.log("listaTechnosphereFlows");
    console.log(listaTechnosphereFlows);
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', `<h5 class="alert alert-secondary" role="alert">
    Tabella che rappresenta i techosphere flows (lista di flow e di provider) dato l'id del calcolo</h5>`);

    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableTechFlow());
    const tabellaRighe = document.getElementById("datiTabella");
    let num = 0;
    listaTechnosphereFlows.forEach(element => {
        num++;
        const riga = creaViewRowTechFlow(element, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    });

    
}

function creaTabellaFinalDemand(richiestaFinale) {
    console.log("richiestaFinale");
    console.log(richiestaFinale.techFlow);
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che rappresenta un singolo Tech Flow</h5>`);

    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableTechFlowValue());
    const tabellaRighe = document.getElementById("datiTabella");
    
    if(!isIterable(richiestaFinale)){
        let classeRimuovere = document.getElementById("tabella");
        classeRimuovere.classList.remove("table-scrollabile");
        const riga = creaViewRowTechFlowValue(richiestaFinale.techFlow, 1,richiestaFinale.amount);
        tabellaRighe.insertAdjacentHTML('beforeend', riga); 
    }

                               
}

function creaTabellaInterventionFlows(listaInterventionFlows) {
    console.log("creaTabellaInterventionFlows");
    console.log(listaInterventionFlows);

    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che rappresenta una lista di Flow indicando se sono input o output</h5>`);
    
    const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
    tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableInterventionFlowsInput());
    tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableInterventionFlowsOutput());

    const tabellaRigheInput = document.getElementById("datiTabellaInterventionFlowsInput");
    const tabellaRigheOutput = document.getElementById("datiTabellaInterventionFlowsOutput");

    let numInput = 0;
    let numOutput = 0;

    listaInterventionFlows.forEach(element => {

        if(element.isInput){
            numInput++;
            const riga = creaViewRowInterventionFlows(element, numInput);
            tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
        }
        else{
            numOutput++;
            const riga = creaViewRowInterventionFlows(element, numOutput);
            tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
        }
        
    });

            
}

function creaTabellaImpactCategories(listaImpactCategories)  {
    console.log("listaImpactCategories");
    console.log(listaImpactCategories);
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);

    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategories());
    const tabellaRighe = document.getElementById("datiTabellaImpactCategories");
    let num = 0;
    listaImpactCategories.forEach(element => {
        num++;
        const riga = creaViewRowImpactCategories(element, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    });

}

export{ creaTabellaTechnosphereFlows,creaTabellaFinalDemand,creaTabellaInterventionFlows,creaTabellaImpactCategories};
