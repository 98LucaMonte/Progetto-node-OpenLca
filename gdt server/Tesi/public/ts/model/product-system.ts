import { ApiCalculation } from "../backend/apiCalculation.js";

import { modalConfrontaProductSystem01,modalCalcolaProductSystem01,modalCreaProductSystem01,avanzamentoBarra, getAll, riempiSelectCofrontaProductSystem } from "../frontend/template/modal-view.js";

import { JsonDatiCalcolo, JsonProcess } from "./types.js";

import { calcolaProductSystem } from "../logic/calcolaProductSystem.js"
import { creaModalInfoProductSystem } from "../logic/creaProductSystem.js"
//import { DatabaseConnector } from "../backend/db.js";

const apiCalculation = new ApiCalculation();

export class ProductSystem{
    
    /*async confrontaProductSystem(){
        const dbConnector = new DatabaseConnector();
        try {
            await dbConnector.connect();
            const queryResults = await dbConnector.queryDatabase('SELECT * FROM tbl_product_systems');
            console.log(queryResults);
        } catch (error) {
            console.error('Errore durante l\'esecuzione dell\'operazione:', error);
        } finally {
            await dbConnector.disconnect();
        }
    };*/

    /*async confrontaProductSystem(arrayJsonDatiCalcolo:JsonDatiCalcolo[]) {

        return new Promise<any>(async (resolve, reject) => {
            try {
                let modalConfronto: HTMLDivElement | null = document.getElementById("modal") as HTMLDivElement | null;
                if (modalConfronto) {
                    modalConfronto.insertAdjacentHTML('beforeend', modalConfrontaProductSystem01());
                    
                    //@ts-ignore
                    let myModal = new bootstrap.Modal(document.getElementById('confrontaProductSystemMain'));
                    myModal.show();
                    riempiSelectCofrontaProductSystem(arrayJsonDatiCalcolo,"productsystem01");
                    riempiSelectCofrontaProductSystem(arrayJsonDatiCalcolo,"productsystem02");

                } 
            } 
            catch (error) {
                reject(error);
            } 
        })
        
    }*/

    //Metodo usato per aprire il modale relativo all'inizializzazione dei campi per fare il calcolo.
    async mostraModalCalcolaProductSystem(){
        return new Promise<JsonDatiCalcolo>(async (resolve, reject) => {
            try {
                let modalCalcolo: HTMLDivElement | null = document.getElementById("modal") as HTMLDivElement | null;
                if (modalCalcolo) {
                    modalCalcolo.insertAdjacentHTML('beforeend', modalCalcolaProductSystem01());
                    
                    //@ts-ignore
                    let myModal = new bootstrap.Modal(document.getElementById('calcolaProductSystemMain'));
                    myModal.show();
                    let risultato:JsonDatiCalcolo = await calcolaProductSystem();
                    
                    resolve(risultato);
                    
                    
                }

            } catch (error) {
                reject(error)
            }
            
        });
    }

    //Metodo usato per creare un nuovo product system tramite gli input ricevuti con l'interazione con gli utenti
    async creaProductSystem() {
        return new Promise<string>(async (resolve, reject) => {
            try {
                let modalNuovoProductSystem: HTMLDivElement | null = document.getElementById("modal") as HTMLDivElement | null;
                if (modalNuovoProductSystem) {
                    modalNuovoProductSystem.insertAdjacentHTML('beforeend', modalCreaProductSystem01());
                    //@ts-ignore
                    let myModal = new bootstrap.Modal(document.getElementById('creaProductSystemMain'));
                    myModal.show();
    
                    let json: JsonProcess = await creaModalInfoProductSystem();
                    if (json === null) {
                        reject(new Error("Errore nella compilazione del Prodotto di Sistema"));
                    }
    
                    let idProcess = await apiCalculation.putNuovoElement("process", json);
                    
                    console.log(idProcess["@id"])

                    let idProductSystem = await apiCalculation.nuovoProductSystem(idProcess["@id"]);
                     
                    if(idProductSystem != null){
                        avanzamentoBarra("100");
                        resolve(idProductSystem);
                    }
                    
                }
            }
            catch (error) {
                let divCreaProductSystem:HTMLDivElement | null = document.getElementById("bodyDivCreaProduct")as HTMLDivElement|null;
                if(divCreaProductSystem){
                    divCreaProductSystem.innerHTML = "";
                    divCreaProductSystem.insertAdjacentHTML('beforeend',
                    `<div class="alert alert-danger" role="alert">
                    Siamo spiacenti si è verificato un errore durante la creazione del product system.
                    <br>
                    <button id="retryButton" type="button" class="btn btn-link text-dark text-center">Riprova</button>
                    </div>`);

                    let buttonRicarica:HTMLButtonElement | null = document.getElementById("retryButton") as HTMLButtonElement | null;
                    if(buttonRicarica){
                        buttonRicarica.addEventListener("click", function() {
                            location.reload();
                        });
                    }
                }
                reject(error);
            }
        });
    }
    
}

