var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//@ts-ignore
import page from '//unpkg.com/page/page.mjs';
import { homeView } from './frontend/template/home-view.js';
import { notFound } from './frontend/template/error-view.js';
import { ProductSystem } from './model/product-system.js';
const productSystem = new ProductSystem();
export class App {
    constructor(contentPage) {
        this.contentPage = contentPage;
        this.arrayJsonDatiCalcolo = [];
        this.setupRoutes(this.contentPage, this.arrayJsonDatiCalcolo);
    }
    //Metodo usato per aggiungere le route dell'applicazione 
    setupRoutes(contentPage, arrayJsonDatiCalcolo) {
        page('/', () => {
            homeView(contentPage);
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
        page('*', (ctx) => {
            //metodo per pagina non esistente
            notFound(ctx, contentPage);
        });
        page();
    }
}
