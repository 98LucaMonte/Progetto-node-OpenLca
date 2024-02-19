import { ApiCalculation } from "../backend/apiCalculation.js";
import { modalConfrontaProductSystem01, modalCalcolaProductSystem01, modalCreaProductSystem01, avanzamentoBarra, riempiSelectCofrontaProductSystem } from "../frontend/template/modal-view.js";
import { calcolaProductSystem } from "../logic/calcolaProductSystem.js";
import { creaModalInfoProductSystem } from "../logic/creaProductSystem.js";
const apiCalculation = new ApiCalculation();
export class ProductSystem {
    arrayJsonDatiCalcolo = []; //Array usato per tenere traccia degli idCalcolo dei product system calcolati
    async confrontaProductSystem() {
        return new Promise(async (resolve, reject) => {
            try {
                let modalConfronto = document.getElementById("modal");
                if (modalConfronto) {
                    modalConfronto.insertAdjacentHTML('beforeend', modalConfrontaProductSystem01());
                    //@ts-ignore
                    let myModal = new bootstrap.Modal(document.getElementById('confrontaProductSystemMain'));
                    myModal.show();
                    riempiSelectCofrontaProductSystem(this.arrayJsonDatiCalcolo, "productsystem01");
                    riempiSelectCofrontaProductSystem(this.arrayJsonDatiCalcolo, "productsystem02");
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    //Metodo usato per aprire il modale relativo all'inizializzazione dei campi per fare il calcolo.
    async mostraModalCalcolaProductSystem() {
        return new Promise(async (resolve, reject) => {
            try {
                let modalCalcolo = document.getElementById("modal");
                if (modalCalcolo) {
                    modalCalcolo.insertAdjacentHTML('beforeend', modalCalcolaProductSystem01());
                    //@ts-ignore
                    let myModal = new bootstrap.Modal(document.getElementById('calcolaProductSystemMain'));
                    myModal.show();
                    let risultato = await calcolaProductSystem();
                    this.arrayJsonDatiCalcolo.push(risultato);
                    console.log(this.arrayJsonDatiCalcolo);
                    resolve(risultato);
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    //Metodo usato per creare un nuovo product system tramite gli input ricevuti con l'interazione con gli utenti
    async creaProductSystem() {
        return new Promise(async (resolve, reject) => {
            try {
                let modalNuovoProductSystem = document.getElementById("modal");
                if (modalNuovoProductSystem) {
                    modalNuovoProductSystem.insertAdjacentHTML('beforeend', modalCreaProductSystem01());
                    //@ts-ignore
                    let myModal = new bootstrap.Modal(document.getElementById('creaProductSystemMain'));
                    myModal.show();
                    let json = await creaModalInfoProductSystem();
                    if (json === null) {
                        reject(new Error("Errore nella compilazione del Prodotto di Sistema"));
                    }
                    let idProcess = await apiCalculation.putNuovoElement("process", json);
                    let idProductSystem = await apiCalculation.nuovoProductSystem(idProcess["@id"]);
                    if (idProductSystem != null) {
                        avanzamentoBarra("100");
                        resolve(idProductSystem);
                    }
                }
            }
            catch (error) {
                let divCreaProductSystem = document.getElementById("bodyDivCreaProduct");
                if (divCreaProductSystem) {
                    divCreaProductSystem.innerHTML = "";
                    divCreaProductSystem.insertAdjacentHTML('beforeend', `<div class="alert alert-danger" role="alert">
                    Siamo spiacenti si è verficato un errore durante la creazione del product system.
                    <br>
                    <button id="retryButton" type="button" class="btn btn-link text-dark text-center">Riprova</button>
                    </div>`);
                    let buttonRicarica = document.getElementById("retryButton");
                    if (buttonRicarica) {
                        buttonRicarica.addEventListener("click", function () {
                            location.reload();
                        });
                    }
                }
                reject(error);
            }
        });
    }
}
