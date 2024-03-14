import { ApiFlowResults } from "../backend/apiFlowResult";
import { ApiImpactResults } from "../backend/apiImpactResults";
import { EnviFlowData, ImpactCategoryData } from "../model/types";

//@ts-ignore
const { jsPDF } = window.jspdf;
const apiFlowResults = new ApiFlowResults();
const apiImpactResults = new ApiImpactResults();


// Funzione per creare un PDF
export async function creaPDF(idCalcolo: string): Promise<void> {
  // Crea un nuovo documento PDF
  const doc = new jsPDF();

  const listaInvetory:EnviFlowData[] = await apiFlowResults.getInventoryResult(idCalcolo);
  const listaImpactCategory:ImpactCategoryData[] = await apiImpactResults.getTotalImpacts(idCalcolo);


  // Aggiungi testo al documento
  doc.text("Hello World!", 10, 10);

  // Salva il documento come file PDF
  doc.save("example.pdf");
}