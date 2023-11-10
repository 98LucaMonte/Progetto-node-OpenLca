class Api {

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

    dataProviders = async (vps) => {
        try {
            // Esegui una richiesta verso il tuo server VPS
            //http://109.205.180.220:3000/data/providers/
            const response = await fetch(vps + "data/providers");
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

    getProviders = async (vps, id) => {
        try {
            let url = vps + "data/providers/" + id;
            console.log(url);
            let resp = await fetch(url);
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

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

    //id del calcolo del Product System
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

}

export default Api;