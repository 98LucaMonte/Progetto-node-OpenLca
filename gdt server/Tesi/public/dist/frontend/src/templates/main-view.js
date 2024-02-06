var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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

        <div id="modal">
          
        </div>

      </div>
      <div class="row">
          <div class="col-sm-6 order-element0 mt-3">
            <p class="text-justify">
              Con il nostro innovativo sistema, puoi creare il tuo personalissimo sistema di prodotti, simile a quanto offerto da OpenLCA.
              La flessibilità del nostro strumento ti consente di progettare un sistema su misura per le tue esigenze specifiche,
              consentendoti di gestire e analizzare le informazioni relative ai prodotti in modo efficiente.
            </p>
            <button type="button" class="btn btn-outline-primary" id="creaProductSystem">Crea Product System</button>
          </div>
          <div class="col-sm-6 order-element1 mt-3">

          </div>  
        </div> 
    </div>
    `;
}
/**
    * In questo metodo raccolgo dal db tutti i Product system che sono disponibili e li inserisco all'interno
    * della select usata per selezionare il product system che si vuole calcolare andando a impostare l'id,
    * il value e il text che andranno a formare l'option che verà aggiunto alla select.
    *
    * @param {Api} apiCalculation - Oggetto che permette il richiamo delle apiCalculation.
    * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
    */
function getProductSystem(apiCalculation, vps) {
    return __awaiter(this, void 0, void 0, function* () {
        const placeholder = document.getElementById("selectedProductSystem");
        let listaProductSystem = yield apiCalculation.getProductSystem(vps);
        console.log("ProductSystem");
        console.log(listaProductSystem);
        if (placeholder) {
            if (listaProductSystem.length == 0) {
                placeholder.innerHTML = "Non ci sono Product System selezionabili";
            }
            else {
                let selectProductSystem = document.getElementById("listaProductSystem");
                placeholder.innerHTML = "Seleziona un Product System";
                for (let i = 0; i < listaProductSystem.length; i++) {
                    let option = document.createElement("option");
                    if (selectProductSystem) {
                        option.value = listaProductSystem[i].name;
                        option.text = listaProductSystem[i].name;
                        option.id = listaProductSystem[i]["@id"];
                        selectProductSystem.appendChild(option);
                    }
                }
            }
        }
    });
}
/**
* In questo metodo raccolgo dal db tutti gli impact method che sono disponibili e li inserisco all'interno
* della select usata per selezionare l'impact method che si vuole utilizzare andando a impostare l'id,
* il value e il text che andranno a formare l'option che verà aggiunto alla select. Inoltre, si imposta
* anche l'id del nwSets necessario per fare il calcolo del product system.
* Se non ci sono impact method si inserisce nel placeholder Non ci sono Impact method selezionabili.
*
* @param {Api} apiCalculation - Oggetto che permette il richiamo delle apiCalculation.
* @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
*/
function getImpactMethod(apiCalculation, vps) {
    return __awaiter(this, void 0, void 0, function* () {
        const placeholder = document.getElementById("selectedImpactMethod");
        let listaImpactMethod = yield apiCalculation.getImpactMethod(vps);
        console.log("impact-method");
        console.log(listaImpactMethod);
        if (placeholder) {
            if (listaImpactMethod.length == 0) {
                placeholder.innerHTML = "Non ci sono Impact method selezionabili";
            }
            else {
                const selectImpactMethod = document.getElementById("listaImpactMethod");
                placeholder.innerHTML = "Seleziona un Impact Method";
                for (let i = 0; i < listaImpactMethod.length; i++) {
                    let option = document.createElement("option");
                    if (listaImpactMethod[i].hasOwnProperty("nwSets")) {
                        if (selectImpactMethod) {
                            option.value = listaImpactMethod[i].name;
                            option.text = listaImpactMethod[i].name;
                            option.id = listaImpactMethod[i]["@id"] + "/" + listaImpactMethod[i].nwSets[0]["@id"];
                            selectImpactMethod.appendChild(option);
                        }
                    }
                }
            }
        }
    });
}
function creaModalForPDF() {
    return `<div class="modal fade" id="modalPdf" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
function creaLateralNavbar() {
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
function creaViewMainRisultatiDoppioInput() {
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
function creaViewMainRisultatiSingoloInput() {
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
export { creaViewMain, getProductSystem, getImpactMethod, creaModalForPDF, creaLateralNavbar, creaViewMainRisultati, creaViewMainRisultatiDoppioInput, creaViewMainRisultatiSingoloInput, creaViewMainRisultatiDoppiaTabella, creaViewMainRisultatiSingoloInputDoppiaTabella, creaViewMainRisultatiDoppioInputDoppiaTabella };
