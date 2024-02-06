class ApiImpactResults {

    /**(5.6.1) testato
     * Questo metodo ritorna l'inventario dei flussi del Product system calcolato.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
     */
    getTotalImpacts = async (vps:string,idCalcolo:string) => {
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

    getTotalImpactsNormalized = async (vps:string,idCalcolo:string) => {
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

    getTotalImpactsWeighted = async (vps:string,idCalcolo:string) => {
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

    getTotalImpactValueOf = async (vps:string,idCalcolo:string,idImpactCategory:string) => {
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

    getImpactContributionsOf= async (vps:string,idCalcolo:string,idImpactCategory:string) => {
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

    getDirectImpactsOf = async (vps:string,idCalcolo:string,techFlow:string) => {
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

    getDirectImpactOfImpactCategoryTechFlow = async (vps:string,idCalcolo:string,techFlow:string,idImpactCategory:string) => {
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

    getImpactIntensitiesOf = async (vps:string,idCalcolo:string,techFlow:string) => {
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

    getDirectImpactIntensityOfImpactCategoryTechFlow= async (vps:string,idCalcolo:string,techFlow:string,idImpactCategory:string) => {
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

    getTotalImpactsOf = async (vps:string,idCalcolo:string,techFlow:string) => {
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

    getTotalImpactOfImpactCategoryTechFlow = async (vps:string,idCalcolo:string,techFlow:string,idImpactCategory:string) => {
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

    getImpactFactorsOf = async (vps:string,idCalcolo:string,idImpactCategory:string) => {
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

    getImpactFactorsOfImpactCategoryEnviFlow = async (vps:string,idCalcolo:string,idImpactCategory:string,element:string) => {
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

    getFlowImpactsOf = async (vps:string,idCalcolo:string,idImpactCategory:string) => {
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

    getFlowImpactOfImpactCategoryEnviFlow = async (vps:string,idCalcolo:string,idImpactCategory:string,element:string) => {
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

export default ApiImpactResults;
