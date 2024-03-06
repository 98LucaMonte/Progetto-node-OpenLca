"use strict;"
import ApiCalculation from "./backend/src/restclient/apiCalculation.js";
import ApiResultQueries from "./backend/src/restclient/apiResultQueries.js";
import ApiTechnosphereFlows from "./backend/src/restclient/apiTechnosphereFlows.js";
import ApiFlowResults from "./backend/src/restclient/apiFlowResults.js";
import ApiImpactResults from "./backend/src/restclient/apiImpactResults.js";

import {ProductSystem} from "./frontend/src/logic/productSystem.js";

import {CalcolaProductSystem} from "./frontend/src/logic/calcolaProductSystem.js"

import {creaModalNuovoProductSystem}from "./frontend/src/templates/modal-view.js";

import {creaViewMain,getProductSystem,getImpactMethod,
        creaModalForPDF,creaLateralNavbar,creaViewMainRisultati, 
        creaViewMainRisultatiDoppioInput , creaViewMainRisultatiSingoloInput, 
        creaViewMainRisultatiDoppiaTabella , creaViewMainRisultatiSingoloInputDoppiaTabella, 
        creaViewMainRisultatiDoppioInputDoppiaTabella} from './frontend/src/templates/main-view.js';

import {creaTabellaProviderFlow,creaTabellaTechFlow,creaTabellaTechFlowValue,
        creaTabellaEnviFlowsInputOutput,creaTabellaEnviFlowsInputOutputValue,
        creaTabellaImpactCategory,creaTabellaImpactCategoryValue,getTechFlow,
        getEnviFlow,getTechFlowEnviFlow,getImpactCategory,
        getImpactCategoryEnviFlow,getImpactCategoryTechFlow} from './frontend/src/templates/main-view-tabelle-row.js';

import { creaViewHeader,creaViewHeaderRisultati } from './frontend/src/templates/header-view.js';
import { creaPaginaRisultati,creaTabellaCategorieImpatto,creaTabellaFlowsInputOutputValue,inserisciGrafico } from './function/templateResult.js';
import { creaPdf } from './function/creaPdf.js'
import page from '//unpkg.com/page/page.mjs';

const apiCalculation = new ApiCalculation();
const apiResultQueries = new ApiResultQueries();
const apiTechnosphereFlows = new ApiTechnosphereFlows();
const apiFlowResults = new ApiFlowResults();
const apiImpactResults = new ApiImpactResults();
const productSystem = new ProductSystem();
const calcolaProductSystem = new CalcolaProductSystem();

class App {

    constructor(header, main, footer) {

        //const vps1 = 'http://109.205.180.220:3000/'; //indirizzo vps 
        const vps1 = 'http://127.0.0.1:3000/'; // docker run -p 3000:8080 -v $HOME/openLCA-data-1.4:/app/data --rm -d gdt-server -db case_study
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
            await getProductSystem(apiCalculation, vps1);
            //Prendo gli impact method disponibili dal db
            await getImpactMethod(apiCalculation, vps1);

            document.getElementById('creaProductSystem').addEventListener('click',async (event) =>{
                event.preventDefault();
                const modalNuovoProductSystem = document.getElementById("modal");
                modalNuovoProductSystem.insertAdjacentHTML('beforeend',creaModalNuovoProductSystem());
                const myModal = new bootstrap.Modal(document.getElementById('creaProductSystemMain'));
                myModal.show();
                let result = await productSystem.creaModalInfoProductSystem(vps1,apiCalculation,[]);
                location.reload();
                console.log("id del product system appena creato "+ result["@id"]);
            });

            document.getElementById('buttonCalcolaProductSystem').addEventListener('click', async event => {
                event.preventDefault();
                idCalcolo = await calcolaProductSystem.calcola(apiCalculation,vps1);
                console.log("modal");
                if(idCalcolo !== undefined){
                
                    const messaggio = document.getElementById("risultatiRicerca");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-success" role="alert">Calcolo finito!!</h3>`);
                    page.redirect('/result');
                    /*const modalPdf = document.getElementById("modal");
                    modalPdf.insertAdjacentHTML('beforeend',creaModalForPDF());
                    
                    const myModal = new bootstrap.Modal(document.getElementById('modalPdf'));
                    myModal.show();
                    
                    document.getElementById("chiudiPdf").addEventListener('click',event=> {
                        console.log("chiudi");
                        setTimeout(async () => {
                            messaggio.innerHTML = '';
                            page.redirect('/result');
                        }, 3000); 
                    });

                    document.getElementById("salvaPdf").addEventListener('click',event=> { 
                        creaPDF(vps1,idCalcolo,apiImpactResults);
                        console.log("salva");
                        setTimeout(async () => {
                            messaggio.innerHTML = '';    
                            page.redirect('/resultQueries/technosphereFlows');
                        }, 3000);  
                    });*/

                }
              
            });

        });
        page('/result',async ()=>{
            this.header.innerHTML = '';
            this.main.innerHTML = '';
            this.footer.innerHTML = '';
            
            this.main.insertAdjacentHTML('beforeend',creaPaginaRisultati());
            const lista = await apiImpactResults.getTotalImpacts(vps1,idCalcolo);
            
            document.getElementById("risultatiRicerca",creaTabellaCategorieImpatto(lista));

            const lista1 = await apiFlowResults.getInventoryResult(vps1, idCalcolo);
            creaTabellaFlowsInputOutputValue(lista1);
            
            document.getElementById('listaCategorieFlow1').addEventListener('change', async event => {
                event.preventDefault();
                const categoriaScelta = event.target.value;
                if(categoriaScelta != "Seleziona una categoria"){
                    console.log('Opzione selezionata:', categoriaScelta);
                    inserisciGrafico(lista1,categoriaScelta,true);
                }
            });

            document.getElementById('listaCategorieFlow2').addEventListener('change', async event => {
                event.preventDefault();;
                const categoriaScelta = event.target.value;
                if(categoriaScelta != "Seleziona una categoria"){
                    console.log('Opzione selezionata:', categoriaScelta);
                    inserisciGrafico(lista1,categoriaScelta,false);
                }
            });

            document.getElementById('creaPdf').addEventListener('click',async event => {
                event.preventDefault();
                await creaPdf();
            });
            

        });
        page('/resultQueries/technosphereFlows', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultati());
            const listaTechnosphereFlows = await apiResultQueries.getTechnosphereFlows(vps1, idCalcolo);
            if (listaTechnosphereFlows.length != 0) {
                let msg = "Lista di provider e di TechFlow dato l'id del Product System appena calcolato";
                creaTabellaProviderFlow(listaTechnosphereFlows,msg);
            }
        });
        page('/resultQueries/finalDemand', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultati());
            const richiestaFinale = await apiResultQueries.getRichiestaFinale(vps1, idCalcolo);
            console.log(richiestaFinale);
            if (richiestaFinale.length != 0) {
                let msg = "Tech Flow con quantità dato l'id del Product System appena calcolato";
                creaTabellaTechFlowValue(richiestaFinale,msg);                                                                         
            }
        });
        page('/resultQueries/interventionFlows', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiDoppiaTabella());
            const listaInterventionFlows = await apiResultQueries.getInterventionFlows(vps1, idCalcolo);
            if (listaInterventionFlows.length != 0) {
                let msg= "Lista di Envi Flow Value dato l'id del Product System appena calcolato";
                creaTabellaEnviFlowsInputOutput(listaInterventionFlows,msg);
            }
            
        });
        page('/resultQueries/impactCategories', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultati());
            const listaImpactCategories = await apiResultQueries.getImpactCategories(vps1,idCalcolo);
            if (listaImpactCategories.length != 0) {
                let msg = "Lista di Impact Category dato l'id del Product System appena calcolato";
                creaTabellaImpactCategory(listaImpactCategories,msg);
            }
            
        });
        page('/technosphereFlows/totalRequirements', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultati());
            const listaTotalRequirements = await apiTechnosphereFlows.getTotalRequirements(vps1, idCalcolo);
            if (listaTotalRequirements.length != 0) {
                let msg = "Lista di Tech Flow Value dato l'id del Product System appena calcolato";
                creaTabellaTechFlowValue(listaTotalRequirements,msg);
            }
        });
        page('/technosphereFlows/totalRequirementsOfFlows', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInput());
            //Prendo i tech flow disponibili dal db
            await getTechFlow(apiResultQueries, vps1, idCalcolo);

            document.getElementById('button').addEventListener('click', async event => {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;
                console.log(idTechFlow);
                if(idTechFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow.</h3>`);
                }   
                else{
                    const listatotalRequirementsOfFlows = await apiTechnosphereFlows.getTotalRequirementsOfFlows(vps1, idCalcolo,idTechFlow);
                    if (listatotalRequirementsOfFlows.length != 0) {
                        let msg = "Lista di Tech Flow Value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                        creaTabellaTechFlowValue(listatotalRequirementsOfFlows,msg);
                    }
                }  
            });

        });
        page('/technosphereFlows/scalingFactors', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultati());
            const listaScalingFactors = await apiTechnosphereFlows.getScalingFactors(vps1, idCalcolo);
            if (listaScalingFactors.length != 0) {
                let msg = "Lista di Tech Flow Value dato l'id del Product System appena calcolato";
                creaTabellaTechFlowValue(listaScalingFactors,msg);
            }
        });
        page('/technosphereFlows/scaledTechFlowsOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInput());
            //Prendo i tech flow disponibili dal db
            await getTechFlow(apiResultQueries, vps1, idCalcolo);

            document.getElementById('button').addEventListener('click', async event => {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;
                console.log(idTechFlow);
                if(idTechFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow.</h3>`);
                }   
                else{
                    const listaScaledTechFlowsOf = await apiTechnosphereFlows.getScaledTechFlowsOf(vps1, idCalcolo,idTechFlow);
                    if (listaScaledTechFlowsOf.length != 0) {
                        let msg = "Lista di Tech Flow Value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                        creaTabellaTechFlowValue(listaScaledTechFlowsOf,msg);
                    }
                }  
            });
            
        });
        page('/technosphereFlows/unscaledTechFlowsOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInput());
           
            await getTechFlow(apiResultQueries, vps1, idCalcolo);

            document.getElementById('button').addEventListener('click', async event => {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;
                console.log(idTechFlow);
                if(idTechFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow.</h3>`);
                }   
                else{
                    const listaUnscaledTechFlowsOf = await apiTechnosphereFlows.getUnscaledTechFlowsOf(vps1, idCalcolo,idTechFlow);
                    if (listaUnscaledTechFlowsOf.length != 0) {
                        let msg = "Lista di Tech Flow Value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                        creaTabellaTechFlowValue(listaUnscaledTechFlowsOf,msg);
                    }
                }  
            });
            
        });
        page('/flowResults/inventoryResult', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiDoppiaTabella());
            const listaInventoryResult = await apiFlowResults.getInventoryResult(vps1, idCalcolo);
            if (listaInventoryResult.length != 0) {
                let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato";
                creaTabellaEnviFlowsInputOutputValue(listaInventoryResult,msg);
            }
            
        });
        page('/flowResults/totalFlowValueOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInputDoppiaTabella());
            await getEnviFlow(apiFlowResults,vps1,idCalcolo);

            document.getElementById('button').addEventListener('click', async event => {
                const selectEnviFlow = document.getElementById("listaInput01");
                const selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                const idEnviFlow = selectedOptionEnviFlow.id;
                console.log(idEnviFlow);
                if(idEnviFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un envi flow.</h3>`);
                }   
                else{
                    const listaEnviFlow = await apiFlowResults.getTotalFlowValueOf(vps1, idCalcolo,idEnviFlow); 
                    console.log(listaEnviFlow);
                    if (listaEnviFlow.length != 0) {
                        let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato e l'id dell'Envi Flow selezionato";
                        creaTabellaEnviFlowsInputOutputValue(listaEnviFlow);
                    }
                }  
            });
  
        });
        page('/flowResults/flowContributionsOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInput());
            
            await getEnviFlow(apiFlowResults,vps1,idCalcolo);

            document.getElementById('button').addEventListener('click', async event => {
                const selectEnviFlow = document.getElementById("listaInput01");
                const selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                const idEnviFlow = selectedOptionEnviFlow.id;
                console.log(idEnviFlow);
                if(idEnviFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un envi flow.</h3>`);
                }   
                else{
                    const listaEnviFlow = await apiFlowResults.getFlowContributionsOf(vps1, idCalcolo,idEnviFlow); 
                    console.log(listaEnviFlow);
                    if (listaEnviFlow.length != 0) {
                        let msg = "Lista di Tech Flow Value dato l'id del Product System appena calcolato e l'id dell'Envi Flow selezionato";
                        creaTabellaTechFlowValue(listaEnviFlow,msg);
                    }
                }  
            });
        });
        page('/flowResults/directInterventionsOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInputDoppiaTabella());
           
            await getTechFlow(apiResultQueries, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;
                console.log(idTechFlow);
                if(idTechFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow.</h3>`);
                }   
                else{
                    const listaDirectInterventionsOf = await apiFlowResults.getDirectInterventionsOf(vps1, idCalcolo,idTechFlow);
                    console.log(listaDirectInterventionsOf);
                    if (listaDirectInterventionsOf.length != 0) {
                        let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                        creaTabellaEnviFlowsInputOutputValue(listaDirectInterventionsOf,msg);
                    }
                }  
            });

        });
        page('/flowResults/directInterventionsOfEnviFlowTechFlow', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiDoppioInputDoppiaTabella());
           
            await getTechFlowEnviFlow(apiResultQueries,apiFlowResults,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;

                const selectEnviFlow = document.getElementById("listaInput02");
                const selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                const idEnviFlow = selectedOptionEnviFlow.id;

                console.log(idTechFlow);
                if(idTechFlow === "selectedInput01" || idEnviFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow.</h3>`);
                }   
                else{
                    const enviFlowValue = await apiFlowResults.getDirectInterventionsOfEnviFlowTechFlow(vps1, idCalcolo,idEnviFlow,idTechFlow);
                    if (enviFlowValue.length != 0) {
                        console.log(enviFlowValue);
                        let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato,l'id dell'Envi Flow selezionato e l'id del Tech Flow selezionato";
                        creaTabellaEnviFlowsInputOutputValue(enviFlowValue,msg);
                    }
                }  
            });
        });    
        page('/flowResults/flowIntensitiesOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInputDoppiaTabella());
           
            
            await getTechFlow(apiResultQueries, vps1, idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;
                console.log(idTechFlow);
                if(idTechFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow.</h3>`);
                }   
                else{
                    const listaFlowIntesitiesOf = await apiFlowResults.getFlowIntensitiesOf(vps1,idCalcolo,idTechFlow);
                    if (listaFlowIntesitiesOf.length != 0) {
                        console.log(listaFlowIntesitiesOf);
                        let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                        creaTabellaEnviFlowsInputOutputValue(listaFlowIntesitiesOf,msg);
                    }
                }  
            });
            
        });  
        page('/flowResults/flowIntensityOfEnviFlowTechFlow', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiDoppioInputDoppiaTabella());
           
            await getTechFlowEnviFlow(apiResultQueries,apiFlowResults,vps1,idCalcolo);
            
            document.getElementById('button').addEventListener('click', async event => {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;

                const selectEnviFlow = document.getElementById("listaInput02");
                const selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                const idEnviFlow = selectedOptionEnviFlow.id;
                console.log(idTechFlow);
                if(idTechFlow === "selectedInput01" || idEnviFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow e un EnviFlow.</h3>`);
                }   
                else{
                    const listaFlowIntesitiesOfEnviFlowTechFlow = await apiFlowResults.getFlowIntensityOfEnviFlowTechFlow(vps1,idCalcolo,idEnviFlow,idTechFlow);
                    console.log(listaFlowIntesitiesOfEnviFlowTechFlow);
                    if (listaFlowIntesitiesOfEnviFlowTechFlow.length != 0) {
                        let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato,l'id dell'Envi Flow selezionato e l'id del Tech Flow selezionato";
                        creaTabellaEnviFlowsInputOutputValue(listaFlowIntesitiesOfEnviFlowTechFlow,msg);
                    }
                }  
            });
        });   
        page('/flowResults/totalInterventionsOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInputDoppiaTabella());
            await getTechFlow(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;

                console.log(idTechFlow);
                if(idTechFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow.</h3>`);
                }   
                else{
                    const listaTotalInterventionsOf = await apiFlowResults.getTotalInterventionsOf(vps1,idCalcolo,idTechFlow);
                    console.log(listaTotalInterventionsOf);
                    if (listaTotalInterventionsOf.length != 0) {
                        let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                        creaTabellaEnviFlowsInputOutputValue(listaTotalInterventionsOf,msg);
                    }
                }  
            });
        });
        page('/flowResults/totalInterventionOfEnviFlowTechFlow', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiDoppioInputDoppiaTabella());
           
            await getTechFlowEnviFlow(apiResultQueries,apiFlowResults,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;

                const selectEnviFlow = document.getElementById("listaInput02");
                const selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                const idEnviFlow = selectedOptionEnviFlow.id;
                console.log(idTechFlow);
                if(idTechFlow === "selectedInput01" || idEnviFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow e un EnviFlow.</h3>`);
                }   
                else{
                    const listaTotalInterventionOfEnviFlowTechFlow = await apiFlowResults.getTotalInterventionOfEnviFlowTechFlow(vps1,idCalcolo,idEnviFlow,idTechFlow);
                    console.log(listaTotalInterventionOfEnviFlowTechFlow);
                    if (listaTotalInterventionOfEnviFlowTechFlow.length != 0) {
                        let msg = "Lista di Envi Flow Value dato l'id del Product System appena calcolato, l'id dell'Envi Flow e l'id del Tech Flow selezionato";
                        creaTabellaEnviFlowsInputOutputValue(listaTotalInterventionOfEnviFlowTechFlow,msg);
                    }
                }  
            });
        }); 
        /*Not found url 
        page('/flowResults/upstreamInterventionsOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaViewMainRisultatiSingoloInput());
            await getEnviFlow(apiFlowResults,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                
                const selectEnviFlow = document.getElementById("listaInput01");
                const selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                const idEnviFlow = selectedOptionEnviFlow.id;
                if(idEnviFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un EnviFlow.</h3>`);
                }   
                else{
                    const listaUpstreamInterventionsOf = await apiFlowResults.getUpstreamInterventionsOf(vps1,idCalcolo,idEnviFlow);
                    console.log(listaUpstreamInterventionsOf);
                    if (listaUpstreamInterventionsOf.length != 0) {
                        creaTabellaTotalInterventionOfEnviFlowTechFlow(listaUpstreamInterventionsOf);
                    }
                }  
            });
        });*/   
        page('/impactResults/totalImpacts', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultati());
            const listaTotalImpacts = await apiImpactResults.getTotalImpacts(vps1,idCalcolo);
            if(listaTotalImpacts.length != 0){
                console.log(listaTotalImpacts);
                let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato";
                creaTabellaImpactCategoryValue(listaTotalImpacts,msg);
            }
        });
        page('/impactResults/totalImpactsNormalized', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultati());
            const listaTotalImpactsNormalized = await apiImpactResults.getTotalImpactsNormalized(vps1,idCalcolo);
            if(listaTotalImpactsNormalized.length != 0){
                console.log(listaTotalImpactsNormalized)
                let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato";
                creaTabellaImpactCategoryValue(listaTotalImpactsNormalized,msg);
            }
        }); 
        page('/impactResults/totalImpactsWeighted', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultati());
            const listaTotalImpactsWeighted = await apiImpactResults.getTotalImpactsWeighted(vps1,idCalcolo);
            if(listaTotalImpactsWeighted.length != 0){
                console.log(listaTotalImpactsWeighted)
                let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato";
                creaTabellaImpactCategoryValue(listaTotalImpactsWeighted,msg);
            }
        }); 
        page('/impactResults/totalImpactValueOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInput());
            await getImpactCategory(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory = selectedOptionImpactCategory.id;

                console.log(idImpactCategory);
                if(idImpactCategory === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un Impact Category.</h3>`);
                }   
                else{
                    const listaImpactCategory = await apiImpactResults.getTotalImpactValueOf(vps1,idCalcolo,idImpactCategory);
                    if (listaImpactCategory.length != 0) {
                        console.log(listaImpactCategory)
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato e l'id dell'impact category selezionato";
                        creaTabellaImpactCategoryValue(listaImpactCategory,msg);
                    }
                }  
            });
        }); 
        page('/impactResults/impactContributionsOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInput());
            await getImpactCategory(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory = selectedOptionImpactCategory.id;

                console.log(idImpactCategory);
                if(idImpactCategory === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un Impact Category.</h3>`);
                }   
                else{
                    const listaImpactContributionsOf = await apiImpactResults.getImpactContributionsOf(vps1,idCalcolo,idImpactCategory);
                    if (listaImpactContributionsOf.length != 0) {
                        console.log(listaImpactContributionsOf)
                        let msg = "Lista di Tech Flow value dato l'id del Product System appena calcolato e l'id dell'impact category selezionato";
                        creaTabellaTechFlowValue(listaImpactContributionsOf,msg);
                    }
                }  
            });
        }); 
        page('/impactResults/directImpactsOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInput());
            await getTechFlow(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;

                console.log(idTechFlow);
                if(idTechFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un TechFlow.</h3>`);
                }   
                else{
                    const listaDirectImpactsOf = await apiImpactResults.getDirectImpactsOf(vps1,idCalcolo,idTechFlow);
                    if (listaDirectImpactsOf.length != 0) {
                        console.log(listaDirectImpactsOf)
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                        creaTabellaImpactCategoryValue(listaDirectImpactsOf,msg);
                    }
                }  
            });
        }); 
        page('/impactResults/directImpactOfImpactCategoryTechFlow', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiDoppioInput());
           
            await getImpactCategoryTechFlow(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory= selectedOptionImpactCategory.id;

                const selectTechFlow = document.getElementById("listaInput02");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;

                console.log(idTechFlow);
                if(idImpactCategory === "selectedInput01" || idTechFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow e un Impact Category.</h3>`);
                }   
                else{
                    const listaDirectImpactOfImpactCategoryTechFlow = await apiImpactResults.getDirectImpactOfImpactCategoryTechFlow(vps1, idCalcolo,idTechFlow,idImpactCategory);
                    if (listaDirectImpactOfImpactCategoryTechFlow.length != 0) {
                        console.log(listaDirectImpactOfImpactCategoryTechFlow)
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato, l'id del Tech Flow selezionato e l'id dell'impact category selezionato";
                        creaTabellaImpactCategoryValue(listaDirectImpactOfImpactCategoryTechFlow,msg);
                    }
                }  
            });

        }); 
        page('/impactResults/impactIntensitiesOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInput());
            await getTechFlow(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;

                console.log(idTechFlow);
                if(idTechFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un TechFlow.</h3>`);
                }   
                else{
                    const listaImpactIntensitiesOf = await apiImpactResults.getImpactIntensitiesOf(vps1,idCalcolo,idTechFlow);
                    if (listaImpactIntensitiesOf.length != 0) {
                        console.log(listaImpactIntensitiesOf)
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                        creaTabellaImpactCategoryValue(listaImpactIntensitiesOf,msg);
                    }
                }  
            });
        }); 
        page('/impactResults/directImpactIntensityOfImpactCategoryTechFlow', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiDoppioInput());
           
            await getImpactCategoryTechFlow(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory= selectedOptionImpactCategory.id;

                const selectTechFlow = document.getElementById("listaInput02");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;

                console.log(idTechFlow);
                if(idImpactCategory === "selectedInput01" || idTechFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow e un Impact Category.</h3>`);
                }   
                else{
                    const listaDirectImpactIntensityOfImpactCategoryTechFlow = await apiImpactResults.getDirectImpactIntensityOfImpactCategoryTechFlow(vps1, idCalcolo,idTechFlow,idImpactCategory);
                    if (listaDirectImpactIntensityOfImpactCategoryTechFlow.length != 0) {
                        console.log(listaDirectImpactIntensityOfImpactCategoryTechFlow)
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato, l'id del Tech Flow selezionato e l'id dell'impact category selezionato";
                        creaTabellaImpactCategoryValue(listaDirectImpactIntensityOfImpactCategoryTechFlow,msg);
                    }
                }  
            });
        }); 
        page('/impactResults/totalImpactsOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInput());
            await getTechFlow(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                const selectTechFlow = document.getElementById("listaInput01");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;

                console.log(idTechFlow);
                if(idTechFlow === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un TechFlow.</h3>`);
                }   
                else{
                    const listaTotalImpactsOf = await apiImpactResults.getTotalImpactsOf(vps1,idCalcolo,idTechFlow);
                    if (listaTotalImpactsOf.length != 0) {
                        console.log(listaTotalImpactsOf)
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato e l'id del Tech Flow selezionato";
                        creaTabellaImpactCategoryValue(listaTotalImpactsOf,msg);
                    }
                }  
            });
        });
        page('/impactResults/totalImpactOfImpactCategoryTechFlow', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiDoppioInput());
           
            await getImpactCategoryTechFlow(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory= selectedOptionImpactCategory.id;

                const selectTechFlow = document.getElementById("listaInput02");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;

                console.log(idTechFlow);
                if(idImpactCategory === "selectedInput01" || idTechFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow e un Impact Category.</h3>`);
                }   
                else{
                    const listaTotalImpactOfImpactCategoryTechFlow = await apiImpactResults.getTotalImpactOfImpactCategoryTechFlow(vps1, idCalcolo,idTechFlow,idImpactCategory);
                    if (listaTotalImpactOfImpactCategoryTechFlow.length != 0) {
                        console.log(listaTotalImpactOfImpactCategoryTechFlow)
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato, l'id del Tech Flow selezionato e l'id dell'impact category selezionato";
                        creaTabellaImpactCategoryValue(listaTotalImpactOfImpactCategoryTechFlow,msg);
                    }
                }  
            });
        }); 
        page('/impactResults/impactFactorsOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInputDoppiaTabella());
            await getImpactCategory(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory = selectedOptionImpactCategory.id;

                console.log(idImpactCategory);
                if(idImpactCategory === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un Impact Category.</h3>`);
                }   
                else{
                    const listaImpactFactorsOf = await apiImpactResults.getImpactFactorsOf(vps1,idCalcolo,idImpactCategory);
                    if (listaImpactFactorsOf.length != 0) {
                        console.log(listaImpactFactorsOf)
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato e l'id dell'impact category selezionato";
                        creaTabellaEnviFlowsInputOutputValue(listaImpactFactorsOf,msg);
                    }
                }  
            });
        }); 
        page('/impactResults/impactFactorsOfImpactCategoryEnviFlow', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiDoppioInputDoppiaTabella());
           
            await getImpactCategoryEnviFlow(apiResultQueries,apiFlowResults,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory= selectedOptionImpactCategory.id;

                const selectEnviFlow = document.getElementById("listaInput02");
                const selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                const idEnviFlow = selectedOptionEnviFlow.id;

                if(idImpactCategory === "selectedInput01" || idEnviFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un Envi flow e un Impact Category.</h3>`);
                }   
                else{
                    const listaImpactFactorsOfImpactCategoryEnviFlow = await apiImpactResults.getImpactFactorsOfImpactCategoryEnviFlow(vps1, idCalcolo,idImpactCategory,idEnviFlow);
                    if (listaImpactFactorsOfImpactCategoryEnviFlow.length != 0) {
                        console.log(listaImpactFactorsOfImpactCategoryEnviFlow)
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato, l'id dell'impact category selezionato e l'id dell'Envi Flow";
                        creaTabellaEnviFlowsInputOutputValue(listaImpactFactorsOfImpactCategoryEnviFlow,msg);
                    }
                }  
            });
        });
        page('/impactResults/flowImpactsOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInputDoppiaTabella());
            await getImpactCategory(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory = selectedOptionImpactCategory.id;

                console.log(idImpactCategory);
                if(idImpactCategory === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un Impact Category.</h3>`);
                }   
                else{
                    const listaFlowImpactsOf = await apiImpactResults.getFlowImpactsOf(vps1,idCalcolo,idImpactCategory);
                    if (listaFlowImpactsOf.length != 0) {
                        console.log(listaFlowImpactsOf)
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato e l'id dell'impact category selezionato";
                        creaTabellaEnviFlowsInputOutputValue(listaFlowImpactsOf,msg);
                    }
                }  
            });
        });  
        page('/impactResults/flowImpactOfImpactCategoryEnviFlow', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiDoppioInputDoppiaTabella());
           
            await getImpactCategoryEnviFlow(apiResultQueries,apiFlowResults,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                
                const selectImpactCategory = document.getElementById("listaInput01");
                const selectedOptionImpactCategory = selectImpactCategory.options[selectImpactCategory.selectedIndex];
                const idImpactCategory= selectedOptionImpactCategory.id;

                const selectEnviFlow = document.getElementById("listaInput02");
                const selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                const idEnviFlow = selectedOptionEnviFlow.id;

                if(idImpactCategory === "selectedInput01" || idEnviFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un Envi flow e un Impact Category.</h3>`);
                }   
                else{
                    const listaFlowImpactOfImpactCategoryEnviFlow = await apiImpactResults.getFlowImpactOfImpactCategoryEnviFlow(vps1, idCalcolo,idImpactCategory,idEnviFlow);
                    if (listaFlowImpactOfImpactCategoryEnviFlow.length != 0) {
                        console.log(listaFlowImpactOfImpactCategoryEnviFlow)
                        let msg = "Lista di Impact Category value dato l'id del Product System appena calcolato, l'id dell'impact category selezionato e l'id dell'Envi Flow";
                        creaTabellaEnviFlowsInputOutputValue(listaFlowImpactOfImpactCategoryEnviFlow,msg);
                    }
                }  
            });
        });     
        page();

    }

}



export default App;