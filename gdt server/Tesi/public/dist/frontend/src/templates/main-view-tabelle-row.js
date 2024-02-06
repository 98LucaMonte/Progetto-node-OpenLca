var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function creaViewRowProviderFlow(element, num) {
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
function creaTabellaProviderFlow(lista, msg) {
    let messaggio = document.getElementById("informazioniDati");
    if (messaggio) {
        messaggio.innerHTML = '';
        messaggio.insertAdjacentHTML('beforeend', `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
        let tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
        if (tabellaRisultatiRicerca) {
            tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableProviderFlow());
            let tabellaRighe = document.getElementById("datiTabella");
            let num = 0;
            if (isIterable(lista)) {
                lista.forEach((element) => {
                    num++;
                    let riga = creaViewRowProviderFlow(element, num);
                    if (tabellaRighe) {
                        tabellaRighe.insertAdjacentHTML('beforeend', riga);
                    }
                });
            }
            else {
                let classeRimuovere = document.getElementById("tabella");
                if (classeRimuovere) {
                    classeRimuovere.classList.remove("table-scrollabile");
                }
                let classeRimuovere1 = document.getElementById("risultatiRicerca");
                if (classeRimuovere1) {
                    classeRimuovere1.classList.remove("div-scrollabile");
                }
                num++;
                let riga = creaViewRowProviderFlow(lista, num);
                if (tabellaRighe) {
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
function creaViewRowTechFlow(element, num) {
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
function creaTabellaTechFlow(lista, msg) {
    let messaggio = document.getElementById("informazioniDati");
    if (messaggio) {
        messaggio.innerHTML = '';
        messaggio.insertAdjacentHTML('beforeend', `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    }
    let tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    if (tabellaRisultatiRicerca) {
        tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableTechFlow());
    }
    let tabellaRighe = document.getElementById("datiTabella");
    let num = 0;
    if (isIterable(lista)) {
        lista.forEach((element) => {
            num++;
            let riga = creaViewRowTechFlow(element, num);
            if (tabellaRighe) {
                tabellaRighe.insertAdjacentHTML('beforeend', riga);
            }
        });
    }
    else {
        let classeRimuovere = document.getElementById("tabella");
        if (classeRimuovere) {
            classeRimuovere.classList.remove("table-scrollabile");
        }
        let classeRimuovere1 = document.getElementById("risultatiRicerca");
        if (classeRimuovere1) {
            classeRimuovere1.classList.remove("div-scrollabile");
        }
        num++;
        let riga = creaViewRowTechFlow(lista, num);
        if (tabellaRighe) {
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
function creaViewRowTechFlowValue(element, num, amount) {
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
function creaTabellaTechFlowValue(lista, msg) {
    let messaggio = document.getElementById("informazioniDati");
    if (messaggio) {
        messaggio.innerHTML = '';
        messaggio.insertAdjacentHTML('beforeend', `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    }
    let tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    if (tabellaRisultatiRicerca) {
        tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableTechFlowValue());
    }
    let tabellaRighe = document.getElementById("datiTabella");
    let num = 0;
    if (isIterable(lista)) {
        lista.forEach((element) => {
            num++;
            let riga = creaViewRowTechFlowValue(element.techFlow, num, element.amount);
            if (tabellaRighe) {
                tabellaRighe.insertAdjacentHTML('beforeend', riga);
            }
        });
    }
    else {
        let classeRimuovere = document.getElementById("tabella");
        if (classeRimuovere) {
            classeRimuovere.classList.remove("table-scrollabile");
        }
        let classeRimuovere1 = document.getElementById("risultatiRicerca");
        if (classeRimuovere1) {
            classeRimuovere1.classList.remove("div-scrollabile");
        }
        num++;
        let riga = creaViewRowTechFlowValue(lista.techFlow, num, lista.amount);
        if (tabellaRighe) {
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
function creaViewRowEnviFlows(element, num) {
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
function creaTabellaEnviFlowsInputOutput(lista, msg) {
    let messaggio = document.getElementById("informazioniDati");
    if (messaggio) {
        messaggio.innerHTML = '';
        messaggio.insertAdjacentHTML('beforeend', `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    }
    let tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    let tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
    if (tabellaRisultatiRicercaInput && tabellaRisultatiRicercaOutput) {
        tabellaRisultatiRicercaInput.innerHTML = '';
        tabellaRisultatiRicercaOutput.innerHTML = '';
        tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableEnviFlowsInput());
        tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableEnviFlowsOutput());
    }
    let tabellaRigheInput = document.getElementById("datiTabellaResultInput");
    let tabellaRigheOutput = document.getElementById("datiTabellaResultOutput");
    let numOutput = 0;
    let numInput = 0;
    if (!isIterable(lista)) {
        if (lista.enviFlow.isInput) {
            let classeRimuovere = document.getElementById("tabellaInput");
            if (classeRimuovere) {
                classeRimuovere.classList.remove("table-scrollabile");
            }
            let classeRimuovere1 = document.getElementById("risultatiRicerca");
            if (classeRimuovere1) {
                classeRimuovere1.classList.remove("div-scrollabile");
            }
            numInput++;
            let riga = creaViewRowEnviFlows(lista, numInput);
            if (tabellaRigheInput) {
                tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
            }
        }
        else {
            let classeRimuovere = document.getElementById("tabellaOutput");
            if (classeRimuovere) {
                classeRimuovere.classList.remove("table-scrollabile");
            }
            let classeRimuovere1 = document.getElementById("risultatiRicerca");
            if (classeRimuovere1) {
                classeRimuovere1.classList.remove("div-scrollabile");
            }
            numOutput++;
            let riga = creaViewRowEnviFlows(lista, numOutput);
            if (tabellaRigheOutput) {
                tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
            }
        }
    }
    else {
        for (let element of lista) {
            if (element.isInput) {
                numInput++;
                let riga = creaViewRowEnviFlows(element, numInput);
                if (tabellaRigheInput) {
                    tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
                }
            }
            else {
                numOutput++;
                let riga = creaViewRowEnviFlows(element, numOutput);
                if (tabellaRigheOutput) {
                    tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
                }
            }
        }
    }
    if (numInput === 0 && tabellaRisultatiRicercaInput) {
        tabellaRisultatiRicercaInput.innerHTML = "";
        tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di input</p>`);
    }
    if (numOutput === 0 && tabellaRisultatiRicercaOutput) {
        tabellaRisultatiRicercaOutput.innerHTML = "";
        tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di output</p>`);
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
function creaViewRowEnviFlowsValue(element, num, amount) {
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
function creaTabellaEnviFlowsInputOutputValue(lista, msg) {
    let messaggio = document.getElementById("informazioniDati");
    if (messaggio) {
        messaggio.innerHTML = '';
        messaggio.insertAdjacentHTML('beforeend', `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    }
    let tabellaRisultatiRicercaInput = document.getElementById("risultatiRicercaInput01");
    let tabellaRisultatiRicercaOutput = document.getElementById("risultatiRicercaOutput02");
    if (tabellaRisultatiRicercaInput && tabellaRisultatiRicercaOutput) {
        tabellaRisultatiRicercaInput.innerHTML = '';
        tabellaRisultatiRicercaOutput.innerHTML = '';
        tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', creaViewTableEnviFlowsInputValue());
        tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', creaViewTableEnviFlowsOutputValue());
    }
    let tabellaRigheInput = document.getElementById("datiTabellaResultInput");
    let tabellaRigheOutput = document.getElementById("datiTabellaResultOutput");
    let numOutput = 0;
    let numInput = 0;
    if (!isIterable(lista)) {
        if (lista.enviFlow.isInput) {
            let classeRimuovere = document.getElementById("tabellaInput");
            if (classeRimuovere) {
                classeRimuovere.classList.remove("table-scrollabile");
            }
            let classeRimuovere1 = document.getElementById("risultatiRicerca");
            if (classeRimuovere1) {
                classeRimuovere1.classList.remove("div-scrollabile");
            }
            numInput++;
            let riga = creaViewRowEnviFlowsValue(lista.enviFlow, numInput, lista.amount);
            if (tabellaRigheInput) {
                tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
            }
        }
        else {
            let classeRimuovere = document.getElementById("tabellaOutput");
            if (classeRimuovere) {
                classeRimuovere.classList.remove("table-scrollabile");
            }
            let classeRimuovere1 = document.getElementById("risultatiRicerca");
            if (classeRimuovere1) {
                classeRimuovere1.classList.remove("div-scrollabile");
            }
            numOutput++;
            let riga = creaViewRowEnviFlowsValue(lista.enviFlow, numOutput, lista.amount);
            if (tabellaRigheOutput) {
                tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
            }
        }
    }
    else {
        for (let element of lista) {
            if (element.enviFlow.isInput) {
                numInput++;
                let riga = creaViewRowEnviFlowsValue(element.enviFlow, numInput, element.amount);
                if (tabellaRigheInput) {
                    tabellaRigheInput.insertAdjacentHTML('beforeend', riga);
                }
            }
            else {
                numOutput++;
                let riga = creaViewRowEnviFlowsValue(element.enviFlow, numOutput, element.amount);
                if (tabellaRigheOutput) {
                    tabellaRigheOutput.insertAdjacentHTML('beforeend', riga);
                }
            }
        }
    }
    if (numInput === 0 && tabellaRisultatiRicercaInput) {
        tabellaRisultatiRicercaInput.innerHTML = "";
        tabellaRisultatiRicercaInput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di input</p>`);
    }
    if (numOutput === 0 && tabellaRisultatiRicercaOutput) {
        tabellaRisultatiRicercaOutput.innerHTML = "";
        tabellaRisultatiRicercaOutput.insertAdjacentHTML('beforeend', `<p>Non è presente nessun envi Flow di output</p>`);
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
function creaViewRowImpactCategories(element, num) {
    return `
<tr class="color-row-table">
    <th scope="row">${num}</th>
    <td>${element.name}</td>
    <td>${element.category}</td>
    <td>${element.refUnit}</td>
</tr>
`;
}
function creaTabellaImpactCategory(lista, msg) {
    let messaggio = document.getElementById("informazioniDati");
    if (messaggio) {
        messaggio.innerHTML = '';
        messaggio.insertAdjacentHTML('beforeend', `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    }
    let tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    if (tabellaRisultatiRicerca) {
        tabellaRisultatiRicerca.innerHTML = '';
        tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategories());
    }
    let tabellaRighe = document.getElementById("datiTabella");
    let num = 0;
    if (isIterable(lista)) {
        lista.forEach((element) => {
            num++;
            let riga = creaViewRowImpactCategories(element, num);
            if (tabellaRighe) {
                tabellaRighe.insertAdjacentHTML('beforeend', riga);
            }
        });
    }
    else {
        let classeRimuovere = document.getElementById("tabella");
        if (classeRimuovere) {
            classeRimuovere.classList.remove("table-scrollabile");
        }
        let classeRimuovere1 = document.getElementById("risultatiRicerca");
        if (classeRimuovere1) {
            classeRimuovere1.classList.remove("div-scrollabile");
        }
        num++;
        let riga = creaViewRowImpactCategories(lista, num);
        if (tabellaRighe) {
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
function creaViewRowImpactCategoriesValue(element, num) {
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
function creaTabellaImpactCategoryValue(lista, msg) {
    const messaggio = document.getElementById("informazioniDati");
    if (messaggio) {
        messaggio.innerHTML = '';
        messaggio.insertAdjacentHTML('beforeend', `<h5 class="alert alert-secondary" role="alert">${msg}</h5>`);
    }
    let tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
    if (tabellaRisultatiRicerca) {
        tabellaRisultatiRicerca.innerHTML = '';
        tabellaRisultatiRicerca.insertAdjacentHTML('beforeend', creaViewTableImpactCategoriesValue());
    }
    let tabellaRighe = document.getElementById("datiTabella");
    let num = 0;
    if (isIterable(lista)) {
        lista.forEach((element) => {
            num++;
            let riga = creaViewRowImpactCategoriesValue(element, num);
            if (tabellaRighe) {
                tabellaRighe.insertAdjacentHTML('beforeend', riga);
            }
        });
    }
    else {
        let classeRimuovere = document.getElementById("tabella");
        if (classeRimuovere) {
            classeRimuovere.classList.remove("table-scrollabile");
        }
        let classeRimuovere1 = document.getElementById("risultatiRicerca");
        if (classeRimuovere1) {
            classeRimuovere1.classList.remove("div-scrollabile");
        }
        num++;
        let riga = creaViewRowImpactCategoriesValue(lista, num);
        if (tabellaRighe) {
            tabellaRighe.insertAdjacentHTML('beforeend', riga);
        }
    }
}
function getTechFlow(apiResultQueries, vps, idCalcolo) {
    return __awaiter(this, void 0, void 0, function* () {
        let textTitolo = document.getElementById("inputTitolo");
        if (textTitolo) {
            textTitolo.insertAdjacentHTML('afterbegin', `<p><strong>Seleziona il TechFlow</strong></p>`);
        }
        let placeholder = document.getElementById("selectedInput01");
        let listaTechFlow = yield apiResultQueries.getTechnosphereFlows(vps, idCalcolo);
        if (placeholder) {
            if (listaTechFlow.length == 0) {
                placeholder.innerHTML = "Non ci sono Tech Flow selezionabili";
            }
            else {
                const select = document.getElementById("listaInput01");
                placeholder.innerHTML = "Seleziona un Tech Flow";
                for (let i = 0; i < listaTechFlow.length; i++) {
                    let option = document.createElement("option");
                    option.value = listaTechFlow[i].provider.name + " " + listaTechFlow[i].flow.name;
                    option.text = listaTechFlow[i].provider.name + " " + listaTechFlow[i].flow.name;
                    option.id = listaTechFlow[i].provider["@id"] + "::" + listaTechFlow[i].flow["@id"];
                    if (select) {
                        select.appendChild(option);
                    }
                }
            }
        }
    });
}
function getEnviFlow(apiFlowResults, vps, idCalcolo) {
    return __awaiter(this, void 0, void 0, function* () {
        let textTitolo = document.getElementById("inputTitolo");
        if (textTitolo) {
            textTitolo.insertAdjacentHTML('afterbegin', `<p><strong>Seleziona l'EnviFlow</strong></p>`);
        }
        let placeholder = document.getElementById("selectedInput01");
        let listaEnviFlow = yield apiFlowResults.getInventoryResult(vps, idCalcolo);
        if (placeholder) {
            if (listaEnviFlow.length == 0) {
                placeholder.innerHTML = "Non ci sono Envi Flow selezionabili";
            }
            else {
                const select = document.getElementById("listaInput01");
                placeholder.innerHTML = "Seleziona un Envi Flow";
                for (let i = 0; i < listaEnviFlow.length; i++) {
                    let option = document.createElement("option");
                    option.value = listaEnviFlow[i].enviFlow.flow.name;
                    option.text = listaEnviFlow[i].enviFlow.flow.name;
                    option.id = listaEnviFlow[i].enviFlow.flow["@id"];
                    if (select) {
                        select.appendChild(option);
                    }
                }
            }
        }
    });
}
function getTechFlowEnviFlow(apiResultQueries, apiFlowResults, vps, idCalcolo) {
    return __awaiter(this, void 0, void 0, function* () {
        let textTitolo01 = document.getElementById("inputTitolo01");
        let textTitolo02 = document.getElementById("inputTitolo02");
        if (textTitolo01 && textTitolo02) {
            textTitolo01.insertAdjacentHTML('afterbegin', `<p><strong>Seleziona il TechFlow</strong></p>`);
            textTitolo02.insertAdjacentHTML('afterbegin', `<p><strong>Seleziona l'EnviFlow</strong></p>`);
        }
        let placeholderInput1 = document.getElementById("selectedInput01");
        let listaTechFlow = yield apiResultQueries.getTechnosphereFlows(vps, idCalcolo);
        if (placeholderInput1) {
            if (listaTechFlow.length == 0) {
                placeholderInput1.innerHTML = "Non ci sono Tech Flow selezionabili";
            }
            else {
                const select = document.getElementById("listaInput01");
                placeholderInput1.innerHTML = "Seleziona un Tech Flow";
                for (let i = 0; i < listaTechFlow.length; i++) {
                    let option = document.createElement("option");
                    option.value = listaTechFlow[i].provider.name + " " + listaTechFlow[i].flow.name;
                    option.text = listaTechFlow[i].provider.name + " " + listaTechFlow[i].flow.name;
                    option.id = listaTechFlow[i].provider["@id"] + "::" + listaTechFlow[i].flow["@id"];
                    if (select) {
                        select.appendChild(option);
                    }
                }
            }
        }
        let placeholderInput2 = document.getElementById("selectedInput02");
        let listaEnviFlow = yield apiFlowResults.getInventoryResult(vps, idCalcolo);
        if (placeholderInput2) {
            if (listaEnviFlow.length == 0) {
                placeholderInput2.innerHTML = "Non ci sono Envi Flow selezionabili";
            }
            else {
                const select = document.getElementById("listaInput02");
                placeholderInput2.innerHTML = "Seleziona un Envi Flow";
                for (let i = 0; i < listaEnviFlow.length; i++) {
                    let option = document.createElement("option");
                    option.value = listaEnviFlow[i].enviFlow.flow.name;
                    option.text = listaEnviFlow[i].enviFlow.flow.name;
                    option.id = listaEnviFlow[i].enviFlow.flow["@id"] + "::";
                    if (select) {
                        select.appendChild(option);
                    }
                }
            }
        }
    });
}
function getImpactCategory(apiResultQueries, vps, idCalcolo) {
    return __awaiter(this, void 0, void 0, function* () {
        let textTitolo = document.getElementById("inputTitolo");
        if (textTitolo) {
            textTitolo.insertAdjacentHTML('afterbegin', `<p><strong>Seleziona l'Impact Category</strong></p>`);
        }
        let placeholder = document.getElementById("selectedInput01");
        let listaImpactCategory = yield apiResultQueries.getImpactCategories(vps, idCalcolo);
        if (placeholder) {
            if (listaImpactCategory.length == 0) {
                placeholder.innerHTML = "Non ci sono Impact Category selezionabili";
            }
            else {
                const select = document.getElementById("listaInput01");
                placeholder.innerHTML = "Seleziona un Impact Category";
                for (let i = 0; i < listaImpactCategory.length; i++) {
                    let option = document.createElement("option");
                    option.value = listaImpactCategory[i].name;
                    option.text = listaImpactCategory[i].name;
                    option.id = listaImpactCategory[i]["@id"];
                    if (select) {
                        select.appendChild(option);
                    }
                }
            }
        }
    });
}
function getImpactCategoryEnviFlow(apiResultQueries, apiFlowResults, vps, idCalcolo) {
    return __awaiter(this, void 0, void 0, function* () {
        let textTitolo01 = document.getElementById("inputTitolo01");
        let textTitolo02 = document.getElementById("inputTitolo02");
        if (textTitolo01 && textTitolo02) {
            textTitolo01.insertAdjacentHTML('afterbegin', `<p><strong>Seleziona l'Impact Category</strong></p>`);
            textTitolo02.insertAdjacentHTML('afterbegin', `<p><strong>Seleziona l'EnviFlow</strong></p>`);
        }
        const placeholderInput1 = document.getElementById("selectedInput01");
        let listaImpactCategory = yield apiResultQueries.getImpactCategories(vps, idCalcolo);
        if (placeholderInput1) {
            if (listaImpactCategory.length == 0) {
                placeholderInput1.innerHTML = "Non ci sono Impact Category selezionabili";
            }
            else {
                const select = document.getElementById("listaInput01");
                placeholderInput1.innerHTML = "Seleziona un Impact Category";
                for (let i = 0; i < listaImpactCategory.length; i++) {
                    let option = document.createElement("option");
                    option.value = listaImpactCategory[i].name;
                    option.text = listaImpactCategory[i].name;
                    option.id = listaImpactCategory[i]["@id"];
                    if (select) {
                        select.appendChild(option);
                    }
                }
            }
        }
        const placeholderInput2 = document.getElementById("selectedInput02");
        let listaEnviFlow = yield apiFlowResults.getInventoryResult(vps, idCalcolo);
        if (placeholderInput2) {
            if (listaEnviFlow.length == 0) {
                placeholderInput2.innerHTML = "Non ci sono Envi Flow selezionabili";
            }
            else {
                const select = document.getElementById("listaInput02");
                placeholderInput2.innerHTML = "Seleziona un Envi Flow";
                for (let i = 0; i < listaEnviFlow.length; i++) {
                    let option = document.createElement("option");
                    option.value = listaEnviFlow[i].enviFlow.flow.name;
                    option.text = listaEnviFlow[i].enviFlow.flow.name;
                    option.id = listaEnviFlow[i].enviFlow.flow["@id"] + "::";
                    if (select) {
                        select.appendChild(option);
                    }
                }
            }
        }
    });
}
function getImpactCategoryTechFlow(apiResultQueries, vps, idCalcolo) {
    return __awaiter(this, void 0, void 0, function* () {
        let textTitolo01 = document.getElementById("inputTitolo01");
        let textTitolo02 = document.getElementById("inputTitolo02");
        if (textTitolo01 && textTitolo02) {
            textTitolo01.insertAdjacentHTML('afterbegin', `<p><strong>Seleziona l'Impact Category</strong></p>`);
            textTitolo02.insertAdjacentHTML('afterbegin', `<p><strong>Seleziona il TechFlow</strong></p>`);
        }
        let placeholderInput1 = document.getElementById("selectedInput01");
        let listaImpactCategory = yield apiResultQueries.getImpactCategories(vps, idCalcolo);
        if (placeholderInput1) {
            if (listaImpactCategory.length == 0) {
                placeholderInput1.innerHTML = "Non ci sono Impact Category selezionabili";
            }
            else {
                const select = document.getElementById("listaInput01");
                placeholderInput1.innerHTML = "Seleziona un Impact Category";
                for (let i = 0; i < listaImpactCategory.length; i++) {
                    let option = document.createElement("option");
                    option.value = listaImpactCategory[i].name;
                    option.text = listaImpactCategory[i].name;
                    option.id = listaImpactCategory[i]["@id"];
                    if (select) {
                        select.appendChild(option);
                    }
                }
            }
        }
        let placeholderInput2 = document.getElementById("selectedInput02");
        let listaTechFlow = yield apiResultQueries.getTechnosphereFlows(vps, idCalcolo);
        if (placeholderInput2) {
            if (listaTechFlow.length == 0) {
                placeholderInput2.innerHTML = "Non ci sono Tech Flow selezionabili";
            }
            else {
                const select = document.getElementById("listaInput02");
                placeholderInput2.innerHTML = "Seleziona un Tech Flow";
                for (let i = 0; i < listaTechFlow.length; i++) {
                    let option = document.createElement("option");
                    option.value = listaTechFlow[i].provider.name + " " + listaTechFlow[i].flow.name;
                    option.text = listaTechFlow[i].provider.name + " " + listaTechFlow[i].flow.name;
                    option.id = listaTechFlow[i].provider["@id"] + "::" + listaTechFlow[i].flow["@id"];
                    if (select) {
                        select.appendChild(option);
                    }
                }
            }
        }
    });
}
export { creaTabellaProviderFlow, creaTabellaTechFlow, creaTabellaTechFlowValue, creaTabellaEnviFlowsInputOutput, creaTabellaEnviFlowsInputOutputValue, creaTabellaImpactCategory, creaTabellaImpactCategoryValue, getTechFlow, getEnviFlow, getTechFlowEnviFlow, getImpactCategory, getImpactCategoryEnviFlow, getImpactCategoryTechFlow };
