import { ApiFlowResults } from "../backend/apiFlowResult.js";
import { ApiImpactResults } from "../backend/apiImpactResults.js";
import { ApiResultQueries } from "../backend/apiResultQueries.js";
import { EnviFlowData, ImpactCategoryData } from "../model/types.js";

//@ts-ignore
const { jsPDF } = window.jspdf;
const apiFlowResults = new ApiFlowResults();
const apiImpactResults = new ApiImpactResults();
const apiResultQueries = new ApiResultQueries();

// Funzione per creare un PDF
export async function creaPDF(idCalcolo: string): Promise<void> {
  // Crea un nuovo documento PDF
  const doc = new jsPDF();
  const datiCalcolo = await apiResultQueries.getRichiestaFinale(idCalcolo);
  const nomeProductSystem:string = ""+datiCalcolo.techFlow.provider.name;
  const listaInventory:EnviFlowData[] = await apiFlowResults.getInventoryResult(idCalcolo);
  console.log(listaInventory);
  const listaImpactCategory:ImpactCategoryData[] = await apiImpactResults.getTotalImpacts(idCalcolo);
  let indice:number = 0
  let datiTabellaImpactCategory = listaImpactCategory.map((elemento)=>{
    const amountFormatted = parseFloat(""+elemento.amount).toFixed(7);
    indice++;
    return {
      'Num.': ""+indice,
      'Nome': elemento.impactCategory.name,
      'Categoria': elemento.impactCategory.category,
      'Quantità': amountFormatted + " " + elemento.impactCategory.refUnit 
    };
  })
  let headers: string [] = ['Num.', 'Nome', 'Categoria', 'Quantità'];

  let config:object ={
    "printHeaders":true,
    "autoSize":true,
    "fontSize":10
  }
  
  // Imposta la dimensione del testo per le celle della tabella
  doc.setFontSize(12);
  
  //Titolo del PDF
  doc.text("Risultati del calcolo del sistema di prodotto: "+nomeProductSystem, 10, 10);

  // Aggiungi testo al documento
  doc.text("Tabella che mostra le categorie di impatto del sistema di prodotto appena calcolato", 10, 20);

  doc.table(10,30,datiTabellaImpactCategory,headers,config);

  doc.addPage();

  // Salva il documento come file PDF
  doc.save("Report_"+nomeProductSystem+".pdf");
}