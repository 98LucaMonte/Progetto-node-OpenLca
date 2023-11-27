
function creaViewTableImpactCategories() {
    return `
        <table class="table table-striped table-bordered table-scrollabile"">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità</th>
                </tr>
            </thead>
            <tbody id="datiTabellaImpactCategories">
            </tbody>
        </table>  
    `;
}
  
function creaViewRowImpactCategories(element,num){
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

function creaViewTableTechFlow() {
    return `
        <table class="table table-striped table-bordered table-scrollabile"">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome Provider</th>
                    <th scope="col">Categoria Provider</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità Flow</th>
                </tr>
            </thead>
            <tbody id="datiTabellaImpactCategories">
            </tbody>
        </table>  
    `;
}

function creaViewRowTechFlow(element,num){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.techFlow.provider.name}</td>
        <td>${element.techFlow.provider.category}</td>
        <td>${element.techFlow.flow.name}</td>
        <td>${element.amount}</td>
        <td>${element.techFlow.flow.refUnit}</td>
    </tr>
    `;
}

function creaViewTableResultInput() {
    return `
        <table class="table table-striped table-bordered table-scrollabile">
            <thead>
                <tr>
                    <th scope="col">#5.6.1</th>
                    <th scope="col">Input</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità di misura</th>
                </tr>
            </thead>
            <tbody id="datiTabellaInventoryResultInput">
            </tbody>
        </table>  
    `;
}
  
function creaViewTableResultOutput() {
    return `
        <table class="table table-striped table-bordered table-scrollabile">
            <thead>
                <tr>
                    <th scope="col">#5.6.1</th>
                    <th scope="col">Input</th>
                    <th scope="col">Nome Flow</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Unità di misura</th>
                </tr>
            </thead>
            <tbody id="datiTabellaInventoryResultOutput">
            </tbody>
        </table>  
    `;
}
  
function creaViewRowResult(element,num){
    return `
    <tr class="color-row-table">
        <th scope="row">${num}</th>
        <td>${element.enviFlow.isInput}</td>
        <td>${element.enviFlow.flow.name}</td>
        <td>${element.enviFlow.flow.category}</td> 
        <td>${element.amount}</td> 
        <td>${element.enviFlow.flow.refUnit}</td>      
    </tr>
    `;
}

function creaTabellaTotalImpacts(listaTotalImpacts){
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.innerHTML = '';
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategories());
    const tabellaRighe = document.getElementById("datiTabellaImpactCategories");
    let num = 0;
    console.log(listaTotalImpacts);
    listaTotalImpacts.forEach(element => {
        num++;
        const riga = creaViewRowImpactCategories(element, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    });
}

function creaTabellaTotalImpactsNormalized(listaTotalImpactsNormalized){
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.innerHTML = '';
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategories());
    const tabellaRighe = document.getElementById("datiTabellaImpactCategories");
    let num = 0;
    console.log(listaTotalImpactsNormalized);
    listaTotalImpactsNormalized.forEach(element => {
        num++;
        const riga = creaViewRowImpactCategories(element, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    });
}

function creaTabellaTotalImpactsWeighted(listaTotalImpactsWeighted){
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.innerHTML = '';
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategories());
    const tabellaRighe = document.getElementById("datiTabellaImpactCategories");
    let num = 0;
    console.log(listaTotalImpactsWeighted);
    listaTotalImpactsWeighted.forEach(element => {
        num++;
        const riga = creaViewRowImpactCategories(element, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    });
}

function isIterable(obj) {
    // Verifica se l'oggetto ha il metodo Symbol.iterator
    return obj !== null && typeof obj !== 'undefined' && typeof obj[Symbol.iterator] === 'function';
}

function creaTabellaImpactCathegory(listaImpactCathegory){
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.innerHTML = '';
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategories());
    const tabellaRighe = document.getElementById("datiTabellaImpactCategories");
    let num = 0;
    console.log(listaImpactCathegory);
    if(isIterable(listaImpactCathegory)){
        listaImpactCathegory.forEach(element => {
            num++;
            const riga = creaViewRowImpactCategories(element, num);
            tabellaRighe.insertAdjacentHTML('beforeend', riga);
        });
    }
    else{
        num++;
        const riga = creaViewRowImpactCategories(listaImpactCathegory, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    }
    
}

function creaTabellaImpactContributionsOf(listaImpactContributionsOf){

    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.innerHTML = '';
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableTechFlow());
    const tabellaRighe = document.getElementById("datiTabellaImpactCategories");
    let num = 0;
    console.log(listaImpactContributionsOf);
    if(isIterable(listaImpactContributionsOf)){
        listaImpactContributionsOf.forEach(element => {
            num++;
            const riga = creaViewRowTechFlow(element, num);
            tabellaRighe.insertAdjacentHTML('beforeend', riga);
        });
    }
    else{
        num++;
        const riga = creaViewRowTechFlow(listaImpactContributionsOf, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    }

}

function creaTabellaDirectImpactsOf(listaDirectImpactsOf){
    
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.innerHTML = '';
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategories());
    const tabellaRighe = document.getElementById("datiTabellaImpactCategories");
    let num = 0;
    console.log(listaDirectImpactsOf);
    if(isIterable(listaDirectImpactsOf)){
        listaDirectImpactsOf.forEach(element => {
            num++;
            const riga = creaViewRowImpactCategories(element, num);
            tabellaRighe.insertAdjacentHTML('beforeend', riga);
        });
    }
    else{
        num++;
        const riga = creaViewRowImpactCategories(listaDirectImpactsOf, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    }
}

function creaTabellaImpactIntensitiesOf(listaImpactIntensitiesOf){
    
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.innerHTML = '';
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategories());
    const tabellaRighe = document.getElementById("datiTabellaImpactCategories");
    let num = 0;
    console.log(listaImpactIntensitiesOf);
    if(isIterable(listaImpactIntensitiesOf)){
        listaImpactIntensitiesOf.forEach(element => {
            num++;
            const riga = creaViewRowImpactCategories(element, num);
            tabellaRighe.insertAdjacentHTML('beforeend', riga);
        });
    }
    else{
        num++;
        const riga = creaViewRowImpactCategories(listaImpactIntensitiesOf, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    }
}

function creaTabellaTotalImpactsOf(listaTotalImpactsOf){
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.innerHTML = '';
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategories());
    const tabellaRighe = document.getElementById("datiTabellaImpactCategories");
    let num = 0;
    console.log(listaTotalImpactsOf);
    if(isIterable(listaTotalImpactsOf)){
        listaTotalImpactsOf.forEach(element => {
            num++;
            const riga = creaViewRowImpactCategories(element, num);
            tabellaRighe.insertAdjacentHTML('beforeend', riga);
        });
    }
    else{
        num++;
        const riga = creaViewRowImpactCategories(listaTotalImpactsOf, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    }
}

function creaTabellaImpactFactorsOf(listaImpactFactorsOf){

    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);
    const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
    tabellaRisultatiRicercaInput.innerHTML='';
    tabellaRisultatiRicercaOutput.innerHTML = '';
    tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableResultInput());
    tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableResultOutput());

    const tabellaRigheInput = document.getElementById("datiTabellaInventoryResultInput");
    const tabellaRigheOutput = document.getElementById("datiTabellaInventoryResultOutput");
    console.log(listaImpactFactorsOf);

    let numOutput = 0;
    let numInput = 0;

    if(!isIterable(listaImpactFactorsOf)){

        if(listaImpactFactorsOf.enviFlow.isInput){
            numInput++;
            const riga = creaViewRowResult(listaImpactFactorsOf, numInput);
            tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
        }
        else{
            numOutput++;
            const riga = creaViewRowResult(listaImpactFactorsOf, numOutput);
            tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
        } 
    }
    else{
        for(let element of listaImpactFactorsOf){
            
            if(element.enviFlow.isInput){
                numInput++;
                const riga = creaViewRowResult(element, numInput);
                tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
            }
            else{
                numOutput++;
                const riga = creaViewRowResult(element, numOutput);
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

function creaTabellaFlowImpactsOf(listaFlowImpactsOf){

    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);
    const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
    tabellaRisultatiRicercaInput.innerHTML='';
    tabellaRisultatiRicercaOutput.innerHTML = '';
    tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableResultInput());
    tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableResultOutput());

    const tabellaRigheInput = document.getElementById("datiTabellaInventoryResultInput");
    const tabellaRigheOutput = document.getElementById("datiTabellaInventoryResultOutput");
    console.log(listaFlowImpactsOf);

    let numOutput = 0;
    let numInput = 0;

    if(!isIterable(listaFlowImpactsOf)){

        if(listaFlowImpactsOf.enviFlow.isInput){
            numInput++;
            const riga = creaViewRowResult(listaFlowImpactsOf, numInput);
            tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
        }
        else{
            numOutput++;
            const riga = creaViewRowResult(listaFlowImpactsOf, numOutput);
            tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
        } 
    }
    else{
        for(let element of listaFlowImpactsOf){
            
            if(element.enviFlow.isInput){
                numInput++;
                const riga = creaViewRowResult(element, numInput);
                tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
            }
            else{
                numOutput++;
                const riga = creaViewRowResult(element, numOutput);
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

function creaTabellaDirectImpactOfImpactCategoryTechFlow(listaDirectImpactOfImpactCategoryTechFlow){

    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.innerHTML = '';
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategories());
    const tabellaRighe = document.getElementById("datiTabellaImpactCategories");
    let num = 0;
    console.log(listaDirectImpactOfImpactCategoryTechFlow);
    if(isIterable(listaDirectImpactOfImpactCategoryTechFlow)){
        listaDirectImpactOfImpactCategoryTechFlow.forEach(element => {
            num++;
            const riga = creaViewRowImpactCategories(element, num);
            tabellaRighe.insertAdjacentHTML('beforeend', riga);
        });
    }
    else{
        num++;
        const riga = creaViewRowImpactCategories(listaDirectImpactOfImpactCategoryTechFlow, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    }
   
}

function creaTabellaDirectImpactIntensityOfImpactCategoryTechFlow(listaDirectImpactIntensityOfImpactCategoryTechFlow){
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.innerHTML = '';
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategories());
    const tabellaRighe = document.getElementById("datiTabellaImpactCategories");
    let num = 0;
    console.log(listaDirectImpactIntensityOfImpactCategoryTechFlow);
    if(isIterable(listaDirectImpactIntensityOfImpactCategoryTechFlow)){
        listaDirectImpactIntensityOfImpactCategoryTechFlow.forEach(element => {
            num++;
            const riga = creaViewRowImpactCategories(element, num);
            tabellaRighe.insertAdjacentHTML('beforeend', riga);
        });
    }
    else{
        num++;
        const riga = creaViewRowImpactCategories(listaDirectImpactIntensityOfImpactCategoryTechFlow, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    }
}

function creaTabellaTotalImpactOfImpactCategoryTechFlow(listaTotalImpactOfImpactCategoryTechFlow){
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    tabellaRisultatiRicerca.innerHTML = '';
    tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategories());
    const tabellaRighe = document.getElementById("datiTabellaImpactCategories");
    let num = 0;
    console.log(listaTotalImpactOfImpactCategoryTechFlow);
    if(isIterable(listaTotalImpactOfImpactCategoryTechFlow)){
        listaTotalImpactOfImpactCategoryTechFlow.forEach(element => {
            num++;
            const riga = creaViewRowImpactCategories(element, num);
            tabellaRighe.insertAdjacentHTML('beforeend', riga);
        });
    }
    else{
        num++;
        const riga = creaViewRowImpactCategories(listaTotalImpactOfImpactCategoryTechFlow, num);
        tabellaRighe.insertAdjacentHTML('beforeend', riga);
    }
}

function creaTabellaImpactFactorsOfImpactCategoryEnviFlow(listaImpactFactorsOfImpactCategoryEnviFlow){
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);
    const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
    tabellaRisultatiRicercaInput.innerHTML='';
    tabellaRisultatiRicercaOutput.innerHTML = '';
    tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableResultInput());
    tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableResultOutput());

    const tabellaRigheInput = document.getElementById("datiTabellaInventoryResultInput");
    const tabellaRigheOutput = document.getElementById("datiTabellaInventoryResultOutput");
    console.log(listaImpactFactorsOfImpactCategoryEnviFlow);

    let numOutput = 0;
    let numInput = 0;

    if(!isIterable(listaImpactFactorsOfImpactCategoryEnviFlow)){

        if(listaImpactFactorsOfImpactCategoryEnviFlow.enviFlow.isInput){
            numInput++;
            const riga = creaViewRowResult(listaImpactFactorsOfImpactCategoryEnviFlow, numInput);
            tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
        }
        else{
            numOutput++;
            const riga = creaViewRowResult(listaImpactFactorsOfImpactCategoryEnviFlow, numOutput);
            tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
        } 
    }
    else{
        for(let element of listaImpactFactorsOfImpactCategoryEnviFlow){
            
            if(element.enviFlow.isInput){
                numInput++;
                const riga = creaViewRowResult(element, numInput);
                tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
            }
            else{
                numOutput++;
                const riga = creaViewRowResult(element, numOutput);
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

function creaTabellaFlowImpactOfImpactCategoryEnviFlow(listaFlowImpactOfImpactCategoryEnviFlow){
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);
    const tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    const tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
    tabellaRisultatiRicercaInput.innerHTML='';
    tabellaRisultatiRicercaOutput.innerHTML = '';
    tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableResultInput());
    tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableResultOutput());

    const tabellaRigheInput = document.getElementById("datiTabellaInventoryResultInput");
    const tabellaRigheOutput = document.getElementById("datiTabellaInventoryResultOutput");
    console.log(listaFlowImpactOfImpactCategoryEnviFlow);

    let numOutput = 0;
    let numInput = 0;

    if(!isIterable(listaFlowImpactOfImpactCategoryEnviFlow)){

        if(listaFlowImpactOfImpactCategoryEnviFlow.enviFlow.isInput){
            numInput++;
            const riga = creaViewRowResult(listaFlowImpactOfImpactCategoryEnviFlow, numInput);
            tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
        }
        else{
            numOutput++;
            const riga = creaViewRowResult(listaFlowImpactOfImpactCategoryEnviFlow, numOutput);
            tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
        } 
    }
    else{
        for(let element of listaFlowImpactOfImpactCategoryEnviFlow){
            
            if(element.enviFlow.isInput){
                numInput++;
                const riga = creaViewRowResult(element, numInput);
                tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
            }
            else{
                numOutput++;
                const riga = creaViewRowResult(element, numOutput);
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

export{ creaTabellaTotalImpacts,creaTabellaTotalImpactsNormalized,creaTabellaTotalImpactsWeighted,creaTabellaImpactCathegory,
        creaTabellaImpactContributionsOf,creaTabellaDirectImpactsOf,creaTabellaImpactIntensitiesOf,creaTabellaTotalImpactsOf,
        creaTabellaImpactFactorsOf,creaTabellaFlowImpactsOf,creaTabellaDirectImpactOfImpactCategoryTechFlow,
        creaTabellaDirectImpactIntensityOfImpactCategoryTechFlow,creaTabellaTotalImpactOfImpactCategoryTechFlow,
        creaTabellaImpactFactorsOfImpactCategoryEnviFlow,creaTabellaFlowImpactOfImpactCategoryEnviFlow};