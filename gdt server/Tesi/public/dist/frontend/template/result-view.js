var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { creaGraficoFlow } from './grafici-view.js';
import { ApiFlowResults } from '../../backend/apiFlowResult.js';
import { aggiungiGraficaCategorieImpatto, creaTabellaCategorieImpatto } from './result-view-impact.js';
import { aggiungiSankey, creaSankey } from './result-view-sankey.js';
import { aggiungiGraficaInventorio, creaTabellaFlowsInputOutputValue } from './result-view-inventory.js';
const apiFlowResults = new ApiFlowResults();
export function resultViewInventario(idCalcolo) {
    return __awaiter(this, void 0, void 0, function* () {
        const divInventario = document.getElementById("divRisultati");
        if (divInventario) {
            divInventario.innerHTML = '';
            divInventario.insertAdjacentHTML('beforeend', aggiungiGraficaInventorio());
            yield creaTabellaFlowsInputOutputValue(idCalcolo);
        }
    });
}
export function resultViewImpactCategory(idCalcolo) {
    return __awaiter(this, void 0, void 0, function* () {
        const divInventario = document.getElementById("divRisultati");
        if (divInventario) {
            divInventario.innerHTML = '';
            divInventario.insertAdjacentHTML('beforeend', aggiungiGraficaCategorieImpatto());
            const divResult = document.getElementById("risultatiRicerca");
            if (divResult) {
                yield creaTabellaCategorieImpatto(idCalcolo);
            }
        }
    });
}
export function resultViewSankey(idCalcolo) {
    return __awaiter(this, void 0, void 0, function* () {
        const divSankey = document.getElementById("divRisultati");
        if (divSankey) {
            divSankey.innerHTML = '';
            divSankey.insertAdjacentHTML('beforeend', aggiungiSankey());
            yield creaSankey(idCalcolo);
        }
    });
}
export function creaPaginaRisultati() {
    return `
<div class="container">
    <h1 class="margin-top:5%">Pagina dei Risultati</h1> 
    
    <div class="row">
        <div class="col-sm-10">
            <nav aria-label="breadcrumb" style="margin-top:5%!important">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item"><a href="/resultInventory">Inventario del Product System</a></li>
                    <li class="breadcrumb-item"><a href="/resultImpact">Impact Category</a></li>
                    <!--<li class="breadcrumb-item"><a href="/resultSankey">Sankey Graph</a></li>-->
                </ol>
            </nav>
        </div> 
        <div class="col-sm-2" style="margin-top:5%!important">
            <a class="btn btn-outline-secondary" role="button" id="creaPdf">Crea Report</a> 
        </div>    
    </div>

    <div id="divRisultati">
    </div>
 
</div>
`;
}
export function inserisciGraficoFlow(idCalcolo, categoria, isInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const lista = yield apiFlowResults.getInventoryResult(idCalcolo);
        if (isInput)
            creaGraficoFlow(lista, categoria, true, 1);
        else
            creaGraficoFlow(lista, categoria, false, 2);
    });
}
