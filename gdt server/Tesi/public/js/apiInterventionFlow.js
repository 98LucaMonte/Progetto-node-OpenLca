
class ApiInterventionFlow {

    /** (5.6) testato 
     * Questo metodo restituisce i flussi di intervento m di un risultato. 
     * Questi sono i flussi che attraversano il confine con l'ambiente del sistema calcolato 
     * (ecco perché il nome abbreviato è EnviFlow nell'API). Nei calcoli regionalizzati questi flussi possono essere coppie di flussi e luoghi, 
     * lo stesso flusso può verificarsi in luoghi diversi (con fattori di caratterizzazione possibilmente diversi).
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getInterventionFlows = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/envi-flows";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

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

    /**(5.6.2) DA FINIRE
     * Questo metodo restituisce il contributo diretto di ciascun processo j nel sistema al risultato dell'inventario di un flusso i.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
     */
    getDirectContributions = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/direct-flow-values-of/{envi-flow}";
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /**(5.6.3) DA FINIRE
     * Questo metodo restituisce per ciascun processo j nel sistema di prodotto il risultato 
     * totale dell'inventario per un flusso j in questo punto della catena di 
     * approvvigionamento, compresi i contributi diretti, a monte e a valle (relativi al trattamento dei rifiuti).
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
     */
    getTotalValues = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/total-flow-values-of/{envi-flow}";
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /**(5.6.4) DA FINIRE
     * Questo metodo restituisce i flussi di intervento diretto legati alla produzione di un prodotto 
     * (o al trattamento di un rifiuto) di un processo j al fine di soddisfare la domanda del sistema prodotto.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
     */
    getDirectProcessResults = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/direct-flows-of/{tech-flow}";
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /**(5.6.5) DA FINIRE
     * Questo metodo restituisce i risultati totali relativi ai requisiti totali $t_j$ di un flusso della tecnosfera j) 
     * nel sistema di prodotto calcolato. Ciò include i contributi diretti, a monte e a valle relativi a $t_j$.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
     */
    getTotalProcessResults = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/total-flows-of/{tech-flow}";
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /**(5.6.6) DA FINIRE
     * Questo metodo restituisce gli interventi totali relativi a un'unità di prodotto in uscita o di rifiuti 
     * in ingresso di un flusso della tecnosfera j nella catena di approvvigionamento. 
     * Ciò include i contributi diretti, a monte e a valle relativi a un'unità di questo flusso.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
     */
    getIntensities = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/total-flows-of-one/{tech-flow}";
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /**(5.6.7) DA FINIRE
     * Questo metodo restituisce gli interventi diretti non scalati relativi al riferimento quantitativo di un processo j.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
     */
    getUnscaledFlows = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/unscaled-flows-of/{tech-flow}";
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /**(5.6.8) DA FINIRE
     * Questo metodo restituisce i risultati a monte per un dato percorso in un albero di contribuzione 
     * a monte relativo a un flusso di intervento. Se il percorso è vuoto, viene restituita la radice di quell'albero.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
     */
    getUpstreamResults= async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/upstream-interventions-of/{envi-flow}";
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /**(5.6.9) DA FINIRE
     * Questo metodo restituisce i nodi risultato di un dato flusso di intervento per un dato percorso in un albero di contribuzione a monte. 
     * Il percorso è una sequenza di flussi della tecnosfera che descrivono il percorso verso il nodo genitore dei nodi restituiti. 
     * Se il percorso è vuoto, viene restituita la radice dell'albero. 
     * Si noti che un tale albero a monte può essere infinitamente profondo quando il sistema calcolato ha cicli.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi del Product system calcolato.
     */
    getUpstreamTrees = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/upstream-interventions-of/{envi-flow}";
            console.log(url);
            let response = await fetch(url);
            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

}

export default ApiInterventionFlow;

