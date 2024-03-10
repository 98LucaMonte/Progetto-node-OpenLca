var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiResultQueries } from '../../backend/apiResultQueries.js';
const apiResultQueries = new ApiResultQueries();
export function creaSankey(idCalcolo) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield apiResultQueries.getSankeyGraphData(idCalcolo);
        console.log(result);
    });
}
export function aggiungiSankey() {
    return `<div class="row row-style" style="margin-top:5%!important">

    <p class="text-start fs-5 fw-bold">Sankey Graph</p>
     
</div>`;
}
