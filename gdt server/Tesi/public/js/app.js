"use strict;"
import ApiCalculation from "./apiCalculation.js";
import ApiResultQueries from "./apiResultQueries.js";
import ApiTechnosphereFlows from "./apiTechnosphereFlows.js";
import ApiFlowResults from "./apiFlowResults.js";
import ApiImpactResults from "./apiImpactResults.js";

import {creaViewMain, creaLateralNavbar,creaViewMainRisultati, creaViewMainRisultatiDoppioInput , creaViewMainRisultatiSingoloInput, 
        creaViewMainRisultatiDoppiaTabella , creaViewMainRisultatiSingoloInputDoppiaTabella, creaViewMainRisultatiDoppioInputDoppiaTabella} from './templates/main-view.js';

import {creaTabellaTechnosphereFlows,creaTabellaFinalDemand,creaTabellaInterventionFlows,creaTabellaImpactCategories} from './templates/main-view-result-queries.js';

import {creaTabellaTotalRequirements,creaTabellatotalRequirementsOfFlows,
        creaTabellaScalingFactors,creaTabellaScaledTechFlowsOf,creaTabellaUnscaledTechFlowsOf}from './templates/main-view-technosphere-flows.js';

import {creaTabellaInventoryResult, creaTabellaTotalFlowValueOf, creaTabellaFlowContributionsOf, 
        creaTabellaDirectInterventionsOf, creaTabellaDirectInterventionsOfEnviFlowTechFlow,creaTabellaFlowIntesitiesOf,
        creaTabellaFlowIntesitiesOfEnviFlowTechFlow,creaTabellaTotalInterventionsOf,creaTabellaTotalInterventionOfEnviFlowTechFlow}from './templates/main-view-flow-results.js';

import {creaTabellaTotalImpacts,creaTabellaTotalImpactsNormalized,creaTabellaTotalImpactsWeighted,
        creaTabellaImpactCathegory,creaTabellaImpactContributionsOf,creaTabellaDirectImpactsOf,
        creaTabellaImpactIntensitiesOf,creaTabellaTotalImpactsOf,creaTabellaImpactFactorsOf,
        creaTabellaFlowImpactsOf,creaTabellaDirectImpactOfImpactCategoryTechFlow,
        creaTabellaDirectImpactIntensityOfImpactCategoryTechFlow,creaTabellaTotalImpactOfImpactCategoryTechFlow,
        creaTabellaImpactFactorsOfImpactCategoryEnviFlow,creaTabellaFlowImpactOfImpactCategoryEnviFlow} from './templates/main-view-impact-results.js';

import { creaViewHeader,creaViewHeaderRisultati } from './templates/header-view.js'
import page from '//unpkg.com/page/page.mjs';

const apiCalculation = new ApiCalculation();
const apiResultQueries = new ApiResultQueries();
const apiTechnosphereFlows = new ApiTechnosphereFlows();
const apiFlowResults = new ApiFlowResults();
const apiImpactResults = new ApiImpactResults();

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
            await this.getProductSystem(apiCalculation, vps1);
            //Prendo gli impact method disponibili dal db
            await this.getImpactMethod(apiCalculation, vps1);

            document.getElementById('buttonCalcolaProductSystem').addEventListener('click', async event => {
                event.preventDefault();
                idCalcolo = await this.calcolaProductSystem(apiCalculation,vps1,idCalcolo);
                const messaggio = document.getElementById("risultatiRicerca");
                messaggio.innerHTML = '';
                messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-success" role="alert">Calcolo finito!!</h3>`);

                setTimeout(() => {
                    messaggio.innerHTML = '';
                    if(idCalcolo !== undefined){
                        page.redirect('/resultQueries/technosphereFlows');
                    }
                }, 3000);
                
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
                creaTabellaTechnosphereFlows(listaTechnosphereFlows);
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
                creaTabellaFinalDemand(richiestaFinale);                                                                         
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
                creaTabellaInterventionFlows(listaInterventionFlows);
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
                creaTabellaImpactCategories(listaImpactCategories);
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
                creaTabellaTotalRequirements(listaTotalRequirements);
            }
        });
        page('/technosphereFlows/totalRequirementsOfFlows', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInput());
            //Prendo i tech flow disponibili dal db
            await this.getTechFlow(apiResultQueries, vps1, idCalcolo);

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
                        creaTabellatotalRequirementsOfFlows(listatotalRequirementsOfFlows);
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
                creaTabellaScalingFactors(listaScalingFactors);
            }
        });
        page('/technosphereFlows/scaledTechFlowsOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInput());
            //Prendo i tech flow disponibili dal db
            await this.getTechFlow(apiResultQueries, vps1, idCalcolo);

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
                        creaTabellaScaledTechFlowsOf(listaScaledTechFlowsOf);
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
            //const techFlow = await apiResultQueries.getRichiestaFinale(vps1, idCalcolo);
            await this.getTechFlow(apiResultQueries, vps1, idCalcolo);

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
                        creaTabellaUnscaledTechFlowsOf(listaUnscaledTechFlowsOf);
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
                creaTabellaInventoryResult(listaInventoryResult);
            }
            
        });
        page('/flowResults/totalFlowValueOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInputDoppiaTabella());
            await this.getEnviFlow(apiFlowResults,vps1,idCalcolo);

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
                    if (listaEnviFlow.length != 0) {
                        creaTabellaTotalFlowValueOf(listaEnviFlow);
                    }
                }  
            });

            //await creaTabellaTotalFlowValueOf(vps1,idCalcolo,apiFlowResults);    
        });
        page('/flowResults/flowContributionsOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInput());
            
            await this.getEnviFlow(apiFlowResults,vps1,idCalcolo);

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
                        creaTabellaFlowContributionsOf(listaEnviFlow);
                    }
                }  
            });
            //await creaTabellaFlowContributionsOf(vps1,idCalcolo,apiFlowResults);    
        });
        page('/flowResults/directInterventionsOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInputDoppiaTabella());
           
            //const techFlow = await apiResultQueries.getRichiestaFinale(vps1, idCalcolo);
            await this.getTechFlow(apiResultQueries, vps1, idCalcolo);
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
                    if (listaDirectInterventionsOf.length != 0) {
                        creaTabellaDirectInterventionsOf(listaDirectInterventionsOf);
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
           
            await this.getTechFlowEnviFlow(apiResultQueries,apiFlowResults,vps1,idCalcolo);
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
                        creaTabellaDirectInterventionsOfEnviFlowTechFlow(enviFlowValue);
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
           
            //const techFlow = await apiResultQueries.getRichiestaFinale(vps1, idCalcolo);
            await this.getTechFlow(apiResultQueries, vps1, idCalcolo);
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
                        creaTabellaFlowIntesitiesOf(listaFlowIntesitiesOf);
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
           
            await this.getTechFlowEnviFlow(apiResultQueries,apiFlowResults,vps1,idCalcolo);
            
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
                        creaTabellaFlowIntesitiesOfEnviFlowTechFlow(listaFlowIntesitiesOfEnviFlowTechFlow);
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
            await this.getTechFlow(apiResultQueries,vps1,idCalcolo);
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
                        creaTabellaTotalInterventionsOf(listaTotalInterventionsOf);
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
           
            await this.getTechFlowEnviFlow(apiResultQueries,apiFlowResults,vps1,idCalcolo);
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
                        creaTabellaTotalInterventionOfEnviFlowTechFlow(listaTotalInterventionOfEnviFlowTechFlow);
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
            await this.getEnviFlow(apiFlowResults,vps1,idCalcolo);
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
                creaTabellaTotalImpacts(listaTotalImpacts);
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
                creaTabellaTotalImpactsNormalized(listaTotalImpactsNormalized);
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
                creaTabellaTotalImpactsWeighted(listaTotalImpactsWeighted);
            }
        }); 
        page('/impactResults/totalImpactValueOf', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiSingoloInput());
            await this.getImpactCathegory(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                const selectImpactCathegory = document.getElementById("listaInput01");
                const selectedOptionImpactCathegory = selectImpactCathegory.options[selectImpactCathegory.selectedIndex];
                const idImpactCathegory = selectedOptionImpactCathegory.id;

                console.log(idImpactCathegory);
                if(idImpactCathegory === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un Impact Cathegory.</h3>`);
                }   
                else{
                    const listaImpactCathegory = await apiImpactResults.getTotalImpactValueOf(vps1,idCalcolo,idImpactCathegory);
                    if (listaImpactCathegory.length != 0) {
                        creaTabellaImpactCathegory(listaImpactCathegory);
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
            await this.getImpactCathegory(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                const selectImpactCathegory = document.getElementById("listaInput01");
                const selectedOptionImpactCathegory = selectImpactCathegory.options[selectImpactCathegory.selectedIndex];
                const idImpactCathegory = selectedOptionImpactCathegory.id;

                console.log(idImpactCathegory);
                if(idImpactCathegory === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un Impact Cathegory.</h3>`);
                }   
                else{
                    const listaImpactContributionsOf = await apiImpactResults.getImpactContributionsOf(vps1,idCalcolo,idImpactCathegory);
                    if (listaImpactContributionsOf.length != 0) {
                        creaTabellaImpactContributionsOf(listaImpactContributionsOf);
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
            await this.getTechFlow(apiResultQueries,vps1,idCalcolo);
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
                        creaTabellaDirectImpactsOf(listaDirectImpactsOf);
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
           
            await this.getImpactCathegoryTechFlow(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                
                const selectImpactCathegory = document.getElementById("listaInput01");
                const selectedOptionImpactCathegory = selectImpactCathegory.options[selectImpactCathegory.selectedIndex];
                const idImpactCathegory= selectedOptionImpactCathegory.id;

                const selectTechFlow = document.getElementById("listaInput02");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;

                console.log(idTechFlow);
                if(idImpactCathegory === "selectedInput01" || idTechFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow e un Impact Cathegory.</h3>`);
                }   
                else{
                    const listaDirectImpactOfImpactCategoryTechFlow = await apiImpactResults.getDirectImpactOfImpactCategoryTechFlow(vps1, idCalcolo,idTechFlow,idImpactCathegory);
                    if (listaDirectImpactOfImpactCategoryTechFlow.length != 0) {
                        creaTabellaDirectImpactOfImpactCategoryTechFlow(listaDirectImpactOfImpactCategoryTechFlow);
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
            await this.getTechFlow(apiResultQueries,vps1,idCalcolo);
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
                        creaTabellaImpactIntensitiesOf(listaImpactIntensitiesOf);
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
           
            await this.getImpactCathegoryTechFlow(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                
                const selectImpactCathegory = document.getElementById("listaInput01");
                const selectedOptionImpactCathegory = selectImpactCathegory.options[selectImpactCathegory.selectedIndex];
                const idImpactCathegory= selectedOptionImpactCathegory.id;

                const selectTechFlow = document.getElementById("listaInput02");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;

                console.log(idTechFlow);
                if(idImpactCathegory === "selectedInput01" || idTechFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow e un Impact Cathegory.</h3>`);
                }   
                else{
                    const listaDirectImpactIntensityOfImpactCategoryTechFlow = await apiImpactResults.getDirectImpactIntensityOfImpactCategoryTechFlow(vps1, idCalcolo,idTechFlow,idImpactCathegory);
                    if (listaDirectImpactIntensityOfImpactCategoryTechFlow.length != 0) {
                        creaTabellaDirectImpactIntensityOfImpactCategoryTechFlow(listaDirectImpactIntensityOfImpactCategoryTechFlow);
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
            await this.getTechFlow(apiResultQueries,vps1,idCalcolo);
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
                        creaTabellaTotalImpactsOf(listaTotalImpactsOf);
                    }
                }  
            });
        });
        page('/impactResults/totalImpactOfImpactCategoryTechFlow', async () => {
            this.header.innerHTML = '';
            this.header.insertAdjacentHTML('beforeend',creaViewHeaderRisultati());           
            this.main.innerHTML = '';
            this.main.insertAdjacentHTML('beforeend', creaLateralNavbar());
            document.getElementById("main01").insertAdjacentHTML('beforeend',creaViewMainRisultatiDoppioInputDoppiaTabella());
           
            await this.getImpactCathegoryTechFlow(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                
                const selectImpactCathegory = document.getElementById("listaInput01");
                const selectedOptionImpactCathegory = selectImpactCathegory.options[selectImpactCathegory.selectedIndex];
                const idImpactCathegory= selectedOptionImpactCathegory.id;

                const selectTechFlow = document.getElementById("listaInput02");
                const selectedOptionTechFlow = selectTechFlow.options[selectTechFlow.selectedIndex];
                const idTechFlow = selectedOptionTechFlow.id;

                console.log(idTechFlow);
                if(idImpactCathegory === "selectedInput01" || idTechFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un tech flow e un Impact Cathegory.</h3>`);
                }   
                else{
                    const listaTotalImpactOfImpactCategoryTechFlow = await apiImpactResults.getTotalImpactOfImpactCategoryTechFlow(vps1, idCalcolo,idTechFlow,idImpactCathegory);
                    if (listaTotalImpactOfImpactCategoryTechFlow.length != 0) {
                        creaTabellaTotalImpactOfImpactCategoryTechFlow(listaTotalImpactOfImpactCategoryTechFlow);
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
            await this.getImpactCathegory(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                const selectImpactCathegory = document.getElementById("listaInput01");
                const selectedOptionImpactCathegory = selectImpactCathegory.options[selectImpactCathegory.selectedIndex];
                const idImpactCathegory = selectedOptionImpactCathegory.id;

                console.log(idImpactCathegory);
                if(idImpactCathegory === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un Impact Cathegory.</h3>`);
                }   
                else{
                    const listaImpactFactorsOf = await apiImpactResults.getImpactFactorsOf(vps1,idCalcolo,idImpactCathegory);
                    if (listaImpactFactorsOf.length != 0) {
                        creaTabellaImpactFactorsOf(listaImpactFactorsOf);
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
           
            await this.getImpactCathegoryEnviFlow(apiResultQueries,apiFlowResults,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                
                const selectImpactCathegory = document.getElementById("listaInput01");
                const selectedOptionImpactCathegory = selectImpactCathegory.options[selectImpactCathegory.selectedIndex];
                const idImpactCathegory= selectedOptionImpactCathegory.id;

                const selectEnviFlow = document.getElementById("listaInput02");
                const selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                const idEnviFlow = selectedOptionEnviFlow.id;

                if(idImpactCathegory === "selectedInput01" || idEnviFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un Envi flow e un Impact Cathegory.</h3>`);
                }   
                else{
                    const listaImpactFactorsOfImpactCategoryEnviFlow = await apiImpactResults.getImpactFactorsOfImpactCategoryEnviFlow(vps1, idCalcolo,idImpactCathegory,idEnviFlow);
                    if (listaImpactFactorsOfImpactCategoryEnviFlow.length != 0) {
                        creaTabellaImpactFactorsOfImpactCategoryEnviFlow(listaImpactFactorsOfImpactCategoryEnviFlow);
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
            await this.getImpactCathegory(apiResultQueries,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                const selectImpactCathegory = document.getElementById("listaInput01");
                const selectedOptionImpactCathegory = selectImpactCathegory.options[selectImpactCathegory.selectedIndex];
                const idImpactCathegory = selectedOptionImpactCathegory.id;

                console.log(idImpactCathegory);
                if(idImpactCathegory === "selectedInput01") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un Impact Cathegory.</h3>`);
                }   
                else{
                    const listaFlowImpactsOf = await apiImpactResults.getFlowImpactsOf(vps1,idCalcolo,idImpactCathegory);
                    if (listaFlowImpactsOf.length != 0) {
                        creaTabellaFlowImpactsOf(listaFlowImpactsOf);
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
           
            await this.getImpactCathegoryEnviFlow(apiResultQueries,apiFlowResults,vps1,idCalcolo);
            document.getElementById('button').addEventListener('click', async event => {
                
                const selectImpactCathegory = document.getElementById("listaInput01");
                const selectedOptionImpactCathegory = selectImpactCathegory.options[selectImpactCathegory.selectedIndex];
                const idImpactCathegory= selectedOptionImpactCathegory.id;

                const selectEnviFlow = document.getElementById("listaInput02");
                const selectedOptionEnviFlow = selectEnviFlow.options[selectEnviFlow.selectedIndex];
                const idEnviFlow = selectedOptionEnviFlow.id;

                if(idImpactCathegory === "selectedInput01" || idEnviFlow === "selectedInput02") {
                    const messaggio = document.getElementById("informazioniDati");
                    messaggio.innerHTML = '';
                    messaggio.insertAdjacentHTML('beforeend', 
                    `<h3 class="alert alert-danger" role="alert">Seleziona un Envi flow e un Impact Cathegory.</h3>`);
                }   
                else{
                    const listaFlowImpactOfImpactCategoryEnviFlow = await apiImpactResults.getFlowImpactOfImpactCategoryEnviFlow(vps1, idCalcolo,idImpactCathegory,idEnviFlow);
                    if (listaFlowImpactOfImpactCategoryEnviFlow.length != 0) {
                        creaTabellaFlowImpactOfImpactCategoryEnviFlow(listaFlowImpactOfImpactCategoryEnviFlow);
                    }
                }  
            });
        });     
        page();

    }

    /** 
    * In questo metodo raccolgo dal db tutti i Product system che sono disponibili e li inserisco all'interno 
    * della select usata per selezionare il product system che si vuole calcolare andando a impostare l'id, 
    * il value e il text che andranno a formare l'option che verà aggiunto alla select.
    * 
    * @param {Api} apiCalculation - Oggetto che permette il richiamo delle apiCalculation.
    * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
    */
    getProductSystem = async (apiCalculation, vps) => {

        const placeholder = document.getElementById("selectedProductSystem");
        let listaProductSystem = await apiCalculation.getProductSystem(vps);
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
    * @param {Api} apiCalculation - Oggetto che permette il richiamo delle apiCalculation.
    * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
    */
    getImpactMethod = async (apiCalculation, vps) => {

        const placeholder = document.getElementById("selectedImpactMethod");
        let listaImpactMethod = await apiCalculation.getImpactMethod(vps);
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
    * @param {Api} apiCalculation - Oggetto che permette il richiamo delle apiCalculation.
    * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
    * @returns {String} - Stringa che contiene l'id del calcolo del product system.
    */
    calcolaProductSystem = async (apiCalculation,vps) => {

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
                let result = await apiCalculation.calcolaProductSystem(vps, idProductSystem, idImpactMethod, idNewSet);
                idCalcolo = result["@id"];

                const messaggio = document.getElementById("risultatiRicerca");
                messaggio.innerHTML = '';
                messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-secondary" role="alert">Sto eseguendo il calcolo...</h3>`);
                let statoCalcolo = false;
                //Attraverso questo ciclo verifico inviando l'id del calcolo se quest'ultimo è stato ultimato 
                while (statoCalcolo != true) {
                    statoCalcolo = await apiCalculation.getStatoCalcolo(vps, idCalcolo);
                    statoCalcolo = statoCalcolo.isReady;
                }

                console.log("calcolo finito!!!");
                
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

    getTechFlow = async (apiResultQueries, vps,idCalcolo) => {

        const placeholder = document.getElementById("selectedInput01");
        let listaTechFlow = await apiResultQueries.getTechnosphereFlows(vps, idCalcolo);
        console.log("listaTechFlow");
        console.log(listaTechFlow);

        if (listaTechFlow.length == 0) {
            placeholder.innerHTML = "Non ci sono Tech Flow selezionabili";
        } else {
            const select = document.getElementById("listaInput01");
            placeholder.innerHTML = "Seleziona un Tech Flow";
            for (let i = 0; i < listaTechFlow.length; i++) {
                let option = document.createElement("option");
                option.value = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
                option.text = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
                option.id = listaTechFlow[i].provider["@id"]+"::"+listaTechFlow[i].flow["@id"];
                select.appendChild(option);
            }
        }
       
    }

    getEnviFlow = async (apiFlowResults, vps,idCalcolo) => {

        const placeholder = document.getElementById("selectedInput01");
        let listaEnviFlow = await apiFlowResults.getInventoryResult(vps, idCalcolo);
        console.log("listaEnviFlow");
        console.log(listaEnviFlow);

        if (listaEnviFlow.length == 0) {
            placeholder.innerHTML = "Non ci sono Envi Flow selezionabili";
        } else {
            const select = document.getElementById("listaInput01");
            placeholder.innerHTML = "Seleziona un Envi Flow";
            for (let i = 0; i < listaEnviFlow.length; i++) {
                let option = document.createElement("option");
                option.value = listaEnviFlow[i].enviFlow.flow.name;
                option.text = listaEnviFlow[i].enviFlow.flow.name;
                option.id = listaEnviFlow[i].enviFlow.flow["@id"];
                select.appendChild(option);
            }
        }
       
    }

    getTechFlowEnviFlow = async (apiResultQueries,apiFlowResults, vps,idCalcolo) => {

        const placeholder1 = document.getElementById("selectedInput01");
        let listaTechFlow = await apiResultQueries.getTechnosphereFlows(vps, idCalcolo);
        console.log("listaTechFlow");
        console.log(listaTechFlow);

        if (listaTechFlow.length == 0) {
            placeholder1.innerHTML = "Non ci sono Tech Flow selezionabili";
        } else {
            const select = document.getElementById("listaInput01");
            placeholder1.innerHTML = "Seleziona un Tech Flow";
            for (let i = 0; i < listaTechFlow.length; i++) {
                let option = document.createElement("option");
                option.value = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
                option.text = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
                option.id = listaTechFlow[i].provider["@id"]+"::"+listaTechFlow[i].flow["@id"];
                select.appendChild(option);
            }
        }


        const placeholder = document.getElementById("selectedInput02");
        let listaEnviFlow = await apiFlowResults.getInventoryResult(vps, idCalcolo);
        console.log("listaEnviFlow");
        console.log(listaEnviFlow);

        if (listaEnviFlow.length == 0) {
            placeholder.innerHTML = "Non ci sono Envi Flow selezionabili";
        } else {
            const select = document.getElementById("listaInput02");
            placeholder.innerHTML = "Seleziona un Envi Flow";
            for (let i = 0; i < listaEnviFlow.length; i++) {
                let option = document.createElement("option");
                option.value = listaEnviFlow[i].enviFlow.flow.name;
                option.text = listaEnviFlow[i].enviFlow.flow.name;
                option.id = listaEnviFlow[i].enviFlow.flow["@id"]+"::";
                select.appendChild(option);
            }
        }
       
    }

    getImpactCathegory = async (apiResultQueries, vps,idCalcolo) => {

        const placeholder = document.getElementById("selectedInput01");
        let listaImpactCathegory= await apiResultQueries.getImpactCategories(vps,idCalcolo);
        console.log("listaImpactCathegory");
        console.log(listaImpactCathegory);

        if (listaImpactCathegory.length == 0) {
            placeholder.innerHTML = "Non ci sono Impact cathegory selezionabili";
        } else {
            const select = document.getElementById("listaInput01");
            placeholder.innerHTML = "Seleziona un Impact cathegory";
            for (let i = 0; i < listaImpactCathegory.length; i++) {
                let option = document.createElement("option");
                option.value = listaImpactCathegory[i].name;
                option.text = listaImpactCathegory[i].name;
                option.id = listaImpactCathegory[i]["@id"];
                select.appendChild(option);
            }
        }
       
    }

    getImpactCathegoryEnviFlow = async (apiResultQueries,apiFlowResults, vps,idCalcolo) => {

        const placeholder1 = document.getElementById("selectedInput01");
        let listaImpactCathegory= await apiResultQueries.getImpactCategories(vps,idCalcolo);
        console.log("listaImpactCathegory");
        console.log(listaImpactCathegory);

        if (listaImpactCathegory.length == 0) {
            placeholder1.innerHTML = "Non ci sono Impact cathegory selezionabili";
        } else {
            const select = document.getElementById("listaInput01");
            placeholder1.innerHTML = "Seleziona un Impact cathegory";
            for (let i = 0; i < listaImpactCathegory.length; i++) {
                let option = document.createElement("option");
                option.value = listaImpactCathegory[i].name;
                option.text = listaImpactCathegory[i].name;
                option.id = listaImpactCathegory[i]["@id"];
                select.appendChild(option);
            }
        }


        const placeholder = document.getElementById("selectedInput02");
        let listaEnviFlow = await apiFlowResults.getInventoryResult(vps, idCalcolo);
        console.log("listaEnviFlow");
        console.log(listaEnviFlow);

        if (listaEnviFlow.length == 0) {
            placeholder.innerHTML = "Non ci sono Envi Flow selezionabili";
        } else {
            const select = document.getElementById("listaInput02");
            placeholder.innerHTML = "Seleziona un Envi Flow";
            for (let i = 0; i < listaEnviFlow.length; i++) {
                let option = document.createElement("option");
                option.value = listaEnviFlow[i].enviFlow.flow.name;
                option.text = listaEnviFlow[i].enviFlow.flow.name;
                option.id = listaEnviFlow[i].enviFlow.flow["@id"]+"::";
                select.appendChild(option);
            }
        }
       
    }

    getImpactCathegoryTechFlow = async (apiResultQueries,vps,idCalcolo) => {

        const placeholder1 = document.getElementById("selectedInput01");
        let listaImpactCathegory= await apiResultQueries.getImpactCategories(vps,idCalcolo);
        console.log("listaImpactCathegory");
        console.log(listaImpactCathegory);

        if (listaImpactCathegory.length == 0) {
            placeholder1.innerHTML = "Non ci sono Impact cathegory selezionabili";
        } else {
            const select = document.getElementById("listaInput01");
            placeholder1.innerHTML = "Seleziona un Impact cathegory";
            for (let i = 0; i < listaImpactCathegory.length; i++) {
                let option = document.createElement("option");
                option.value = listaImpactCathegory[i].name;
                option.text = listaImpactCathegory[i].name;
                option.id = listaImpactCathegory[i]["@id"];
                select.appendChild(option);
            }
        }


        const placeholder = document.getElementById("selectedInput02");
        let listaTechFlow = await apiResultQueries.getTechnosphereFlows(vps, idCalcolo);
        console.log("listaTechFlow");
        console.log(listaTechFlow);

        if (listaTechFlow.length == 0) {
            placeholder.innerHTML = "Non ci sono Tech Flow selezionabili";
        } else {
            const select = document.getElementById("listaInput02");
            placeholder.innerHTML = "Seleziona un Tech Flow";
            for (let i = 0; i < listaTechFlow.length; i++) {
                let option = document.createElement("option");
                option.value = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
                option.text = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
                option.id = listaTechFlow[i].provider["@id"]+"::"+listaTechFlow[i].flow["@id"];
                select.appendChild(option);
            }
        }
       
    }
}

export default App;