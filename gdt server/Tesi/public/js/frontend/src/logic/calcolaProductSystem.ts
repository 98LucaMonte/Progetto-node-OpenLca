//const doc = new jspdf.jsPDF();

import ApiCalculation from "../../../backend/src/restclient/apiCalculation";


class CalcolaProductSystem{

    /*creaPDF = async (vps,idCalcolo,apiImpactResults) =>{
     
        //Prendo il nome del Product System per dare il nome al file e al titolo del file
        const selectProductSystem = document.getElementById("listaProductSystem");
        const selectedOptionProductSystem = selectProductSystem.options[selectProductSystem.selectedIndex];
        const nomeProductSystem = selectedOptionProductSystem.text;
        
        //Titolo del PDF
        doc.text("Risultati del calcolo di: "+nomeProductSystem, 20, 20);
        
        //Realizzo la tabella degli Impact category dell'impact Method selezionato.
        let listaImpact = await apiImpactResults.getTotalImpacts(vps,idCalcolo);
    
        let headersImpact = ['#','Nome', 'Quantità' ,'Unità'];
        let dataImpact = [];
        let num = 0;
        listaImpact.forEach(element => {
            num++;
            let row = { '#': ''+num,'Nome': ''+element.impactCategory.name, 'Quantità': ''+element.amount ,'Unità':''+element.impactCategory.refUnit};
            dataImpact.push(row);
        });
        //Titolo della tabella degli Impact category
        doc.text("Tabella degli Impact Category", 20, 30);
        //Inserimento tabella
        doc.table(20, 40, dataImpact, headersImpact);
    
        doc.addPage();
        
        //Download del file PDF
        doc.save(nomeProductSystem+".pdf");    
    }*/

    /** 
    * In questo metodo si esegue il calcolo del product system usando l'impact method 
    * selezionato dai select. Se non si seleziona uno tra product system e impact method
    * non si può effettuare il calcolo.
    * 
    * @param {Api} apiCalculation - Oggetto che permette il richiamo delle apiCalculation.
    * @param {String} vps - Indirizzo della vps del db a cui ci colleghiamo.
    * @returns {String} - Stringa che contiene l'id del calcolo del product system.
    */
    calcola = async (apiCalculation:ApiCalculation,vps:string) => {
        
        let idCalcolo = undefined;
        //Prendo l'id del product system selezionato
        let selectProductSystem: HTMLSelectElement | null = document.getElementById("listaProductSystem")as HTMLSelectElement | null;
        let idProductSystem: string = "selectedProductSystem";
        if(selectProductSystem != null){
            const selectedOptionProductSystem = selectProductSystem.options[selectProductSystem.selectedIndex];
            idProductSystem = selectedOptionProductSystem.id;
            selectProductSystem.disabled =true;
        }
        
        //Prendo l'id dell'impact method selezionato
        let selectImpactMethod: HTMLSelectElement | null = document.getElementById("listaImpactMethod") as HTMLSelectElement | null;
        let optionIdImpactMethod;
        if(selectImpactMethod != null){
            const selectedOptionImpactMethod = selectImpactMethod.options[selectImpactMethod.selectedIndex];
            optionIdImpactMethod = selectedOptionImpactMethod.id;
            selectImpactMethod.disabled = true;
        }
        //Se non è stato selezionato un tra product system o impact method non si può eseguire il calcolo del product system
        if (idProductSystem === "selectedProductSystem" || optionIdImpactMethod === "selectedImpactMethod") {
            let messaggioErrore:HTMLElement | null = document.getElementById("risultatiRicerca") as HTMLElement | null;
            let button:HTMLButtonElement | null = document.getElementById('buttonCalcolaProductSystem') as HTMLButtonElement | null;

            console.log("Non si può effettuare il calcolo mancano degli input");
            if(messaggioErrore != null && button!= null){
                messaggioErrore.innerHTML = '';
                messaggioErrore.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Non si può effettuare il calcolo mancano degli input</h3>`);
                button.disabled = true;
                setTimeout(() => {
                    if(messaggioErrore != null && button!= null){
                        messaggioErrore.innerHTML = '';
                        button.disabled = false;
                    }
                }, 3000);
            }
            

        }
        else {

            /*
            Contiene l'id dell'Impact Method e del NewSets che sono stati messi insieme e divisi dal simbolo /
            quindi vado a prendere l'id dell'impact method e del new sets necessari per eseguire il calcolo del product system
            */
            let idList: string[];
            if(optionIdImpactMethod!=undefined){
                idList = optionIdImpactMethod.split("/");

                if (idList.length === 2) {
                    let idImpactMethod:string = idList[0];
                    let idNewSet:string = idList[1];
    
                    console.log("idImpactMethod: " + idImpactMethod);
                    console.log("idNewSet: " + idNewSet);
                    console.log("idProductSystem: " + idProductSystem);
    
                    console.log("Calcola Product System");
                    //Eseguo il calcolo del product system
                    let result = await apiCalculation.calcolaProductSystem(vps, idProductSystem, idImpactMethod, idNewSet);
                    idCalcolo = result["@id"];
    
                    let messaggio: HTMLElement| null = document.getElementById("risultatiRicerca") as HTMLElement | null;
                    if(messaggio != null){
                        messaggio.innerHTML = '';
                        messaggio.insertAdjacentHTML('beforeend', `<h3 class="alert alert-secondary" role="alert">Sto eseguendo il calcolo...</h3>`);
                        let statoCalcolo:boolean = false;
                        //Attraverso questo ciclo verifico inviando l'id del calcolo se quest'ultimo è stato ultimato 
                        while (statoCalcolo != true) {
                            let calcoloInCorso = await apiCalculation.getStatoCalcolo(vps, idCalcolo);
                            statoCalcolo = calcoloInCorso.isReady;
                        }
    
                    console.log("calcolo finito!!!");
                    
                    return idCalcolo;
                    }
                } else {
                    //Potrebbero capitare degli errori sul lato server durante il calcolo qui vengono gestiti
                    let messaggioErrore:HTMLElement | null = document.getElementById("risultatiRicerca") as HTMLElement | null;
                    let button:HTMLButtonElement | null = document.getElementById('buttonCalcolaProductSystem') as HTMLButtonElement | null;
                    if(messaggioErrore != null && button!= null){
                        messaggioErrore.innerHTML = '';
                        messaggioErrore.insertAdjacentHTML('beforeend', `<h3 class="alert alert-danger" role="alert">Errore in fase di preparazione del calcolo.</h3>`);
                        button.disabled = true;
                        setTimeout(() => {
                            if(messaggioErrore != null && button!= null){
                                messaggioErrore.innerHTML = '';
                                button.disabled = false;
                            }
                        }, 3000);
                        console.log("Errore in fase di split");
                    }
                }

            }
            

            
        }
        return idCalcolo;
    }
}

export {CalcolaProductSystem};
