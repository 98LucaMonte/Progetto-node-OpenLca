"use strict;"
import Api from "./api.js";
import {creaMain} from './templates/main-view.js'
import {creaHeader} from './templates/header-view.js'
import page from '//unpkg.com/page/page.mjs';

class App {

    constructor(header, main, footer) {

        const api = new Api();
        const vps = 'http://109.205.180.220:3000/';
        const vps1 = 'http://127.0.0.1:3000/';//docker run -p 3000:8080 -v $HOME/openLCA-data-1.4:/app/data --rm -d gdt-server -db elcd_3_2_greendelta_v2_pet_bonus_case_study
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
            
            this.getProductSystem(api,vps1);
            this.getImpactMethod(api,vps1);
            

            document.getElementById('buttonCalcolaProductSystem').addEventListener('click', async event => {
                event.preventDefault();

                const selectProductSystem = document.getElementById("listaProductSystem");
                const selectedOptionProductSystem = selectProductSystem.options[selectProductSystem.selectedIndex];
                const idProductSystem = selectedOptionProductSystem.id;

                const selectImpactMethod = document.getElementById("listaImpactMethod");
                const selectedOptionImpactMethod = selectImpactMethod.options[selectImpactMethod.selectedIndex];
                const optionIdImpactMethod = selectedOptionImpactMethod.id;

                if(idProductSystem === "selectedProductSystem" || optionIdImpactMethod === "selectedImpactMethod"){
                    console.log("Non si può effettuare il calcolo mancano degli input");
                }
                else{
                    
                    //contiene l'id dell'Impact Method e del NewSets 
                    const idList = optionIdImpactMethod.split("/");

                    if (idList.length === 2) {
                        const idImpactMethod = idList[0]; 
                        const idNewSet = idList[1];

                        console.log("idImpactMethod: " + idImpactMethod);
                        console.log("idNewSet: " + idNewSet);
                        console.log("idProductSystem: " + idProductSystem);

                        let result = await api.calcolaProductSystem(vps1,idProductSystem,idImpactMethod,idNewSet);
                        console.log("Calcola Product System");
                        console.log(result);
                    } else {
                        console.log("Errore in fase di split");
                    }
                }

            });


        });
        page();

    }

    getProductSystem = async (api,vps) => {
        
        const placeholder = document.getElementById("selectedProductSystem");
        let listaProductSystem = await api.getProductSystem(vps);
        console.log("ProductSystem");
        console.log(listaProductSystem);

        if(listaProductSystem.length == 0){
            placeholder.innerHTML = "Non ci sono Product System selezionabili";          
        }else{
            const selectProductSystem = document.getElementById("listaProductSystem");
            placeholder.innerHTML = "Seleziona un Product System";          
            for (let i = 0; i < listaProductSystem.length; i++) {
                let option = document.createElement("option");
                option.value = listaProductSystem[i].name; 
                option.text = listaProductSystem[i].name;
                option.id = listaProductSystem[i]["@id"]; 
                selectProductSystem.appendChild(option);
            }
        }

    }

    getImpactMethod = async (api,vps) => {
        
        const placeholder = document.getElementById("selectedImpactMethod");        
        let listaImpactMethod = await api.getImpactMethod(vps);
        console.log("impact-method");
        console.log(listaImpactMethod);

        if(listaImpactMethod.length == 0){
        
            placeholder.innerHTML = "Non ci sono Impact method selezionabili";          
        
        }else{
            
            const selectImpactMethod = document.getElementById("listaImpactMethod");
            placeholder.innerHTML = "Seleziona un Impact Method";          
            
            for (let i = 0; i < listaImpactMethod.length; i++) {
                
                let option = document.createElement("option");

                if(listaImpactMethod[i].hasOwnProperty("nwSets")){
                    option.value = listaImpactMethod[i].name; 
                    option.text = listaImpactMethod[i].name;
                    option.id = listaImpactMethod[i]["@id"]+"/"+listaImpactMethod[i].nwSets[0]["@id"];
                    selectImpactMethod.appendChild(option);
                }

            }
        }

    }

}

export default App;