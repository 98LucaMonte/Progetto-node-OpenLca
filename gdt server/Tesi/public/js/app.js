"use strict;"
import Api from "./api.js";
import ApiInterventionFlow from "./apiInterventionFlow.js";
import ApiTechnosphereFlows from "./apiTechnosphereFlows.js";
import {creaViewMain, creaViewMainRisultati, creaViewMainRisultatiInterventionFlows} from './templates/main-view.js';
import {creaViewTableTotalRequirements,creaViewRowTotalRequirements,
        creaViewTableTechnosphereFlows, creaViewRowTechnosphereFlows,
        creaViewTableFinalDemand,creaViewRowFinalDemand,
        creaViewTableDirectRequirements,creaViewRowDirectRequirements,
        creaViewTableScalingFactors,creaViewRowScalingFactors,
        creaViewTableTotalityFactors,creaViewRowTotalityFactors}from './templates/main-view-technosphere-flows.js';

import {creaViewTableInterventionFlowsInput ,creaViewTableInterventionFlowsOutput, creaViewRowInterventionFlows,
        creaViewTableInventoryResultInput , creaViewTableInventoryResultOutput, creaViewRowInventoryResult}from './templates/main-view-intervention-flow.js';

import { creaViewHeader,creaViewHeaderRisultati } from './templates/header-view.js'
import page from '//unpkg.com/page/page.mjs';

const api = new Api();
const apiTechnosphereFlows = new ApiTechnosphereFlows();
const apiInterventionFlow = new ApiInterventionFlow();

class App {

    constructor(header, main, footer) {

        const vps = 'http://109.205.180.220:3000/'; //indirizzo vps 
        const vps1 = 'http://127.0.0.1:3000/'; // docker run -p 3000:8080 -v $HOME/openLCA-data-1.4:/app/data --rm -d gdt-server -db elcd_3_2_greendelta_v2_pet_bonus_case_study
        let idCalcolo = null;
        this.header = header;
        this.main = main;
        this.footer = footer;

        //Inizio pagina di presentazione
        page('/', async () => {
            this.header.innerHTML = '';
            this.main.innerHTML = '';
            this.footer.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend', creaViewHeader());
            this.main.insertAdjacentHTML('beforeend', creaViewMain());
            idCalcolo = null;

            //Prendo i product system disponibili dal db
            await this.getProductSystem(api, vps1);
            //Prendo gli impact method disponibili dal db
            await this.getImpactMethod(api, vps1);

            document.getElementById('buttonCalcolaProductSystem').addEventListener('click', async event => {
                event.preventDefault();
                idCalcolo = await this.calcolaProductSystem(api,vps1,idCalcolo);
                if(idCalcolo !== undefined){
                    page.redirect('/totalRequirements');
                }
                
            });
        });
        page('/technosphereFlows', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaViewMainRisultati());
            const listaTechnosphereFlows = await apiTechnosphereFlows.getTechnosphereFlows(vps1, idCalcolo);
            if (listaTechnosphereFlows.length != 0) {
                this.creaTabellaTechnosphereFlows(listaTechnosphereFlows);
            }
        });
        page('/finalDemand', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaViewMainRisultati());
            const richiestaFinale = await apiTechnosphereFlows.getRichiestaFinale(vps1, idCalcolo);
            console.log(richiestaFinale);
            if (richiestaFinale.length != 0) {
                this.creaTabellaFinalDemand(richiestaFinale);                                                                         
            }
        });
        page('/totalRequirements', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaViewMainRisultati());
            const listaTotalRequirements = await apiTechnosphereFlows.getTotalRequirements(vps1, idCalcolo);
            if (listaTotalRequirements.length != 0) {
                this.creaTabellaTotalRequirements(listaTotalRequirements);
            }
        });
        page('/directRequirements', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaViewMainRisultati());
            const techFlow = await apiTechnosphereFlows.getRichiestaFinale(vps1, idCalcolo);
            const listaDirectRequirements = await apiTechnosphereFlows.getDirectRequirements(vps1, idCalcolo,techFlow.techFlow);
            if (listaDirectRequirements.length != 0) {
                this.creaTabellaDirectRequirements(listaDirectRequirements);
            }
        });
        page('/scalingFactors', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaViewMainRisultati());
            const listaScalingFactors = await apiTechnosphereFlows.getScalingFactors(vps1, idCalcolo);
            if (listaScalingFactors.length != 0) {
                this.creaTabellaScalingFactors(listaScalingFactors);
            }
        });
        page('/totalityFactors', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaViewMainRisultati());
            const listaTotalityFactors = await apiTechnosphereFlows.getTotalityFactors(vps1, idCalcolo);
            if (listaTotalityFactors.length != 0) {
                this.creaTabellaTotalityFactors(listaTotalityFactors);
            }
        });
        page('/interventionFlows', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaViewMainRisultatiInterventionFlows());
            const listaInterventionFlows = await apiInterventionFlow.getInterventionFlows(vps1, idCalcolo);
            if (listaInterventionFlows.length != 0) {
                this.creaTabellaInterventionFlows(listaInterventionFlows);
            }
            
        });
        page('/inventoryResult', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaViewMainRisultatiInterventionFlows());
            const listaInventoryResult = await apiInterventionFlow.getInventoryResult(vps1, idCalcolo);
            if (listaInventoryResult.length != 0) {
                this.creaTabellaInventoryResult(listaInventoryResult);
            }
            
        });
        page();

    }

    /** 
    * In questo metodo raccolgo dal db tutti i Product system che sono disponibili e li inserisco all'interno 
    * della select usata per selezionare il product system che si vuole calcolare andando a impostare l'id, 
    * il value e il text che andranno a formare l'option che verà aggiunto alla select.
    * 
    * @param {Api} api - Oggetto che permette il richiamo delle api.
    * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
    */
    getProductSystem = async (api, vps) => {

        const placeholder = document.getElementById("selectedProductSystem");
        let listaProductSystem = await api.getProductSystem(vps);
        console.log("ProductSystem");
        console.log(listaProductSystem);

        if (listaProductSystem.length == 0) {
            placeholder.innerHTML = "Non ci sono Product System selezionabili";
        } else {
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

    /** 
    * In questo metodo raccolgo dal db tutti gli impact method che sono disponibili e li inserisco all'interno 
    * della select usata per selezionare l'impact method che si vuole utilizzare andando a impostare l'id, 
    * il value e il text che andranno a formare l'option che verà aggiunto alla select. Inoltre, si imposta 
    * anche l'id del nwSets necessario per fare il calcolo del product system.
    * Se non ci sono impact method si inserisce nel placeholder Non ci sono Impact method selezionabili.
    *
    * @param {Api} api - Oggetto che permette il richiamo delle api.
    * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
    */
    getImpactMethod = async (api, vps) => {

        const placeholder = document.getElementById("selectedImpactMethod");
        let listaImpactMethod = await api.getImpactMethod(vps);
        console.log("impact-method");
        console.log(listaImpactMethod);

        if (listaImpactMethod.length == 0) {
            placeholder.innerHTML = "Non ci sono Impact method selezionabili";
        } else {

            const selectImpactMethod = document.getElementById("listaImpactMethod");
            placeholder.innerHTML = "Seleziona un Impact Method";

            for (let i = 0; i < listaImpactMethod.length; i++) {

                let option = document.createElement("option");

                if (listaImpactMethod[i].hasOwnProperty("nwSets")) {
                    option.value = listaImpactMethod[i].name;
                    option.text = listaImpactMethod[i].name;
                    option.id = listaImpactMethod[i]["@id"] + "/" + listaImpactMethod[i].nwSets[0]["@id"];
                    selectImpactMethod.appendChild(option);
                }

            }
        }

    }

    /** 
    * In questo metodo si esegue il calcolo del product system usando l'impact method 
    * selezionato dai select. Se non si seleziona uno tra product system e impact method
    * non si può effettuare il calcolo.
    * 
    * @param {Api} api - Oggetto che permette il richiamo delle api.
    * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
    * @returns {String} - Stringa che contiene l'id del calcolo del product system.
    */
    calcolaProductSystem = async (api,vps) => {

        let idCalcolo = undefined;
        //Prendo l'id del product system selezionato
        const selectProductSystem = document.getElementById("listaProductSystem");
        const selectedOptionProductSystem = selectProductSystem.options[selectProductSystem.selectedIndex];
        const idProductSystem = selectedOptionProductSystem.id;
        //Prendo l'id dell'impact method selezionato
        const selectImpactMethod = document.getElementById("listaImpactMethod");
        const selectedOptionImpactMethod = selectImpactMethod.options[selectImpactMethod.selectedIndex];
        const optionIdImpactMethod = selectedOptionImpactMethod.id;

        //Se non è stato selezionato un tra product system o impact method non si può eseguire il calcolo del product system
        if (idProductSystem === "selectedProductSystem" || optionIdImpactMethod === "selectedImpactMethod") {
            const messaggioErrore = document.getElementById("risultatiRicerca");
            const button = document.getElementById('buttonCalcolaProductSystem');

            console.log("Non si può effettuare il calcolo mancano degli input");
            messaggioErrore.innerHTML = '';
            messaggioErrore.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Non si può effettuare il calcolo mancano degli input</h3>`);
            button.disabled = true;
            setTimeout(() => {
                messaggioErrore.innerHTML = '';
                button.disabled = false;
            }, 3000);

        }
        else {

            /*
            Contiene l'id dell'Impact Method e del NewSets che sono stati messi insieme e divisi dal simbolo /
            quindi vado a prendere l'id dell'impact method e del new sets necessari per eseguire il calcolo del product system
            */
            const idList = optionIdImpactMethod.split("/");

            if (idList.length === 2) {
                const idImpactMethod = idList[0];
                const idNewSet = idList[1];

                console.log("idImpactMethod: " + idImpactMethod);
                console.log("idNewSet: " + idNewSet);
                console.log("idProductSystem: " + idProductSystem);

                console.log("Calcola Product System");
                //Eseguo il calcolo del product system
                let result = await api.calcolaProductSystem(vps, idProductSystem, idImpactMethod, idNewSet);
                idCalcolo = result["@id"];

                const messaggio = document.getElementById("risultatiRicerca");
                messaggio.innerHTML = '';
                messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-secondary" role="alert">Sto eseguendo il calcolo...</h3>`);
                let statoCalcolo = false;
                //Attraverso questo ciclo verifico inviando l'id del calcolo se quest'ultimo è stato ultimato 
                while (statoCalcolo != true) {
                    statoCalcolo = await api.getStatoCalcolo(vps, idCalcolo);
                    statoCalcolo = statoCalcolo.isReady;
                }

                console.log("calcolo finito!!!");
                messaggio.innerHTML = '';
                messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-success" role="alert">Calcolo finito!!</h3>`);

                return idCalcolo;
                
            } else {
                //Potrebbero capitare degli errori sul lato server durante il calcolo qui vengono gestiti
                const messaggioErrore = document.getElementById("risultatiRicerca");
                const button = document.getElementById('buttonCalcolaProductSystem');

                messaggioErrore.innerHTML = '';
                messaggioErrore.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Errore in fase di preparazione del calcolo.</h3>`);
                button.disabled = true;
                setTimeout(() => {
                    messaggioErrore.innerHTML = '';
                    button.disabled = false;
                }, 3000);
                console.log("Errore in fase di split");
            }
        }

        return idCalcolo;
    }

    /** 
    * In questo metodo si costruisce la tabella dei TotalRequirements
    * in cui si elencano nome dell'impact, categoria, quantità e unità di misura. 
    * 
    * @param {List[TotalRequirements]} listaTotalRequirements - Lista di TotalRequirements.
    */
    creaTabellaTotalRequirements = async (listaTotalRequirements) => {
        console.log("creaTabellaTotalRequirements");
        console.log(listaTotalRequirements);
        
        setTimeout(() => {
            const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
            tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableTotalRequirements());
            const tabellaRighe = document.getElementById("datiTabellaTotalRequirements");
            let num = 0;
            listaTotalRequirements.forEach(element => {
                num++;
                const riga = creaViewRowTotalRequirements(element, num);
                tabellaRighe.insertAdjacentHTML('beforeend', riga);
            });

        }, 2000);
        
    }

    creaTabellaTechnosphereFlows = async (listaTechnosphereFlows) => {
        console.log("listaTechnosphereFlows");
        console.log(listaTechnosphereFlows);
        setTimeout(() => {
            const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
            tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableTechnosphereFlows());
            const tabellaRighe = document.getElementById("datiTabellaTechnosphereFlows");
            let num = 0;
            listaTechnosphereFlows.forEach(element => {
                num++;
                const riga = creaViewRowTechnosphereFlows(element, num);
                tabellaRighe.insertAdjacentHTML('beforeend', riga);
            });

        }, 2000);
    }

    creaTabellaFinalDemand = async (richiestaFinale) => {
        console.log("richiestaFinale");
        console.log(richiestaFinale);
        setTimeout(() => {
            const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
            tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableFinalDemand());
            const tabellaRighe = document.getElementById("datiTabellaFinalDemand");
            
            const riga = creaViewRowFinalDemand(richiestaFinale, 1);
            tabellaRighe.insertAdjacentHTML('beforeend', riga);
            
                            
        }, 2000);
    }

    creaTabellaDirectRequirements = async (listaDirectRequirements) => {
        console.log("listaDirectRequirements");
        console.log(listaDirectRequirements);
        setTimeout(() => {
            const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
            tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableDirectRequirements());
            const tabellaRighe = document.getElementById("datiTabellaDirectRequirements");
            let num = 0;
            listaDirectRequirements.forEach(element => {
                num++;
                const riga = creaViewRowDirectRequirements(element, num);
                tabellaRighe.insertAdjacentHTML('beforeend', riga);
            });

        }, 2000);
    }

    creaTabellaScalingFactors = async (listaScalingFactors) => {
        console.log("listaScalingFactors");
        console.log(listaScalingFactors);
        setTimeout(() => {
            const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
            tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableScalingFactors());
            const tabellaRighe = document.getElementById("datiTabellaScalingFactors");
            let num = 0;
            listaScalingFactors.forEach(element => {
                num++;
                const riga = creaViewRowScalingFactors(element, num);
                tabellaRighe.insertAdjacentHTML('beforeend', riga);
            });

        }, 2000);
    }

    creaTabellaTotalityFactors = async (listaTotalityFactors) => {
        console.log("listaTotalityFactors");
        console.log(listaTotalityFactors);
        setTimeout(() => {
            const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
            tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableTotalityFactors());
            const tabellaRighe = document.getElementById("datiTabellaTotalityFactors");
            let num = 0;
            listaTotalityFactors.forEach(element => {
                num++;
                const riga = creaViewRowTotalityFactors(element, num);
                tabellaRighe.insertAdjacentHTML('beforeend', riga);
            });

        }, 2000);
    }

    creaTabellaInterventionFlows = async (listaInterventionFlows) => {
        console.log("creaTabellaInterventionFlows");
        console.log(listaInterventionFlows);
        

        setTimeout(() => {
            const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
            const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
            tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableInterventionFlowsInput());
            tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableInterventionFlowsOutput());

            const tabellaRigheInput = document.getElementById("datiTabellaInterventionFlowsInput");
            const tabellaRigheOutput = document.getElementById("datiTabellaInterventionFlowsOutput");

            let numInput = 0;
            let numOutput = 0;

            listaInterventionFlows.forEach(element => {

                if(element.isInput){
                    numInput++;
                    const riga = creaViewRowInterventionFlows(element, numInput);
                    tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
                }
                else{
                    numOutput++;
                    const riga = creaViewRowInterventionFlows(element, numOutput);
                    tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
                }
                
            });

        }, 2000);
        
    }

    creaTabellaInventoryResult = async (listaInventoryResult) => {
        console.log("creaTabellaInventoryResult");
        console.log(listaInventoryResult);
        

        setTimeout(() => {
            const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
            const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
            tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableInventoryResultInput());
            tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableInventoryResultOutput());

            const tabellaRigheInput = document.getElementById("datiTabellaInventoryResultInput");
            const tabellaRigheOutput = document.getElementById("datiTabellaInventoryResultOutput");
            
            console.log(tabellaRigheInput);
            console.log(tabellaRigheOutput);

            let numInput = 0;
            let numOutput = 0;

            listaInventoryResult.forEach(element => {

                if(element.enviFlow.isInput){
                    numInput++;
                    const riga = creaViewRowInventoryResult(element, numInput);
                    tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
                }
                else{
                    numOutput++;
                    const riga = creaViewRowInventoryResult(element, numOutput);
                    tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
                }
                
            });

        }, 2000);
        
    }

     
}

export default App;