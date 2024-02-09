//const vps:string = 'http://109.205.180.220:3000/'; //indirizzo vps 
const vps:string = 'http://127.0.0.1:3000/'; // docker run -p 3000:8080 -v $HOME/openLCA-data-1.4:/app/data --rm -d gdt-server -db case_study


export class ApiFlowResults {

    /**Questo metodo ritorna l'inventario dei flussi del Product system calcolato.
     *
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
     */
    getInventoryResult = async (idCalcolo:string) => {
        try {
            let url = vps + "result/"+idCalcolo+"/total-flows";
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getTotalFlowValueOf = async (idCalcolo:string,element:string) => {
        try {
            
            let url = vps + "result/"+idCalcolo+"/total-flow-value-of/"+ element+"::";
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getFlowContributionsOf = async (idCalcolo:string,element:string) => {
        try {
            
            let url = vps + "result/"+idCalcolo+"/flow-contributions-of/"+element;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getDirectInterventionsOf = async (idCalcolo:string,techFlow:string) => {
        try {
                
            let url = vps + "result/"+idCalcolo+"/direct-interventions-of/"+techFlow;
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getDirectInterventionsOfEnviFlowTechFlow = async (idCalcolo:string,element:string,techFlow:string) => {
        try {
            
            let url = vps + "result/"+idCalcolo+"/direct-intervention-of/"+element+"/"+techFlow;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getFlowIntensitiesOf = async (idCalcolo:string,techFlow:string) => {
        try {
        
            let url = vps + "result/"+idCalcolo+"/flow-intensities-of/"+techFlow;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getFlowIntensityOfEnviFlowTechFlow = async (idCalcolo:string,idEnviFlow:string,techFlow:string) => {
        try {
            
            let url = vps + "result/"+idCalcolo+"/flow-intensity-of/"+idEnviFlow+"/"+techFlow;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getTotalInterventionsOf = async (idCalcolo:string,techFlow:string) => {
        try {
         
            let url = vps + "result/"+idCalcolo+"/total-interventions-of/"+techFlow;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getTotalInterventionOfEnviFlowTechFlow = async (idCalcolo:string,enviFlow:string,techFlow:string) => {
        try {
            
            let url = vps + "result/"+idCalcolo+"/total-intervention-of/"+enviFlow+"/"+techFlow;
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    //not found url
    getUpstreamInterventionsOf = async (idCalcolo:string,enviFlow:string) => {
        try {
            
            let url = vps + "result/"+idCalcolo+"/upstream-interventions-of/"+enviFlow+"::";
            console.log(url);
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }                
            });
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

}
