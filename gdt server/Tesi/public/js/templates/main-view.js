"use-strict";

function creaViewMain() {
    return `
    <div class="container container-fluid" style="margin-top: 15%;">
    
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

      </div>

      <div class="row">
        <div class="col-7 mt-5">
          <div class="table-responsive" id="risultatiRicerca">
            
          </div>
        </div>
      </div>

    </div>
    `;
}

function creaViewTableTechnosphereFlows() {
    return `
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Provider</th>
                    <th scope="col">Flow</th>
                    <th scope="col">Unit</th>
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


export { creaViewMain, creaViewTableTechnosphereFlows,creaViewRowTechnosphereFlows };