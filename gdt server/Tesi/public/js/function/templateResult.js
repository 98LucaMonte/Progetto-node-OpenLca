
export function creaPaginaRisultati(){
    return `
    <div class="container">
        <h1>Pagina dei Risultati</h1> 
        <div class="row">
            <div class="col-sm-6 mb-2">
                <p class="text-start fs-5 fw-bold">Impact Category</p>
                <p class="text-start fs-6" id="nomeImpactCategory">Questa tabella illustra le categorie di impatto del Product System appena Calcolato.</p>
                <div class="mt-1" id="risultatiRicerca">
                </div>
                <div class="mt-1">
                    <canvas id="myChart"></canvas>
                </div> 
            </div>
            <div class="col-sm-6 mb-2">
                <p class="text-start fs-5 fw-bold">Inventario del Product System</p>
                <p class="text-start fs-6">Questa tabella illustra i flow ovvero gli input e gli output del processo appartente al Product System.</p>
                <p>Flow di Input</p>
                <div class="div-scrollabile table-responsive" id="risultatiRicerca01">
                </div>
                <hr>
                <p>Flow di Output</p>
                <div class="div-scrollabile table-responsive" id="risultatiRicerca02">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <p class="text-center fs-5 fw-bold">Sankey graph del Product System</p>
            </div>
        </div>
    </div>
    `;
}

function creaViewTableImpactCategoriesValue() {
    return `
        <table data-bs-spy="scroll" class="table table-striped table-bordered table-scrollabile" id="tabella">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome Impact</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità</th>
                </tr>
            </thead>
            <tbody id="datiTabella">
            </tbody>
        </table>
          
    `;
}

function creaViewRowImpactCategoriesValue(element,num){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.impactCategory.name}</td>
        <td>${element.amount}</td>
        <td>${element.impactCategory.refUnit}</td>
    </tr>
    `;
}
    
export async function creaTabellaCategorieImpatto(lista){
    
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");

    if(tabellaRisultatiRicerca){
        tabellaRisultatiRicerca.innerHTML = '';
        tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategoriesValue());
    }
    
    const tabellaRighe = document.getElementById("datiTabella");
    if(tabellaRighe){
        let num = 0; 
    
        if(isIterable(lista)){
            const addClass = document.getElementById("risultatiRicerca");
            const addNomeImpactCategory = document.getElementById("nomeImpactCategory");
            if(addClass && addNomeImpactCategory){
                addClass.classList.add("table-responsive");
                addClass.classList.add("div-scrollabile");
                addNomeImpactCategory.insertAdjacentHTML('beforeend',`<br><p>Nome del'impact category: ${lista[0].impactCategory.category}</p><hr>`)
            }
            
            lista.forEach(element => {
                num++;
                const riga = creaViewRowImpactCategoriesValue(element, num);
                if(riga){
                    tabellaRighe.insertAdjacentHTML('beforeend', riga);
                }
            });
        }
        else{
            num++;
            const riga = creaViewRowImpactCategoriesValue(lista, num);
            if(riga){
                tabellaRighe.insertAdjacentHTML('beforeend', riga);
            }
        }
    }
    
    creaGraficoImpactCategory(lista);

}

function creaGraficoImpactCategory(lista){

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
}

function creaViewTableEnviFlowsOutputValue() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabellaOutput">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità di misura</th>
                </tr>
            </thead>
            <tbody id="datiTabellaResultOutput">
            </tbody>
        </table>  
    `;
}

function creaViewTableEnviFlowsInputValue() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabellaInput">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità di misura</th>
                </tr>
            </thead>
            <tbody id="datiTabellaResultInput">
            </tbody>
        </table>  
    `;
}

function creaViewRowEnviFlowsValue(element,num,amount){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.flow.name}</td>
        <td>${element.flow.category}</td>
        <td>${amount}</td>         
        <td>${element.flow.refUnit}</td>      
    </tr>
    `;
}

export function creaTabellaFlowsInputOutputValue(lista){

    const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicerca01");
    const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicerca02");
    
    tabellaRisultatiRicercaInput.innerHTML='';
    tabellaRisultatiRicercaOutput.innerHTML = '';
    
    tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableEnviFlowsInputValue());
    tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableEnviFlowsOutputValue());

    const tabellaRigheInput = document.getElementById("datiTabellaResultInput");
    const tabellaRigheOutput = document.getElementById("datiTabellaResultOutput");
    console.log(lista);

    let numOutput = 0;
    let numInput = 0;

    if(!isIterable(lista)){

        if(lista.enviFlow.isInput){
            let classeRimuovere = document.getElementById("tabellaInput");
            classeRimuovere.classList.remove("table-scrollabile");
            let classeRimuovere1 = document.getElementById("risultatiRicerca");
            classeRimuovere1.classList.remove("div-scrollabile");
            numInput++;
            const riga = creaViewRowEnviFlowsValue(lista.enviFlow, numInput,lista.amount);
            tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
        }
        else{
            let classeRimuovere = document.getElementById("tabellaOutput");
            classeRimuovere.classList.remove("table-scrollabile");
            let classeRimuovere1 = document.getElementById("risultatiRicerca");
            classeRimuovere1.classList.remove("div-scrollabile");
            numOutput++;
            const riga = creaViewRowEnviFlowsValue(lista.enviFlow, numOutput,lista.amount);
            tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
        } 
    }
    else{
        for(let element of lista){
            
            if(element.enviFlow.isInput){
                numInput++;
                const riga = creaViewRowEnviFlowsValue(element.enviFlow, numInput,element.amount);
                tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
            }
            else{
                numOutput++;
                const riga = creaViewRowEnviFlowsValue(element.enviFlow, numOutput,element.amount);
                tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
            }
        }
    }
    
    if(numInput === 0){
        tabellaRisultatiRicercaInput.innerHTML="";
        tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun Flow di input</p>`);
    }
    if(numOutput === 0){
        tabellaRisultatiRicercaOutput.innerHTML="";
        tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun Flow di output</p>`) 
    }

}

function isIterable(obj) {
    // Verifica se l'oggetto ha il metodo Symbol.iterator
    return obj !== null && typeof obj !== 'undefined' && typeof obj[Symbol.iterator] === 'function';
}