import { ApiCalculation } from "../../backend/apiCalculation.js";

const apiCalculation = new ApiCalculation();

export function modalCalcolaProductSystem01(){
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
                    <option selected id="selectedproduct-system">Inserisci Product System</option>
                    
                  </select>
                </div>
                <div class="col-sm-6">
                  <p class="text-start fs-6">Seleziona l'impact method con cui fare il calcolo</p>
                  <select class="form-select form-select-sm input-style" aria-label="Small select example" id="listaimpact-method">
                    <option selected id="selectedimpact-method">Inserisci Impact Method</option>
                    
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
export function modalCreaProductSystem01(){
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

export function creaModalInserisciInput(){
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

export function creaModalInserisciOutput(){
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

function creaAccordionElement(num:number,category:string,nome:string){
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

function creaFlowElement(element:any) {
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

export function creaModalNuovoFlowInput(){
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

export function creaModalNuovoFlowOutput(){
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

export function creaModalConfermaNuovoProductSystem(){
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

export function creaModalNuovoProductFine(){
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

export async function getFlow(apiCalculation:ApiCalculation,nome:string){
  let listaFlow = await apiCalculation.getData("flow");
  let risultato = ordinaEDividiPerCategoria(listaFlow);
  let num = 0;
  let categorie = Object.keys(risultato);
  categorie.forEach(function(categoria) {
      num++;
      //lista di flow di una certa categoria
      let listaFlowByCategoria = risultato[categoria];
      
      if(listaFlowByCategoria[0].hasOwnProperty('category')){
          let divAccordionFlow: HTMLDivElement | null = document.getElementById(`accordionFlushExample${nome}`) as HTMLDivElement | null;
          if(divAccordionFlow){
            divAccordionFlow.insertAdjacentHTML('beforeend',creaAccordionElement(num,listaFlowByCategoria[0].category,nome));
            for(let element of listaFlowByCategoria){
              let UlElementFlow :HTMLUListElement | null =  document.getElementById(`listaFlow${num}`) as HTMLUListElement| null; 
              if(UlElementFlow){
                UlElementFlow.insertAdjacentHTML('beforeend',creaFlowElement(element));
              }
            }   
          }
             
      }
  });
}

function ordinaEDividiPerCategoria(array:any) {
  // Verifica se ogni oggetto ha la proprietà 'category' prima di ordinare
  array.sort(function (a:any, b:any) {
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
  let raggruppatoPerCategoria = array.reduce(function (acc:any, elemento:any) {
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

export async function getAll(type:string) {
  const placeholder:HTMLOptionElement | null = document.getElementById(`selected${type}`) as HTMLOptionElement | null;
  let lista = await apiCalculation.getAllData(type);

  if(placeholder){
      if (lista.length == 0) {
          placeholder.innerHTML = `Non ci sono ${type} selezionabili`;
      } else {
          const select:HTMLSelectElement | null = document.getElementById(`lista${type}`) as HTMLSelectElement | null;
          placeholder.innerHTML = `Seleziona una ${type}`;
          if(select){
              for (let i = 0; i < lista.length; i++) {
                  let option = document.createElement("option");
                  option.value = lista[i].name;
                  option.text = lista[i].name;
                  if(type === "impact-method" && lista[i].nwSets!== undefined){
                    option.id = lista[i]["@id"]+"/" + lista[i].nwSets[0]["@id"];
                  }
                  else{
                    option.id = lista[i]["@id"];
                  }
                  select.appendChild(option);
              }
          }
      }
  }
  
}

export function avanzamentoBarra(width:string){
        
  return new Promise(() => {
      let progressBar:HTMLElement | null = document.getElementById('progressBar') as HTMLElement | null;
      
      setTimeout(function () {
          if(progressBar)
              progressBar.style.width = width + '%';
      }, 1500);
      
  });
}