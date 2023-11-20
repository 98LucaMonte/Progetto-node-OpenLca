class ApiTechnosphereFlows {

    /** (5.5)
     * Questo metodo restituisce gli n flussi di tecnosfera di un risultato. Questi 
     * sono i flussi attraverso i quali sono collegati i processi del sistema calcolato. 
     * Ogni flusso della tecnosfera è una coppia di un prodotto o flusso di rifiuti e 
     * un fornitore in cui il fornitore è tipicamente un processo ma può anche essere un sistema di prodotto 
     * (un sottosistema) o anche un altro risultato.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getTechnosphereFlows = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/tech-flows";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** (5.5.1)
     * Un sistema di prodotto viene calcolato per un singolo valore di domanda per un flusso della tecnosfera: 
     * un prodotto in uscita o un input di rifiuti del sistema. È il riferimento quantitativo del sistema. 
     * Nel caso generale, un sistema può avere più valori di domanda organizzati in un 
     * vettore di domanda finale f che è indicizzato allo stesso modo della matrice tecnologica (si noti che un sistema a domanda multipla 
     * può essere trasformato in un sistema a domanda singola semplicemente aggiungendo un colonna di processo aggiuntiva alla matrice tecnologica).
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getRichiestaFinale = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/demand";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

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

    /** (5.5.3) DA FINIRE
     * I requisiti diretti di un processo j sono gli input e gli output in scala 
     * del prodotto collegato e i flussi di rifiuti di quel processo relativi alla domanda finale del sistema di prodotto.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getDirectRequirements = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/direct-requirements-of/{tech-flow}";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** (5.5.4) 
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
    /** (5.5.5) 
     * Il concetto di fattori di totalità è un po' complicato, ma sono molto utili per visualizzazioni come i diagrammi di Sankey. 
     * In breve, ridimensionano il risultato dell'intensità in un risultato totale. 
     * Un risultato di intensità è correlato a un'unità di output del prodotto (input di rifiuti) 
     * di un flusso della tecnosfera j inclusi i contributi diretti, a monte e a valle. 
     * Moltiplicando tale intensità per il fattore di totalità tfj si ottiene il risultato totale relativo 
     * al fabbisogno totale di prodotto (rifiuto) j. 
     * Moltiplicando direttamente l'intensità per i requisiti totali si raddoppierebbero i possibili loop.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getTotalityFactors = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/totality-factors";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** (5.5.6) DA FINIRE
     * I requisiti non scalati di un processo j 
     * sono i requisiti diretti del processo relativi al riferimento quantitativo di quel processo senza applicare un fattore di scala.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getUnscaledRequirements = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/unscaled-requirements-of/{tech-flow}";
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