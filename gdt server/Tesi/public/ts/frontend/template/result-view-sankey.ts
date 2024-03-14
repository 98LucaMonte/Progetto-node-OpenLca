import { ApiResultQueries } from '../../backend/apiResultQueries.js';
 
const apiResultQueries = new ApiResultQueries();

export async function creaSankey(idCalcolo:string) {
    
    let result = await apiResultQueries.getSankeyGraphData(idCalcolo);
    console.log(result);

}

export function aggiungiSankey(){
    return `<div class="row row-style" style="margin-top:5%!important">

    <p class="text-start fs-5 fw-bold">Sankey Graph</p>
     
</div>`
}