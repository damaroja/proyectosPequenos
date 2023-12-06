



document.addEventListener('DOMContentLoaded', async function() {
    const cryptos = await recibirCriptomonedas();
    mostrarCriptomonedas(cryptos);
})


async function recibirCriptomonedas() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    const data = await fetch(url)
    const respuesta = await data.json();
    return respuesta.Data;     
}

function mostrarCriptomonedas(cryptos) {
    limpiaHTML();
    cryptos.forEach(cripto => {
        const name = cripto.CoinInfo.FullName;
        const price = cripto.DISPLAY.USD.PRICE
        const priceChange = cripto.DISPLAY.USD.CHANGEDAY
        const priceChangePct = cripto.DISPLAY.USD.CHANGEPCTDAY
        const lastUpdate = cripto.DISPLAY.USD.LASTUPDATE
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdPrice = document.createElement('td');
        const tdPriceChange = document.createElement('td');
        const tdPriceChangePct = document.createElement('td');
        const tdLastUpdate = document.createElement('td');
        tdName.textContent = name;
        tdPrice.textContent = price;
        tdPriceChange.textContent = priceChange;
        tdPriceChangePct.textContent = priceChangePct;
        tdLastUpdate.textContent = lastUpdate;
        const button = document.createElement('button');
        button.textContent = 'Ver más';
        button.classList.add('btn', 'btn-primary');
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#exampleModal');
        button.addEventListener('click', () => {
            const modalBody = document.querySelector('#modalBody');
            modalBody.innerHTML = `More information about ${name} ...`
        })
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tr.appendChild(tdPriceChange);
        tr.appendChild(tdPriceChangePct);
        tr.appendChild(tdLastUpdate);
        tr.appendChild(button);
        document.getElementById('table-body').appendChild(tr);
    });
}

function limpiaHTML() {
    const tableBody = document.getElementById('table-body');
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}


setInterval(async () => {
    const cryptos = await recibirCriptomonedas();
    mostrarCriptomonedas(cryptos);
}, 60000);
