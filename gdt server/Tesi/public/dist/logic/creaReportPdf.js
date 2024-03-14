var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiFlowResults } from "../backend/apiFlowResult";
import { ApiImpactResults } from "../backend/apiImpactResults";
//@ts-ignore
const { jsPDF } = window.jspdf;
const apiFlowResults = new ApiFlowResults();
const apiImpactResults = new ApiImpactResults();
// Funzione per creare un PDF
export function creaPDF(idCalcolo) {
    return __awaiter(this, void 0, void 0, function* () {
        // Crea un nuovo documento PDF
        const doc = new jsPDF();
        const listaInvetory = yield apiFlowResults.getInventoryResult(idCalcolo);
        const listaImpactCategory = yield apiImpactResults.getTotalImpacts(idCalcolo);
        // Aggiungi testo al documento
        doc.text("Hello World!", 10, 10);
        // Salva il documento come file PDF
        doc.save("example.pdf");
    });
}
