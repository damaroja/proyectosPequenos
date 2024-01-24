

/* Funciones de calculo de tiradas */

const dadoAleatorio = () => {
    return Math.floor(Math.random() * 6) + 1;
}

const dado = {
    '1': '⚀',
    '2': '⚁',
    '3': '⚂',
    '4': '⚃',
    '5': '⚄',
    '6': '⚅'
}

let results = new Array();

const btn = document.querySelector('#btn');
const dice = document.querySelector('#dice');
const data = document.querySelector('#data');
const resetBtn = document.querySelector('#resetBtn');
const tiradas = document.querySelector('#tiradas');
const estadisticasBtn = document.querySelector('#estadisticas');

document.addEventListener('DOMContentLoaded', () => {
    btn.addEventListener('click', () => {
        dice.textContent = dado[dadoAleatorio()];
        results.push(dice.textContent);
        mostrarResultados();
    });
    resetBtn.addEventListener('click', () => {
        results = [];
        mostrarResultados();
    });
}); 


/* Funciones de mostrar resultados */
const mostrarResultados = () => {
    if(results.length > 0) {
        data.innerHTML = '';
        results.forEach((result, index) => {
            data.innerHTML += `<li><span>Roll ${index}:</span>  <span>${result}</span></li>`;
        });
        tiradas.textContent = results.length;
        estadisticasBtn.textContent = JSON.stringify(getStadistics());
        return
    }
    data.innerHTML = '';
    return
}

const getStadistics = () => {
    let stadistics = {
        '⚀': 0,
        '⚁': 0,
        '⚂': 0,
        '⚃': 0,
        '⚄': 0,
        '⚅': 0
    }
    results.forEach(result => {
        stadistics[result]++;
    });
    return stadistics;
}









