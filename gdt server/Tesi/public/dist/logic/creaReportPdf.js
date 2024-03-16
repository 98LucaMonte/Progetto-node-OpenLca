var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiFlowResults } from "../backend/apiFlowResult.js";
import { ApiImpactResults } from "../backend/apiImpactResults.js";
import { ApiResultQueries } from "../backend/apiResultQueries.js";
//@ts-ignore
const { jsPDF } = window.jspdf;
const apiFlowResults = new ApiFlowResults();
const apiImpactResults = new ApiImpactResults();
const apiResultQueries = new ApiResultQueries();
// Funzione per creare un PDF
export function creaPDF(idCalcolo) {
    return __awaiter(this, void 0, void 0, function* () {
        // Crea un nuovo documento PDF
        const doc = new jsPDF();
        const datiCalcolo = yield apiResultQueries.getRichiestaFinale(idCalcolo);
        const nomeProductSystem = "" + datiCalcolo.techFlow.provider.name;
        const listaInventory = yield apiFlowResults.getInventoryResult(idCalcolo);
        console.log(listaInventory);
        const listaImpactCategory = yield apiImpactResults.getTotalImpacts(idCalcolo);
        let indice = 0;
        let datiTabellaImpactCategory = listaImpactCategory.map((elemento) => {
            const amountFormatted = parseFloat("" + elemento.amount).toFixed(7);
            indice++;
            return {
                'Num': "" + indice,
                'Nome': elemento.impactCategory.name,
                'Categoria': elemento.impactCategory.category,
                'Quantità': amountFormatted + " " + elemento.impactCategory.refUnit
            };
        });
        let headers = ['Num', 'Nome', 'Categoria', 'Quantità'];
        let config = {
            "printHeaders": true,
            "autoSize": true,
            "fontSize": 10
        };
        // Imposta la dimensione del testo per le celle della tabella
        doc.setFontSize(12);
        //Titolo del PDF
        doc.text("Risultati del calcolo del sistema di prodotto: " + nomeProductSystem, 10, 10);
        // Aggiungi testo al documento
        doc.text("Tabella che mostra le categorie di impatto del sistema di prodotto appena calcolato", 10, 20);
        doc.table(10, 30, datiTabellaImpactCategory, headers, config);
        doc.addPage();
        // Salva il documento come file PDF
        doc.save("Report_" + nomeProductSystem + ".pdf");
    });
}
