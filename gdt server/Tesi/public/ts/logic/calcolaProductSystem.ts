import { modalCaricamentoCalcoloProductSystem,getAll,avanzamentoBarra } from "../frontend/template/modal-view.js";

import { ApiCalculation } from "../backend/apiCalculation.js";
import { JsonDatiCalcolo } from "../model/types.js";

const apiCalculation = new ApiCalculation();
 

//Metodo utilizzato per eseguire la chiamata API, che si occupa di prendere i dati in input inseriti dall'utente.
export async function calcolaProductSystem (){
    return new Promise<JsonDatiCalcolo>(async (resolve, reject) => {
        try {
            //Inseriti i product system e gli impact method che possono essere scelti per effettuare il calcolo
            await getAll("product-system");
            await getAll("impact-method");

            let modalCalcolaProductSystem:HTMLDivElement | null = document.getElementById("calcolaProductSystemMain") as HTMLDivElement | null;
            let buttonCalcola:HTMLButtonElement | null = document.querySelector(".calcolaProduct") as HTMLButtonElement | null;
            
            let selectProductSystem:HTMLSelectElement |null = document.getElementById("listaproduct-system") as HTMLSelectElement | null;
            let selectedOptionProductSystem;
            let idProductSystem:string = "selectedproduct-system";
            let nomeProductSystem:string;
            
            let selectImpactMethod: HTMLSelectElement | null = document.getElementById("listaimpact-method") as HTMLSelectElement | null;
            let selectedOptionImpactMethod;
            let idImpactMethod:string = "selectedimpact-method";
            let nomeImpactMethod:string;
            let idNewSet:string;

            let idCalcolo:string;

            let jsonDatiCalcolo: JsonDatiCalcolo;

            //Il button Calcola viene attivato se abbiamo entrambi gli input altrimenti non viene attivato
            if(modalCalcolaProductSystem){
                modalCalcolaProductSystem.addEventListener('change', (event) => {
                    event.preventDefault();
                    
                    if (selectImpactMethod && selectProductSystem && buttonCalcola) {
                        selectedOptionProductSystem = selectProductSystem.options[selectProductSystem.selectedIndex];
                        idProductSystem = selectedOptionProductSystem.id;
                        
                        selectedOptionImpactMethod = selectImpactMethod.options[selectImpactMethod.selectedIndex];
                        idImpactMethod = selectedOptionImpactMethod.id;

                        if (idImpactMethod === "selectedimpact-method" || idProductSystem === "selectedproduct-system") 
                            buttonCalcola.disabled = true;
                        else 
                            buttonCalcola.disabled = false;
                    }

                });   
            }

            if(buttonCalcola){
                //Apertura dell modal per il caricamento del calcolo del product system
                buttonCalcola.addEventListener('click',async (event)=>{
                    event.preventDefault();
                    let modalCalcolo: HTMLDivElement | null = document.getElementById("modal") as HTMLDivElement | null;
                    
                    if (modalCalcolo) {
                        modalCalcolo.insertAdjacentHTML('beforeend', modalCaricamentoCalcoloProductSystem());
                        
                        //div del caricamento del calcolo del product system 
                        //@ts-ignore
                        let myModal = new bootstrap.Modal(document.getElementById('calcolaProductSystemCaricamento'));
                        myModal.show();
                    
                        let divCreaProductSystem:HTMLDivElement | null = document.getElementById("infoCalcolo")as HTMLDivElement|null;
                        
                        if(selectImpactMethod && selectProductSystem && divCreaProductSystem){
                            selectedOptionProductSystem = selectProductSystem.options[selectProductSystem.selectedIndex];
                            idProductSystem = selectedOptionProductSystem.id;
                            nomeProductSystem = selectedOptionProductSystem.value;

                            selectedOptionImpactMethod = selectImpactMethod.options[selectImpactMethod.selectedIndex];
                            idImpactMethod = selectedOptionImpactMethod.id;
                            nomeImpactMethod = selectedOptionImpactMethod.value;

                            let arrayInfoImpactMethod:string[] = idImpactMethod.split("/");
                            if (arrayInfoImpactMethod.length === 2) {
                                idImpactMethod = arrayInfoImpactMethod[0];
                                idNewSet = arrayInfoImpactMethod[1];
                            }
                            //Avvio della funzione di elaborazione del calcolo del prodotto sistema
                            let jsonCalcolo = await apiCalculation.calcolaProductSystem(idProductSystem,idImpactMethod,idNewSet);
                            idCalcolo = jsonCalcolo["@id"];
                            let statoCalcolo:any = false;
                            let numeroIterazioni = 0;
                            //Attraverso questo ciclo verifico inviando l'id del calcolo se quest'ultimo è stato ultimato 
                            while (statoCalcolo !== true) {
                                await new Promise(resolve => setTimeout(resolve, 1500)); // Ritardo
                                statoCalcolo = await apiCalculation.getStatoCalcolo(idCalcolo);
                                statoCalcolo = statoCalcolo.isReady;
                                                              
                                if (numeroIterazioni === 10) {
                                    break; 
                                }
                                 avanzamentoBarra(String(10*numeroIterazioni))
                                numeroIterazioni++;
                            }
                            
                            if(statoCalcolo){ 
                                avanzamentoBarra("100");
                                await new Promise(resolve => setTimeout(resolve, 3000));
                                divCreaProductSystem.innerHTML = "";
                            
                                jsonDatiCalcolo = creaJsonDatiCalcolo(idProductSystem,nomeProductSystem,idImpactMethod,nomeImpactMethod,idCalcolo);
                                resolve(jsonDatiCalcolo);
                            }
                            else{
                                divCreaProductSystem.innerHTML = "";
                                divCreaProductSystem.insertAdjacentHTML('beforeend',
                                `<div class="alert alert-danger" role="alert">
                                Siamo spiacenti si è verficato un errore durante il calcolo del product system.<br>
                                <button id="retryButton" type="button" class="btn btn-link text-dark text-center">Riprova</button>
                                </div>`);

                                let buttonRicarica:HTMLButtonElement | null = document.getElementById("retryButton") as HTMLButtonElement | null;
                                if(buttonRicarica){
                                    buttonRicarica.addEventListener("click", function() {
                                        location.reload();
                                    });
                                }
                            }

                        }
                    }                        
                })
            }

        }
        catch(error) {
            reject(error)
        }
    });
}

function creaJsonDatiCalcolo(idProductSystem: string,nomeProductSystem: string,idImpactMethod: string,nomeImpactMethod: string,idCalcolo: string):JsonDatiCalcolo{

    let jsonDatiCalcolo:JsonDatiCalcolo={
        "productSystem":{
            "id": idProductSystem,
            "nome": nomeProductSystem
        },
        "impactMethod":{
            "id": idImpactMethod,
            "nome": nomeImpactMethod
        },
        "idCalcolo": idCalcolo
    }
    return jsonDatiCalcolo;
}