//const vps:string = 'http://109.205.180.220:3000/'; //indirizzo vps 
const vps:string = 'http://127.0.0.1:3000/'; // docker run -p 3000:8080 -v $HOME/openLCA-data-1.4:/app/data --rm -d gdt-server -db case_study

export class ApiCalculation {

    /** Questo metodo serve per selezionare la versione del db.
     *
     * @returns {Json} - Json che contiene informazioni sulla versione del db.
     */
    version = async () => {
        try {
            // Esegui una richiesta verso il tuo server VPS
            const response = await fetch(vps + "api/version");
            if (response.ok) {
                console.log('Connessione riuscita');
                let data = await response.json();
                return data;
                // Puoi fare qualcos'altro qui se la connessione ha successo
            } else {
                console.error('Errore durante la connessione');
            }
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** Questo metodo serve per selezionare dei dati dal db
     *
     * @param {string} type - Identificativo del Product system che si vuole calcolare.
     * @returns {json} - Json che contiene tutti i dati di un certo type.
     */
    getAllData = async(type:string)=>{
        try {
            let url = vps + "data/"+type+"/all";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /** Questo metodo serve per selezionare dei dati dal db
     *
     * @param {string} type - Identificativo del Product system che si vuole calcolare.
     * @returns {json} - Json che contiene tutti i dati di un certo type.
     */
    getData = async(type:string) =>{
        try {
            let url = vps + "data/"+type+"/";
            console.log(url);
                
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /**Questo metodo serve per calcolare le caratteristiche di impatto di un Product system.
     *
     * @param {String} idProductSystem - Identificativo del Product system che si vuole calcolare.
     * @param {String} idImpactMethod - Identificativo del'Impact method che si vuole usare per effettuare il calcolo.
     * @param {String} idNewSet - Identificativo del newSets.
     * @returns {Json} - Json che contiene informazioni sul calcolo del product system (come ad esempio l'id del calcolo).
     */
    calcolaProductSystem = async (idProductSystem:string, idImpactMethod:string, idNewSet:string) => {
        try {
            let url = vps + "result/calculate";
            console.log(url);

            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    target: {
                        "@type": "ProductSystem",
                        "@id": idProductSystem
                    },
                    impactMethod: {
                        "@id": idImpactMethod
                    },
                    nwSet: {
                        "@id": idNewSet
                    },
                    withCosts: true,
                    amount: 1.0
                })
            });

            if (response.ok) {
                //La richiesta ha avuto successo
                const responseData = await response.json();
                return responseData;
            } else {
                //Gestisco l'errore se la richiesta non ha avuto successo
                console.error('Errore nella risposta HTTP:', response.status, response.statusText);
                return response;
            }
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /**Questo metodo serve per sapere lo stato del calcolo del Product system che si sta appunto calcolando.
     *
     * @param {String} idCalcolo - Identificativo del calcolo appena effettuato.
     * @returns {Json} - Json che contiene informazioni sullo stato del calcolo.
     */
    getStatoCalcolo = async (idCalcolo:string)=> {
        try {
            let url = vps + "result/"+idCalcolo+"/state";
            console.log(url);
            
            console.log("Stiamo calcolando...");
            let resp = await fetch(url);
            let v = await resp.json();
            return v.isReady;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /**Questo metodo serve per creare un Product system.
     *
     * @param {String} idProcess - Identificativo del process da associare al ProductSystem.
     * @returns {Json} - Json che contiene informazioni sullo stato del calcolo.
     */
    nuovoProductSystem = async (idProcess:string) => {
        try {
            let url = vps + "data/create-system";
            console.log(url);
            
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "process": {
                        "@id": idProcess
                    }
                })
            });

            if (response.ok) {
                //La richiesta ha avuto successo
                const responseData = await response.json();
                return responseData;
            } else {
                //Gestisco l'errore se la richiesta non ha avuto successo
                console.error('Errore nella risposta HTTP:', response.status, response.statusText);
                return response;
            }
        } catch (error) {
            console.log("sono qui")
            console.error('Errore durante la connessione:', error);
        }
    }
    
    /**Questo metodo serve per creare un nuovo elemento che può essere un flow o un process.
     *
     * @param {String} type - Nome dell'elemento che si vuole creare.
     * @returns {Json} - Json che contiene informazioni sull'elemento appena creato.
     */
    putNuovoElement = async(type:string,json:object) =>{
        try {
            let url = vps + "data/"+type+"/";
            console.log(url);
            
            
            let response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(json)
            });

            let v = await response.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }
}
