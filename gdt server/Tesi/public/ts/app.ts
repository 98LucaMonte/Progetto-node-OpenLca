//@ts-ignore
import page from '//unpkg.com/page/page.mjs';

import { homeView } from './frontend/template/home-view.js';
import { notFound } from './frontend/template/error-view.js';

import { ProductSystem } from './model/product-system.js';

const productSystem = new ProductSystem();

export class App {
    
    protected contentPage:HTMLDivElement;

    constructor(contentPage:HTMLDivElement) {
        this.contentPage = contentPage;
        this.setupRoutes(contentPage);
    }

    //Metodo usato per aggiungere le route dell'applicazione 
    private setupRoutes(contentPage:HTMLDivElement): void {
        
        page('/', () => {
            homeView(contentPage);
            
            //attendo il caricamento elementi della pagina
            document.addEventListener('DOMContentLoaded', (event) => {
                event.preventDefault();
                let buttonCreaProductSystem: HTMLElement | null = document.getElementById('creaProductSystem') as HTMLElement | null;

                if (buttonCreaProductSystem) {
                    //Una volta trovato il button  di creazione del product system attendo l'evento di click per aprire il primo modal
                    buttonCreaProductSystem.addEventListener('click', async (event) =>{
                        event.preventDefault(); 
                        await productSystem.creaProductSystem();
                        //location.reload();
                    });
                }
            }); 
            
        });
        page('*', (ctx:{ path:string }) => {
            //metodo per pagina non esistente
            notFound(ctx,contentPage)
        });
        page();

    }
        
}