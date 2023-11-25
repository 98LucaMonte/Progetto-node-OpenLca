function creaViewTableTotalRequirements() {
    return `
        <table class="table table-striped table-bordered table-scrollabile">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome Provider</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità di misura</th>
                </tr>
            </thead>
            <tbody id="datiTabellaTotalRequirements">
            </tbody>
        </table>  
    `;
}

function creaViewRowTotalRequirements(element,num){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.techFlow.provider.name}</td>
        <td>${element.techFlow.flow.name}</td>
        <td>${element.amount}</td> 
        <td>${element.techFlow.flow.refUnit}</td>      
    </tr>
    `;
}

function creaViewTabletotalRequirementsOfFlows() {
    return `
        <table class="table table-striped table-bordered"">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome Provider</th>
                    <th scope="col">Categoria Provider</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria Flow</th>
                    <th scope="col">Quantità</th>
                </tr>
            </thead>
            <tbody id="datiTabellatotalRequirementsOfFlows">
            </tbody>
        </table>  
    `;
  }
  
function creaViewRowtotalRequirementsOfFlows(element,num){
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

function creaViewTableScalingFactors() {
return `
    <table class="table table-striped table-bordered table-scrollabile"">
        <thead>
            <tr>
                <th scope="col">#5.5.4</th>
                <th scope="col">Nome Provider</th>
                <th scope="col">Categoria Provider</th>
                <th scope="col">Nome Flow</th>
                <th scope="col">Categoria Flow</th>
                <th scope="col">Quantità</th>
            </tr>
        </thead>
        <tbody id="datiTabellaScalingFactors">
        </tbody>
    </table>  
`;
}

function creaViewRowScalingFactors(element,num){
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

function creaViewTableScaledTechFlowsOf() {
return `
    <table class="table table-striped table-bordered table-scrollabile"">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nome Provider</th>
                <th scope="col">Categoria Provider</th>
                <th scope="col">Nome Flow</th>
                <th scope="col">Categoria Flow</th>
                <th scope="col">Unità di misura</th>
                <th scope="col">Quantità</th>
            </tr>
        </thead>
        <tbody id="datiTabellaScaledTechFlowsOf">
        </tbody>
    </table>  
`;
}

function creaViewRowScaledTechFlowsOf(element,num){
return `
<tr class="color-row-table">
    <th scope="row">${num}</th>
    <td>${element.techFlow.provider.name}</td>
    <td>${element.techFlow.provider.category}</td>      
    <td>${element.techFlow.flow.name}</td>
    <td>${element.techFlow.flow.category}</td>
    <td>${element.techFlow.flow.refUnit}</td>
    <td>${element.amount}</td>
</tr>
`;
}

function creaViewTableUnscaledTechFlowsOf() {
return `
    <table class="table table-striped table-bordered table-scrollabile"">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nome Provider</th>
                <th scope="col">Categoria Provider</th>
                <th scope="col">Nome Flow</th>
                <th scope="col">Categoria Flow</th>
                <th scope="col">Unità di misura</th>
                <th scope="col">Quantità</th>
            </tr>
        </thead>
        <tbody id="datiTabellaUnscaledTechFlowsOf">
        </tbody>
    </table>  
`;
}

function creaViewRowUnscaledTechFlowsOf(element,num){
return `
<tr class="color-row-table">
    <th scope="row">${num}</th>
    <td>${element.techFlow.provider.name}</td>
    <td>${element.techFlow.provider.category}</td>      
    <td>${element.techFlow.flow.name}</td>
    <td>${element.techFlow.flow.category}</td>
    <td>${element.techFlow.flow.refUnit}</td>
    <td>${element.amount}</td>
</tr>
`;
}

function creaTabellaTotalRequirements(listaTotalRequirements) {
    console.log("creaTabellaTotalRequirements");
    console.log(listaTotalRequirements);
    
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', `<h5 class="alert alert-secondary" role="alert">
    Tabella che rappresenta i total requirements (lista di techFlowValue)</h5>`);

    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableTotalRequirements());
    const tabellaRighe = document.getElementById("datiTabellaTotalRequirements");
    let num = 0;
    listaTotalRequirements.forEach(element => {
        num++;
        const riga = creaViewRowTotalRequirements(element, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    });

}

function creaTabellatotalRequirementsOfFlows(listatotalRequirementsOfFlows){
    console.log("listatotalRequirementsOfFlows");
    console.log(listatotalRequirementsOfFlows);
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che rappresenta un singolo Tech Flow</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.innerHTML = '';
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTabletotalRequirementsOfFlows());
    const tabellaRighe = document.getElementById("datiTabellatotalRequirementsOfFlows");
    const riga = creaViewRowtotalRequirementsOfFlows(listatotalRequirementsOfFlows, 1);
    tabellaRighe.insertAdjacentHTML('beforeend', riga);
}

function creaTabellaScalingFactors(listaScalingFactors){
    console.log("listaScalingFactors");
    console.log(listaScalingFactors);
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che rappresenta i scaling factors (lista di techFlowValue)</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableScalingFactors());
    const tabellaRighe = document.getElementById("datiTabellaScalingFactors");
    let num = 0;
    listaScalingFactors.forEach(element => {
        num++;
        const riga = creaViewRowScalingFactors(element, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    });
   
}

function creaTabellaScaledTechFlowsOf(listaScaledTechFlowsOf){
    console.log("listaScaledTechFlowsOf");
    console.log(listaScaledTechFlowsOf);
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che rappresenta una lista di tech flows (lista di techFlowValue)</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.innerHTML = '';
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableScaledTechFlowsOf());
    const tabellaRighe = document.getElementById("datiTabellaScaledTechFlowsOf");
    let num = 0;
    listaScaledTechFlowsOf.forEach(element => {
        num++;
        const riga = creaViewRowScaledTechFlowsOf(element, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    });
}

function creaTabellaUnscaledTechFlowsOf(listaUnscaledTechFlowsOf) {
    console.log("listaUnscaledTechFlowsOf");
    console.log(listaUnscaledTechFlowsOf);
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che rappresenta una lista di tech flows (lista di techFlowValue)</h5>`);
    
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.innerHTML = '';
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableUnscaledTechFlowsOf());
    const tabellaRighe = document.getElementById("datiTabellaUnscaledTechFlowsOf");
    let num = 0;
    listaUnscaledTechFlowsOf.forEach(element => {
        num++;
        const riga = creaViewRowUnscaledTechFlowsOf(element, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    });

}

export {creaTabellaTotalRequirements,creaTabellatotalRequirementsOfFlows,
    creaTabellaScalingFactors,creaTabellaScaledTechFlowsOf,creaTabellaUnscaledTechFlowsOf};
