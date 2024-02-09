//const vps:string = 'http://109.205.180.220:3000/'; //indirizzo vps 
const vps:string = 'http://127.0.0.1:3000/'; // docker run -p 3000:8080 -v $HOME/openLCA-data-1.4:/app/data --rm -d gdt-server -db case_study

export class ApiTechnosphereFlows {

    /**
     * Questo metodo restituisce i requisiti totali dei flussi della tecnosfera 
     * necessari per soddisfare la domanda del sistema di prodotto calcolato.
     *
     * 
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getTotalRequirements = async (idCalcolo:string) => {
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

    /** I requisiti diretti di un processo j sono gli input e gli output in scala 
     * del prodotto collegato e i flussi di rifiuti di quel processo relativi alla domanda finale del sistema di prodotto.
     *
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getTotalRequirementsOfFlows = async ( idCalcolo:string, techFlow:string) => {
        try {
            
            let url = vps + "result/" + idCalcolo + "/total-requirements-of/" + techFlow;
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    };
    
    /**Il vettore di scala s contiene per ciascun processo j 
     * un fattore sj in base al quale il processo deve essere scalato per soddisfare la domanda del sistema di prodotto.
     *
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getScalingFactors = async (idCalcolo:string) => {
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

    /**
     *
     * 
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getScaledTechFlowsOf= async (idCalcolo:string,techFlow:string) => {
        try {
            let url = vps + "result/" + idCalcolo + "/scaled-tech-flows-of/" + techFlow;
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /**
     *
     * 
     * @param {String} idCalcolo - Identificativo del calcolo di un product system.
     * @returns {Json} - Json che contiene informazioni sui flussi della tecnosfera.
     */
    getUnscaledTechFlowsOf= async (idCalcolo:string,techFlow:string) => {
        try {
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
