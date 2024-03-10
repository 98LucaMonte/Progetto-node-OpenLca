import { EnviFlowData, ImpactCategoryData } from "../../model/types";

export function creaViewTableImpactCategoriesValue():string {
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

export function creaViewRowImpactCategoriesValue(element:ImpactCategoryData):string{
    let str:string = element.amount+"";
    return `
    <tr class="color-row-table">
        <td>${element.impactCategory.name}</td>
        <td>${parseFloat(str).toFixed(10)} ${element.impactCategory.refUnit}</td>
    </tr>
    `;
}

export function creaViewTableEnviFlowsOutputValue():string {
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

export function creaViewTableEnviFlowsInputValue():string {
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

export function creaViewRowEnviFlowsValue(element:EnviFlowData){
    let str:string = element.amount+"";

    return `
    <tr class="color-row-table">
        <td>${element.enviFlow.flow.name}</td>
        <td>${element.enviFlow.flow.category}</td>
        <td>${parseFloat(str).toFixed(10)} ${element.enviFlow.flow.refUnit}</td>         
    </tr>
    `;
}