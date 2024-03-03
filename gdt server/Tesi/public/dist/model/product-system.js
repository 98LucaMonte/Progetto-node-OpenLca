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
exports.ProductSystem = void 0;
const apiCalculation_js_1 = require("../backend/apiCalculation.js");
const modal_view_js_1 = require("../frontend/template/modal-view.js");
const calcolaProductSystem_js_1 = require("../logic/calcolaProductSystem.js");
const creaProductSystem_js_1 = require("../logic/creaProductSystem.js");
//import { DatabaseConnector } from "../backend/db.js";
const apiCalculation = new apiCalculation_js_1.ApiCalculation();
class ProductSystem {
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
    mostraModalCalcolaProductSystem() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let modalCalcolo = document.getElementById("modal");
                    if (modalCalcolo) {
                        modalCalcolo.insertAdjacentHTML('beforeend', (0, modal_view_js_1.modalCalcolaProductSystem01)());
                        //@ts-ignore
                        let myModal = new bootstrap.Modal(document.getElementById('calcolaProductSystemMain'));
                        myModal.show();
                        let risultato = yield (0, calcolaProductSystem_js_1.calcolaProductSystem)();
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
                        modalNuovoProductSystem.insertAdjacentHTML('beforeend', (0, modal_view_js_1.modalCreaProductSystem01)());
                        //@ts-ignore
                        let myModal = new bootstrap.Modal(document.getElementById('creaProductSystemMain'));
                        myModal.show();
                        let json = yield (0, creaProductSystem_js_1.creaModalInfoProductSystem)();
                        if (json === null) {
                            reject(new Error("Errore nella compilazione del Prodotto di Sistema"));
                        }
                        let idProcess = yield apiCalculation.putNuovoElement("process", json);
                        console.log(idProcess["@id"]);
                        let idProductSystem = yield apiCalculation.nuovoProductSystem(idProcess["@id"]);
                        if (idProductSystem != null) {
                            (0, modal_view_js_1.avanzamentoBarra)("100");
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
exports.ProductSystem = ProductSystem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1zeXN0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RlbC9wcm9kdWN0LXN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxvRUFBOEQ7QUFFOUQsc0VBQW9NO0FBSXBNLDhFQUF1RTtBQUN2RSx3RUFBMEU7QUFDMUUsdURBQXVEO0FBRXZELE1BQU0sY0FBYyxHQUFHLElBQUksa0NBQWMsRUFBRSxDQUFDO0FBRTVDLE1BQWEsYUFBYTtJQUV0Qjs7Ozs7Ozs7Ozs7UUFXSTtJQUVKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFFSCxnR0FBZ0c7SUFDMUYsK0JBQStCOztZQUNqQyxPQUFPLElBQUksT0FBTyxDQUFrQixDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDMUQsSUFBSSxDQUFDO29CQUNELElBQUksWUFBWSxHQUEwQixRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBMEIsQ0FBQztvQkFDcEcsSUFBSSxZQUFZLEVBQUUsQ0FBQzt3QkFDZixZQUFZLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLElBQUEsMkNBQTJCLEdBQUUsQ0FBQyxDQUFDO3dCQUU1RSxZQUFZO3dCQUNaLElBQUksT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQzt3QkFDdkYsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNmLElBQUksU0FBUyxHQUFtQixNQUFNLElBQUEsOENBQW9CLEdBQUUsQ0FBQzt3QkFFN0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUd2QixDQUFDO2dCQUVMLENBQUM7Z0JBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztvQkFDYixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ2pCLENBQUM7WUFFTCxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0lBRUQsNkdBQTZHO0lBQ3ZHLGlCQUFpQjs7WUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBUyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDakQsSUFBSSxDQUFDO29CQUNELElBQUksdUJBQXVCLEdBQTBCLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUEwQixDQUFDO29CQUMvRyxJQUFJLHVCQUF1QixFQUFFLENBQUM7d0JBQzFCLHVCQUF1QixDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxJQUFBLHdDQUF3QixHQUFFLENBQUMsQ0FBQzt3QkFDcEYsWUFBWTt3QkFDWixJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7d0JBQ3BGLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFFZixJQUFJLElBQUksR0FBZ0IsTUFBTSxJQUFBLGlEQUEwQixHQUFFLENBQUM7d0JBQzNELElBQUksSUFBSSxLQUFLLElBQUksRUFBRSxDQUFDOzRCQUNoQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQyxDQUFDO3dCQUMzRSxDQUFDO3dCQUVELElBQUksU0FBUyxHQUFHLE1BQU0sY0FBYyxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBRXRFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7d0JBRTdCLElBQUksZUFBZSxHQUFHLE1BQU0sY0FBYyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUVoRixJQUFHLGVBQWUsSUFBSSxJQUFJLEVBQUMsQ0FBQzs0QkFDeEIsSUFBQSxnQ0FBZ0IsRUFBQyxLQUFLLENBQUMsQ0FBQzs0QkFDeEIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUM3QixDQUFDO29CQUVMLENBQUM7Z0JBQ0wsQ0FBQztnQkFDRCxPQUFPLEtBQUssRUFBRSxDQUFDO29CQUNYLElBQUksb0JBQW9CLEdBQXlCLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQXVCLENBQUM7b0JBQ3JILElBQUcsb0JBQW9CLEVBQUMsQ0FBQzt3QkFDckIsb0JBQW9CLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQzt3QkFDcEMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUNuRDs7OzsyQkFJTyxDQUFDLENBQUM7d0JBRVQsSUFBSSxjQUFjLEdBQTRCLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUE2QixDQUFDO3dCQUNqSCxJQUFHLGNBQWMsRUFBQyxDQUFDOzRCQUNmLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7Z0NBQ3JDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs0QkFDdEIsQ0FBQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQztvQkFDTCxDQUFDO29CQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztZQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7Q0FFSjtBQW5IRCxzQ0FtSEMifQ==