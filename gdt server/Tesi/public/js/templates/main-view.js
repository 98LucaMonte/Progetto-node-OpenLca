"use-strict";

function creaViewMain() {
    return `
    <div class="container container-fluid mt-5">
    
      <div class="row">

        <h2>Benvenuto <br>Seleziona il Product System e l'Impact Method su cui vuoi eseguire il calcolo.</h2>
        
        <div class="col-sm-6 order-element0 mt-5">
            
            <p style="font-size:20px">Il Product System descrive l'intero processo di produzione e commercializzazione di un prodotto.</p>

            <p class="text-start"> <strong>Seleziona il Product System</strong></p>
            <select class="form-select" aria-label="Default select example" id="listaProductSystem">
            <option selected id="selectedProductSystem"></option>
            </select>
        </div>

        <div class="col-sm-6 order-element1 mt-5">
            
            <p style="font-size:20px">L'Impact Method descrive un metodo di valutazione dell'impatto da applicare al Product System.</p>

            <p class="text-start"> <strong>Seleziona l'Impact Method </strong></p>
            <select class="form-select" aria-label="Default select example" id="listaImpactMethod">
            <option selected id="selectedImpactMethod"></option>
            </select>
            <button type="button" class="btn btn-outline-primary" id="buttonCalcolaProductSystem">Calcola</button>

        </div>

        <div class="mt-3" id="risultatiRicerca">
          
        </div>

      </div>
    </div>
    `;
}

function creaViewMainRisultati() {
    return `
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Informazioni sul Product System</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="list-group list-group-flush">
          <a href="/" class="list-group-item list-group-item-action">Home</a>
          <a href="/totalRequirements" class="list-group-item list-group-item-action">Informazioni generali</a>
          <a href="/interventionFlows" class="list-group-item list-group-item-action">Risultati dell'inventario</a>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <p>La tabella mostra i requisiti totali dei flussi della tecnosfera necessari per soddisfare la domanda del product system calcolato.</p>
          <div class="table-responsive div-scrollabile" id="risultatiRicerca">
          
          </div>
        </div>
      </div>
    </div>
    `;
}

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

function creaViewMainRisultatiInterventionFlows() {
  return `
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Informazioni sul Product System</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="list-group list-group-flush">
        <a href="/" class="list-group-item list-group-item-action">Home</a>
        <a href="/totalRequirements" class="list-group-item list-group-item-action">Informazioni generali</a>
        <a href="/interventionFlows" class="list-group-item list-group-item-action">Risultati dell'inventario</a>
      </div>
    </div>
  </div>
  <div class="container mt-2 mb-5">
    <div class="row justify-content-center">
      <p style="text-align: center;">La tabella mostra i flussi che intervengono con il risultato.</p>
      <div class="col-md-10 mt-4">Input
        <div class="table-responsive div-scrollabile" id="risultatiRicercaInput01">
        
        </div>
      </div>
      <div class="col-md-10 mt-4">Output
        <div class="table-responsive div-scrollabile" id="risultatiRicercaOutput02">
        
        </div>
      </div>
    </div>
  </div>
  `;
}

function creaViewTableInterventionFlowsInput() {
  return `
      <table class="table table-striped table-bordered table-scrollabile">
          <thead>
              <tr>
                  <th scope="col">#</th>
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
                  <th scope="col">#</th>
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


export { creaViewMain, creaViewMainRisultati, creaViewTableTotalRequirements, creaViewRowTotalRequirements , creaViewMainRisultatiInterventionFlows , creaViewTableInterventionFlowsInput ,creaViewTableInterventionFlowsOutput, creaViewRowInterventionFlows };