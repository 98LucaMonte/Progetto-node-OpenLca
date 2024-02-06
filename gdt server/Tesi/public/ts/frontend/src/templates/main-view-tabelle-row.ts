
import ApiFlowResults from "../../../backend/src/restclient/apiFlowResults";
import ApiCalculation from "../../../backend/src/restclient/apiResultQueries";

function isIterable(obj:any) {
    // Verifica se l'oggetto ha il metodo Symbol.iterator
    return obj !== null && typeof obj !== 'undefined' && typeof obj[Symbol.iterator] === 'function';
}
function creaViewTableProviderFlow() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabella">
            <thead>
                <tr>
                    <th scope="col">#5.5</th>
                    <th scope="col">Categoria Provider</th>
                    <th scope="col">Nome Provider</th>
                    <th scope="col">Categoria Flow</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Unità Flow</th>
                </tr>
            </thead>
            <tbody id="datiTabella">
            </tbody>
        </table>  
    `;
}

function creaViewRowProviderFlow(element:any,num:number){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.provider.category}</td>
        <td>${element.provider.name}</td>
        <td>${element.flow.category}</td>
        <td>${element.flow.name}</td>
        <td>${element.flow.refUnit}</td>      
    </tr>
    `;
}

function creaTabellaProviderFlow(lista: any,msg:string) {
    
    let messaggio:HTMLDivElement | null = document.getElementById("informazioniDati") as HTMLDivElement | null;
    if(messaggio){
        messaggio.innerHTML='';
        messaggio.insertAdjacentHTML('beforeend', 
        `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
        let tabellaRisultatiRicerca:HTMLDivElement | null = document.getElementById("risultatiRicerca") as HTMLDivElement | null;
        if(tabellaRisultatiRicerca){
            tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableProviderFlow());
            let tabellaRighe = document.getElementById("datiTabella");
            let num = 0;
    
            if(isIterable(lista)){
                lista.forEach((element: any) => {
                    num++;
                    let riga = creaViewRowProviderFlow(element, num);
                    if(tabellaRighe){
                        tabellaRighe.insertAdjacentHTML('beforeend', riga);
                    }
                });
            }
            else{
                let classeRimuovere:HTMLTableElement | null = document.getElementById("tabella") as HTMLTableElement | null;
                if(classeRimuovere){
                    classeRimuovere.classList.remove("table-scrollabile");
                }
                let classeRimuovere1:HTMLDivElement | null = document.getElementById("risultatiRicerca") as HTMLDivElement | null;
                if(classeRimuovere1){
                    classeRimuovere1.classList.remove("div-scrollabile");
                }
                num++;
                let riga = creaViewRowProviderFlow(lista,num);
                if(tabellaRighe){
                    tabellaRighe.insertAdjacentHTML('beforeend', riga); 
                }
            }
        }
        
    }
    
}

function creaViewTableTechFlow() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabella">
            <thead>
                <tr>
                    <th scope="col">#5.5</th>
                    <th scope="col">Categoria Provider</th>
                    <th scope="col">Nome Provider</th>
                    <th scope="col">Categoria Flow</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Unità Flow</th>
                </tr>
            </thead>
            <tbody id="datiTabella">
            </tbody>
        </table>  
    `;
}

function creaViewRowTechFlow(element:any,num:number){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.provider.category}</td>
        <td>${element.provider.name}</td>
        <td>${element.flow.category}</td>
        <td>${element.flow.name}</td>
        <td>${element.flow.refUnit}</td>      
    </tr>
    `;
}

function creaTabellaTechFlow(lista:any,msg:string) {
    
    let messaggio:HTMLDivElement | null = document.getElementById("informazioniDati") as HTMLDivElement | null;
    if(messaggio){
        messaggio.innerHTML='';
        messaggio.insertAdjacentHTML('beforeend', 
        `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    }
    
    let tabellaRisultatiRicerca:HTMLDivElement | null = document.getElementById("risultatiRicerca") as HTMLDivElement | null;
    if(tabellaRisultatiRicerca){
        tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableTechFlow());
    }
    let tabellaRighe = document.getElementById("datiTabella");
    let num = 0;
    
    if(isIterable(lista)){
        lista.forEach((element: any) => {
            num++;
            let riga = creaViewRowTechFlow(element, num);
            if(tabellaRighe){
                tabellaRighe.insertAdjacentHTML('beforeend', riga);
            }
        });
    }
    else{
        let classeRimuovere:HTMLTableElement | null = document.getElementById("tabella")as HTMLTableElement | null;
        if(classeRimuovere){
            classeRimuovere.classList.remove("table-scrollabile");
        }
        
        let classeRimuovere1:HTMLDivElement | null = document.getElementById("risultatiRicerca")as HTMLDivElement | null;
        if(classeRimuovere1){
            classeRimuovere1.classList.remove("div-scrollabile");
        }
        
        num++;
        let riga = creaViewRowTechFlow(lista,num);
        if(tabellaRighe){
            tabellaRighe.insertAdjacentHTML('beforeend', riga); 
        }
        
    }
 
}

function creaViewTableTechFlowValue() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabella">
            <thead>
                <tr>
                    <th scope="col">#5.5</th>
                    <th scope="col">Categoria Provider</th>
                    <th scope="col">Nome Provider</th>
                    <th scope="col">Categoria Flow</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità Flow</th>
                </tr>
            </thead>
            <tbody id="datiTabella">
            </tbody>
        </table>  
    `;
}

function creaViewRowTechFlowValue(element:any,num:number,amount:number){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.provider.category}</td>
        <td>${element.provider.name}</td>
        <td>${element.flow.category}</td>
        <td>${element.flow.name}</td>
        <td>${amount}</td>
        <td>${element.flow.refUnit}</td>      
    </tr>
    `;
}

function creaTabellaTechFlowValue(lista:any,msg:string) {
    let messaggio:HTMLDivElement | null = document.getElementById("informazioniDati") as HTMLDivElement | null;
    if(messaggio){
        messaggio.innerHTML='';
        messaggio.insertAdjacentHTML('beforeend', 
        `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    }
    
    let tabellaRisultatiRicerca:HTMLDivElement | null = document.getElementById("risultatiRicerca") as HTMLDivElement | null;
    if(tabellaRisultatiRicerca){
        tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableTechFlowValue());
    }
   
    let tabellaRighe:HTMLElement | null = document.getElementById("datiTabella") as HTMLElement | null;
    let num = 0;
    
    if(isIterable(lista)){
        lista.forEach((element:any) => {
            num++;
            let riga = creaViewRowTechFlowValue(element.techFlow, num,element.amount);
            if(tabellaRighe){
                tabellaRighe.insertAdjacentHTML('beforeend', riga);
            }
        });
    }
    else{
        let classeRimuovere:HTMLTableElement | null = document.getElementById("tabella") as HTMLTableElement | null;
        if(classeRimuovere){
            classeRimuovere.classList.remove("table-scrollabile");
        }
        
        let classeRimuovere1:HTMLDivElement | null = document.getElementById("risultatiRicerca")as HTMLDivElement | null;
        if(classeRimuovere1){
            classeRimuovere1.classList.remove("div-scrollabile");
        }
        
        num++;
        let riga = creaViewRowTechFlowValue(lista.techFlow,num,lista.amount);
        if(tabellaRighe){
            tabellaRighe.insertAdjacentHTML('beforeend', riga); 
        }
    }
 
}

function creaViewTableEnviFlowsOutput() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabellaOutput">
            <thead>
                <tr>
                    <th scope="col">#5.6</th>
                    <th scope="col">Input</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Unità di misura</th>
                </tr>
            </thead>
            <tbody id="datiTabellaResultOutput">
            </tbody>
        </table>  
    `;
}

function creaViewTableEnviFlowsInput() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabellaInput">
            <thead>
                <tr>
                    <th scope="col">#5.6</th>
                    <th scope="col">Input</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Unità di misura</th>
                </tr>
            </thead>
            <tbody id="datiTabellaResultInput">
            </tbody>
        </table>  
    `;
}

function creaViewRowEnviFlows(element: { isInput: any; flow: { name: any; category: any; refUnit: any; }; },num: number){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.isInput}</td>
        <td>${element.flow.name}</td>
        <td>${element.flow.category}</td> 
        <td>${element.flow.refUnit}</td>      
    </tr>
    `;
}

function creaTabellaEnviFlowsInputOutput(lista: any,msg: string){

    let messaggio:HTMLDivElement | null = document.getElementById("informazioniDati") as HTMLDivElement | null;
    if(messaggio){
        messaggio.innerHTML='';
        messaggio.insertAdjacentHTML('beforeend', 
        `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    }
    
    let tabellaRisultatiRicercaInput:HTMLDivElement | null = document.getElementById("risultatiRicercaInput01")as HTMLDivElement | null;
    let tabellaRisultatiRicercaOutput:HTMLDivElement | null = document.getElementById("risultatiRicercaOutput02")as HTMLDivElement | null;
    if(tabellaRisultatiRicercaInput && tabellaRisultatiRicercaOutput){
        tabellaRisultatiRicercaInput.innerHTML='';
        tabellaRisultatiRicercaOutput.innerHTML = '';
        tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableEnviFlowsInput());
        tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableEnviFlowsOutput());
    }
    
    let tabellaRigheInput:HTMLElement | null = document.getElementById("datiTabellaResultInput")as HTMLElement | null;
    let tabellaRigheOutput:HTMLElement | null = document.getElementById("datiTabellaResultOutput")as HTMLElement | null;
    
    let numOutput = 0;
    let numInput = 0;

    if(!isIterable(lista)){

        if(lista.enviFlow.isInput){
            let classeRimuovere:HTMLTableElement | null = document.getElementById("tabellaInput")as HTMLTableElement | null;
            if(classeRimuovere){
                classeRimuovere.classList.remove("table-scrollabile");
            }
            
            let classeRimuovere1:HTMLDivElement | null = document.getElementById("risultatiRicerca") as HTMLDivElement | null;
            if(classeRimuovere1){
                classeRimuovere1.classList.remove("div-scrollabile");
            }
            
            numInput++;
            let riga = creaViewRowEnviFlows(lista, numInput);
            if(tabellaRigheInput){
                tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
            }
        }
        else{
            let classeRimuovere:HTMLTableElement | null = document.getElementById("tabellaOutput")as HTMLTableElement | null;
            if(classeRimuovere){
                classeRimuovere.classList.remove("table-scrollabile");
            }
            
            let classeRimuovere1:HTMLDivElement | null = document.getElementById("risultatiRicerca")as HTMLDivElement | null;
            if(classeRimuovere1){
                classeRimuovere1.classList.remove("div-scrollabile");
            }
            
            numOutput++;
            let riga = creaViewRowEnviFlows(lista, numOutput);
            if(tabellaRigheOutput){
                tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
            }
        } 
    }
    else{
        for(let element of lista){
            
            if(element.isInput){
                numInput++;
                let riga = creaViewRowEnviFlows(element, numInput);
                if(tabellaRigheInput){
                    tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
                }
                
            }
            else{
                numOutput++;
                let riga = creaViewRowEnviFlows(element, numOutput);
                if(tabellaRigheOutput){
                    tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
                }
                
            }
        }
    }
    
    if(numInput === 0 && tabellaRisultatiRicercaInput){
        tabellaRisultatiRicercaInput.innerHTML="";
        tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di input</p>`);
    }
    if(numOutput === 0 && tabellaRisultatiRicercaOutput){
        tabellaRisultatiRicercaOutput.innerHTML="";
        tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di output</p>`) 
    }

}

function creaViewTableEnviFlowsOutputValue() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabellaOutput">
            <thead>
                <tr>
                    <th scope="col">#5.6</th>
                    <th scope="col">Input</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità di misura</th>
                </tr>
            </thead>
            <tbody id="datiTabellaResultOutput">
            </tbody>
        </table>  
    `;
}

function creaViewTableEnviFlowsInputValue() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabellaInput">
            <thead>
                <tr>
                    <th scope="col">#5.6</th>
                    <th scope="col">Input</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità di misura</th>
                </tr>
            </thead>
            <tbody id="datiTabellaResultInput">
            </tbody>
        </table>  
    `;
}

function creaViewRowEnviFlowsValue(element: any,num: number,amount: any){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.isInput}</td>
        <td>${element.flow.name}</td>
        <td>${element.flow.category}</td>
        <td>${amount}</td>         
        <td>${element.flow.refUnit}</td>      
    </tr>
    `;
}

function creaTabellaEnviFlowsInputOutputValue(lista: any,msg: string){

    let messaggio:HTMLDivElement | null = document.getElementById("informazioniDati")as HTMLDivElement | null;
    if(messaggio){
        messaggio.innerHTML='';
        messaggio.insertAdjacentHTML('beforeend', 
        `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    }
    
    let tabellaRisultatiRicercaInput:HTMLDivElement | null = document.getElementById("risultatiRicercaInput01")as HTMLDivElement | null;
    let tabellaRisultatiRicercaOutput:HTMLDivElement | null = document.getElementById("risultatiRicercaOutput02")as HTMLDivElement | null;
    if(tabellaRisultatiRicercaInput && tabellaRisultatiRicercaOutput){
        tabellaRisultatiRicercaInput.innerHTML='';
        tabellaRisultatiRicercaOutput.innerHTML = '';
        tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableEnviFlowsInputValue());
        tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableEnviFlowsOutputValue());
    }
    
    let tabellaRigheInput = document.getElementById("datiTabellaResultInput");
    let tabellaRigheOutput = document.getElementById("datiTabellaResultOutput");
    
    let numOutput = 0;
    let numInput = 0;

    if(!isIterable(lista)){

        if(lista.enviFlow.isInput){
            let classeRimuovere:HTMLTableElement | null = document.getElementById("tabellaInput")as HTMLTableElement | null;
            if(classeRimuovere){
                classeRimuovere.classList.remove("table-scrollabile");
            }
            
            let classeRimuovere1:HTMLDivElement | null = document.getElementById("risultatiRicerca")as HTMLDivElement | null;
            if(classeRimuovere1){
                classeRimuovere1.classList.remove("div-scrollabile");
            }

            numInput++;
            let riga = creaViewRowEnviFlowsValue(lista.enviFlow, numInput,lista.amount);
            if(tabellaRigheInput){
                tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
            }
        }
        else{
            let classeRimuovere:HTMLTableElement | null  = document.getElementById("tabellaOutput")as HTMLTableElement | null ;
            if(classeRimuovere){
                classeRimuovere.classList.remove("table-scrollabile");
            }
            
            let classeRimuovere1:HTMLDivElement | null = document.getElementById("risultatiRicerca")as HTMLDivElement | null;
            if(classeRimuovere1){
                classeRimuovere1.classList.remove("div-scrollabile");
            }
            
            numOutput++;
            let riga = creaViewRowEnviFlowsValue(lista.enviFlow, numOutput,lista.amount);
            if(tabellaRigheOutput){
                tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
            }
        } 
    }
    else{
        for(let element of lista){
            
            if(element.enviFlow.isInput){
                numInput++;
                let riga = creaViewRowEnviFlowsValue(element.enviFlow, numInput,element.amount);
                if(tabellaRigheInput){
                    tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
                }
            }
            else{
                numOutput++;
                let riga = creaViewRowEnviFlowsValue(element.enviFlow, numOutput,element.amount);
                if(tabellaRigheOutput){
                    tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
                }
            }
        }
    }
    
    if(numInput === 0 && tabellaRisultatiRicercaInput){
        tabellaRisultatiRicercaInput.innerHTML="";
        tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di input</p>`);
    }
    if(numOutput === 0 && tabellaRisultatiRicercaOutput){
        tabellaRisultatiRicercaOutput.innerHTML="";
        tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di output</p>`) 
    }

}

function creaViewTableImpactCategories() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabella">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome Impact</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Unità</th>
                </tr>
            </thead>
            <tbody id="datiTabella">
            </tbody>
        </table>  
    `;
}
  
function creaViewRowImpactCategories(element: any,num: number){
return `
<tr class="color-row-table">
    <th scope="row">${num}</th>
    <td>${element.name}</td>
    <td>${element.category}</td>
    <td>${element.refUnit}</td>
</tr>
`;
}

function creaTabellaImpactCategory(lista: any[],msg: string){
    let messaggio:HTMLDivElement | null = document.getElementById("informazioniDati")as HTMLDivElement | null;
    if(messaggio){
        messaggio.innerHTML='';
        messaggio.insertAdjacentHTML('beforeend', 
        `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    }
    
    let tabellaRisultatiRicerca:HTMLDivElement | null = document.getElementById("risultatiRicerca")as HTMLDivElement | null;
    if(tabellaRisultatiRicerca){
        tabellaRisultatiRicerca.innerHTML = '';
        tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategories());
    }
    
    let tabellaRighe:HTMLElement | null = document.getElementById("datiTabella")as HTMLElement | null;
    let num = 0;

    if(isIterable(lista)){
        lista.forEach((element: any) => {
            num++;
            let riga = creaViewRowImpactCategories(element, num);
            if(tabellaRighe){
                tabellaRighe.insertAdjacentHTML('beforeend', riga);
            }
        });
    }
    else{
        let classeRimuovere:HTMLTableElement | null = document.getElementById("tabella")as HTMLTableElement | null;
        if(classeRimuovere){
            classeRimuovere.classList.remove("table-scrollabile");
        }
        
        let classeRimuovere1:HTMLDivElement | null = document.getElementById("risultatiRicerca")as HTMLDivElement | null;
        if(classeRimuovere1){
            classeRimuovere1.classList.remove("div-scrollabile");
        }
        
        num++;
        let riga = creaViewRowImpactCategories(lista, num);
        if(tabellaRighe){
            tabellaRighe.insertAdjacentHTML('beforeend', riga);
        }
    }
   
}

function creaViewTableImpactCategoriesValue() {
    return `
        <table class="table table-striped table-bordered table-scrollabile" id="tabella">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome Impact</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità</th>
                </tr>
            </thead>
            <tbody id="datiTabella">
            </tbody>
        </table>  
    `;
}
  
function creaViewRowImpactCategoriesValue(element: any,num: number){
return `
<tr class="color-row-table">
    <th scope="row">${num}</th>
    <td>${element.impactCategory.name}</td>
    <td>${element.impactCategory.category}</td>
    <td>${element.amount}</td>
    <td>${element.impactCategory.refUnit}</td>
</tr>
`;
}

function creaTabellaImpactCategoryValue(lista: any[],msg: string){
    
    const messaggio:HTMLDivElement | null = document.getElementById("informazioniDati") as HTMLDivElement | null;
    if(messaggio){
        messaggio.innerHTML='';
        messaggio.insertAdjacentHTML('beforeend', 
        `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    }
    
    let tabellaRisultatiRicerca:HTMLDivElement | null = document.getElementById("risultatiRicerca")as HTMLDivElement | null;
    if(tabellaRisultatiRicerca){
        tabellaRisultatiRicerca.innerHTML = '';
        tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategoriesValue());
    }
    
    let tabellaRighe = document.getElementById("datiTabella");
    let num = 0;
    
    if(isIterable(lista)){
        lista.forEach((element: any) => {
            num++;
            let riga = creaViewRowImpactCategoriesValue(element, num);
            if(tabellaRighe){
                tabellaRighe.insertAdjacentHTML('beforeend', riga);
            }
        });
    }
    else{
        let classeRimuovere:HTMLTableElement | null = document.getElementById("tabella")as HTMLTableElement | null;
        if(classeRimuovere){
            classeRimuovere.classList.remove("table-scrollabile");
        }

        let classeRimuovere1:HTMLDivElement | null = document.getElementById("risultatiRicerca")as HTMLDivElement | null;
        if(classeRimuovere1){
            classeRimuovere1.classList.remove("div-scrollabile");
        }
        num++;
        let riga = creaViewRowImpactCategoriesValue(lista, num);
        if(tabellaRighe){
            tabellaRighe.insertAdjacentHTML('beforeend', riga);
        }
    }
   
}

async function getTechFlow(apiResultQueries: ApiCalculation, vps: string,idCalcolo: any) {

    let textTitolo:HTMLDivElement | null = document.getElementById("inputTitolo") as HTMLDivElement | null;
    if(textTitolo){
        textTitolo.insertAdjacentHTML('afterbegin',`<p><strong>Seleziona il TechFlow</strong></p>`);
    }

    let placeholder = document.getElementById("selectedInput01");
    let listaTechFlow = await apiResultQueries.getTechnosphereFlows(vps, idCalcolo);
   
    if(placeholder){
        if (listaTechFlow.length == 0) {
            placeholder.innerHTML = "Non ci sono Tech Flow selezionabili";
        } else {
            const select:HTMLSelectElement | null = document.getElementById("listaInput01") as HTMLSelectElement | null;
            placeholder.innerHTML = "Seleziona un Tech Flow";
            for (let i = 0; i < listaTechFlow.length; i++) {
                let option = document.createElement("option");
                option.value = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
                option.text = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
                option.id = listaTechFlow[i].provider["@id"]+"::"+listaTechFlow[i].flow["@id"];
                if(select){
                    select.appendChild(option);
                }
            }
        }
    }
    
   
}

async function getEnviFlow(apiFlowResults: ApiFlowResults, vps: string,idCalcolo: any){

    let textTitolo:HTMLDivElement | null = document.getElementById("inputTitolo") as HTMLDivElement | null;
    if(textTitolo){
        textTitolo.insertAdjacentHTML('afterbegin',`<p><strong>Seleziona l'EnviFlow</strong></p>`);
    }
    let placeholder = document.getElementById("selectedInput01");
    
    let listaEnviFlow = await apiFlowResults.getInventoryResult(vps, idCalcolo);
    
    if(placeholder){
        if (listaEnviFlow.length == 0) {
            placeholder.innerHTML = "Non ci sono Envi Flow selezionabili";
        } else {
            const select:HTMLSelectElement | null = document.getElementById("listaInput01") as HTMLSelectElement | null;
            placeholder.innerHTML = "Seleziona un Envi Flow";
            for (let i = 0; i < listaEnviFlow.length; i++) {
                let option = document.createElement("option");
                option.value = listaEnviFlow[i].enviFlow.flow.name;
                option.text = listaEnviFlow[i].enviFlow.flow.name;
                option.id = listaEnviFlow[i].enviFlow.flow["@id"];
                if(select){
                    select.appendChild(option);
                }
            }
        }
    }
    
   
}

async function getTechFlowEnviFlow(apiResultQueries: ApiCalculation,apiFlowResults: ApiFlowResults, vps: string,idCalcolo: any){

    let textTitolo01:HTMLDivElement | null = document.getElementById("inputTitolo01") as HTMLDivElement | null;
    let textTitolo02:HTMLDivElement | null = document.getElementById("inputTitolo02") as HTMLDivElement | null;

    if(textTitolo01 && textTitolo02){
        textTitolo01.insertAdjacentHTML('afterbegin',`<p><strong>Seleziona il TechFlow</strong></p>`);
        textTitolo02.insertAdjacentHTML('afterbegin',`<p><strong>Seleziona l'EnviFlow</strong></p>`);
    }
    
    let placeholderInput1:HTMLElement | null = document.getElementById("selectedInput01")as HTMLElement | null;
    let listaTechFlow = await apiResultQueries.getTechnosphereFlows(vps, idCalcolo);
    
    if(placeholderInput1){
        if (listaTechFlow.length == 0) {
            placeholderInput1.innerHTML = "Non ci sono Tech Flow selezionabili";
        } else {
            const select:HTMLSelectElement | null = document.getElementById("listaInput01")as HTMLSelectElement | null;
            placeholderInput1.innerHTML = "Seleziona un Tech Flow";
            for (let i = 0; i < listaTechFlow.length; i++) {
                let option = document.createElement("option");
                option.value = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
                option.text = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
                option.id = listaTechFlow[i].provider["@id"]+"::"+listaTechFlow[i].flow["@id"];
                if(select){
                    select.appendChild(option);
                }
            }
        }
    }
    
    let placeholderInput2:HTMLElement | null = document.getElementById("selectedInput02")as HTMLElement | null;
    let listaEnviFlow = await apiFlowResults.getInventoryResult(vps, idCalcolo);
    
    if(placeholderInput2){
        if (listaEnviFlow.length == 0) {
            placeholderInput2.innerHTML = "Non ci sono Envi Flow selezionabili";
        } else {
            const select:HTMLSelectElement | null = document.getElementById("listaInput02")as HTMLSelectElement | null;
            placeholderInput2.innerHTML = "Seleziona un Envi Flow";
            for (let i = 0; i < listaEnviFlow.length; i++) {
                let option = document.createElement("option");
                option.value = listaEnviFlow[i].enviFlow.flow.name;
                option.text = listaEnviFlow[i].enviFlow.flow.name;
                option.id = listaEnviFlow[i].enviFlow.flow["@id"]+"::";
                if(select){
                    select.appendChild(option);
                }
            }
        }
    }
    
}

async function getImpactCategory(apiResultQueries: ApiCalculation, vps: string,idCalcolo: any){

    let textTitolo:HTMLDivElement | null = document.getElementById("inputTitolo") as HTMLDivElement | null;
    if(textTitolo){
        textTitolo.insertAdjacentHTML('afterbegin',`<p><strong>Seleziona l'Impact Category</strong></p>`);
    }

    let placeholder:HTMLElement | null = document.getElementById("selectedInput01")as HTMLElement | null;
    let listaImpactCategory= await apiResultQueries.getImpactCategories(vps,idCalcolo);
    
    if(placeholder){
        if (listaImpactCategory.length == 0) {
            placeholder.innerHTML = "Non ci sono Impact Category selezionabili";
        } else {
            const select:HTMLSelectElement | null = document.getElementById("listaInput01") as HTMLSelectElement | null;
            placeholder.innerHTML = "Seleziona un Impact Category";
            for (let i = 0; i < listaImpactCategory.length; i++) {
                let option = document.createElement("option");
                option.value = listaImpactCategory[i].name;
                option.text = listaImpactCategory[i].name;
                option.id = listaImpactCategory[i]["@id"];
                if(select){
                    select.appendChild(option);
                }
            }
        }
    }
    
}

async function getImpactCategoryEnviFlow(apiResultQueries: ApiCalculation,apiFlowResults: ApiFlowResults, vps: string,idCalcolo: any) {

    let textTitolo01:HTMLDivElement | null = document.getElementById("inputTitolo01") as HTMLDivElement | null;
    let textTitolo02:HTMLDivElement | null = document.getElementById("inputTitolo02") as HTMLDivElement | null;
    if(textTitolo01 && textTitolo02){
        textTitolo01.insertAdjacentHTML('afterbegin',`<p><strong>Seleziona l'Impact Category</strong></p>`);
        textTitolo02.insertAdjacentHTML('afterbegin',`<p><strong>Seleziona l'EnviFlow</strong></p>`);
    }
    
    const placeholderInput1 = document.getElementById("selectedInput01");
    let listaImpactCategory= await apiResultQueries.getImpactCategories(vps,idCalcolo);
    
    if(placeholderInput1){
        if (listaImpactCategory.length == 0) {
            placeholderInput1.innerHTML = "Non ci sono Impact Category selezionabili";
        } else {
            const select:HTMLSelectElement | null = document.getElementById("listaInput01")as HTMLSelectElement | null;
            placeholderInput1.innerHTML = "Seleziona un Impact Category";
            for (let i = 0; i < listaImpactCategory.length; i++) {
                let option = document.createElement("option");
                option.value = listaImpactCategory[i].name;
                option.text = listaImpactCategory[i].name;
                option.id = listaImpactCategory[i]["@id"];
                if(select){
                    select.appendChild(option);
                }
            }
        }
    }
    
    const placeholderInput2 = document.getElementById("selectedInput02");
    let listaEnviFlow = await apiFlowResults.getInventoryResult(vps, idCalcolo);
   
    
    if(placeholderInput2){
        if (listaEnviFlow.length == 0) {
            placeholderInput2.innerHTML = "Non ci sono Envi Flow selezionabili";
        } else {
            const select:HTMLSelectElement | null = document.getElementById("listaInput02")as HTMLSelectElement | null;
            placeholderInput2.innerHTML = "Seleziona un Envi Flow";
            for (let i = 0; i < listaEnviFlow.length; i++) {
                let option = document.createElement("option");
                option.value = listaEnviFlow[i].enviFlow.flow.name;
                option.text = listaEnviFlow[i].enviFlow.flow.name;
                option.id = listaEnviFlow[i].enviFlow.flow["@id"]+"::";
                if(select){
                    select.appendChild(option);
                }
            }
        }
    }
    
}

async function getImpactCategoryTechFlow(apiResultQueries: ApiCalculation,vps: string,idCalcolo: any) {

    let textTitolo01:HTMLDivElement | null = document.getElementById("inputTitolo01") as HTMLDivElement | null;
    let textTitolo02:HTMLDivElement | null = document.getElementById("inputTitolo02") as HTMLDivElement | null;
    if(textTitolo01 && textTitolo02){
        textTitolo01.insertAdjacentHTML('afterbegin',`<p><strong>Seleziona l'Impact Category</strong></p>`);
        textTitolo02.insertAdjacentHTML('afterbegin',`<p><strong>Seleziona il TechFlow</strong></p>`);
    }
    
    let placeholderInput1 = document.getElementById("selectedInput01");
    let listaImpactCategory= await apiResultQueries.getImpactCategories(vps,idCalcolo);
    
    if(placeholderInput1){
        if (listaImpactCategory.length == 0) {
            placeholderInput1.innerHTML = "Non ci sono Impact Category selezionabili";
        } else {
            const select:HTMLSelectElement | null = document.getElementById("listaInput01")as HTMLSelectElement | null;
            placeholderInput1.innerHTML = "Seleziona un Impact Category";
            for (let i = 0; i < listaImpactCategory.length; i++) {
                let option = document.createElement("option");
                option.value = listaImpactCategory[i].name;
                option.text = listaImpactCategory[i].name;
                option.id = listaImpactCategory[i]["@id"];
                if(select){
                    select.appendChild(option);
                }
            }
        }
    }
    
    let placeholderInput2 = document.getElementById("selectedInput02");
    let listaTechFlow = await apiResultQueries.getTechnosphereFlows(vps, idCalcolo);
    
    if(placeholderInput2){
        if (listaTechFlow.length == 0) {
            placeholderInput2.innerHTML = "Non ci sono Tech Flow selezionabili";
        } else {
            const select:HTMLSelectElement | null = document.getElementById("listaInput02") as HTMLSelectElement | null;
            placeholderInput2.innerHTML = "Seleziona un Tech Flow";
            for (let i = 0; i < listaTechFlow.length; i++) {
                let option = document.createElement("option");
                option.value = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
                option.text = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
                option.id = listaTechFlow[i].provider["@id"]+"::"+listaTechFlow[i].flow["@id"];
                if(select){
                    select.appendChild(option);
                }
            }
        }
    }
    
}



export {creaTabellaProviderFlow,creaTabellaTechFlow,creaTabellaTechFlowValue,
        creaTabellaEnviFlowsInputOutput,creaTabellaEnviFlowsInputOutputValue,
        creaTabellaImpactCategory,creaTabellaImpactCategoryValue,getTechFlow,
        getEnviFlow,getTechFlowEnviFlow,getImpactCategory,getImpactCategoryEnviFlow,getImpactCategoryTechFlow};