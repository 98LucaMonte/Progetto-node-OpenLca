
function creaViewTableImpactCategories() {
    return `
        <table class="table table-striped table-bordered table-scrollabile"">
            <thead>
                <tr>
                    <th scope="col">#5.7</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Quatità</th>
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

function creaTabellaTotalImpacts(listaTotalImpacts){
    const messaggio = document.getElementById("informazioniDati");
    messaggio.innerHTML='';
    messaggio.insertAdjacentHTML('beforeend', 
    `<h5 class="alert alert-secondary" role="alert">Tabella che mostra una lista di impact cathegory</h5>`);
    const tabellaRisultatiRicerca = document.getElementById("risultatiRicerca");
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

export{ creaTabellaTotalImpacts};