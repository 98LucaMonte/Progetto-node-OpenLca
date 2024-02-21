//@ts-ignore
import page from '//unpkg.com/page/page.mjs';

import { homeView } from './frontend/template/home-view.js';
import { notFound } from './frontend/template/error-view.js';

import { ProductSystem } from './model/product-system.js';
import { JsonDatiCalcolo } from './model/types.js';
//@ts-ignore
//import { connectDb } from './backend/db.js';
   
const productSystem = new ProductSystem();


export class App {
    
    protected contentPage:HTMLDivElement;
    protected arrayJsonDatiCalcolo: JsonDatiCalcolo[]; //Array usato per tenere traccia degli idCalcolo dei product system calcolati

    constructor(contentPage:HTMLDivElement) {
        this.contentPage = contentPage;
        this.arrayJsonDatiCalcolo = [];
        this.setupRoutes(this.contentPage,this.arrayJsonDatiCalcolo);
    }

    //Metodo usato per aggiungere le route dell'applicazione 
    private setupRoutes(contentPage:HTMLDivElement,arrayJsonDatiCalcolo:JsonDatiCalcolo[]): void {
        
        page('/', () => {
            homeView(contentPage);
            
            //attendo il caricamento elementi della pagina
            document.addEventListener('DOMContentLoaded', (event) => {
                event.preventDefault();
                let buttonCreaProductSystem: HTMLElement | null = document.getElementById('creaProductSystem') as HTMLElement | null;
                let buttonCalcolaProductSystem: HTMLElement | null = document.getElementById('calcolaProductSystem') as HTMLElement | null;
                let buttonConfrontaProductSystem: HTMLElement | null = document.getElementById('confrontaProductSystem') as HTMLElement | null;

                console.log(this.arrayJsonDatiCalcolo);

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
                            // TODO: salvare il risultato del calcolo sul database. Bisogna collegarsi al database e salvare questo risultato 
                            arrayJsonDatiCalcolo.push(risultato);
                            console.log(arrayJsonDatiCalcolo);
                        }
                    
                    });
                } 

                if(buttonConfrontaProductSystem){
                    buttonConfrontaProductSystem.addEventListener('click',async (event)=>{
                        event.preventDefault();
                        console.log("Collegamento al database")
                        //await connectDb();
                        //await productSystem.confrontaProductSystem();


                        
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