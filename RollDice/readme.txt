


Este proyecto tiene como particularidad el uso de flex con la propiedad 
justify-content: space-between, el uso de css normal y el uso de caracteres 
de dados, como por ejemplo: 

  const dado = {
    '1': '⚀',
    '2': '⚁',
    '3': '⚂',
    '4': '⚃',
    '5': '⚄',
    '6': '⚅'
}


Mencion especia tenemos con la funcion getStadistics que cuebta 
la cantidad de veces que cada cara sale

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


