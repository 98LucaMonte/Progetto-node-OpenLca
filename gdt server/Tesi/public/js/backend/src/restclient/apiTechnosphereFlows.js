class ApiTechnosphereFlows {

    /** (5.5.2) testato
     * Questo metodo restituisce i requisiti totali dei flussi della tecnosfera 
     * necessari per soddisfare la domanda del sistema di prodotto calcolato.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getTotalRequirements = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/total-requirements";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** testato
     * I requisiti diretti di un processo j sono gli input e gli output in scala 
     * del prodotto collegato e i flussi di rifiuti di quel processo relativi alla domanda finale del sistema di prodotto.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getTotalRequirementsOfFlows = async (vps, idCalcolo, techFlow) => {
        try {
            
            //let urlTechFlow = techFlow.provider["@id"]+"::"+techFlow.flow["@id"];
            //console.log(urlTechFlow);

            let url = vps + "result/" + idCalcolo + "/total-requirements-of/" + techFlow;
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    };
    
    /** (5.5.4) testato
     * Il vettore di scala s contiene per ciascun processo j 
     * un fattore sj in base al quale il processo deve essere scalato per soddisfare la domanda del sistema di prodotto.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getScalingFactors = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/scaling-factors";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** testato
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getScaledTechFlowsOf= async (vps,idCalcolo,techFlow) => {
        try {
            //let urlTechFlow = techFlow.provider["@id"]+"::"+techFlow.flow["@id"];
            //console.log(urlTechFlow);
            let url = vps + "result/" + idCalcolo + "/scaled-tech-flows-of/" + techFlow;
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** testato
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getUnscaledTechFlowsOf= async (vps,idCalcolo,techFlow) => {
        try {
            //let urlTechFlow = techFlow.provider["@id"]+"::"+techFlow.flow["@id"];
            //console.log(urlTechFlow);
            let url = vps + "result/" + idCalcolo + "/unscaled-tech-flows-of/" + techFlow;
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }
    
}

export default ApiTechnosphereFlows;