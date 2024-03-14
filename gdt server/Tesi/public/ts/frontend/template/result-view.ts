import { creaGraficoFlow } from './grafici-view.js'
import { ApiFlowResults } from '../../backend/apiFlowResult.js';
import { EnviFlowData} from '../../model/types.js';
import { aggiungiGraficaCategorieImpatto,creaTabellaCategorieImpatto } from './result-view-impact.js';
import { aggiungiSankey, creaSankey } from './result-view-sankey.js';
import { aggiungiGraficaInventorio, creaTabellaFlowsInputOutputValue } from './result-view-inventory.js';

 
const apiFlowResults = new ApiFlowResults();

export async function resultViewInventario(idCalcolo:string) {
    
    const divInventario: HTMLDivElement | null = document.getElementById("divRisultati")as HTMLDivElement | null;
    if(divInventario){
        divInventario.innerHTML = '';
        divInventario.insertAdjacentHTML('beforeend',aggiungiGraficaInventorio());
        await creaTabellaFlowsInputOutputValue(idCalcolo);
    }

}

export async function resultViewImpactCategory(idCalcolo:string) {
    
    const divInventario: HTMLDivElement | null = document.getElementById("divRisultati")as HTMLDivElement | null;
    if(divInventario){
        divInventario.innerHTML = '';
        divInventario.insertAdjacentHTML('beforeend',aggiungiGraficaCategorieImpatto());
        const divResult :HTMLDivElement | null = document.getElementById("risultatiRicerca") as HTMLDivElement | null;
        if(divResult){
            await creaTabellaCategorieImpatto(idCalcolo);
        }
    }
    
}

export async function resultViewSankey(idCalcolo:string){

    const divSankey: HTMLDivElement | null = document.getElementById("divRisultati")as HTMLDivElement | null;
    if(divSankey){
        divSankey.innerHTML = '';
        divSankey.insertAdjacentHTML('beforeend',aggiungiSankey());
        await creaSankey(idCalcolo);
    }
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

export async function inserisciGraficoFlow(idCalcolo:string, categoria:string, isInput:boolean) {

    const lista:EnviFlowData[] = await apiFlowResults.getInventoryResult(idCalcolo);

    if (isInput)
        creaGraficoFlow(lista, categoria, true, 1);
    else
        creaGraficoFlow(lista, categoria, false, 2);
}
