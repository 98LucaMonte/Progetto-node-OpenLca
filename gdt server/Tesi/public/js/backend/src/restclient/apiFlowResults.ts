class ApiFlowResults {

    /**(5.6.1) testato
     * Questo metodo ritorna l'inventario dei flussi del Product system calcolato.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
     */
    getInventoryResult = async (vps:string,idCalcolo:string) => {
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

    getTotalFlowValueOf = async (vps:string,idCalcolo:string,element:string) => {
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

    getFlowContributionsOf = async (vps:string,idCalcolo:string,element:string) => {
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

    getDirectInterventionsOf = async (vps:string,idCalcolo:string,techFlow:string) => {
        try {
                
            let url = vps + "result/"+idCalcolo+"/direct-interventions-of/"+techFlow;
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    getDirectInterventionsOfEnviFlowTechFlow = async (vps:string,idCalcolo:string,element:string,techFlow:string) => {
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

    getFlowIntensitiesOf = async (vps:string,idCalcolo:string,techFlow:string) => {
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

    getFlowIntensityOfEnviFlowTechFlow = async (vps:string,idCalcolo:string,idEnviFlow:string,techFlow:string) => {
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

    getTotalInterventionsOf = async (vps:string,idCalcolo:string,techFlow:string) => {
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

    getTotalInterventionOfEnviFlowTechFlow = async (vps:string,idCalcolo:string,enviFlow:string,techFlow:string) => {
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
    getUpstreamInterventionsOf = async (vps:string,idCalcolo:string,enviFlow:string) => {
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

export default ApiFlowResults;
