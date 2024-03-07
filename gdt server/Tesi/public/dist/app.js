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
import { resultView, inserisciGraficoFlow } from './frontend/template/result-view.js';
const productSystem = new ProductSystem();
export class App {
    constructor(contentPage) {
        this.contentPage = contentPage;
        this.setupRoutes(this.contentPage);
    }
    //Metodo usato per aggiungere le route dell'applicazione 
    setupRoutes(contentPage) {
        let idCalcolo;
        page('/', () => {
            homeView(contentPage);
            //attendo il caricamento elementi della pagina
            document.addEventListener('DOMContentLoaded', (event) => {
                event.preventDefault();
                let buttonCreaProductSystem = document.getElementById('creaProductSystem');
                let buttonCalcolaProductSystem = document.getElementById('calcolaProductSystem');
                let buttonConfrontaProductSystem = document.getElementById('confrontaProductSystem');
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
                        idCalcolo = risultato.idCalcolo;
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
        page('/result', () => __awaiter(this, void 0, void 0, function* () {
            yield resultView(contentPage, idCalcolo);
            let selectCategorieFlowInput = document.getElementById('listaCategorieFlow1');
            if (selectCategorieFlowInput) {
                selectCategorieFlowInput.addEventListener('change', (event) => __awaiter(this, void 0, void 0, function* () {
                    event.preventDefault();
                    const target = event.target;
                    if (target) {
                        const categoriaScelta = target.value;
                        if (categoriaScelta != "Seleziona una categoria") {
                            console.log('Opzione selezionata:', categoriaScelta);
                            yield inserisciGraficoFlow(idCalcolo, categoriaScelta, true);
                        }
                    }
                }));
            }
            let selectCategorieFlowOutput = document.getElementById('listaCategorieFlow2');
            if (selectCategorieFlowOutput) {
                selectCategorieFlowOutput.addEventListener('change', (event) => __awaiter(this, void 0, void 0, function* () {
                    event.preventDefault();
                    const target = event.target;
                    if (target) {
                        const categoriaScelta = target.value;
                        if (categoriaScelta != "Seleziona una categoria") {
                            console.log('Opzione selezionata:', categoriaScelta);
                            yield inserisciGraficoFlow(idCalcolo, categoriaScelta, false);
                        }
                    }
                }));
            }
            let buttonCreaPdf = document.getElementById('creaPdf');
            if (buttonCreaPdf) {
                buttonCreaPdf.addEventListener('click', (event) => __awaiter(this, void 0, void 0, function* () {
                    event.preventDefault();
                    //await creaPdf();
                }));
            }
        }));
        page('*', (ctx) => {
            //metodo per pagina non esistente
            notFound(ctx, contentPage);
        });
        page();
    }
}
