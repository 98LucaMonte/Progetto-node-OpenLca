"use strict;"
import Api from "./api.js";
import {creaMain} from './templates/main-view.js'
import {creaHeader} from './templates/header-view.js'
import page from '//unpkg.com/page/page.mjs';

class App {

    constructor(header, main, footer) {

        const api = new Api();
        const vps = 'http://109.205.180.220:3000/';
        const vps1 = 'http://127.0.0.1:3000/';//docker run -p 3000:8080 -v $HOME/openLCA-data-1.4:/app/data --rm -d gdt-server -db example
        this.header = header;
        this.main = main;
        this.footer = footer;
    
        //Inizio pagina di presentazione
        page('/', () => {            
            this.header.innerHTML = '';
            this.main.innerHTML = '';
            this.footer.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend', creaHeader());
            this.main.insertAdjacentHTML('beforeend', creaMain());
            
            // Chiama la funzione di verifica al caricamento della pagina
            document.getElementById("ButtonConnessioneVPS").addEventListener("click", async event =>{
                event.preventDefault();
                let data = await api.version(vps);
                console.log(data);
                
                let data1 = await api.dataProviders(vps);
                //const provider = data1[0].provider;
                console.log(data1);
                
                //let data2 = await api.getProviders(vps1,provider["@id"],provider.name,provider["@type"]);
                //console.log(data2);
            });
        });
        page();

    }

}

export default App;