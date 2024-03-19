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
        const listaImpactCategory = yield apiImpactResults.getTotalImpacts(idCalcolo);
        const listaInventory = yield apiFlowResults.getInventoryResult(idCalcolo);
        console.log(listaInventory);
        doc.setFontSize(14);
        //Titolo del PDF
        doc.text("Risultati del calcolo del sistema di prodotto: " + nomeProductSystem, 10, 10);
        //Formazione formato dati per la tabella e inserimento dei dati nella tabella
        creaTabellaImpactCategory(doc, listaImpactCategory);
        //Inserimento nuova pagina
        doc.addPage();
        //Formazione formato dati per il grafico e inserimento dei dati nel grafuco
        //creaGraficoImpactCategory(doc,listaImpactCategory);
        //Salva il documento come file PDF
        doc.save("Report_" + nomeProductSystem + ".pdf");
    });
}
function creaTabellaImpactCategory(doc, listaImpactCategory) {
    //Costruzione dati per la tabella degli impactCategory
    let indice = 0;
    let datiTabellaImpactCategory = listaImpactCategory.sort((ele1, ele2) => {
        const nomeEle1 = ele1.impactCategory.name.toUpperCase();
        const nomeEle2 = ele2.impactCategory.name.toUpperCase();
        return nomeEle1.localeCompare(nomeEle2);
    }).map((elemento) => {
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
        "fontSize": 8
    };
    doc.setFontSize(10);
    //Intestazione prima tabella
    doc.text("Tabella che mostra le categorie di impatto del sistema di prodotto appena calcolato", 10, 20);
    //Inserimento tabella
    doc.table(10, 30, datiTabellaImpactCategory, headers, config);
}
/*
function creaGraficoImpactCategory(doc:any, listaImpactCategory:ImpactCategoryData[]) {
  // Costruzione dati per il grafico degli impactCategory
  let datiGraficoImpactCategory = listaImpactCategory.sort((a, b) => b.amount - a.amount).slice(0, 5);

  const listaNomeImpactCategory = datiGraficoImpactCategory.map(element => element.impactCategory.name);
  const listaQuantitaImpactCategory = datiGraficoImpactCategory.map(element => element.amount);


  const canvas = document.createElement('canvas');
  canvas.width = 400; // Imposta larghezza del canvas
  canvas.height = 400; // Imposta altezza del canvas

  const ctx = canvas.getContext('2d');

  //@ts-ignore
  const myChart = new Chart(ctx,{
    type: 'bar',
    data: {
      labels: listaNomeImpactCategory.slice(0, 5),
      datasets: [{
        data: listaQuantitaImpactCategory.slice(0, 5),
        fill: true,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          type: 'logarithmic',
          beginAtZero: true
        }
      }
    }
  });
  // Disegna il grafico sul canvas
  myChart.render();

   // Converti il canvas in immagine base64
   const dataURL = canvas.toDataURL('image/jpeg');

   // Inserisci l'immagine nel documento PDF
   doc.addImage(dataURL, 'JPEG', 10, 50, 180, 120);
  
}*/ 
