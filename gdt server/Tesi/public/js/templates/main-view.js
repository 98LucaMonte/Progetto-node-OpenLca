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
          <a href="/resultQueries/technosphereFlows" class="list-group-item list-group-item-action">5.5 Technosphere Flows</a>
          <a href="/resultQueries/finalDemand" class="list-group-item list-group-item-action">5.5.1 The final Demand</a>
          <a href="/resultQueries/interventionFlows" class="list-group-item list-group-item-action">5.6 Intervention Flows</a>
          <a href="/resultQueries/impactCategories" class="list-group-item list-group-item-action">5.7 impact Categories</a>
          <a href="/technosphereFlows/totalRequirements" class="list-group-item list-group-item-action">5.5.2 Total Requirements</a>
          <a href="/technosphereFlows/totalRequirementsOfFlows" class="list-group-item list-group-item-action">Total Requirements Of Flows</a>
          <a href="/technosphereFlows/scalingFactors" class="list-group-item list-group-item-action">5.5.4 Scaling factors</a>
          <a href="/technosphereFlows/scaledTechFlowsOf" class="list-group-item list-group-item-action">Scaled Requirements</a>
          <a href="/technosphereFlows/unscaledTechFlowsOf" class="list-group-item list-group-item-action">Unscaled Requirements</a>
          <a href="/flowResults/inventoryResult" class="list-group-item list-group-item-action">5.6.1 Inventory Result</a>
          <a href="/flowResults/totalFlowValueOf" class="list-group-item list-group-item-action">Total Flow Value Of</a>
          <a href="/flowResults/flowContributionsOf" class="list-group-item list-group-item-action">Flow Contributions Of</a>
          <a href="/flowResults/directInterventionsOf" class="list-group-item list-group-item-action">Direct Interventions Of</a>
          <a href="/flowResults/directInterventionsOfEnviFlowTechFlow" class="list-group-item list-group-item-action">Direct Interventions Of EnviFlow TechFlow</a>
          <a href="/flowResults/flowIntensitiesOf" class="list-group-item list-group-item-action">Flow IntensitiesOf</a>        
          <a href="/flowResults/flowIntensityOfEnviFlowTechFlow" class="list-group-item list-group-item-action">Flow Intensity Of Envi Flow Tech Flow</a>        
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div id="informazioniDati"> </div>
          <div class="table-responsive div-scrollabile" id="risultatiRicerca">
          
          </div>
        </div>
      </div>
    </div>
    `;
}

function creaViewMainRisultatiDoppioInput(){
  return `<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Informazioni sul Product System</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="list-group list-group-flush">
          <a href="/" class="list-group-item list-group-item-action">Home</a>
          <a href="/resultQueries/technosphereFlows" class="list-group-item list-group-item-action">5.5 Technosphere Flows</a>
          <a href="/resultQueries/finalDemand" class="list-group-item list-group-item-action">5.5.1 The final Demand</a>
          <a href="/resultQueries/interventionFlows" class="list-group-item list-group-item-action">5.6 Intervention Flows</a>
          <a href="/resultQueries/impactCategories" class="list-group-item list-group-item-action">5.7 impact Categories</a>
          <a href="/technosphereFlows/totalRequirements" class="list-group-item list-group-item-action">5.5.2 Total Requirements</a>
          <a href="/technosphereFlows/totalRequirementsOfFlows" class="list-group-item list-group-item-action">Total Requirements Of Flows</a>
          <a href="/technosphereFlows/scalingFactors" class="list-group-item list-group-item-action">5.5.4 Scaling factors</a>
          <a href="/technosphereFlows/scaledTechFlowsOf" class="list-group-item list-group-item-action">Scaled Requirements</a>
          <a href="/technosphereFlows/unscaledTechFlowsOf" class="list-group-item list-group-item-action">Unscaled Requirements</a>
          <a href="/flowResults/inventoryResult" class="list-group-item list-group-item-action">5.6.1 Inventory Result</a>
          <a href="/flowResults/totalFlowValueOf" class="list-group-item list-group-item-action">Total Flow Value Of</a>
          <a href="/flowResults/flowContributionsOf" class="list-group-item list-group-item-action">Flow Contributions Of</a>
          <a href="/flowResults/directInterventionsOf" class="list-group-item list-group-item-action">Direct Interventions Of</a>
          <a href="/flowResults/directInterventionsOfEnviFlowTechFlow" class="list-group-item list-group-item-action">Direct Interventions Of EnviFlow TechFlow</a>
          <a href="/flowResults/flowIntensitiesOf" class="list-group-item list-group-item-action">Flow IntensitiesOf</a>        
          <a href="/flowResults/flowIntensityOfEnviFlowTechFlow" class="list-group-item list-group-item-action">Flow Intensity Of Envi Flow Tech Flow</a>        

        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-sm-2"></div>
        <div class="col-sm-4">
          <p><strong>Seleziona il TechFlow</strong></p>
          <select class="form-select form-select-sm" aria-label="Small select example" id="listaInput01">
            <option selected id="selectedInput01"></option>
          </select>
          <button type="button" class="btn btn-outline-primary" id="button">Mostra</button>
        </div>
        <div class="col-sm-4">
          <p><strong>Seleziona l'EnviFlow</strong></p>
          <select class="form-select form-select-sm" aria-label="Small select example" id="listaInput02">
            <option selected id="selectedInput02">Open this select menu</option>
          </select>
        </div>
        <div class="col-sm-2"> </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-md-10 mb-5">
          <div id="informazioniDati"></div>    
          <div class="table-responsive div-scrollabile" id="risultatiRicerca">
      
          </div>
        </div>
      </div>
    </div>
  `;
}

function creaViewMainRisultatiSingoloInput(){
  return `<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Informazioni sul Product System</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="list-group list-group-flush">
          <a href="/" class="list-group-item list-group-item-action">Home</a>
          <a href="/resultQueries/technosphereFlows" class="list-group-item list-group-item-action">5.5 Technosphere Flows</a>
          <a href="/resultQueries/finalDemand" class="list-group-item list-group-item-action">5.5.1 The final Demand</a>
          <a href="/resultQueries/interventionFlows" class="list-group-item list-group-item-action">5.6 Intervention Flows</a>
          <a href="/resultQueries/impactCategories" class="list-group-item list-group-item-action">5.7 impact Categories</a>
          <a href="/technosphereFlows/totalRequirements" class="list-group-item list-group-item-action">5.5.2 Total Requirements</a>
          <a href="/technosphereFlows/totalRequirementsOfFlows" class="list-group-item list-group-item-action">Total Requirements Of Flows</a>
          <a href="/technosphereFlows/scalingFactors" class="list-group-item list-group-item-action">5.5.4 Scaling factors</a>
          <a href="/technosphereFlows/scaledTechFlowsOf" class="list-group-item list-group-item-action">Scaled Requirements</a>
          <a href="/technosphereFlows/unscaledTechFlowsOf" class="list-group-item list-group-item-action">Unscaled Requirements</a>
          <a href="/flowResults/inventoryResult" class="list-group-item list-group-item-action">5.6.1 Inventory Result</a>
          <a href="/flowResults/totalFlowValueOf" class="list-group-item list-group-item-action">Total Flow Value Of</a>
          <a href="/flowResults/flowContributionsOf" class="list-group-item list-group-item-action">Flow Contributions Of</a>
          <a href="/flowResults/directInterventionsOf" class="list-group-item list-group-item-action">Direct Interventions Of</a>
          <a href="/flowResults/directInterventionsOfEnviFlowTechFlow" class="list-group-item list-group-item-action">Direct Interventions Of EnviFlow TechFlow</a>
          <a href="/flowResults/flowIntensitiesOf" class="list-group-item list-group-item-action">Flow IntensitiesOf</a>        
          <a href="/flowResults/flowIntensityOfEnviFlowTechFlow" class="list-group-item list-group-item-action">Flow Intensity Of Envi Flow Tech Flow</a>        

        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row justify-content-center">
       
        <div class="col-md-10">
          <p><strong>Seleziona il TechFlow</strong></p>
          <select class="form-select form-select-sm" aria-label="Small select example" style="width: 30%!important;" id="listaInput01">
            <option selected id="selectedInput01"></option>
          </select>
          <button type="button" class="btn btn-outline-primary" id="button">Mostra</button>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-md-10 mb-5">
          <div id="informazioniDati"> </div>
          
          <div class="table-responsive div-scrollabile" id="risultatiRicerca">
            
          </div>
        </div>
      </div>
    </div>
  `;
}

function creaViewMainRisultatiDoppiaTabella() {
  return `
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
      id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Informazioni sul Product System</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="list-group list-group-flush">
          <a href="/" class="list-group-item list-group-item-action">Home</a>
          <a href="/resultQueries/technosphereFlows" class="list-group-item list-group-item-action">5.5 Technosphere
            Flows</a>
          <a href="/resultQueries/finalDemand" class="list-group-item list-group-item-action">5.5.1 The final Demand</a>
          <a href="/resultQueries/interventionFlows" class="list-group-item list-group-item-action">5.6 Intervention
            Flows</a>
          <a href="/resultQueries/impactCategories" class="list-group-item list-group-item-action">5.7 impact
            Categories</a>
          <a href="/technosphereFlows/totalRequirements" class="list-group-item list-group-item-action">5.5.2 Total
            Requirements</a>
          <a href="/technosphereFlows/totalRequirementsOfFlows" class="list-group-item list-group-item-action">Total
            Requirements Of Flows</a>
          <a href="/technosphereFlows/scalingFactors" class="list-group-item list-group-item-action">5.5.4 Scaling
            factors</a>
          <a href="/technosphereFlows/scaledTechFlowsOf" class="list-group-item list-group-item-action">Scaled
            Requirements</a>
          <a href="/technosphereFlows/unscaledTechFlowsOf" class="list-group-item list-group-item-action">Unscaled
            Requirements</a>
          <a href="/flowResults/inventoryResult" class="list-group-item list-group-item-action">5.6.1 Inventory
            Result</a>
          <a href="/flowResults/totalFlowValueOf" class="list-group-item list-group-item-action">Total Flow Value Of</a>
          <a href="/flowResults/flowContributionsOf" class="list-group-item list-group-item-action">Flow Contributions
            Of</a>
          <a href="/flowResults/directInterventionsOf" class="list-group-item list-group-item-action">Direct
            Interventions Of</a>
          <a href="/flowResults/directInterventionsOfEnviFlowTechFlow"
            class="list-group-item list-group-item-action">Direct Interventions Of EnviFlow TechFlow</a>
          <a href="/flowResults/flowIntensitiesOf" class="list-group-item list-group-item-action">Flow IntensitiesOf</a>
          <a href="/flowResults/flowIntensityOfEnviFlowTechFlow" class="list-group-item list-group-item-action">Flow Intensity Of Envi Flow Tech Flow</a>        

        </div>
      </div>
    </div>
    <div class="container mt-2 mb-5">
      <div class="row justify-content-center">
        
        <div class="col-md-10 mt-4">
        <div id="informazioniDati"> </div>
          <p><strong>Input</strong></p>
          <div class="table-responsive div-scrollabile" id="risultatiRicercaInput01">

          </div>
        </div>
        <div class="col-md-10 mt-4">
          <p><strong>Output</strong></p>
          <div class="table-responsive div-scrollabile" id="risultatiRicercaOutput02">

          </div>
        </div>
      </div>
    </div>
  `;
}

function creaViewMainRisultatiSingoloInputDoppiaTabella() {
  return `
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
      id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Informazioni sul Product System</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="list-group list-group-flush">
          <a href="/" class="list-group-item list-group-item-action">Home</a>
          <a href="/resultQueries/technosphereFlows" class="list-group-item list-group-item-action">5.5 Technosphere
            Flows</a>
          <a href="/resultQueries/finalDemand" class="list-group-item list-group-item-action">5.5.1 The final Demand</a>
          <a href="/resultQueries/interventionFlows" class="list-group-item list-group-item-action">5.6 Intervention
            Flows</a>
          <a href="/resultQueries/impactCategories" class="list-group-item list-group-item-action">5.7 impact
            Categories</a>
          <a href="/technosphereFlows/totalRequirements" class="list-group-item list-group-item-action">5.5.2 Total
            Requirements</a>
          <a href="/technosphereFlows/totalRequirementsOfFlows" class="list-group-item list-group-item-action">Total
            Requirements Of Flows</a>
          <a href="/technosphereFlows/scalingFactors" class="list-group-item list-group-item-action">5.5.4 Scaling
            factors</a>
          <a href="/technosphereFlows/scaledTechFlowsOf" class="list-group-item list-group-item-action">Scaled
            Requirements</a>
          <a href="/technosphereFlows/unscaledTechFlowsOf" class="list-group-item list-group-item-action">Unscaled
            Requirements</a>
          <a href="/flowResults/inventoryResult" class="list-group-item list-group-item-action">5.6.1 Inventory
            Result</a>
          <a href="/flowResults/totalFlowValueOf" class="list-group-item list-group-item-action">Total Flow Value Of</a>
          <a href="/flowResults/flowContributionsOf" class="list-group-item list-group-item-action">Flow Contributions
            Of</a>
          <a href="/flowResults/directInterventionsOf" class="list-group-item list-group-item-action">Direct
            Interventions Of</a>
          <a href="/flowResults/directInterventionsOfEnviFlowTechFlow"
            class="list-group-item list-group-item-action">Direct Interventions Of EnviFlow TechFlow</a>
          <a href="/flowResults/flowIntensitiesOf" class="list-group-item list-group-item-action">Flow IntensitiesOf</a>
          <a href="/flowResults/flowIntensityOfEnviFlowTechFlow" class="list-group-item list-group-item-action">Flow Intensity Of Envi Flow Tech Flow</a>        

        </div>
      </div>
    </div>
    <div class="container mt-2 mb-5">
      <div class="row justify-content-center">
        <div class="col-md-10 mt-4">
          <p><strong>Seleziona il TechFlow</strong></p>
          <select class="form-select form-select-sm" aria-label="Default select example" style="width:30%!important;" id="listaInput01">
            <option selected id="selectedInput01"></option>
          </select>
          <button type="button" class="btn btn-outline-primary" id="button">Mostra</button>
        </div> 
      </div>
      <div class="row justify-content-center">
        <div class="col-md-10 mt-4">
          <div id="informazioniDati"> </div>
          <p><strong>Input</strong></p>
          <div class="table-responsive div-scrollabile" id="risultatiRicercaInput01">

          </div>
        </div>
        <div class="col-md-10 mt-4">
          <p><strong>Output</strong></p>
          <div class="table-responsive div-scrollabile" id="risultatiRicercaOutput02">

          </div>
        </div>
      </div>
    </div>
  `;
}

function creaViewMainRisultatiDoppioInputDoppiaTabella() {
  return `
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
      id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Informazioni sul Product System</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="list-group list-group-flush">
          <a href="/" class="list-group-item list-group-item-action">Home</a>
          <a href="/resultQueries/technosphereFlows" class="list-group-item list-group-item-action">5.5 Technosphere
            Flows</a>
          <a href="/resultQueries/finalDemand" class="list-group-item list-group-item-action">5.5.1 The final Demand</a>
          <a href="/resultQueries/interventionFlows" class="list-group-item list-group-item-action">5.6 Intervention
            Flows</a>
          <a href="/resultQueries/impactCategories" class="list-group-item list-group-item-action">5.7 impact
            Categories</a>
          <a href="/technosphereFlows/totalRequirements" class="list-group-item list-group-item-action">5.5.2 Total
            Requirements</a>
          <a href="/technosphereFlows/totalRequirementsOfFlows" class="list-group-item list-group-item-action">Total
            Requirements Of Flows</a>
          <a href="/technosphereFlows/scalingFactors" class="list-group-item list-group-item-action">5.5.4 Scaling
            factors</a>
          <a href="/technosphereFlows/scaledTechFlowsOf" class="list-group-item list-group-item-action">Scaled
            Requirements</a>
          <a href="/technosphereFlows/unscaledTechFlowsOf" class="list-group-item list-group-item-action">Unscaled
            Requirements</a>
          <a href="/flowResults/inventoryResult" class="list-group-item list-group-item-action">5.6.1 Inventory
            Result</a>
          <a href="/flowResults/totalFlowValueOf" class="list-group-item list-group-item-action">Total Flow Value Of</a>
          <a href="/flowResults/flowContributionsOf" class="list-group-item list-group-item-action">Flow Contributions
            Of</a>
          <a href="/flowResults/directInterventionsOf" class="list-group-item list-group-item-action">Direct
            Interventions Of</a>
          <a href="/flowResults/directInterventionsOfEnviFlowTechFlow"
            class="list-group-item list-group-item-action">Direct Interventions Of EnviFlow TechFlow</a>
          <a href="/flowResults/flowIntensitiesOf" class="list-group-item list-group-item-action">Flow IntensitiesOf</a>
          <a href="/flowResults/flowIntensityOfEnviFlowTechFlow" class="list-group-item list-group-item-action">Flow Intensity Of Envi Flow Tech Flow</a>        

        </div>
      </div>
    </div>
    <div class="container mt-2 mb-5">
      <div class="row justify-content-center">
        <div class="col-sm-2"></div>
        <div class="col-sm-4">
          <p><strong>Seleziona il TechFlow</strong></p>
          <select class="form-select form-select-sm" aria-label="Small select example" id="listaInput01">
            <option selected id="selectedInput01"></option>
          </select>
          <button type="button" class="btn btn-outline-primary" id="button">Mostra</button>
        </div>
        <div class="col-sm-4">
          <p><strong>Seleziona l'EnviFlow</strong></p>
          <select class="form-select form-select-sm" aria-label="Small select example" id="listaInput02">
            <option selected id="selectedInput02">Open this select menu</option>
          </select>
        </div>
        <div class="col-sm-2"></div>
      </div>
      <div class="row justify-content-center">
        <div id="informazioniDati"> </div>
        <div class="col-md-10 mt-4">
          <p><strong>Input</strong></p>
          <div class="table-responsive div-scrollabile" id="risultatiRicercaInput01">

          </div>
        </div>
        <div class="col-md-10 mt-4">
          <p><strong>Output</strong></p>
          <div class="table-responsive div-scrollabile" id="risultatiRicercaOutput02">

          </div>
        </div>
      </div>
    </div>
  `;
}


export { creaViewMain, creaViewMainRisultati, creaViewMainRisultatiDoppioInput , creaViewMainRisultatiSingoloInput, 
         creaViewMainRisultatiDoppiaTabella , creaViewMainRisultatiSingoloInputDoppiaTabella, creaViewMainRisultatiDoppioInputDoppiaTabella};