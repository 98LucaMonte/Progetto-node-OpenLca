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

    getProviders = async (vps,id,name,type) => {
        try {
            let url = `${vps}data/providers/?id=${id}`;
            console.log(url);
            let resp = await fetch(url);    
            let v = await resp.json();
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }

    /*getProviders = async (vps, id,name,type) => {
        try {
            let resp = await fetch(vps+"data/get/providers", {
                method: "POST",
                body: JSON.stringify({
                    jsonrpc: "2.0",                    
                    params: {
                        // only the ID is required here
                        "@type": type,
                        "@id": id,
                        name: name
                    }
                })
            });
            let v = await resp.json();
            console.log(v);
            return v;
        } catch (error) {
            console.error('Errore durante la connessione:', error);
        }
    }*/

}

export default Api;