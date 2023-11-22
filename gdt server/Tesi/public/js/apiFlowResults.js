class ApiFlowResults {

    /**(5.6.1) testato
     * Questo metodo ritorna l'inventario dei flussi del Product system calcolato.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
     */
    getInventoryResult = async (vps,idCalcolo) => {
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

    
}

export default ApiFlowResults;
