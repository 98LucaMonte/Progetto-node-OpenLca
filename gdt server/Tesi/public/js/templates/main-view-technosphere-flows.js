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
  
  function creaViewTableTotalityFactors() {
    return `
        <table class="table table-striped table-bordered table-scrollabile"">
            <thead>
                <tr>
                    <th scope="col">#5.5.5</th>
                    <th scope="col">Nome Provider</th>
                    <th scope="col">Categoria Provider</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria Flow</th>
                    <th scope="col">Quantità</th>
                </tr>
            </thead>
            <tbody id="datiTabellaTotalityFactors">
            </tbody>
        </table>  
    `;
  }
  
  function creaViewRowTotalityFactors(element,num){
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
                    <th scope="col">Unità di misura Flow</th>
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
                    <th scope="col">Unità di misura Flow</th>
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

  export { creaViewTableTotalRequirements,creaViewRowTotalRequirements,
    creaViewTableTechnosphereFlows, creaViewRowTechnosphereFlows,
    creaViewTableFinalDemand,creaViewRowFinalDemand,
    creaViewTabletotalRequirementsOfFlows,creaViewRowtotalRequirementsOfFlows,
    creaViewTableScalingFactors,creaViewRowScalingFactors,
    creaViewTableTotalityFactors,creaViewRowTotalityFactors,
    creaViewTableScaledTechFlowsOf,creaViewRowScaledTechFlowsOf,
    creaViewTableUnscaledTechFlowsOf,creaViewRowUnscaledTechFlowsOf};