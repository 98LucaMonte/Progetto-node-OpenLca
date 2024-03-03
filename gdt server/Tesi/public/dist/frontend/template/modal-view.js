"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.avanzamentoBarra = exports.riempiSelectCofrontaProductSystem = exports.getAll = exports.getFlow = exports.creaModalNuovoProductFine = exports.creaModalConfermaNuovoProductSystem = exports.creaModalNuovoFlowOutput = exports.creaModalNuovoFlowInput = exports.creaModalInserisciOutput = exports.creaModalInserisciInput = exports.modalCreaProductSystem01 = exports.modalCaricamentoCalcoloProductSystem = exports.modalCalcolaProductSystem01 = exports.modalConfrontaProductSystem01 = void 0;
const apiCalculation_js_1 = require("../../backend/apiCalculation.js");
const apiCalculation = new apiCalculation_js_1.ApiCalculation();
function modalConfrontaProductSystem01() {
    return `
    <div class="modal fade" id="confrontaProductSystemMain" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Confronta Product System</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form class="row g-3">
        <div class="modal-body">
        
        <div class="container text-center">
          <div class="row">
            <div class="col-sm-6">
              <p class="text-start fs-6">Seleziona il primo product system</p>
              <select class="form-select form-select-sm input-style" aria-label="Small select example" id="listaproductsystem01">
                <option selected id="selectedproductsystem01"></option>
                
              </select>
            </div>
            <div class="col-sm-6">
              <p class="text-start fs-6">Seleziona il secondo product system</p>
              <select class="form-select form-select-sm input-style" aria-label="Small select example" id="listaproductsystem02">
                <option selected id="selectedproductsystem02"></option>
                
              </select>
            </div>
          </div>
        </div>
      </div>
          <div class="modal-footer">
          <button class="btn btn-outline-danger btn-sm" data-bs-dismiss="modal">Chiudi</button>
          <button class="btn btn-outline-secondary btn-sm confrontaProduct" data-bs-dismiss="modal" type="submit" disabled>Confronta</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `;
}
exports.modalConfrontaProductSystem01 = modalConfrontaProductSystem01;
function modalCalcolaProductSystem01() {
    return `
  <div class="modal fade" id="calcolaProductSystemMain" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Calcola Product System</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form class="row g-3">
            <div class="modal-body">
            <div class="container text-center">
              <div class="row">
                <div class="col-sm-6">
                  <p class="text-start fs-6">Seleziona il product system che vuoi calcolare</p>
                  <select class="form-select form-select-sm input-style" aria-label="Small select example" id="listaproduct-system">
                    <option selected id="selectedproduct-system"></option>
                    
                  </select>
                </div>
                <div class="col-sm-6">
                  <p class="text-start fs-6">Seleziona l'impact method con cui fare il calcolo</p>
                  <select class="form-select form-select-sm input-style" aria-label="Small select example" id="listaimpact-method">
                    <option selected id="selectedimpact-method"></option>
                    
                  </select>
                </div>
              </div>
              <div class="row" id="infoCalcolo">

              <div>
              
            </div>
          </div>
              <div class="modal-footer">
              <button class="btn btn-outline-danger btn-sm" data-bs-dismiss="modal">Chiudi</button>
              <button class="btn btn-outline-secondary btn-sm calcolaProduct" data-bs-dismiss="modal" type="submit" disabled>Calcola</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      `;
}
exports.modalCalcolaProductSystem01 = modalCalcolaProductSystem01;
function modalCaricamentoCalcoloProductSystem() {
    return `
  <div class="modal fade" id="calcolaProductSystemCaricamento" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Calcola Product System</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        
        <div class="modal-body" id="infoCalcolo">
          <p>Calcolo del product system in corso...</p>
          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
            <div id="progressBar" class="progress-bar progress-bar-striped progress-bar-animated" style="width:0%"></div>
          </div>
        </div>

      </div>
    </div>
  </div>
      `;
}
exports.modalCaricamentoCalcoloProductSystem = modalCaricamentoCalcoloProductSystem;
function modalCreaProductSystem01() {
    return `
    <div class="modal fade" id="creaProductSystemMain" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Crea Product System</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form class="row g-3">
                <div class="modal-body">
                  <p>Primo passo: Inserisci nome, descrizione e luogo relativi a questo product system</p>
                  <div class="mb-3">
                    <label for="validationDefault01" class="form-label">Nome</label>
                    <input type="text" class="form-control input-style" id="nomeProductSystem" required>
                  </div>
                  <div class="mb-3">
                    <label for="validationDefault02" class="form-label">Descrizione</label>
                    <input type="text" class="form-control input-style" id="descrizioneProductSystem">
                  </div>
                  <div class="mb-3">
                    <label for="validationDefaultUsername" class="form-label">Luogo</label>
                    <div class="input-group">
                      <select class="form-select form-select-sm input-style" aria-label="select example" id="listalocation">
                        <option selected id="selectedlocation"></option>
                        
                      </select>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-danger btn-sm" data-bs-dismiss="modal">Chiudi</button>
                  <button class="btn btn-outline-secondary btn-sm nuovoInput" data-bs-dismiss="modal" type="submit" disabled>Avanti</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        `;
}
exports.modalCreaProductSystem01 = modalCreaProductSystem01;
function creaModalInserisciInput() {
    return `
  <div class="modal fade" id="creaProductSystemInput" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Crea Product System</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Secondo passo: Inserire gli input di questo product system.</p>
                <div class="mb-1">                
                  <button type="button" class="btn btn-outline-secondary btn-sm newFlowInput">Crea un nuovo input</button>
                </div>
                <div class="mb-1">  
                  <label class="form-label"><strong>Inserisci un input esistente nel nostro sistema</strong></label>
                  <div class="div-scrollabile-flow">
                    <div class="accordion accordion-flush" id="accordionFlushExampleInput">
                      
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-danger btn-sm" data-bs-dismiss="modal">Chiudi</button>
                <button type="button" class="btn btn-outline-secondary btn-sm inserisciOutput" data-bs-dismiss="modal">Avanti</button>
              </div>
            </div>
          </div>
        </div>
        
      `;
}
exports.creaModalInserisciInput = creaModalInserisciInput;
function creaModalInserisciOutput() {
    return `
  <div class="modal fade" id="creaProductSystemOutput" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Crea Product System</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Terzo passo: Inserire gli output di questo product system.</p>
                <div class="mb-1">                
                  <button type="button" class="btn btn-outline-secondary btn-sm newFlowOutput">Crea un nuovo output</button>
                </div>
                <div class="mb-1">  
                  <label class="form-label"><strong>Inserisci un output esistente nel nostro sistema</strong></label>
                  <div class="div-scrollabile-flow">
                    <div class="accordion accordion-flush" id="accordionFlushExampleOutput">
                      
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-danger btn-sm" data-bs-dismiss="modal">Chiudi</button>
                <button type="button" class="btn btn-outline-secondary btn-sm confermaCreaProductSystem" data-bs-dismiss="modal">Avanti</button>
              </div>
            </div>
          </div>
        </div>
        
      `;
}
exports.creaModalInserisciOutput = creaModalInserisciOutput;
function creaAccordionElement(num, category, nome) {
    return `<div class="accordion-item input-style">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${num}${nome}" aria-expanded="false" aria-controls="flush-collapseOne">
        ${category}
      </button>
    </h2>
    <div id="flush-collapse${num}${nome}" class="accordion-collapse collapse" >
      <div class="accordion-body">
        <ul class="list-group" id="listaFlow${num}">
          
        </ul>
      </div>
    </div>
  </div>
  `;
}
function creaFlowElement(element) {
    return `<li class="list-group-item">
    <div class="row">
      <div class="col-sm-6">
        <p>${element.name} {${element.refUnit}}</p>
      </div>
      <div class="col-sm-6">
        <button type="button" class="btn btn-outline-dark input-style btn-sm flowInputButton" id="${element["@id"]}">Aggiungi</button>
      </div>
    </div>
  </li>`;
}
function creaModalNuovoFlowInput() {
    return `

  <div class="modal fade" id="creaFlowInput" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Crea Input</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form class="row g-3">
                <div class="modal-body">
                  <p>Crea un Input inserendo nome, luogo, categoria, flow type, flow properties.</p>
                  
                  <div class="mb-3 row">
                    <div class="col-sm-6">
                      <label for="validationDefault01" class="form-label">Nome</label>
                      <input type="text" class="form-control input-style" id="nomeFlowInput" required>
                    </div>
                    <div class="col-sm-6">
                      <label for="validationDefaultUsername" class="form-label">Flow type</label>
                      <div class="input-group">
                        <select class="form-select input-style" aria-label="select example" id="listaflow-type">
                          <option selected id="selectedFlowType">Seleziona un Flow Type</option>
                          <option id="Elementary Flow">Elementary Flow</option>
                          <option id="Product Flow<">Product Flow</option>
                          <option id="Waste Flow">Waste Flow</option>
                        </select>
                      
                      </div>
                    </div>
                  </div>

                  <div class="mb-3 row">
                    <div class="col-sm-6">
                      <label for="validationDefaultUsername" class="form-label">Luogo</label>
                      <div class="input-group">
                       
                        <select class="form-select input-style" aria-label="select example" id="listalocation">
                        <option selected id="selectedlocation"></option>
                        
                        </select>

                      </div>
                    </div>
                    <div class="col-sm-6">
                      <label for="validationDefaultUsername" class="form-label">Flow Properties</label>
                        <div class="input-group">
                          
                        <select class="form-select input-style" aria-label="select example" id="listaflow-property">
                          <option selected id="selectedflow-property"></option>
                        
                        </select>

                        </div>
                    </div>
                  </div>
               
                </div>
                <div class="modal-footer">
                  <button class="btn btn-outline-secondary btn-sm creaFlowInput" data-bs-dismiss="modal" type="submit" disabled>Avanti</button>
                </div>
              </form>
            </div>
          </div>
        </div>

  `;
}
exports.creaModalNuovoFlowInput = creaModalNuovoFlowInput;
function creaModalNuovoFlowOutput() {
    return `
  <div class="modal fade" id="creaFlowOutput" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Crea Output</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form class="row g-3">
                <div class="modal-body">
                  <p>Crea un Output inserendo nome, luogo, categoria, flow type e flow properties.</p>
                  
                  <div class="mb-3 row">
                    <div class="col-sm-6">
                      <label for="validationDefault01" class="form-label">Nome</label>
                      <input type="text" class="form-control input-style" id="nomeFlowOutput" required>
                    </div>
                    <div class="col-sm-6">
                      <label for="validationDefaultUsername" class="form-label">Flow type</label>
                      <div class="input-group">
                        <select class="form-select input-style" aria-label="select example" id="listaflow-type">
                          <option selected id="selectedFlowType">Seleziona un Flow Type</option>
                          <option id="Elementary Flow">Elementary Flow</option>
                          <option id="Product Flow<">Product Flow</option>
                          <option id="Waste Flow">Waste Flow</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3 row">
                    <div class="col-sm-6">
                      <label for="validationDefaultUsername" class="form-label">Luogo</label>
                      <div class="input-group">
                        <select class="form-select input-style" aria-label="select example" id="listalocation">
                        <option selected id="selectedlocation"></option>
                        
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <label for="validationDefaultUsername" class="form-label">Flow Properties</label>
                      <div class="input-group">
                        <select class="form-select input-style" aria-label="select example" id="listaflow-property">
                          <option selected id="selectedflow-property"></option>
                        
                        </select>
                      </div>
                    </div>
                  </div>
               
                  <div class="mb-3 row">
                    
                  </div>

                </div>
                <div class="modal-footer">
                  <button class="btn btn-outline-secondary btn-sm creaFlowOutput" data-bs-dismiss="modal" type="submit" disabled>Avanti</button>
                </div>
              </form>
            </div>
          </div>
        </div>

  `;
}
exports.creaModalNuovoFlowOutput = creaModalNuovoFlowOutput;
function creaModalConfermaNuovoProductSystem() {
    return `
  <div class="modal fade" id="confermaCreaProductSystem" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Crea Product System</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Sei sicuro di voler creare questo Product System?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-danger btn-sm" data-bs-dismiss="modal">Annula</button>
        <button type="button" class="btn btn-outline-secondary btn-sm creaProductSystem" data-bs-dismiss="modal">Crea</button>
      </div>
    </div>
  </div>
</div>
 
      `;
}
exports.creaModalConfermaNuovoProductSystem = creaModalConfermaNuovoProductSystem;
function creaModalNuovoProductFine() {
    return `
  <div class="modal fade" id="creaProductSystemFine" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Crea Product System</h1>
              </div>
              <div class="modal-body" id="bodyDivCreaProduct">
                <p>Creazione del product system in corso...</p>
                <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                  <div id="progressBar" class="progress-bar progress-bar-striped progress-bar-animated" style="width:0%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
}
exports.creaModalNuovoProductFine = creaModalNuovoProductFine;
function getFlow(apiCalculation, nome) {
    return __awaiter(this, void 0, void 0, function* () {
        let listaFlow = yield apiCalculation.getData("flow");
        let risultato = ordinaEDividiPerCategoria(listaFlow);
        let num = 0;
        let categorie = Object.keys(risultato);
        categorie.forEach(function (categoria) {
            num++;
            //lista di flow di una certa categoria
            let listaFlowByCategoria = risultato[categoria];
            if (listaFlowByCategoria[0].hasOwnProperty('category')) {
                let divAccordionFlow = document.getElementById(`accordionFlushExample${nome}`);
                if (divAccordionFlow) {
                    divAccordionFlow.insertAdjacentHTML('beforeend', creaAccordionElement(num, listaFlowByCategoria[0].category, nome));
                    for (let element of listaFlowByCategoria) {
                        let UlElementFlow = document.getElementById(`listaFlow${num}`);
                        if (UlElementFlow) {
                            UlElementFlow.insertAdjacentHTML('beforeend', creaFlowElement(element));
                        }
                    }
                }
            }
        });
    });
}
exports.getFlow = getFlow;
function ordinaEDividiPerCategoria(array) {
    // Verifica se ogni oggetto ha la proprietà 'category' prima di ordinare
    array.sort(function (a, b) {
        let categoriaA = (a.category || '').toString().toLowerCase();
        let categoriaB = (b.category || '').toString().toLowerCase();
        if (categoriaA < categoriaB) {
            return -1;
        }
        if (categoriaA > categoriaB) {
            return 1;
        }
        return 0;
    });
    // Raggruppa gli elementi per categoria utilizzando reduce
    let raggruppatoPerCategoria = array.reduce(function (acc, elemento) {
        let categoria = (elemento.category || '').toString();
        // Se la categoria non esiste nel risultato, creala
        if (!acc[categoria]) {
            acc[categoria] = [];
        }
        // Aggiungi l'elemento alla categoria corrispondente
        acc[categoria].push(elemento);
        return acc;
    }, {});
    return raggruppatoPerCategoria;
}
function getAll(type) {
    return __awaiter(this, void 0, void 0, function* () {
        const placeholder = document.getElementById(`selected${type}`);
        let lista = yield apiCalculation.getAllData(type);
        if (placeholder) {
            if (lista.length == 0) {
                placeholder.innerHTML = `Non ci sono ${type} selezionabili`;
            }
            else {
                const select = document.getElementById(`lista${type}`);
                placeholder.innerHTML = `Seleziona una ${type}`;
                if (select) {
                    for (let i = 0; i < lista.length; i++) {
                        let option = document.createElement("option");
                        option.value = lista[i].name;
                        option.text = lista[i].name;
                        if (type === "impact-method" && lista[i].nwSets !== undefined) {
                            option.id = lista[i]["@id"] + "/" + lista[i].nwSets[0]["@id"];
                        }
                        else {
                            option.id = lista[i]["@id"];
                        }
                        select.appendChild(option);
                    }
                }
            }
        }
    });
}
exports.getAll = getAll;
function riempiSelectCofrontaProductSystem(arrayJsonDatiCalcolo, type) {
    const placeholder = document.getElementById(`selected${type}`);
    if (placeholder) {
        if (arrayJsonDatiCalcolo.length == 0) {
            placeholder.innerHTML = `Non ci sono Product system selezionabili`;
        }
        else {
            const select = document.getElementById(`lista${type}`);
            placeholder.innerHTML = `Seleziona una ${type}`;
            if (select) {
                for (let i = 0; i < arrayJsonDatiCalcolo.length; i++) {
                    let option = document.createElement("option");
                    option.value = arrayJsonDatiCalcolo[i].productSystem.nome + " calcolato con " + arrayJsonDatiCalcolo[i].impactMethod.nome;
                    option.text = arrayJsonDatiCalcolo[i].productSystem.nome + " calcolato con " + arrayJsonDatiCalcolo[i].impactMethod.nome;
                    option.id = arrayJsonDatiCalcolo[i].idCalcolo;
                    select.appendChild(option);
                }
            }
        }
    }
}
exports.riempiSelectCofrontaProductSystem = riempiSelectCofrontaProductSystem;
function avanzamentoBarra(width) {
    return new Promise(() => {
        let progressBar = document.getElementById('progressBar');
        setTimeout(function () {
            if (progressBar)
                progressBar.style.width = width + '%';
        }, 1500);
    });
}
exports.avanzamentoBarra = avanzamentoBarra;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtdmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzL2Zyb250ZW5kL3RlbXBsYXRlL21vZGFsLXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQWlFO0FBR2pFLE1BQU0sY0FBYyxHQUFHLElBQUksa0NBQWMsRUFBRSxDQUFDO0FBRTVDLFNBQWdCLDZCQUE2QjtJQUMzQyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDTixDQUFDO0FBQ0osQ0FBQztBQXhDRCxzRUF3Q0M7QUFFRCxTQUFnQiwyQkFBMkI7SUFDekMsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Q0YsQ0FBQztBQUNSLENBQUM7QUEzQ0Qsa0VBMkNDO0FBRUQsU0FBZ0Isb0NBQW9DO0lBQ2xELE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkYsQ0FBQztBQUNSLENBQUM7QUFyQkQsb0ZBcUJDO0FBRUQsU0FBZ0Isd0JBQXdCO0lBQ3BDLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBc0NGLENBQUM7QUFDVixDQUFDO0FBeENELDREQXdDQztBQUVELFNBQWdCLHVCQUF1QjtJQUNyQyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4QkYsQ0FBQztBQUNSLENBQUM7QUFoQ0QsMERBZ0NDO0FBRUQsU0FBZ0Isd0JBQXdCO0lBQ3RDLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQThCRixDQUFDO0FBQ1IsQ0FBQztBQWhDRCw0REFnQ0M7QUFFRCxTQUFTLG9CQUFvQixDQUFDLEdBQVUsRUFBQyxRQUFlLEVBQUMsSUFBVztJQUNsRSxPQUFPOzswSEFFaUgsR0FBRyxHQUFHLElBQUk7VUFDMUgsUUFBUTs7OzZCQUdXLEdBQUcsR0FBRyxJQUFJOzs4Q0FFTyxHQUFHOzs7Ozs7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