
function creaViewTableImpactCategories() {
    return `
        <table class="table table-striped table-bordered table-scrollabile"">
            <thead>
                <tr>
                    <th scope="col">#5.7</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Categoria</th>
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
    <td>${element.name}</td>
    <td>${element.category}</td>
    <td>${element.refUnit}</td>
</tr>
`;
}

export { creaViewTableImpactCategories, creaViewRowImpactCategories};