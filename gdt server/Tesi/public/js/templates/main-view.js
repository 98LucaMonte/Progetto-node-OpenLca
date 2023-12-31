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

        <div id="modalPdf">
          
        </div>

      </div>
      <div class="row">
          <div class="col-sm-6 order-element0 mt-3">
            <p class="text-justify">
              Con il nostro innovativo sistema, puoi creare il tuo personalissimo sistema di prodotti, simile a quanto offerto da OpenLCA.
              La flessibilità del nostro strumento ti consente di progettare un sistema su misura per le tue esigenze specifiche,
              consentendoti di gestire e analizzare le informazioni relative ai prodotti in modo efficiente.
            </p>
            <button type="button" class="btn btn-outline-primary" id="buttonNuovoProductSystem">Crea Product System</button>
          </div>
          <div class="col-sm-6 order-element1 mt-3">

          </div>  
        </div> 
    </div>
    `;
}

function creaModalForPDF(){
  return `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Crea pdf dei risultati</h1>
      </div>
      <div class="modal-body">
        Vuoi creare un pdf del Product System appena calcolato? 
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="chiudiPdf">Chiudi</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="salvaPdf">Salva</button>
      </div>
    </div>
  </div>
</div>`;
}
/* 
function creaModalNuovoProductSystem(){
  return `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Crea un nuovo Product System</h1>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-6">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><strong>Nome Product</strong></label>
              <input type="text" class="form-control" id="nomeProduct" placeholder="Inserisci nome product" >
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><strong>Descrizione</strong></label>
              <textarea type="text" class="form-control" id="descrizioneProduct" placeholder="Inserisci descrizione"></textarea>
            </div>
          </div>
          <div class="col-6">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><strong>Location</strong></label>
              <select class="form-select" aria-label="Default select example" id="listaLocation" style="width:85%!important;">
                <option selected id="selectedLocation">Inserisci la location</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><strong>Unit</strong></label>
              <select class="form-select" aria-label="Default select example" id="listaUnit" style="width:85%!important;">
                <option selected id="selectedUnit">Inserisci l'Unità</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"><strong>Flow</strong></label>
              <select class="form-select" aria-label="Default select example" id="listaFlow" style="width:85%!important;">
                <option selected id="selectedFlow">Inserisci il Flow</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="chiudiPdf">Chiudi</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="salvaPdf">Crea</button>
      </div>
    </div>
  </div>
</div>`;
}*/

function creaModalNuovoProductSystem(){
  return `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Crea un nuovo Product System</h1>
      </div>
      <div class="modal-body">
        <form class="row g-3">
          <div class="col-md-6">
            <label for="exampleFormControlInput1" class="form-label"><strong>Nome Product</strong></label>
            <input type="text" class="form-control" id="nomeProduct" placeholder="Inserisci nome product" >
          </div>
          <div class="col-md-6">
            <label for="exampleFormControlInput1" class="form-label"><strong>Descrizione</strong></label>
            <textarea type="text" class="form-control" id="descrizioneProduct" placeholder="Inserisci descrizione"></textarea>
          </div>
          <div class="col-md-4">
            <label for="exampleFormControlInput1" class="form-label"><strong>Flow</strong></label>
            <select class="form-select" aria-label="Default select example" id="listaFlow" style="width:85%!important;">
              <option selected id="selectedFlow">Inserisci il Flow</option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="exampleFormControlInput1" class="form-label"><strong>Unit</strong></label>
            <select class="form-select" aria-label="Default select example" id="listaUnit" style="width:85%!important;">
              <option selected id="selectedUnit">Inserisci l'Unità</option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="exampleFormControlInput1" class="form-label"><strong>Location</strong></label>
            <select class="form-select" aria-label="Default select example" id="listaLocation" style="width:85%!important;">
              <option selected id="selectedLocation">Inserisci la location</option>
            </select>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary">Crea il tuo flow</button>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="chiudiPdf">Chiudi</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="salvaPdf">Crea</button>
      </div>
    </div>
  </div>
</div>`;
}

function creaLateralNavbar(){
  return `
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Informazioni sul Product System</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="list-group list-group-flush">
          <a href="/" class="list-group-item list-group-item-action">Home</a>
          
          <li class="list-group-item list-group-item-action dropdown">
            <a class="nav-link dropdown-toggle " role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Result Queries
            </a>
            <ul class="dropdown-menu">
              <a href="/resultQueries/technosphereFlows" class="dropdown-item">5.5 Technosphere Flows</a>
              <li><hr class="dropdown-divider"></li>
              <a href="/resultQueries/finalDemand" class="dropdown-item">5.5.1 The final Demand</a>
              <li><hr class="dropdown-divider"></li>
              <a href="/resultQueries/interventionFlows" class="dropdown-item">5.6 Intervention Flows</a>
              <li><hr class="dropdown-divider"></li>
              <a href="/resultQueries/impactCategories" class="dropdown-item">5.7 impact Categories</a>
            </ul>
          </li>

          <li class="list-group-item list-group-item-action dropdown">
            <a class="nav-link dropdown-toggle " role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Technosphere Flow
            </a>
            <ul class="dropdown-menu">
              <a href="/technosphereFlows/totalRequirements" class="dropdown-item">5.5.2 Total Requirements</a>
              <li><hr class="dropdown-divider"></li>
              <a href="/technosphereFlows/totalRequirementsOfFlows" class="dropdown-item">Total Requirements Of Flows</a>
              <li><hr class="dropdown-divider"></li>
              <a href="/technosphereFlows/scalingFactors" class="dropdown-item">5.5.4 Scaling factors</a>
              <li><hr class="dropdown-divider"></li>
              <a href="/technosphereFlows/scaledTechFlowsOf" class="dropdown-item">Scaled Requirements</a>
              <li><hr class="dropdown-divider"></li>
              <a href="/technosphereFlows/unscaledTechFlowsOf" class="dropdown-item">Unscaled Requirements</a>
            </ul>
          </li>
             
          <li class="list-group-item list-group-item-action dropdown">
            <a class="nav-link dropdown-toggle " role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Impact Results
            </a>
            <ul class="dropdown-menu">
              <a href="/impactResults/totalImpacts" class="dropdown-item">Total Impacts</a> 
              <li><hr class="dropdown-divider"></li> 
              <a href="/impactResults/totalImpactsNormalized" class="dropdown-item">Total Impacts Normalized</a>   
              <li><hr class="dropdown-divider"></li>      
              <a href="/impactResults/totalImpactsWeighted" class="dropdown-item">Total Impacts Weighted</a>    
              <li><hr class="dropdown-divider"></li>     
              <a href="/impactResults/totalImpactValueOf" class="dropdown-item">Total Impacts Value of</a>    
              <li><hr class="dropdown-divider"></li>     
              <a href="/impactResults/impactContributionsOf" class="dropdown-item">Impact Contributions Of</a> 
              <li><hr class="dropdown-divider"></li>        
              <a href="/impactResults/directImpactsOf" class="dropdown-item">Direct ImpactsOf</a>        
              <li><hr class="dropdown-divider"></li> 
              <a href="/impactResults/directImpactOfImpactCategoryTechFlow" class="dropdown-item">Direct Impact Of ImpactCategory TechFlow</a> 
              <li><hr class="dropdown-divider"></li>        
              <a href="/impactResults/impactIntensitiesOf" class="dropdown-item">Impact Intensities Of</a>        
              <li><hr class="dropdown-divider"></li> 
              <a href="/impactResults/directImpactIntensityOfImpactCategoryTechFlow" class="dropdown-item">Direct Impact Intensity Of ImpactCategory TechFlow</a>  
              <li><hr class="dropdown-divider"></li>       
              <a href="/impactResults/totalImpactsOf" class="dropdown-item">Total Impacts Of</a> 
              <li><hr class="dropdown-divider"></li>        
              <a href="/impactResults/totalImpactOfImpactCategoryTechFlow" class="dropdown-item">Total Impact Of ImpactCategory TechFlow</a>
              <li><hr class="dropdown-divider"></li>         
              <a href="/impactResults/impactFactorsOf" class="dropdown-item">Impact Factors Of</a>        
              <li><hr class="dropdown-divider"></li> 
              <a href="/impactResults/impactFactorsOfImpactCategoryEnviFlow" class="dropdown-item">Impact Factors Of ImpactCategory EnviFlow</a>  
              <li><hr class="dropdown-divider"></li>       
              <a href="/impactResults/flowImpactsOf" class="dropdown-item">Flow Impacts Of</a>        
              <li><hr class="dropdown-divider"></li> 
              <a href="/impactResults/flowImpactOfImpactCategoryEnviFlow" class="dropdown-item">Flow Impact Of ImpactCategory EnviFlow</a> 
              <li><hr class="dropdown-divider"></li>                  
            </ul>
          </li>

          <li class="list-group-item list-group-item-action dropdown">
            <a class="nav-link dropdown-toggle " role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Flow Results
            </a>
            <ul class="dropdown-menu">
              <a href="/flowResults/inventoryResult"  class="dropdown-item">5.6.1 Inventory Result</a>
              <li><hr class="dropdown-divider"></li>
              <a href="/flowResults/totalFlowValueOf"  class="dropdown-item">Total Flow Value Of</a>
              <li><hr class="dropdown-divider"></li>
              <a href="/flowResults/flowContributionsOf"  class="dropdown-item">Flow Contributions Of</a>
              <li><hr class="dropdown-divider"></li>
              <a href="/flowResults/directInterventionsOf"  class="dropdown-item">Direct Interventions Of</a>
              <li><hr class="dropdown-divider"></li>
              <a href="/flowResults/directInterventionsOfEnviFlowTechFlow"  class="dropdown-item">Direct Interventions Of EnviFlow TechFlow</a>
              <li><hr class="dropdown-divider"></li>
              <a href="/flowResults/flowIntensitiesOf"  class="dropdown-item">Flow IntensitiesOf</a>        
              <li><hr class="dropdown-divider"></li>
              <a href="/flowResults/flowIntensityOfEnviFlowTechFlow"  class="dropdown-item">Flow Intensity Of EnviFlow TechFlow</a>        
              <li><hr class="dropdown-divider"></li>
              <a href="/flowResults/totalInterventionsOf"  class="dropdown-item">Total Interventions Of</a>        
              <li><hr class="dropdown-divider"></li>
              <a href="/flowResults/totalInterventionOfEnviFlowTechFlow"  class="dropdown-item">Total Intervention Of EnviFlow TechFlow</a>        
              <li><hr class="dropdown-divider"></li>
              <a href="/flowResults/upstreamInterventionsOf"  class="dropdown-item">Upstream Interventions Of</a>        
            </ul>
          </li>
      
        </div>
      </div>
    </div>
    <div id="main01">
    </div>
  `;
}

function creaViewMainRisultati() {
    return `
    <div class="container mt-5 mb-5">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div id="informazioniDati"> </div>
          <div class="table-responsive div-scrollabile" id="risultatiRicerca">
          
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-10 mt-4">
          
          <canvas id="myChart"></canvas>
          
        </div>
      </div>
    </div>
    `;
}

function creaViewMainRisultatiDoppioInput(){
  return `<div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-sm-2"></div>
        <div class="col-sm-4" id="inputTitolo01">
          <select class="form-select form-select-sm" aria-label="Small select example" id="listaInput01">
            <option selected id="selectedInput01"></option>
          </select>
          <button type="button" class="btn btn-outline-primary" id="button">Mostra</button>
        </div>
        <div class="col-sm-4" id="inputTitolo02">
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
  return `<div class="container mt-5">
      <div class="row justify-content-center">
       
        <div class="col-md-10" id="inputTitolo">
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
  return `<div class="container mt-2 mb-5">
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
  return `<div class="container mt-2 mb-5">
      <div class="row justify-content-center">
        <div class="col-md-10 mt-4" id="inputTitolo">
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
  return `<div class="container mt-2 mb-5">
      <div class="row justify-content-center">
        <div class="col-sm-2"></div>
        <div class="col-sm-4"  id="inputTitolo01">
          <select class="form-select form-select-sm" aria-label="Small select example" id="listaInput01">
            <option selected id="selectedInput01"></option>
          </select>
          <button type="button" class="btn btn-outline-primary" id="button">Mostra</button>
        </div>
        <div class="col-sm-4"  id="inputTitolo02">
          <select class="form-select form-select-sm" aria-label="Small select example" id="listaInput02">
            <option selected id="selectedInput02"></option>
          </select>
        </div>
        <div class="col-sm-2"></div>
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

export { creaViewMain, creaModalForPDF,creaModalNuovoProductSystem,creaLateralNavbar,creaViewMainRisultati, creaViewMainRisultatiDoppioInput , creaViewMainRisultatiSingoloInput, 
         creaViewMainRisultatiDoppiaTabella , creaViewMainRisultatiSingoloInputDoppiaTabella, creaViewMainRisultatiDoppioInputDoppiaTabella};