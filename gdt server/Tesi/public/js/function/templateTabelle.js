export function creaViewTableImpactCategoriesValue() {
    return `
        <table data-bs-spy="scroll" class="table table-striped table-bordered table-scrollabile" id="tabella">
            <thead>
                <tr>
                    <th scope="col">Nome Impact</th>
                    <th scope="col">Quantità</th>
                </tr>
            </thead>
            <tbody id="datiTabella">
            </tbody>
        </table>
          
    `;
}

export function creaViewRowImpactCategoriesValue(element,num){
    return `
    <tr class="color-row-table">
        <td>${element.impactCategory.name}</td>
        <td>${element.amount} ${element.impactCategory.refUnit}</td>
    </tr>
    `;
}

export function creaViewTableEnviFlowsOutputValue() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabellaOutput">
            <thead>
                <tr>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Quantità</th>
                </tr>
            </thead>
            <tbody id="datiTabellaResultOutput">
            </tbody>
        </table>  
    `;
}

export function creaViewTableEnviFlowsInputValue() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabellaInput">
            <thead>
                <tr>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Quantità</th>
                </tr>
            </thead>
            <tbody id="datiTabellaResultInput">
            </tbody>
        </table>  
    `;
}

export function creaViewRowEnviFlowsValue(element,num,amount){
    return `
    <tr class="color-row-table">
        <td>${element.flow.name}</td>
        <td>${element.flow.category}</td>
        <td>${amount} ${element.flow.refUnit}</td>         
    </tr>
    `;
}

