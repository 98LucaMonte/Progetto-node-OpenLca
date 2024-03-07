import { creaViewRowImpactCategoriesValue, creaViewTableImpactCategoriesValue,
         creaViewRowEnviFlowsValue, creaViewTableEnviFlowsInputValue, creaViewTableEnviFlowsOutputValue } from './tabelle-view.js'
import { creaGraficoImpactCategory, setCategoryForSelect, creaGraficoFlow } from './grafici-view.js'
import { ApiImpactResults } from '../../backend/apiImpactResults.js';
import { ApiFlowResults } from '../../backend/apiFlowResult.js';
import { ApiResultQueries } from '../../backend/apiResultQueries.js';
import { EnviFlowData, ImpactCategoryData } from '../../model/types.js';

const apiImpactResults = new ApiImpactResults();
const apiFlowResults = new ApiFlowResults();
const apiResultQueries = new ApiResultQueries();

export async function resultView(contentPage: HTMLDivElement,idCalcolo:string) {

    contentPage.innerHTML = "";
    let calcoloRichiesto = apiResultQueries.getRichiestaFinale(idCalcolo);
    console.log(calcoloRichiesto);
    contentPage.insertAdjacentHTML('beforeend', creaPaginaRisultati("pippo","pluto"));
    const divResult :HTMLDivElement | null = document.getElementById("risultatiRicerca") as HTMLDivElement | null;
    if(divResult){
        await creaTabellaCategorieImpatto(idCalcolo);
        await creaTabellaFlowsInputOutputValue(idCalcolo);
    }
}

function creaPaginaRisultati(productSystem:string,impactMethod:string) {
    return `
<div class="container">
    <h1>Pagina dei Risultati</h1> 
    <p>Tale pagina mostra i risultati del calcolo del Product System:${productSystem} calcolato con questo Impact Method ${impactMethod}<p>
    
    <div class="row row-style">
        <p class="text-start fs-5 fw-bold">
            <a class="btn btn-outline-secondary" role="button" id="creaPdf">Crea Pdf</a>    
            <br>
            Inventario del Product System
        </p>
        <p class="text-start fs-6">Questi grafici e tabelle illustrano i flow ovvero gli input e gli output del processo appartente al Product System.</p>
        
        <div class="col-sm-6"> 
            <p><strong>Flow di Input</strong></p>
            <div class="div-scrollabile table-responsive" id="risultatiRicerca01"></div>
        </div>
        
        <div class="col-sm-5"> 
            <p><strong>I 5 principali contributi ai risultati dei flow di input</strong></p>

            <select class="form-select form-select-sm" aria-label="Small select example" id="listaCategorieFlow1">
                <option selected id="selectedCategorieFlow1">Seleziona una categoria</option>
            </select>
            <div id="diagram1">
                <canvas id="myChart1"></canvas>
            </div> 
        </div>

    </div>

    <div class="row row-style ">
        

        <div class="col-sm-6"> 
            <p><strong>Flow di Output</strong></p>
            <div class="div-scrollabile table-responsive" id="risultatiRicerca02"></div>
        </div>

        <div class="col-sm-6"> 
            <p><strong>I 5 principali contributi ai risultati dei flow di output</strong></p>
    
            <select class="form-select form-select-sm" aria-label="Small select example" id="listaCategorieFlow2">
                <option selected id="selectedCategorieFlow2">Seleziona una categoria</option>
            </select>
            <div id="diagram2">
                <canvas id="myChart2"></canvas>
            </div> 
        </div>

    </div>


    <div class="row row-style ">

        <p class="text-start fs-5 fw-bold">Impact Category</p>
        
        <div class="col-sm-6">
            <p class="text-start fs-6" id="nomeImpactCategory">Questa tabella illustra le categorie di impatto del Product System appena Calcolato.</p>
            <div id="risultatiRicerca"></div>
        </div>

        <div class="col-sm-5">
            <p>Grafico che illustra i sette principali Impact category</p>
            <canvas id="myChart"></canvas>
        </div> 
    </div>
       
    </div>
    <div class="row row-style">
        <div class="col-sm">
            <p class="text-center fs-5 fw-bold">Sankey graph del Product System</p>
        </div>
    </div>
</div>
`;
}

async function creaTabellaCategorieImpatto(idCalcolo:string) {

    const lista:ImpactCategoryData[] = await apiImpactResults.getTotalImpacts(idCalcolo);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");

    if (tabellaRisultatiRicerca) {
        tabellaRisultatiRicerca.innerHTML = '';
        tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategoriesValue());
    }

    const tabellaRighe = document.getElementById("datiTabella");
    if (tabellaRighe) {
        let num = 0;

        if (isIterable(lista)) {
            const addClass = document.getElementById("risultatiRicerca");
            const addNomeImpactCategory = document.getElementById("nomeImpactCategory");
            if (addClass && addNomeImpactCategory) {
                addClass.classList.add("table-responsive");
                addClass.classList.add("div-scrollabile");
                addNomeImpactCategory.insertAdjacentHTML('beforeend', `<br><p>Nome del'impact category: ${lista[0].impactCategory.category}</p>`)
            }

            lista.forEach(element => {
                num++;
                const riga = creaViewRowImpactCategoriesValue(element);
                if (riga) {
                    tabellaRighe.insertAdjacentHTML('beforeend', riga);
                }
            });
        }
        else {
            num++;
            let element:ImpactCategoryData = lista[0];
            const riga = creaViewRowImpactCategoriesValue(element);
            if (riga) {
                tabellaRighe.insertAdjacentHTML('beforeend', riga);
            }
        }
    }

    creaGraficoImpactCategory(lista);

}

async function creaTabellaFlowsInputOutputValue(idCalcolo:string) {

    const lista:EnviFlowData[] = await apiFlowResults.getInventoryResult(idCalcolo);

    let listaOrdinata:EnviFlowData[] = lista.sort(function (a:EnviFlowData, b:EnviFlowData) {
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

    const tabellaRisultatiRicercaInput: HTMLElement | null = document.getElementById("risultatiRicerca01") as HTMLElement | null;
    const tabellaRisultatiRicercaOutput: HTMLElement | null = document.getElementById("risultatiRicerca02") as HTMLElement | null;

    if(tabellaRisultatiRicercaInput && tabellaRisultatiRicercaOutput){
        tabellaRisultatiRicercaInput.innerHTML = '';
        tabellaRisultatiRicercaOutput.innerHTML = '';

        tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableEnviFlowsInputValue());
        tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableEnviFlowsOutputValue());
    }
    

    const tabellaRigheInput = document.getElementById("datiTabellaResultInput");
    const tabellaRigheOutput = document.getElementById("datiTabellaResultOutput");
    
    let numOutput = 0;
    let numInput = 0;

    if(tabellaRigheOutput && tabellaRigheInput){
        if (!isIterable(listaOrdinata)) {

            if (listaOrdinata[0].enviFlow.isInput) {
                let classeRimuovere = document.getElementById("tabellaInput");
                let classeRimuovere1 = document.getElementById("risultatiRicerca");
    
                if(classeRimuovere && classeRimuovere1){
                    classeRimuovere.classList.remove("table-scrollabile");
                    classeRimuovere1.classList.remove("div-scrollabile");
                }
                
                numInput++;
                const riga = creaViewRowEnviFlowsValue(listaOrdinata[0]);
                tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
            }
            else {
                let classeRimuovere = document.getElementById("tabellaOutput");
                let classeRimuovere1 = document.getElementById("risultatiRicerca");
                if(classeRimuovere && classeRimuovere1){
                    classeRimuovere.classList.remove("table-scrollabile");
                    classeRimuovere1.classList.remove("div-scrollabile");
                }
                
                numOutput++;
                const riga = creaViewRowEnviFlowsValue(listaOrdinata[0]);
                tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
            }
        }
        else {
            for (let element of listaOrdinata) {
    
                if (element.enviFlow.isInput) {
                    numInput++;
                    const riga = creaViewRowEnviFlowsValue(element);
                    tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
                }
                else {
                    numOutput++;
                    const riga = creaViewRowEnviFlowsValue(element);
                    tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
                }
            }
        }
    }

    
    if(tabellaRisultatiRicercaInput && tabellaRisultatiRicercaOutput){
        if (numInput === 0) {
            tabellaRisultatiRicercaInput.innerHTML = "";
            tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun Flow di input</p>`);
        }
        if (numOutput === 0) {
            tabellaRisultatiRicercaOutput.innerHTML = "";
            tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun Flow di output</p>`)
        }
    }
    

    let arrayCategorieInput = getCategorieFlow(listaOrdinata, true);
    setCategoryForSelect(arrayCategorieInput, 1);
    let arrayCategorieOutput = getCategorieFlow(listaOrdinata, false);
    setCategoryForSelect(arrayCategorieOutput, 2);

}

export async function inserisciGraficoFlow(idCalcolo:string, categoria:string, isInput:boolean) {

    const lista:EnviFlowData[] = await apiFlowResults.getInventoryResult(idCalcolo);

    if (isInput)
        creaGraficoFlow(lista, categoria, true, 1);
    else
        creaGraficoFlow(lista, categoria, false, 2);
}

function getCategorieFlow(lista:EnviFlowData[], isInput: boolean):any {
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

function isIterable(obj:any) {
    // Verifica se l'oggetto ha il metodo Symbol.iterator
    return obj !== null && typeof obj !== 'undefined' && typeof obj[Symbol.iterator] === 'function';
}