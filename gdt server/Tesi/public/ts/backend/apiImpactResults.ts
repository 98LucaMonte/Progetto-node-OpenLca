//const vps:string = 'http://109.205.180.220:3000/'; //indirizzo vps 
const vps:string = 'http://127.0.0.1:3000/'; // docker run -p 3000:8080 -v $HOME/openLCA-data-1.4:/app/data --rm -d gdt-server -db case_study

export class ApiImpactResults {  

    /**Questo metodo ritorna l'inventario dei flussi del Product system calcolato.
     *
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
     */
    getTotalImpacts = async (idCalcolo:string) => {
        try {
            let url = vps + "result/"+idCalcolo+"/total-impacts";
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getTotalImpactsNormalized = async (idCalcolo:string) => {
        try {
            let url = vps + "result/"+idCalcolo+"/total-impacts/normalized";
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getTotalImpactsWeighted = async (idCalcolo:string) => {
        try {
            let url = vps + "result/"+idCalcolo+"/total-impacts/weighted/";
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getTotalImpactValueOf = async (idCalcolo:string,idImpactCategory:string) => {
        try {                
            let url = vps + "result/"+idCalcolo+"/total-impact-value-of/"+idImpactCategory;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getImpactContributionsOf= async (idCalcolo:string,idImpactCategory:string) => {
        try {

            let url = vps + "result/"+idCalcolo+"/impact-contributions-of/"+idImpactCategory;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getDirectImpactsOf = async (idCalcolo:string,techFlow:string) => {
        try {
           
            let url = vps + "result/"+idCalcolo+"/direct-impacts-of/"+techFlow;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getDirectImpactOfImpactCategoryTechFlow = async (idCalcolo:string,techFlow:string,idImpactCategory:string) => {
        try {
            
            let url = vps + "result/"+idCalcolo+"/direct-impact-of/"+idImpactCategory+"/"+techFlow;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getImpactIntensitiesOf = async (idCalcolo:string,techFlow:string) => {
        try {
            
            let url = vps + "result/"+idCalcolo+"/impact-intensities-of/"+techFlow;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getDirectImpactIntensityOfImpactCategoryTechFlow= async (idCalcolo:string,techFlow:string,idImpactCategory:string) => {
        try {
            
            let url = vps + "result/"+idCalcolo+"/impact-intensity-of/"+idImpactCategory+"/"+techFlow;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getTotalImpactsOf = async (idCalcolo:string,techFlow:string) => {
        try {

            let url = vps + "result/"+idCalcolo+"/total-impacts-of/"+techFlow;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getTotalImpactOfImpactCategoryTechFlow = async (idCalcolo:string,techFlow:string,idImpactCategory:string) => {
        try {
           
            let url = vps + "result/"+idCalcolo+"/total-impact-of/"+idImpactCategory+"/"+techFlow;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getImpactFactorsOf = async (idCalcolo:string,idImpactCategory:string) => {
        try {                
            let url = vps + "result/"+idCalcolo+"/impact-factors-of/"+idImpactCategory;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getImpactFactorsOfImpactCategoryEnviFlow = async (idCalcolo:string,idImpactCategory:string,element:string) => {
        try { 
                       
            let url = vps + "result/"+idCalcolo+"/impact-factor-of/"+idImpactCategory+"/"+element;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getFlowImpactsOf = async (idCalcolo:string,idImpactCategory:string) => {
        try {                
            let url = vps + "result/"+idCalcolo+"/flow-impacts-of/"+idImpactCategory;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getFlowImpactOfImpactCategoryEnviFlow = async (idCalcolo:string,idImpactCategory:string,element:string) => {
        try { 
                         
            let url = vps + "result/"+idCalcolo+"/flow-impact-of/"+idImpactCategory+"/"+element;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

}
 

