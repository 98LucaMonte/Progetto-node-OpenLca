function creaViewTableTechFlow() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabella">
            <thead>
                <tr>
                    <th scope="col">#5.5</th>
                    <th scope="col">Categoria Provider</th>
                    <th scope="col">Nome Provider</th>
                    <th scope="col">Categoria Flow</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Unità Flow</th>
                </tr>
            </thead>
            <tbody id="datiTabella">
            </tbody>
        </table>  
    `;
}

function creaViewRowTechFlow(element,num){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.provider.category}</td>
        <td>${element.provider.name}</td>
        <td>${element.flow.category}</td>
        <td>${element.flow.name}</td>
        <td>${element.flow.refUnit}</td>      
    </tr>
    `;
}

function creaViewTableTechFlowValue() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabella">
            <thead>
                <tr>
                    <th scope="col">#5.5</th>
                    <th scope="col">Categoria Provider</th>
                    <th scope="col">Nome Provider</th>
                    <th scope="col">Categoria Flow</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità Flow</th>
                </tr>
            </thead>
            <tbody id="datiTabella">
            </tbody>
        </table>  
    `;
}

function creaViewRowTechFlowValue(element,num,amount){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.provider.category}</td>
        <td>${element.provider.name}</td>
        <td>${element.flow.category}</td>
        <td>${element.flow.name}</td>
        <td>${amount}</td>
        <td>${element.flow.refUnit}</td>      
    </tr>
    `;
}

function creaViewTableEnviFlowsInputOutput() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabella">
            <thead>
                <tr>
                    <th scope="col">#5.6</th>
                    <th scope="col">Input</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Unità di misura</th>
                </tr>
            </thead>
            <tbody id="datiTabella">
            </tbody>
        </table>  
    `;
}

function creaViewRowEnviInputOutput(element,num){
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

function creaViewTableEnviFlowsInputOutputValue() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabella">
            <thead>
                <tr>
                    <th scope="col">#5.6</th>
                    <th scope="col">Input</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità di misura</th>
                </tr>
            </thead>
            <tbody id="datiTabella">
            </tbody>
        </table>  
    `;
}

function creaViewRowEnviInputOutputValue(element,num){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.isInput}</td>
        <td>${element.flow.name}</td>
        <td>${element.flow.category}</td>
        <td>${element.amount}</td>         
        <td>${element.flow.refUnit}</td>      
    </tr>
    `;
}

function creaViewTableImpactCategories() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabella">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome Impact</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Unità</th>
                </tr>
            </thead>
            <tbody id="datiTabella">
            </tbody>
        </table>  
    `;
}
  
function creaViewRowImpactCategories(element,num){
return `
<tr class="color-row-table">
    <th scope="row">${num}</th>
    <td>${element.impactCategory.name}</td>
    <td>${element.impactCategory.category}</td>
    <td>${element.impactCategory.refUnit}</td>
</tr>
`;
}

function creaViewTableImpactCategoriesValue() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabella">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome Impact</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità</th>
                </tr>
            </thead>
            <tbody id="datiTabella">
            </tbody>
        </table>  
    `;
}
  
function creaViewRowImpactCategoriesValue(element,num){
return `
<tr class="color-row-table">
    <th scope="row">${num}</th>
    <td>${element.impactCategory.name}</td>
    <td>${element.impactCategory.category}</td>
    <td>${element.amount}</td>
    <td>${element.impactCategory.refUnit}</td>
</tr>
`;
}

export {creaViewTableTechFlow,creaViewRowTechFlow,creaViewTableTechFlowValue,creaViewRowTechFlowValue,
        creaViewTableEnviFlowsInputOutput,creaViewRowEnviInputOutput,creaViewTableEnviFlowsInputOutputValue,
        creaViewRowEnviInputOutputValue,creaViewTableImpactCategories,creaViewRowImpactCategories,
        creaViewTableImpactCategoriesValue,creaViewRowImpactCategoriesValue};