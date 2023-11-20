class ApiImpactCategories {

    /** (5.7)
     * Questo metodo restituisce le categorie di impatto di un risultato. 
     * Le righe della matrice di impatto C sono indicizzate in base a queste categorie 
     * di impatto e le colonne in base agli m flussi di intervento del sistema. 
     * C contiene i rispettivi fattori di caratterizzazione dei flussi di intervento.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getImpactCategories = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/impact-categories";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** (5.7.1)
     * Questo metodo restituisce il risultato della valutazione dell'impatto del sistema di prodotto calcolato.
     * 
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getImpactAssessmentResulte = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/total-impacts";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** (5.7.2) 
     * Questo metodo restituisce il risultato della valutazione dell'impatto normalizzato del sistema di prodotto calcolato.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getNormalizedResults = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/total-impacts/normalized";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** (5.7.3) 
     * Questo metodo restituisce il risultato della valutazione dell'impatto ponderato del sistema di prodotto calcolato.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getWeightedResults = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/total-impacts/weighteds";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** (5.7.4)  DA FINIRE
     * Questo metodo restituisce il contributo diretto di ciascun processo j 
     * nel sistema al risultato della valutazione d'impatto di una categoria di impatto k.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getDirectContributions = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/direct-impact-values-of/{impact-category}";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** (5.7.5) DA FINIRE 
     * Questo metodo restituisce gli impatti diretti di un processo sul sistema di prodotto calcolato.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getDirectProcessResult = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/direct-impacts-of/{tech-flow}";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** (5.7.6) DA FINIRE
     * Questo metodo restituisce il risultato dell'impatto totale relativo ai requisiti totali tj 
     * di un flusso j della tecnosfera nel sistema di prodotto calcolato. 
     * Ciò include i contributi diretti, a monte e a valle relativi a $t_j$.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getTotalProcessResult = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/total-impacts-of/{tech-flow}";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** (5.7.7) DA FINIRE
     * Questo metodo restituisce gli impatti totali relativi a un'unità di prodotto 
     * in uscita o di rifiuti in ingresso di un flusso della tecnosfera j nella catena di approvvigionamento. 
     * Ciò include i contributi diretti, a monte e a valle relativi a un'unità di questo flusso.
     * 
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getIntensities = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/total-impacts-of-one/{tech-flow}";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** (5.7.8) DA FINIRE
     * Questo metodo restituisce i risultati a monte per un dato percorso 
     * in un albero di contribuzione a monte relativo a una categoria di impatto. 
     * Se il percorso è vuoto, viene restituita la radice di quell'albero.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getUpstreamResults = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/upstream-impacts-of/{impact-category}";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** (5.7.9) DA FINIRE
     * Questo metodo restituisce i nodi risultato di una data categoria di impatto per un dato percorso in un albero dei contributi a monte. 
     * Il percorso è una sequenza di flussi della tecnosfera che descrivono il percorso verso il nodo genitore dei nodi restituiti. 
     * Se il percorso è vuoto, viene restituita la radice dell'albero. 
     * Si noti che un tale albero a monte può essere infinitamente profondo quando il sistema calcolato ha cicli.
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getUpstreamTrees = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/upstream-impacts-of/{impact-category}";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

}

export default ApiImpactCategories;