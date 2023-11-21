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
          <a href="/technosphereFlows" class="list-group-item list-group-item-action">5.5 Technosphere Flows</a>
          <a href="/finalDemand" class="list-group-item list-group-item-action">5.5.1 The final Demand</a>
          <a href="/totalRequirements" class="list-group-item list-group-item-action">5.5.2 Total Requirements</a>
          <a href="/totalRequirementsOfFlows" class="list-group-item list-group-item-action">Total Requirements Of Flows</a>
          <a href="/scalingFactors" class="list-group-item list-group-item-action">5.5.4 Scaling factors</a>
          <a href="/scaledTechFlowsOf" class="list-group-item list-group-item-action">Scaled Requirements</a>
          <a href="/unscaledTechFlowsOf" class="list-group-item list-group-item-action">Unscaled Requirements</a>
          <a href="/interventionFlows" class="list-group-item list-group-item-action">5.6 Intervention Flows</a>
          <a href="/inventoryResult" class="list-group-item list-group-item-action">5.6.1 Inventory Result</a>
          <a href="/impactCategories" class="list-group-item list-group-item-action">5.7 impact Categories</a>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="table-responsive div-scrollabile" id="risultatiRicerca">
          
          </div>
        </div>
      </div>
    </div>
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
        <a href="/technosphereFlows" class="list-group-item list-group-item-action">5.5 Technosphere Flows</a>
        <a href="/finalDemand" class="list-group-item list-group-item-action">5.5.1 The final Demand</a>
        <a href="/totalRequirements" class="list-group-item list-group-item-action">5.5.2 Total Requirements</a>
        <a href="/totalRequirementsOfFlows" class="list-group-item list-group-item-action">Total Requirements Of Flows</a>
        <a href="/scalingFactors" class="list-group-item list-group-item-action">5.5.4 Scaling factors</a>
        <a href="/scaledTechFlowsOf" class="list-group-item list-group-item-action">Scaled Requirements</a>
        <a href="/unscaledTechFlowsOf" class="list-group-item list-group-item-action">Unscaled Requirements</a>        
        <a href="/interventionFlows" class="list-group-item list-group-item-action">5.6 Intervention Flows</a>
        <a href="/inventoryResult" class="list-group-item list-group-item-action">5.6.1 Inventory Result</a>
        <a href="/impactCategories" class="list-group-item list-group-item-action">5.7 impact Categories</a>
      </div>
    </div>
  </div>
  <div class="container mt-2 mb-5">
    <div class="row justify-content-center">
      
      <div class="col-md-10 mt-4"><p><strong>Input</strong></p>
        <div class="table-responsive div-scrollabile" id="risultatiRicercaInput01">
        
        </div>
      </div>
      <div class="col-md-10 mt-4"><p><strong>Output</strong></p>
        <div class="table-responsive div-scrollabile" id="risultatiRicercaOutput02">
        
        </div>
      </div>
    </div>
  </div>
  `;
}

export { creaViewMain, creaViewMainRisultati, creaViewMainRisultatiInterventionFlows};