"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiImpactResults_1 = require("../backend/apiImpactResults");
const jsPDF = __importStar(require("jspdf"));
const doc = new jsPDF();
const apiImpactResults = new apiImpactResults_1.ApiImpactResults();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYVBkZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzL2xvZ2ljL2NyZWFQZGYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGtFQUErRDtBQUUvRCw2Q0FBK0I7QUFDL0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUN4QixNQUFNLGdCQUFnQixHQUFHLElBQUksbUNBQWdCLEVBQUUsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRyJ9