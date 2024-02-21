var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { modalCaricamentoCalcoloProductSystem, getAll, avanzamentoBarra } from "../frontend/template/modal-view.js";
import { ApiCalculation } from "../backend/apiCalculation.js";
const apiCalculation = new ApiCalculation();
//Metodo utilizzato per eseguire la chiamata API, che si occupa di prendere i dati in input inseriti dall'utente.
export function calcolaProductSystem() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                //Inseriti i product system e gli impact method che possono essere scelti per effettuare il calcolo
                yield getAll("product-system");
                yield getAll("impact-method");
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
                            modalCalcolo.insertAdjacentHTML('beforeend', modalCaricamentoCalcoloProductSystem());
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
                                    avanzamentoBarra(String(10 * numeroIterazioni));
                                    numeroIterazioni++;
                                }
                                if (statoCalcolo) {
                                    avanzamentoBarra("100");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY29sYVByb2R1Y3RTeXN0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9sb2dpYy9jYWxjb2xhUHJvZHVjdFN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsb0NBQW9DLEVBQUMsTUFBTSxFQUFDLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFbEgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRzlELE1BQU0sY0FBYyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7QUFHNUMsaUhBQWlIO0FBQ2pILE1BQU0sVUFBZ0Isb0JBQW9COztRQUN0QyxPQUFPLElBQUksT0FBTyxDQUFrQixDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMxRCxJQUFJLENBQUM7Z0JBQ0QsbUdBQW1HO2dCQUNuRyxNQUFNLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFFOUIsSUFBSSx5QkFBeUIsR0FBeUIsUUFBUSxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsQ0FBMEIsQ0FBQztnQkFDbkksSUFBSSxhQUFhLEdBQTRCLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQTZCLENBQUM7Z0JBRW5ILElBQUksbUJBQW1CLEdBQTJCLFFBQVEsQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQTZCLENBQUM7Z0JBQzdILElBQUksMkJBQTJCLENBQUM7Z0JBQ2hDLElBQUksZUFBZSxHQUFVLHdCQUF3QixDQUFDO2dCQUN0RCxJQUFJLGlCQUF3QixDQUFDO2dCQUU3QixJQUFJLGtCQUFrQixHQUE2QixRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUE2QixDQUFDO2dCQUM3SCxJQUFJLDBCQUEwQixDQUFDO2dCQUMvQixJQUFJLGNBQWMsR0FBVSx1QkFBdUIsQ0FBQztnQkFDcEQsSUFBSSxn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