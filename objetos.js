module.exports.getObjetos = function () {
    const numeros = {};
    for (let i = 1; i <= 25; i++) {
        numeros[i.toString()] = {
            sorteados: Math.floor(Math.random() * 10), // Número aleatório de sorteios para exemplificar
            atraso: Math.floor(Math.random() * 10), // Atraso aleatório para exemplificar
            maiorIntervalo: Math.floor(Math.random() * 10), // Maior intervalo aleatório para exemplificar
            ultimoSorteio: Math.floor(Math.random() * (new Date().getFullYear() - 1990 + 1)) + 1990 // Último sorteio aleatório entre 1990 e ano atual
        };
    }
    return numeros;
}
