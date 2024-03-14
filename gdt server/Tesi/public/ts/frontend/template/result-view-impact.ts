import { ApiImpactResults } from "../../backend/apiImpactResults.js";
import { ImpactCategoryData } from "../../model/types.js";
import { creaGraficoImpactCategory } from "./grafici-view.js";
import { creaViewRowImpactCategoriesValue, creaViewTableImpactCategoriesValue } from "./tabelle-view.js";

const apiImpactResults = new ApiImpactResults();
 

export function aggiungiGraficaCategorieImpatto(){

    return `<div class="row row-style" style="margin-top:5%!important">

    <p class="text-start fs-5 fw-bold">Impact Category</p>
    
    <div class="col-sm-6">
        <p class="text-start fs-6" id="nomeImpactCategory">Questa tabella illustra le categorie di impatto del Product System appena Calcolato.</p>
        <div id="risultatiRicerca"></div>
    </div>

    <div class="col-sm-5">
        <p>Grafico che illustra i 5 principali Impact category</p>
        <canvas id="myChart"></canvas>
    </div> 
</div>`
}

export async function creaTabellaCategorieImpatto(idCalcolo:string) {

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

function isIterable(obj:any) {
    // Verifica se l'oggetto ha il metodo Symbol.iterator
    return obj !== null && typeof obj !== 'undefined' && typeof obj[Symbol.iterator] === 'function';
}