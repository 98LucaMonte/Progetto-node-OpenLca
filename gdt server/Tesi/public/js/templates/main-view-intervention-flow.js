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

export {creaViewTableInterventionFlowsInput ,creaViewTableInterventionFlowsOutput, creaViewRowInterventionFlows,
        creaViewTableInventoryResultInput , creaViewTableInventoryResultOutput, creaViewRowInventoryResult};