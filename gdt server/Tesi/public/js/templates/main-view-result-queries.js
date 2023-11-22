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
}

export { creaViewTableFinalDemand,creaViewRowFinalDemand,
         creaViewTableTechnosphereFlows,creaViewRowTechnosphereFlows,
         creaViewTableInterventionFlowsInput,creaViewTableInterventionFlowsOutput,creaViewRowInterventionFlows,
         creaViewTableImpactCategories, creaViewRowImpactCategories};