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
//import { DatabaseConnector } from "../backend/db.js";
const apiCalculation = new ApiCalculation();
export class ProductSystem {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1zeXN0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RlbC9wcm9kdWN0LXN5c3RlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFOUQsT0FBTyxFQUFnQywyQkFBMkIsRUFBQyx3QkFBd0IsRUFBQyxnQkFBZ0IsRUFBNkMsTUFBTSxvQ0FBb0MsQ0FBQztBQUlwTSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQTtBQUN2RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQTtBQUMxRSx1REFBdUQ7QUFFdkQsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztBQUU1QyxNQUFNLE9BQU8sYUFBYTtJQUV0Qjs7Ozs7Ozs7Ozs7UUFXSTtJQUVKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFFSCxnR0FBZ0c7SUFDMUYsK0JBQStCOztZQUNqQyxPQUFPLElBQUksT0FBTyxDQUFrQixDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDMUQsSUFBSSxDQUFDO29CQUNELElBQUksWUFBWSxHQUEwQixRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBMEIsQ0FBQztvQkFDcEcsSUFBSSxZQUFZLEVBQUUsQ0FBQzt3QkFDZixZQUFZLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLDJCQUEyQixFQUFFLENBQUMsQ0FBQzt3QkFFNUUsWUFBWTt3QkFDWixJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZGLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDZixJQUFJLFNBQVMsR0FBbUIsTUFBTSxvQkFBb0IsRUFBRSxDQUFDO3dCQUU3RCxPQUFPLENB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