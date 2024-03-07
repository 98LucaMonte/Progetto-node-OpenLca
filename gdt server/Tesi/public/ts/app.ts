//@ts-ignore
import page from '//unpkg.com/page/page.mjs';

import { homeView } from './frontend/template/home-view.js';
import { notFound } from './frontend/template/error-view.js'; 
 
import { ProductSystem } from './model/product-system.js';
import { JsonDatiCalcolo } from './model/types.js';
import { resultView,inserisciGraficoFlow } from './frontend/template/result-view.js';

   
const productSystem = new ProductSystem();


export class App {
    
    protected contentPage:HTMLDivElement;

    constructor(contentPage:HTMLDivElement) {
        this.contentPage = contentPage;
        this.setupRoutes(this.contentPage);
    }

    //Metodo usato per aggiungere le route dell'applicazione 
    private setupRoutes(contentPage:HTMLDivElement): void {
        let idCalcolo: string;
        page('/', () => {
            homeView(contentPage);
            
            //attendo il caricamento elementi della pagina
            document.addEventListener('DOMContentLoaded', (event) => {
                event.preventDefault();
                let buttonCreaProductSystem: HTMLElement | null = document.getElementById('creaProductSystem') as HTMLElement | null;
                let buttonCalcolaProductSystem: HTMLElement | null = document.getElementById('calcolaProductSystem') as HTMLElement | null;
                let buttonConfrontaProductSystem: HTMLElement | null = document.getElementById('confrontaProductSystem') as HTMLElement | null;

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
                        let risultato:JsonDatiCalcolo = await productSystem.mostraModalCalcolaProductSystem();
                        idCalcolo = risultato.idCalcolo;
                    
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
        page('/result',async ()=>{

            await resultView(contentPage,idCalcolo)

            let selectCategorieFlowInput:HTMLSelectElement | null = document.getElementById('listaCategorieFlow1') as HTMLSelectElement | null;
            
            if(selectCategorieFlowInput){
                selectCategorieFlowInput.addEventListener('change', async event => {
                    event.preventDefault();
                    const target = event.target as HTMLSelectElement;
                    if(target){
                        const categoriaScelta = target.value;
                        if(categoriaScelta != "Seleziona una categoria"){
                            console.log('Opzione selezionata:', categoriaScelta);
                            await inserisciGraficoFlow(idCalcolo,categoriaScelta,true);
                        }
                    }
                });
            }
            
            let selectCategorieFlowOutput:HTMLSelectElement | null = document.getElementById('listaCategorieFlow2') as HTMLSelectElement | null;
            
            if(selectCategorieFlowOutput){
                selectCategorieFlowOutput.addEventListener('change', async event => {
                    event.preventDefault();
                    const target = event.target as HTMLSelectElement;
                    if(target){
                        const categoriaScelta = target.value;
                        if(categoriaScelta != "Seleziona una categoria"){
                            console.log('Opzione selezionata:', categoriaScelta);
                            await inserisciGraficoFlow(idCalcolo,categoriaScelta,false);
                        }
                    }
                });
            }
            
            let buttonCreaPdf:HTMLButtonElement | null = document.getElementById('creaPdf') as HTMLButtonElement | null;
            if(buttonCreaPdf){
                buttonCreaPdf.addEventListener('click',async event => {
                    event.preventDefault();
                    //await creaPdf();
                });
            }
            
            

        });
        page('*', (ctx:{ path:string }) => {
            //metodo per pagina non esistente
            notFound(ctx,contentPage)
        });
        page();

    }
        
}