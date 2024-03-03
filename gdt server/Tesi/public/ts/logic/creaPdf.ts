
import { ApiImpactResults } from "../backend/apiImpactResults";

import * as jsPDF from 'jspdf';
const doc = new jsPDF();
const apiImpactResults = new ApiImpactResults();

/*
export async function creaPDF(idCalcolo){
     
    //Prendo il nome del Product System per dare il nome al file e al titolo del file
    const selectProductSystem = document.getElementById("listaProductSystem");
    const selectedOptionProductSystem = selectProductSystem.options[selectProductSystem.selectedIndex];
    const nomeProductSystem = selectedOptionProductSystem.text;
    
    //Titolo del PDF
    doc.text("Risultati del calcolo di: "+nomeProductSystem, 20, 20);
    
    //Realizzo la tabella degli Impact category dell'impact Method selezionato.
    let listaImpact = await apiImpactResults.getTotalImpacts(idCalcolo);

    let headersImpact = ['#','Nome', 'Quantità' ,'Unità'];
    let dataImpact = [];
    let num = 0;
    listaImpact.forEach(element => {
        num++;
        let row = { '#': ''+num,'Nome': ''+element.impactCategory.name, 'Quantità': ''+element.amount ,'Unità':''+element.impactCategory.refUnit};
        dataImpact.push(row);
    });
    //Titolo della tabella degli Impact category
    doc.text("Tabella degli Impact Category", 20, 30);
    //Inserimento tabella
    doc.table(20, 40, dataImpact, headersImpact);

    doc.addPage();
    
    //Download del file PDF
    doc.save("Risultati del calcolo di "+nomeProductSystem+".pdf");    
}*/


   
