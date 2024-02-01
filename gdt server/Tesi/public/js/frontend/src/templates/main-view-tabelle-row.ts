function isIterable(obj) {
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

function creaViewRowProviderFlow(element,num){
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

function creaTabellaProviderFlow(lista,msg) {
    console.log(lista);
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableProviderFlow());
    const tabellaRighe = document.getElementById("datiTabella");
    let num = 0;
    
    if(isIterable(lista)){
        lista.forEach(element => {
        num++;
        const riga = creaViewRowProviderFlow(element, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
        });
    }
    else{
        let classeRimuovere = document.getElementById("tabella");
        classeRimuovere.classList.remove("table-scrollabile");
        let classeRimuovere1 = document.getElementById("risultatiRicerca");
        classeRimuovere1.classList.remove("div-scrollabile");
        num++;
        const riga = creaViewRowProviderFlow(lista,num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga); 
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

function creaViewRowTechFlow(element,num){
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

function creaTabellaTechFlow(lista,msg) {
    console.log(lista);
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableTechFlow());
    const tabellaRighe = document.getElementById("datiTabella");
    let num = 0;
    
    if(isIterable(lista)){
        lista.forEach(element => {
        num++;
        const riga = creaViewRowTechFlow(element, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
        });
    }
    else{
        let classeRimuovere = document.getElementById("tabella");
        classeRimuovere.classList.remove("table-scrollabile");
        let classeRimuovere1 = document.getElementById("risultatiRicerca");
        classeRimuovere1.classList.remove("div-scrollabile");
        num++;
        const riga = creaViewRowTechFlow(lista,num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga); 
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

function creaViewRowTechFlowValue(element,num,amount){
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

function creaTabellaTechFlowValue(lista,msg) {
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableTechFlowValue());
    const tabellaRighe = document.getElementById("datiTabella");
    let num = 0;
    
    if(isIterable(lista)){
        lista.forEach(element => {
        num++;
        const riga = creaViewRowTechFlowValue(element.techFlow, num,element.amount);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
        });
    }
    else{
        let classeRimuovere = document.getElementById("tabella");
        classeRimuovere.classList.remove("table-scrollabile");
        let classeRimuovere1 = document.getElementById("risultatiRicerca");
        classeRimuovere1.classList.remove("div-scrollabile");
        num++;
        const riga = creaViewRowTechFlowValue(lista.techFlow,num,lista.amount);
        tabellaRighe.insertAdjacentHTML('beforeend', riga); 
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

function creaViewRowEnviFlows(element,num){
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

function creaTabellaEnviFlowsInputOutput(lista,msg){

    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
    tabellaRisultatiRicercaInput.innerHTML='';
    tabellaRisultatiRicercaOutput.innerHTML = '';
    tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableEnviFlowsInput());
    tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableEnviFlowsOutput());

    const tabellaRigheInput = document.getElementById("datiTabellaResultInput");
    const tabellaRigheOutput = document.getElementById("datiTabellaResultOutput");
    console.log(lista);

    let numOutput = 0;
    let numInput = 0;

    if(!isIterable(lista)){

        if(lista.enviFlow.isInput){
            let classeRimuovere = document.getElementById("tabellaInput");
            classeRimuovere.classList.remove("table-scrollabile");
            let classeRimuovere1 = document.getElementById("risultatiRicerca");
            classeRimuovere1.classList.remove("div-scrollabile");
            numInput++;
            const riga = creaViewRowEnviFlows(lista, numInput);
            tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
        }
        else{
            let classeRimuovere = document.getElementById("tabellaOutput");
            classeRimuovere.classList.remove("table-scrollabile");
            let classeRimuovere1 = document.getElementById("risultatiRicerca");
            classeRimuovere1.classList.remove("div-scrollabile");
            numOutput++;
            const riga = creaViewRowEnviFlows(lista, numOutput);
            tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
        } 
    }
    else{
        for(let element of lista){
            
            if(element.isInput){
                numInput++;
                const riga = creaViewRowEnviFlows(element, numInput);
                tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
            }
            else{
                numOutput++;
                const riga = creaViewRowEnviFlows(element, numOutput);
                tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
            }
        }
    }
    
    if(numInput === 0){
        tabellaRisultatiRicercaInput.innerHTML="";
        tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di input</p>`);
    }
    if(numOutput === 0){
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

function creaViewRowEnviFlowsValue(element,num,amount){
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

function creaTabellaEnviFlowsInputOutputValue(lista,msg){

    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
    tabellaRisultatiRicercaInput.innerHTML='';
    tabellaRisultatiRicercaOutput.innerHTML = '';
    tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableEnviFlowsInputValue());
    tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableEnviFlowsOutputValue());

    const tabellaRigheInput = document.getElementById("datiTabellaResultInput");
    const tabellaRigheOutput = document.getElementById("datiTabellaResultOutput");
    console.log(lista);

    let numOutput = 0;
    let numInput = 0;

    if(!isIterable(lista)){

        if(lista.enviFlow.isInput){
            let classeRimuovere = document.getElementById("tabellaInput");
            classeRimuovere.classList.remove("table-scrollabile");
            let classeRimuovere1 = document.getElementById("risultatiRicerca");
            classeRimuovere1.classList.remove("div-scrollabile");
            numInput++;
            const riga = creaViewRowEnviFlowsValue(lista.enviFlow, numInput,lista.amount);
            tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
        }
        else{
            let classeRimuovere = document.getElementById("tabellaOutput");
            classeRimuovere.classList.remove("table-scrollabile");
            let classeRimuovere1 = document.getElementById("risultatiRicerca");
            classeRimuovere1.classList.remove("div-scrollabile");
            numOutput++;
            const riga = creaViewRowEnviFlowsValue(lista.enviFlow, numOutput,lista.amount);
            tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
        } 
    }
    else{
        for(let element of lista){
            
            if(element.enviFlow.isInput){
                numInput++;
                const riga = creaViewRowEnviFlowsValue(element.enviFlow, numInput,element.amount);
                tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
            }
            else{
                numOutput++;
                const riga = creaViewRowEnviFlowsValue(element.enviFlow, numOutput,element.amount);
                tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
            }
        }
    }
    
    if(numInput === 0){
        tabellaRisultatiRicercaInput.innerHTML="";
        tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di input</p>`);
    }
    if(numOutput === 0){
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
  
function creaViewRowImpactCategories(element,num){
return `
<tr class="color-row-table">
    <th scope="row">${num}</th>
    <td>${element.name}</td>
    <td>${element.category}</td>
    <td>${element.refUnit}</td>
</tr>
`;
}

function creaTabellaImpactCategory(lista,msg){
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.innerHTML = '';
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategories());
    const tabellaRighe = document.getElementById("datiTabella");
    let num = 0;
    console.log(lista);
    if(isIterable(lista)){
        lista.forEach(element => {
            num++;
            const riga = creaViewRowImpactCategories(element, num);
            tabellaRighe.insertAdjacentHTML('beforeend', riga);
        });
    }
    else{
        let classeRimuovere = document.getElementById("tabella");
        classeRimuovere.classList.remove("table-scrollabile");
        let classeRimuovere1 = document.getElementById("risultatiRicerca");
        classeRimuovere1.classList.remove("div-scrollabile");
        num++;
        const riga = creaViewRowImpactCategories(lista, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
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
  
function creaViewRowImpactCategoriesValue(element,num){
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

function creaTabellaImpactCategoryValue(lista,msg){
    
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.innerHTML = '';
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategoriesValue());
    const tabellaRighe = document.getElementById("datiTabella");
    let num = 0;
    console.log(lista);
    if(isIterable(lista)){
        lista.forEach(element => {
            num++;
            const riga = creaViewRowImpactCategoriesValue(element, num);
            tabellaRighe.insertAdjacentHTML('beforeend', riga);
        });
    }
    else{
        let classeRimuovere = document.getElementById("tabella");
        classeRimuovere.classList.remove("table-scrollabile");
        let classeRimuovere1 = document.getElementById("risultatiRicerca");
        classeRimuovere1.classList.remove("div-scrollabile");
        num++;
        const riga = creaViewRowImpactCategoriesValue(lista, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    }
   
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
}

async function getTechFlow(apiResultQueries, vps,idCalcolo) {

    document.getElementById("inputTitolo").insertAdjacentHTML('afterbegin',`<p><strong>Seleziona il TechFlow</strong></p>`);
    const placeholder = document.getElementById("selectedInput01");
    let listaTechFlow = await apiResultQueries.getTechnosphereFlows(vps, idCalcolo);
    console.log("listaTechFlow");
    console.log(listaTechFlow);

    if (listaTechFlow.length == 0) {
        placeholder.innerHTML = "Non ci sono Tech Flow selezionabili";
    } else {
        const select = document.getElementById("listaInput01");
        placeholder.innerHTML = "Seleziona un Tech Flow";
        for (let i = 0; i < listaTechFlow.length; i++) {
            let option = document.createElement("option");
            option.value = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
            option.text = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
            option.id = listaTechFlow[i].provider["@id"]+"::"+listaTechFlow[i].flow["@id"];
            select.appendChild(option);
        }
    }
   
}

async function getEnviFlow(apiFlowResults, vps,idCalcolo){

    document.getElementById("inputTitolo").insertAdjacentHTML('afterbegin',`<p><strong>Seleziona l'EnviFlow</strong></p>`);
    const placeholder = document.getElementById("selectedInput01");
    let listaEnviFlow = await apiFlowResults.getInventoryResult(vps, idCalcolo);
    console.log("listaEnviFlow");
    console.log(listaEnviFlow);

    if (listaEnviFlow.length == 0) {
        placeholder.innerHTML = "Non ci sono Envi Flow selezionabili";
    } else {
        const select = document.getElementById("listaInput01");
        placeholder.innerHTML = "Seleziona un Envi Flow";
        for (let i = 0; i < listaEnviFlow.length; i++) {
            let option = document.createElement("option");
            option.value = listaEnviFlow[i].enviFlow.flow.name;
            option.text = listaEnviFlow[i].enviFlow.flow.name;
            option.id = listaEnviFlow[i].enviFlow.flow["@id"];
            select.appendChild(option);
        }
    }
   
}

async function getTechFlowEnviFlow(apiResultQueries,apiFlowResults, vps,idCalcolo){

    document.getElementById("inputTitolo01").insertAdjacentHTML('afterbegin',`<p><strong>Seleziona il TechFlow</strong></p>`);
    document.getElementById("inputTitolo02").insertAdjacentHTML('afterbegin',`<p><strong>Seleziona l'EnviFlow</strong></p>`);

    const placeholder1 = document.getElementById("selectedInput01");
    let listaTechFlow = await apiResultQueries.getTechnosphereFlows(vps, idCalcolo);
    console.log("listaTechFlow");
    console.log(listaTechFlow);

    if (listaTechFlow.length == 0) {
        placeholder1.innerHTML = "Non ci sono Tech Flow selezionabili";
    } else {
        const select = document.getElementById("listaInput01");
        placeholder1.innerHTML = "Seleziona un Tech Flow";
        for (let i = 0; i < listaTechFlow.length; i++) {
            let option = document.createElement("option");
            option.value = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
            option.text = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
            option.id = listaTechFlow[i].provider["@id"]+"::"+listaTechFlow[i].flow["@id"];
            select.appendChild(option);
        }
    }


    const placeholder = document.getElementById("selectedInput02");
    let listaEnviFlow = await apiFlowResults.getInventoryResult(vps, idCalcolo);
    console.log("listaEnviFlow");
    console.log(listaEnviFlow);

    if (listaEnviFlow.length == 0) {
        placeholder.innerHTML = "Non ci sono Envi Flow selezionabili";
    } else {
        const select = document.getElementById("listaInput02");
        placeholder.innerHTML = "Seleziona un Envi Flow";
        for (let i = 0; i < listaEnviFlow.length; i++) {
            let option = document.createElement("option");
            option.value = listaEnviFlow[i].enviFlow.flow.name;
            option.text = listaEnviFlow[i].enviFlow.flow.name;
            option.id = listaEnviFlow[i].enviFlow.flow["@id"]+"::";
            select.appendChild(option);
        }
    }
   
}

async function getImpactCategory(apiResultQueries, vps,idCalcolo){

    document.getElementById("inputTitolo").insertAdjacentHTML('afterbegin',`<p><strong>Seleziona l'Impact Category</strong></p>`);
    const placeholder = document.getElementById("selectedInput01");
    let listaImpactCategory= await apiResultQueries.getImpactCategories(vps,idCalcolo);
    console.log("listaImpactCategory");
    console.log(listaImpactCategory);

    if (listaImpactCategory.length == 0) {
        placeholder.innerHTML = "Non ci sono Impact Category selezionabili";
    } else {
        const select = document.getElementById("listaInput01");
        placeholder.innerHTML = "Seleziona un Impact Category";
        for (let i = 0; i < listaImpactCategory.length; i++) {
            let option = document.createElement("option");
            option.value = listaImpactCategory[i].name;
            option.text = listaImpactCategory[i].name;
            option.id = listaImpactCategory[i]["@id"];
            select.appendChild(option);
        }
    }
   
}

async function getImpactCategoryEnviFlow(apiResultQueries,apiFlowResults, vps,idCalcolo) {

    document.getElementById("inputTitolo01").insertAdjacentHTML('afterbegin',`<p><strong>Seleziona l'Impact Category</strong></p>`);
    document.getElementById("inputTitolo02").insertAdjacentHTML('afterbegin',`<p><strong>Seleziona l'EnviFlow</strong></p>`);

    const placeholder1 = document.getElementById("selectedInput01");
    let listaImpactCategory= await apiResultQueries.getImpactCategories(vps,idCalcolo);
    console.log("listaImpactCategory");
    console.log(listaImpactCategory);

    if (listaImpactCategory.length == 0) {
        placeholder1.innerHTML = "Non ci sono Impact Category selezionabili";
    } else {
        const select = document.getElementById("listaInput01");
        placeholder1.innerHTML = "Seleziona un Impact Category";
        for (let i = 0; i < listaImpactCategory.length; i++) {
            let option = document.createElement("option");
            option.value = listaImpactCategory[i].name;
            option.text = listaImpactCategory[i].name;
            option.id = listaImpactCategory[i]["@id"];
            select.appendChild(option);
        }
    }


    const placeholder = document.getElementById("selectedInput02");
    let listaEnviFlow = await apiFlowResults.getInventoryResult(vps, idCalcolo);
    console.log("listaEnviFlow");
    console.log(listaEnviFlow);

    if (listaEnviFlow.length == 0) {
        placeholder.innerHTML = "Non ci sono Envi Flow selezionabili";
    } else {
        const select = document.getElementById("listaInput02");
        placeholder.innerHTML = "Seleziona un Envi Flow";
        for (let i = 0; i < listaEnviFlow.length; i++) {
            let option = document.createElement("option");
            option.value = listaEnviFlow[i].enviFlow.flow.name;
            option.text = listaEnviFlow[i].enviFlow.flow.name;
            option.id = listaEnviFlow[i].enviFlow.flow["@id"]+"::";
            select.appendChild(option);
        }
    }
   
}

async function getImpactCategoryTechFlow(apiResultQueries,vps,idCalcolo) {

    document.getElementById("inputTitolo01").insertAdjacentHTML('afterbegin',`<p><strong>Seleziona l'Impact Category</strong></p>`);
    document.getElementById("inputTitolo02").insertAdjacentHTML('afterbegin',`<p><strong>Seleziona il TechFlow</strong></p>`);

    const placeholder1 = document.getElementById("selectedInput01");
    let listaImpactCategory= await apiResultQueries.getImpactCategories(vps,idCalcolo);
    console.log("listaImpactCategory");
    console.log(listaImpactCategory);

    if (listaImpactCategory.length == 0) {
        placeholder1.innerHTML = "Non ci sono Impact Category selezionabili";
    } else {
        const select = document.getElementById("listaInput01");
        placeholder1.innerHTML = "Seleziona un Impact Category";
        for (let i = 0; i < listaImpactCategory.length; i++) {
            let option = document.createElement("option");
            option.value = listaImpactCategory[i].name;
            option.text = listaImpactCategory[i].name;
            option.id = listaImpactCategory[i]["@id"];
            select.appendChild(option);
        }
    }


    const placeholder = document.getElementById("selectedInput02");
    let listaTechFlow = await apiResultQueries.getTechnosphereFlows(vps, idCalcolo);
    console.log("listaTechFlow");
    console.log(listaTechFlow);

    if (listaTechFlow.length == 0) {
        placeholder.innerHTML = "Non ci sono Tech Flow selezionabili";
    } else {
        const select = document.getElementById("listaInput02");
        placeholder.innerHTML = "Seleziona un Tech Flow";
        for (let i = 0; i < listaTechFlow.length; i++) {
            let option = document.createElement("option");
            option.value = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
            option.text = listaTechFlow[i].provider.name+" "+listaTechFlow[i].flow.name;
            option.id = listaTechFlow[i].provider["@id"]+"::"+listaTechFlow[i].flow["@id"];
            select.appendChild(option);
        }
    }
   
}



export {creaTabellaProviderFlow,creaTabellaTechFlow,creaTabellaTechFlowValue,
        creaTabellaEnviFlowsInputOutput,creaTabellaEnviFlowsInputOutputValue,
        creaTabellaImpactCategory,creaTabellaImpactCategoryValue,getTechFlow,
        getEnviFlow,getTechFlowEnviFlow,getImpactCategory,getImpactCategoryEnviFlow,getImpactCategoryTechFlow};