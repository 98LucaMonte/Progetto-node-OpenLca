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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
//@ts-ignore
const page_mjs_1 = __importDefault(require("//unpkg.com/page/page.mjs"));
const home_view_js_1 = require("./frontend/template/home-view.js");
const error_view_js_1 = require("./frontend/template/error-view.js");
const product_system_js_1 = require("./model/product-system.js");
//@ts-ignore
//import { connectDb } from './backend/db.js';
const productSystem = new product_system_js_1.ProductSystem();
class App {
    constructor(contentPage) {
        this.contentPage = contentPage;
        this.arrayJsonDatiCalcolo = [];
        this.setupRoutes(this.contentPage, this.arrayJsonDatiCalcolo);
    }
    //Metodo usato per aggiungere le route dell'applicazione 
    setupRoutes(contentPage, arrayJsonDatiCalcolo) {
        (0, page_mjs_1.default)('/', () => {
            (0, home_view_js_1.homeView)(contentPage);
            //attendo il caricamento elementi della pagina
            document.addEventListener('DOMContentLoaded', (event) => {
                event.preventDefault();
                let buttonCreaProductSystem = document.getElementById('creaProductSystem');
                let buttonCalcolaProductSystem = document.getElementById('calcolaProductSystem');
                let buttonConfrontaProductSystem = document.getElementById('confrontaProductSystem');
                console.log(this.arrayJsonDatiCalcolo);
                if (buttonCreaProductSystem) {
                    //Una volta trovato il button  di creazione del product system attendo l'evento di click per aprire il primo modal
                    buttonCreaProductSystem.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                        event.preventDefault();
                        let idProductSystem = yield productSystem.creaProductSystem();
                        if (idProductSystem) {
                            location.reload();
                        }
                    }));
                }
                if (buttonCalcolaProductSystem) {
                    //Apertura del modal per effettuare il calcolo di un Product System
                    buttonCalcolaProductSystem.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                        event.preventDefault();
                        //Abbiamo l'id del calcolo del product system appena calcolato
                        let risultato = yield productSystem.mostraModalCalcolaProductSystem();
                        if (risultato) {
                            // TODO: salvare il risultato del calcolo sul database. Bisogna collegarsi al database e salvare questo risultato 
                            arrayJsonDatiCalcolo.push(risultato);
                            console.log(arrayJsonDatiCalcolo);
                        }
                    }));
                }
                if (buttonConfrontaProductSystem) {
                    buttonConfrontaProductSystem.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                        event.preventDefault();
                        console.log("Collegamento al database");
                        //await connectDb();
                        //await productSystem.confrontaProductSystem();
                    }));
                }
            });
        });
        (0, page_mjs_1.default)('*', (ctx) => {
            //metodo per pagina non esistente
            (0, error_view_js_1.notFound)(ctx, contentPage);
        });
        (0, page_mjs_1.default)();
    }
}
exports.App = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFlBQVk7QUFDWix5RUFBNkM7QUFFN0MsbUVBQTREO0FBQzVELHFFQUE2RDtBQUU3RCxpRUFBMEQ7QUFFMUQsWUFBWTtBQUNaLDhDQUE4QztBQUU5QyxNQUFNLGFBQWEsR0FBRyxJQUFJLGlDQUFhLEVBQUUsQ0FBQztBQUcxQyxNQUFhLEdBQUc7SUFLWixZQUFZLFdBQTBCO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCx5REFBeUQ7SUFDakQsV0FBVyxDQUFDLFdBQTBCLEVBQUMsb0JBQXNDO1FBRWpGLElBQUEsa0JBQUksRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO1lBQ1gsSUFBQSx1QkFBUSxFQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXRCLDhDQUE4QztZQUM5QyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDcEQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLHVCQUF1QixHQUF1QixRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUF1QixDQUFDO2dCQUNySCxJQUFJLDBCQUEwQixHQUF1QixRQUFRLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUF1QixDQUFDO2dCQUMzSCxJQUFJLDRCQUE0QixHQUF1QixRQUFRLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUF1QixDQUFDO2dCQUUvSCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUV2QyxJQUFJLHVCQUF1QixFQUFFLENBQUM7b0JBQzFCLGtIQUFrSDtvQkFDbEgsdUJBQXVCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQU8sS0FBSyxFQUFFLEVBQUU7d0JBQzlELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDdkIsSUFBSSxlQUFlLEdBQUcsTUFBTSxhQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzt3QkFDOUQsSUFBRyxlQUFlLEVBQUMsQ0FBQzs0QkFDaEIsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUN0QixDQUFDO29CQUVMLENBQUMsQ0FBQSxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRCxJQUFHLDBCQUEwQixFQUFDLENBQUM7b0JBQzNCLG1FQUFtRTtvQkFDbkUsMEJBQTBCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQU8sS0FBSyxFQUFDLEVBQUU7d0JBQ2hFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFFdkIsOERBQThEO3dCQUM5RCxJQUFJLFNBQVMsR0FBRyxNQUFNLGFBQWEsQ0FBQywrQkFBK0IsRUFBRSxDQUFDO3dCQUN0RSxJQUFHLFNBQVMsRUFBQyxDQUFDOzRCQUNWLGtIQUFrSDs0QkFDbEgsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7d0JBQ3RDLENBQUM7b0JBRUwsQ0FBQyxDQUFBLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUVELElBQUcsNEJBQTRCLEVBQUMsQ0FBQztvQkFDN0IsNEJBQTRCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFDLENBQU8sS0FBSyxFQUFDLEVBQUU7d0JBQ2pFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO3dCQUN2QyxvQkFBb0I7d0JBQ3BCLCtDQUErQztvQkFJbkQsQ0FBQyxDQUFBLENBQUMsQ0FBQTtnQkFFTixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFUCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUEsa0JBQUksRUFBQyxHQUFHLEVBQUUsQ0FBQyxHQUFtQixFQUFFLEVBQUU7WUFDOUIsaUNBQWlDO1lBQ2pDLElBQUEsd0JBQVEsRUFBQyxHQUFHLEVBQUMsV0FBVyxDQUFDLENBQUE7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFBLGtCQUFJLEdBQUUsQ0FBQztJQUVYLENBQUM7Q0FFSjtBQTdFRCxrQkE2RUMifQ==