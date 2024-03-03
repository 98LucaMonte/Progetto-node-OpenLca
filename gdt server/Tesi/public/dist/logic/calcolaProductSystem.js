"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcolaProductSystem = void 0;
const modal_view_js_1 = require("../frontend/template/modal-view.js");
const apiCalculation_js_1 = require("../backend/apiCalculation.js");
const apiCalculation = new apiCalculation_js_1.ApiCalculation();
//Metodo utilizzato per eseguire la chiamata API, che si occupa di prendere i dati in input inseriti dall'utente.
function calcolaProductSystem() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                //Inseriti i product system e gli impact method che possono essere scelti per effettuare il calcolo
                yield (0, modal_view_js_1.getAll)("product-system");
                yield (0, modal_view_js_1.getAll)("impact-method");
                let modalCalcolaProductSystem = document.getElementById("calcolaProductSystemMain");
                let buttonCalcola = document.querySelector(".calcolaProduct");
                let selectProductSystem = document.getElementById("listaproduct-system");
                let selectedOptionProductSystem;
                let idProductSystem = "selectedproduct-system";
                let nomeProductSystem;
                let selectImpactMethod = document.getElementById("listaimpact-method");
                let selectedOptionImpactMethod;
                let idImpactMethod = "selectedimpact-method";
                let nomeImpactMethod;
                let idNewSet;
                let idCalcolo;
                let jsonDatiCalcolo;
                //Il button Calcola viene attivato se abbiamo entrambi gli input altrimenti non viene attivato
                if (modalCalcolaProductSystem) {
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
                if (buttonCalcola) {
                    //Apertura dell modal per il caricamento del calcolo del product system
                    buttonCalcola.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                        event.preventDefault();
                        let modalCalcolo = document.getElementById("modal");
                        if (modalCalcolo) {
                            modalCalcolo.insertAdjacentHTML('beforeend', (0, modal_view_js_1.modalCaricamentoCalcoloProductSystem)());
                            //div del caricamento del calcolo del product system 
                            //@ts-ignore
                            let myModal = new bootstrap.Modal(document.getElementById('calcolaProductSystemCaricamento'));
                            myModal.show();
                            let divCreaProductSystem = document.getElementById("infoCalcolo");
                            if (selectImpactMethod && selectProductSystem && divCreaProductSystem) {
                                selectedOptionProductSystem = selectProductSystem.options[selectProductSystem.selectedIndex];
                                idProductSystem = selectedOptionProductSystem.id;
                                nomeProductSystem = selectedOptionProductSystem.value;
                                selectedOptionImpactMethod = selectImpactMethod.options[selectImpactMethod.selectedIndex];
                                idImpactMethod = selectedOptionImpactMethod.id;
                                nomeImpactMethod = selectedOptionImpactMethod.value;
                                let arrayInfoImpactMethod = idImpactMethod.split("/");
                                if (arrayInfoImpactMethod.length === 2) {
                                    idImpactMethod = arrayInfoImpactMethod[0];
                                    idNewSet = arrayInfoImpactMethod[1];
                                }
                                //Avvio della funzione di elaborazione del calcolo del prodotto sistema
                                let jsonCalcolo = yield apiCalculation.calcolaProductSystem(idProductSystem, idImpactMethod, idNewSet);
                                idCalcolo = jsonCalcolo["@id"];
                                let statoCalcolo = false;
                                let numeroIterazioni = 0;
                                //Attraverso questo ciclo verifico inviando l'id del calcolo se quest'ultimo è stato ultimato 
                                while (statoCalcolo !== true) {
                                    yield new Promise(resolve => setTimeout(resolve, 1500)); // Ritardo
                                    statoCalcolo = yield apiCalculation.getStatoCalcolo(idCalcolo);
                                    statoCalcolo = statoCalcolo.isReady;
                                    if (numeroIterazioni === 6) {
                                        break;
                                    }
                                    (0, modal_view_js_1.avanzamentoBarra)(String(10 * numeroIterazioni));
                                    numeroIterazioni++;
                                }
                                if (statoCalcolo) {
                                    (0, modal_view_js_1.avanzamentoBarra)("100");
                                    yield new Promise(resolve => setTimeout(resolve, 3000));
                                    divCreaProductSystem.innerHTML = "";
                                    jsonDatiCalcolo = creaJsonDatiCalcolo(idProductSystem, nomeProductSystem, idImpactMethod, nomeImpactMethod, idCalcolo);
                                    resolve(jsonDatiCalcolo);
                                }
                                else {
                                    divCreaProductSystem.innerHTML = "";
                                    divCreaProductSystem.insertAdjacentHTML('beforeend', `<div class="alert alert-danger" role="alert">
                                Siamo spiacenti si è verficato un errore durante il calcolo del product system.<br>
                                <button id="retryButton" type="button" class="btn btn-link text-dark text-center">Riprova</button>
                                </div>`);
                                    let buttonRicarica = document.getElementById("retryButton");
                                    if (buttonRicarica) {
                                        buttonRicarica.addEventListener("click", function () {
                                            location.reload();
                                        });
                                    }
                                }
                            }
                        }
                    }));
                }
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
exports.calcolaProductSystem = calcolaProductSystem;
function creaJsonDatiCalcolo(idProductSystem, nomeProductSystem, idImpactMethod, nomeImpactMethod, idCalcolo) {
    let jsonDatiCalcolo = {
        "productSystem": {
            "id": idProductSystem,
            "nome": nomeProductSystem
        },
        "impactMethod": {
            "id": idImpactMethod,
            "nome": nomeImpactMethod
        },
        "idCalcolo": idCalcolo
    };
    return jsonDatiCalcolo;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY29sYVByb2R1Y3RTeXN0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9sb2dpYy9jYWxjb2xhUHJvZHVjdFN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxzRUFBa0g7QUFFbEgsb0VBQThEO0FBSzlELE1BQU0sY0FBYyxHQUFHLElBQUksa0NBQWMsRUFBRSxDQUFDO0FBRzVDLGlIQUFpSDtBQUNqSCxTQUFzQixvQkFBb0I7O1FBQ3RDLE9BQU8sSUFBSSxPQUFPLENBQWtCLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzFELElBQUksQ0FBQztnQkFDRCxtR0FBbUc7Z0JBQ25HLE1BQU0sSUFBQSxzQkFBTSxFQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9CLE1BQU0sSUFBQSxzQkFBTSxFQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUU5QixJQUFJLHlCQUF5QixHQUF5QixRQUFRLENBQUMsY0FBYyxDQUFDLDBCQUEwQixDQUEwQixDQUFDO2dCQUNuSSxJQUFJLGFBQWEsR0FBNEIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBNkIsQ0FBQztnQkFFbkgsSUFBSSxtQkFBbUIsR0FBMkIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBNkIsQ0FBQztnQkFDN0gsSUFBSSwyQkFBMkIsQ0FBQztnQkFDaEMsSUFBSSxlQUFlLEdBQVUsd0JBQXdCLENBQUM7Z0JBQ3RELElBQUksaUJBQXdCLENBQUM7Z0JBRTdCLElBQUksa0JBQWtCLEdBQTZCLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQTZCLENBQUM7Z0JBQzdILElBQUksMEJBQTBCLENBQUM7Z0JBQy9CLElBQUksY0FBYyxHQUFVLHVCQUF1QixDQUFDO2dCQUNwRCxJQUFJLGdCQUF1QixDQUFDO2dCQUM1QixJQUFJLFFBQWUsQ0FBQztnQkFFcEIsSUFBSSxTQUFnQixDQUFDO2dCQUVyQixJQUFJLGVBQWdD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