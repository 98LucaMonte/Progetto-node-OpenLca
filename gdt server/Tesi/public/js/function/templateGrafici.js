
export function creaGraficoImpactCategory(lista){

    const ctx = document.getElementById('myChart');

    const listaNomeImpactCategory = lista.map(function(element) {
        return element.impactCategory.name;
    });

    const listaQuantitaImpactCategory = lista.map(function(element) {
        return element.amount;
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: listaNomeImpactCategory,
        datasets: [{
            label: 'Impact method',
            data: listaQuantitaImpactCategory,
            fill: true,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
                type: 'logarithmic',
                beginAtZero: true
            }
        }
        }
    });
}

export async function setCategoryForSelect(listaCategorieDisponibili,num){

    const placeholder = document.getElementById(`selectedCategorieFlow${num}`);
    
    console.log("ProductSystem");
    console.log(listaCategorieDisponibili);
  
    if (listaCategorieDisponibili.length == 0) {
        placeholder.innerHTML = "Non ci sono categorie selezionabili";
    } else {
        const selectProductSystem = document.getElementById(`listaCategorieFlow${num}`);
        placeholder.innerHTML = "Seleziona una categoria";
        for (let i = 0; i < listaCategorieDisponibili.length; i++) {
            let option = document.createElement("option");
            option.value = listaCategorieDisponibili[i];
            option.text = listaCategorieDisponibili[i];
            option.id = listaCategorieDisponibili[i];
            selectProductSystem.appendChild(option);
        }
    }  
  
}

export function creaGraficoFlow(lista,categoria,isInput,num){
    const ctx = document.getElementById(`myChart${num}`);

    if(ctx)
        ctx.destroy

    let listaOrdinata = lista.filter(elemento => elemento.isInput === isInput && elemento.flow.category === categoria).sort((a, b) => b.amount - a.amount); 

    const listaNomi = listaOrdinata.slice(0,5).map(function(element) {
        return element.flow.name;
    });

    const listaQuantità = listaOrdinata.slice(0,5).map(function(element) {
        return element.amount;
    });


    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: listaNomi,
        datasets: [{
            data: listaQuantità,
            fill: true,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)'
            ],
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
                type: 'logarithmic',
                beginAtZero: true
            }
        }
        }
    });
}
/*
export function creaGraficoFlowOutput(lista,categoria){
    const ctx = document.getElementById('myChart02');

    let listaOrdinata = lista.filter(elemento => !elemento.flow.isInput && elemento.flow.category === categoria).sort((a, b) => b.amount - a.amount); 



    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ,
        datasets: [{
            data: ,
            fill: true,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)'
            ],
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
                type: 'logarithmic',
                beginAtZero: true
            }
        }
        }
    });
}
*/