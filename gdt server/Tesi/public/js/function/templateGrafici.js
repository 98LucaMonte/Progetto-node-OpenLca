
export function creaGraficoImpactCategory(lista){

    let listaOrdinata = lista.sort(function(a, b) {
        return b.amount - a.amount;
    });
    listaOrdinata.slice(0,7);

    const ctx = document.getElementById('myChart');

    const listaNomeImpactCategory = listaOrdinata.map(function(element) {
        return element.impactCategory.name;
    });

    const listaQuantitaImpactCategory = listaOrdinata.map(function(element) {
        return element.amount;
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: listaNomeImpactCategory.slice(0,7),
        datasets: [{
            label: 'Impact method',
            data: listaQuantitaImpactCategory.slice(0,7),
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

    const divDiagram = document.getElementById(`diagram${num}`);
    if(divDiagram){
        divDiagram.innerHTML='';
        let canvas = document.createElement("canvas");
        canvas.id = "myChart"+num;
        divDiagram.appendChild(canvas);
    }

    let ctx = document.getElementById(`myChart${num}`);

    console.log(lista);

    let listaOrdinata = lista.filter(elemento => elemento.enviFlow.isInput === isInput && elemento.enviFlow.flow.category === categoria).sort((a, b) => b.amount - a.amount); 

    console.log(listaOrdinata);

    const listaNomi = listaOrdinata.slice(0,5).map(function(element) {
        return element.enviFlow.flow.name;
    });

    const listaQuantità = listaOrdinata.slice(0,5).map(function(element) {
        return element.amount;
    });

    console.log(listaNomi)
    console.log(listaQuantità);

    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: listaNomi,
        datasets: [{
            label: `Top 5 Flow per la categoria${categoria}`,
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