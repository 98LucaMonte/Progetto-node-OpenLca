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
//Funzione per creare un PDF
export function creaPDF(idCalcolo) {
    return __awaiter(this, void 0, void 0, function* () {
        //Crea un nuovo documento PDF
        const doc = new jsPDF();
        const datiCalcolo = yield apiResultQueries.getRichiestaFinale(idCalcolo);
        const nomeProductSystem = "" + datiCalcolo.techFlow.provider.name;
        const listaInventory = yield apiFlowResults.getInventoryResult(idCalcolo);
        console.log(listaInventory);
        const listaImpactCategory = yield apiImpactResults.getTotalImpacts(idCalcolo);
        //Costruzione dati per la tabella degli impactCategory
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
        }).sort((a, b) => {
            const nomeA = a.Nome.toUpperCase();
            const nomeB = b.Nome.toUpperCase();
            return nomeA.localeCompare(nomeB);
        });
        //Costruzione dati per il grafico degli impactCategory
        let datiGraficoImpactCategory = listaImpactCategory.sort(function (a, b) {
            return b.amount - a.amount;
        }).slice(0, 5).map((elemento) => {
            const amountFormatted = parseFloat("" + elemento.amount).toFixed(7);
            indice++;
            return {
                'Num': "" + indice,
                'Nome': elemento.impactCategory.name,
                'Categoria': elemento.impactCategory.category,
                'Quantità': amountFormatted + " " + elemento.impactCategory.refUnit
            };
        });
        //Costruzione tabella
        let headers = ['Num', 'Nome', 'Categoria', 'Quantità'];
        let config = {
            "printHeaders": true,
            "autoSize": true,
            "fontSize": 10
        };
        doc.setFontSize(14);
        //Titolo del PDF
        doc.text("Risultati del calcolo del sistema di prodotto: " + nomeProductSystem, 10, 10);
        doc.setFontSize(10);
        //Intestazione prima tabella
        doc.text("Tabella che mostra le categorie di impatto del sistema di prodotto appena calcolato", 10, 20);
        //Inserimento tabella
        doc.table(10, 30, datiTabellaImpactCategory, headers, config);
        //Inserimento nuova pagina
        doc.addPage();
        // Costruzione grafico 
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 200;
        let barWidth = canvas.width / datiGraficoImpactCategory.length;
        let maxValue = Math.max(...datiGraficoImpactCategory.map(item => parseFloat(item.Quantità)));
        let scaleFactor = canvas.height / maxValue;
        // Definizione dei colori per le barre
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33E5', '#E5FF33'];
        if (ctx != null) {
            // Disegna le barre sul canvas
            datiGraficoImpactCategory.forEach((item, index) => {
                let x = index * barWidth;
                let y = canvas.height - parseFloat(item.Quantità) * scaleFactor;
                let barHeight = parseFloat(item.Quantità) * scaleFactor;
                if (ctx) {
                    ctx.fillStyle = colors[index];
                    ctx.fillRect(x, y, barWidth, barHeight);
                }
            });
            // Disegna la legenda
            ctx.font = '12px Arial';
            ctx.fillStyle = '#000';
            datiGraficoImpactCategory.forEach((item, index) => {
                if (ctx)
                    ctx.fillText(item.Nome, index * 100, canvas.height + 20);
            });
        }
        // Converti il canvas in un'immagine data URL
        let dataURL = canvas.toDataURL();
        // Aggiungi l'immagine al documento PDF
        doc.addImage(dataURL, 'PNG', 10, 10, 400, 200);
        // Salva il documento come file PDF
        doc.save("Report_" + nomeProductSystem + ".pdf");
    });
}
