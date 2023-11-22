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





export {creaViewTableInventoryResultInput , creaViewTableInventoryResultOutput, creaViewRowInventoryResult};