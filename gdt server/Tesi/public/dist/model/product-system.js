var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ApiCalculation } from "../backend/apiCalculation.js";
import { modalCalcolaProductSystem01, modalCreaProductSystem01, avanzamentoBarra } from "../frontend/template/modal-view.js";
import { calcolaProductSystem } from "../logic/calcolaProductSystem.js";
import { creaModalInfoProductSystem } from "../logic/creaProductSystem.js";
const apiCalculation = new ApiCalculation();
export class ProductSystem {
    //Metodo usato per aprire il modale relativo all'inizializzazione dei campi per fare il calcolo.
    mostraModalCalcolaProductSystem() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let modalCalcolo = document.getElementById("modal");
                    if (modalCalcolo) {
                        modalCalcolo.insertAdjacentHTML('beforeend', modalCalcolaProductSystem01());
                        //@ts-ignore
                        let myModal = new bootstrap.Modal(document.getElementById('calcolaProductSystemMain'));
                        myModal.show();
                        let risultato = yield calcolaProductSystem();
                        resolve(risultato);
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    //Metodo usato per creare un nuovo product system tramite gli input ricevuti con l'interazione con gli utenti
    creaProductSystem() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let modalNuovoProductSystem = document.getElementById("modal");
                    if (modalNuovoProductSystem) {
                        modalNuovoProductSystem.insertAdjacentHTML('beforeend', modalCreaProductSystem01());
                        //@ts-ignore
                        let myModal = new bootstrap.Modal(document.getElementById('creaProductSystemMain'));
                        myModal.show();
                        let json = yield creaModalInfoProductSystem();
                        if (json === null) {
                            reject(new Error("Errore nella compilazione del Prodotto di Sistema"));
                        }
                        let idProcess = yield apiCalculation.putNuovoElement("process", json);
                        console.log(idProcess["@id"]);
                        let idProductSystem = yield apiCalculation.nuovoProductSystem(idProcess["@id"]);
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
                    Siamo spiacenti si è verificato un errore durante la creazione del product system.
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
            }));
        });
    }
}
