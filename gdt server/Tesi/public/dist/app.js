//@ts-ignore
import page from '//unpkg.com/page/page.mjs';
import { homeView } from './frontend/template/home-view.js';
import { notFound } from './frontend/template/error-view.js';
import { ProductSystem } from './model/product-system.js';
const productSystem = new ProductSystem();
export class App {
    contentPage;
    constructor(contentPage) {
        this.contentPage = contentPage;
        this.setupRoutes(contentPage);
    }
    //Metodo usato per aggiungere le route dell'applicazione 
    setupRoutes(contentPage) {
        page('/', () => {
            homeView(contentPage);
            //attendo il caricamento elementi della pagina
            document.addEventListener('DOMContentLoaded', (event) => {
                event.preventDefault();
                let buttonCreaProductSystem = document.getElementById('creaProductSystem');
                let buttonCalcolaProductSystem = document.getElementById('calcolaProductSystem');
                let buttonConfrontaProductSystem = document.getElementById('confrontaProductSystem');
                console.log("lunghezza " + productSystem.arrayJsonDatiCalcolo.length);
                if (buttonCreaProductSystem) {
                    //Una volta trovato il button  di creazione del product system attendo l'evento di click per aprire il primo modal
                    buttonCreaProductSystem.addEventListener('click', async (event) => {
                        event.preventDefault();
                        let idProductSystem = await productSystem.creaProductSystem();
                        if (idProductSystem) {
                            location.reload();
                        }
                    });
                }
                if (buttonCalcolaProductSystem) {
                    //Apertura del modal per effettuare il calcolo di un Product System
                    buttonCalcolaProductSystem.addEventListener('click', async (event) => {
                        event.preventDefault();
                        //Abbiamo l'id del calcolo del product system appena calcolato
                        let risultato = await productSystem.mostraModalCalcolaProductSystem();
                        if (risultato) {
                            location.reload();
                        }
                    });
                }
                if (buttonConfrontaProductSystem) {
                    buttonConfrontaProductSystem.addEventListener('click', async (event) => {
                        event.preventDefault();
                        await productSystem.confrontaProductSystem();
                    });
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
