import {creaViewRowImpactCategoriesValue,creaViewTableImpactCategoriesValue,
        creaViewRowEnviFlowsValue,creaViewTableEnviFlowsInputValue,creaViewTableEnviFlowsOutputValue} from './templateTabelle.js'
import {creaGraficoImpactCategory,setCategoryForSelect,creaGraficoFlow} from './templateGrafici.js'

export function creaPaginaRisultati(){
    return `
    <div class="container">
        <h1>Pagina dei Risultati</h1> 
        <div class="row mb-2 mt-2">
            
            <p class="text-start fs-5 fw-bold">Inventario del Product System</p>
            <p class="text-start fs-6">Queste tabelle illustrano i flow ovvero gli input e gli output del processo appartente al Product System.</p>
            
            <div class="col-sm-6"> 
                <p><strong>Flow di Input</strong></p>
                <div class="div-scrollabile table-responsive" id="risultatiRicerca01"></div>
            </div>
            
            <div class="col-sm-6"> 
                <p><strong>Flow di Output</strong></p>
                <div class="div-scrollabile table-responsive" id="risultatiRicerca02"></div>
            </div>

        </div>

        <div class="row mb-2 mt-2">
            <div class="col-sm-6"> 
                <p><strong>I 5 principali contributi ai risultati dei flow di input - panoramica per categoria</strong></p>
                <select class="form-select form-select-sm" aria-label="Small select example" id="listaCategorieFlow1">
                    <option selected id="selectedCategorieFlow1">Seleziona una categoria</option>
                </select>
                <div>
                    <canvas id="myChart1"></canvas>
                </div> 
            </div>

            <div class="col-sm-6"> 
                <p><strong>I 5 principali contributi ai risultati dei flow di output - panoramica per categoria</strong></p>
                <select class="form-select form-select-sm" aria-label="Small select example" id="listaCategorieFlow2">
                    <option selected id="selectedCategorieFlow2">Seleziona una categoria</option>
                </select>
                <div>
                    <canvas id="myChart2"></canvas>
                </div> 
            </div>

        </div>


        <div class="row mb-2">

            <p class="text-start fs-5 fw-bold">Impact Category</p>
            
            <div class="col-sm-6">
                <p class="text-start fs-6" id="nomeImpactCategory">Questa tabella illustra le categorie di impatto del Product System appena Calcolato.</p>
                <div id="risultatiRicerca"></div>
            </div>

            <div class="col-sm-6">
                <p>Grafico che illustra i sette principali Impact category</p>
                <canvas id="myChart"></canvas>
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
                addNomeImpactCategory.insertAdjacentHTML('beforeend',`<br><p>Nome del'impact category: ${lista[0].impactCategory.category}</p>`)
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
    
    let listaOrdinata = lista.sort(function(a, b) {
        return b.amount - a.amount;
    });
    listaOrdinata.slice(0,7);

    creaGraficoImpactCategory(listaOrdinata);

}

export function creaTabellaFlowsInputOutputValue(lista){

    let listaOrdinata = lista.sort(function(a, b) {
        var nameA = a.enviFlow.flow.name.toUpperCase(); // Converti il nome in maiuscolo per fare un confronto case-insensitive
        var nameB = b.enviFlow.flow.name.toUpperCase(); // Converti il nome in maiuscolo per fare un confronto case-insensitive
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

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

    if(!isIterable(listaOrdinata)){

        if(listaOrdinata.enviFlow.isInput){
            let classeRimuovere = document.getElementById("tabellaInput");
            classeRimuovere.classList.remove("table-scrollabile");
            let classeRimuovere1 = document.getElementById("risultatiRicerca");
            classeRimuovere1.classList.remove("div-scrollabile");
            numInput++;
            const riga = creaViewRowEnviFlowsValue(listaOrdinata.enviFlow, numInput,listaOrdinata.amount);
            tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
        }
        else{
            let classeRimuovere = document.getElementById("tabellaOutput");
            classeRimuovere.classList.remove("table-scrollabile");
            let classeRimuovere1 = document.getElementById("risultatiRicerca");
            classeRimuovere1.classList.remove("div-scrollabile");
            numOutput++;
            const riga = creaViewRowEnviFlowsValue(listaOrdinata.enviFlow, numOutput,listaOrdinata.amount);
            tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
        } 
    }
    else{
        for(let element of listaOrdinata){
            
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

    let arrayCategorieInput = getCategorieFlow(listaOrdinata,true);
    setCategoryForSelect(arrayCategorieInput,1);
    let arrayCategorieOutput = getCategorieFlow(listaOrdinata,false);
    setCategoryForSelect(arrayCategorieOutput,2);

}

export function inserisciGrafico(lista,categoria,isInput){
    if(isInput)
        creaGraficoFlow(lista,categoria,true,1);
    else
        creaGraficoFlow(lista,categoria,false,2);
}

function getCategorieFlow(lista,isInput) {
    // Inizializza un set per memorizzare categorie uniche
    const categorieSet = new Set();

    // Scorrere gli elementi e aggiungere categorie uniche al set
    lista.forEach(elemento => {
        const categoria = elemento.enviFlow.flow.category;
        const elementInputOutput = elemento.enviFlow.isInput;
        // Aggiungi la categoria al set solo se non è già presente e isInput è true
        if (!categorieSet.has(categoria) && elementInputOutput == isInput) {
            categorieSet.add(categoria);
        }
    });

    // Converti il set in un array e ritorna
    return Array.from(categorieSet);
}

function isIterable(obj) {
    // Verifica se l'oggetto ha il metodo Symbol.iterator
    return obj !== null && typeof obj !== 'undefined' && typeof obj[Symbol.iterator] === 'function';
}