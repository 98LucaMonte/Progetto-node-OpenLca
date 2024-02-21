var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiCalculation } from "../../backend/apiCalculation.js";
const apiCalculation = new ApiCalculation();
export function modalConfrontaProductSystem01() {
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
export function modalCalcolaProductSystem01() {
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
export function modalCaricamentoCalcoloProductSystem() {
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
export function modalCreaProductSystem01() {
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
export function creaModalInserisciInput() {
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
export function creaModalInserisciOutput() {
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
export function creaModalNuovoFlowInput() {
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
export function creaModalNuovoFlowOutput() {
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
export function creaModalConfermaNuovoProductSystem() {
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
export function creaModalNuovoProductFine() {
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
export function getFlow(apiCalculation, nome) {
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
export function getAll(type) {
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
export function riempiSelectCofrontaProductSystem(arrayJsonDatiCalcolo, type) {
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
export function avanzamentoBarra(width) {
    return new Promise(() => {
        let progressBar = document.getElementById('progressBar');
        setTimeout(function () {
            if (progressBar)
                progressBar.style.width = width + '%';
        }, 1500);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtdmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzL2Zyb250ZW5kL3RlbXBsYXRlL21vZGFsLXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBR2pFLE1BQU0sY0FBYyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7QUFFNUMsTUFBTSxVQUFVLDZCQUE2QjtJQUMzQyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDTixDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSwyQkFBMkI7SUFDekMsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Q0YsQ0FBQztBQUNSLENBQUM7QUFFRCxNQUFNLFVBQVUsb0NBQW9DO0lBQ2xELE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkYsQ0FBQztBQUNSLENBQUM7QUFFRCxNQUFNLFVBQVUsd0JBQXdCO0lBQ3BDLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBc0NGLENBQUM7QUFDVixDQUFDO0FBRUQsTUFBTSxVQUFVLHVCQUF1QjtJQUNyQyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4QkYsQ0FBQztBQUNSLENBQUM7QUFFRCxNQUFNLFVBQVUsd0JBQXdCO0lBQ3RDLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQThCRixDQUFDO0FBQ1IsQ0FBQztBQUVELFNBQVMsb0JBQW9CLENBQUMsR0FBVSxFQUFDLFFBQWUsRUFBQyxJQUFXO0lBQ2xFLE9BQU87OzBIQUVpSCxHQUFHLEdBQUcsSUFBSTtVQUMxSCxRQUFROzs7NkJBR1csR0FBRyxHQUFHLElBQUk7OzhDQUVPLEdBQUc7Ozs7OztHQU05QyxDQUFDO0FBQ0osQ0FBQztBQUVELFNB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