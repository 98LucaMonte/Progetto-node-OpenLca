class ApiCalculation {

    /** Questo metodo serve per selezionare la versione del db.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @returns {Json} - Json che contiene informazioni sulla versione del db.
     */
    version = async (vps) => {
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

    /**Questo metodo serve per selezionare i Product System disponibili.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @returns {Json} - Json che contiene i product system.
     */
    getProductSystem = async (vps) => {
        try {
            let url = vps + "data/product-system/all";
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

     /**Questo metodo serve per selezionare gli impact Method disponibili.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @returns {Json} - Json che contiene gli impact method.
     */
    getImpactMethod = async (vps) => {
        try {
            let url = vps + "data/impact-method/all";
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
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idProductSystem - Identificativo del Product system che si vuole calcolare.
     * @param {String} idImpactMethod - Identificativo del'Impact method che si vuole usare per effettuare il calcolo.
     * @param {String} idNewSet - Identificativo del newSets.
     * @returns {Json} - Json che contiene informazioni sul calcolo del product system (come ad esempio l'id del calcolo).
     */
    calcolaProductSystem = async (vps, idProductSystem, idImpactMethod, idNewSet) => {
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

    /**Questo metodo serve per sapere lo stato del Product system calcolato.
     *
     * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
     * @param {String} idCalcolo - Identificativo del calcolo appena effettuato.
     * @returns {Json} - Json che contiene informazioni sullo stato del calcolo.
     */
    getStatoCalcolo = async (vps,idCalcolo) => {
        try {
            let url = vps + "result/"+idCalcolo+"/state";
            console.log(url);
            
            console.log("Stiamo calcolando...");
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 3000);
            });

            
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }
}

export default ApiCalculation;