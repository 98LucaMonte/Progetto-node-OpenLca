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
                let buttonCalcolaProductSystem: HTMLElement | null = document.getElementById('calcolaProductSystem') as HTMLElement | null;
                let buttonConfrontaProductSystem: HTMLElement | null = document.getElementById('confrontaProductSystem') as HTMLElement | null;

                console.log("lunghezza " +productSystem.arrayJsonDatiCalcolo.length);

                if (buttonCreaProductSystem) {
                    //Una volta trovato il button  di creazione del product system attendo l'evento di click per aprire il primo modal
                    buttonCreaProductSystem.addEventListener('click', async (event) =>{
                        event.preventDefault(); 
                        let idProductSystem = await productSystem.creaProductSystem();
                        if(idProductSystem){
                            location.reload();
                        }
                                                
                    });
                }

                if(buttonCalcolaProductSystem){
                    //Apertura del modal per effettuare il calcolo di un Product System
                    buttonCalcolaProductSystem.addEventListener('click', async (event)=>{
                        event.preventDefault();
                        
                        //Abbiamo l'id del calcolo del product system appena calcolato
                        let risultato = await productSystem.mostraModalCalcolaProductSystem();
                        if(risultato){
                            location.reload();
                        }
                    
                    });
                }

                if(buttonConfrontaProductSystem){
                    buttonConfrontaProductSystem.addEventListener('click',async (event)=>{
                        event.preventDefault();
                        await productSystem.confrontaProductSystem();


                        
                    })
                    
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