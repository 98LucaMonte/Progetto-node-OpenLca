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
    <div class="container container-fluid mt-5">
      <div class="row">
  
        <h3>Calcolo terminato</h3>

        <div class="col-sm order-element0 mt-5">
          <p>
          Tale tabella mostra la quantità complessiva di risorse provenienti dalla tecnosfera, che sono richieste per soddisfare
          la domanda associata al Product System, che è stato analizzato.
          </p>
          <div class="table-responsive" id="risultatiRicerca">

          </div>
        </div>

        <div class="col-sm order-element1 mt-5">
          
          Inserire un grafico

        </div>
      </div>
    </div>

    `;
}

function creaViewTableTotalRequirements() {
    return `
        <table class="table table-striped table-bordered">
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


export { creaViewMain, creaViewMainRisultati, creaViewTableTotalRequirements, creaViewRowTotalRequirements };