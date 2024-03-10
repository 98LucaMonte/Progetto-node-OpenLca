var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiImpactResults } from "../../backend/apiImpactResults.js";
import { creaGraficoImpactCategory } from "./grafici-view.js";
import { creaViewRowImpactCategoriesValue, creaViewTableImpactCategoriesValue } from "./tabelle-view.js";
const apiImpactResults = new ApiImpactResults();
export function aggiungiGraficaCategorieImpatto() {
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
</div>`;
}
export function creaTabellaCategorieImpatto(idCalcolo) {
    return __awaiter(this, void 0, void 0, function* () {
        const lista = yield apiImpactResults.getTotalImpacts(idCalcolo);
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
                    addNomeImpactCategory.insertAdjacentHTML('beforeend', `<br><p>Nome del'impact category: ${lista[0].impactCategory.category}</p>`);
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
                let element = lista[0];
                const riga = creaViewRowImpactCategoriesValue(element);
                if (riga) {
                    tabellaRighe.insertAdjacentHTML('beforeend', riga);
                }
            }
        }
        creaGraficoImpactCategory(lista);
    });
}
function isIterable(obj) {
    // Verifica se l'oggetto ha il metodo Symbol.iterator
    return obj !== null && typeof obj !== 'undefined' && typeof obj[Symbol.iterator] === 'function';
}
