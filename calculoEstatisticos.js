
module.exports.calcularDadosEstatisticos = function (sorteios, objetoEstatistico) {
    sorteios.sort((a, b) => b.concurso - a.concurso);
    let frequencias = objetoEstatistico;
    setDadosEstatisticos(frequencias);
    getFrequenciaUltimoSorteioAtraso(sorteios, frequencias);
    getMaiorGapeUltimasFrequencia(sorteios, frequencias);
    return frequencias;
}

function getFrequenciaUltimoSorteioAtraso(sorteios, frequencias) {
    let lastSorteio = sorteios[0].concurso;
    sorteios.forEach((sorteio) => {        
        sorteio.dezenas.forEach((numero) => {
            frequencias[numero].sorteado++;
            frequencias[numero].ultimoSorteio = setUltimo(frequencias[numero].ultimoSorteio, sorteio.concurso);
            frequencias[numero].atrasado = getAtraso(lastSorteio, frequencias[numero].ultimoSorteio);
        });
    });
}

function setDadosEstatisticos(frequencias) {
    for (let numero in frequencias) {
        frequencias[numero].sorteado = 0;
        frequencias[numero].atrasado = 0;
        frequencias[numero].ultimoSorteio = 0;
        frequencias[numero].maiorGape = 0;
        frequencias[numero].maiorFrequencia = 0;
        frequencias[numero].ultimaFrequencia = 0;
    }
}

function getMaiorGapeUltimasFrequencia(sorteios, frequencias) {
    for (let numero in frequencias) {
        const intervalos = calcularIntervalos(sorteios, Number(numero));
        frequencias[numero].maiorGape = intervalos[0];
        frequencias[numero].maiorFrequencia = intervalos[1];
        frequencias[numero].ultimaFrequencia = intervalos[2];
    }
}

function setUltimo(ultimoSorteio, sorteioAtual) {
    if (sorteioAtual > ultimoSorteio) {
        return sorteioAtual;
    }
    return ultimoSorteio;
}

function getAtraso(lastSorteio, sorteioAtual) {
    return lastSorteio - sorteioAtual;
}

function calcularIntervalos(sorteios, numero) {
    let maiorIntervalo = 0;
    let ultimaAparicao = -1;

    let maiorFrequenciaConsecutiva = 0;
    let frequenciaConsecutiva = 0;

    let ultimaFrequencia = 0;
    

    sorteios.forEach((lista, index) => {
        if (lista["dezenas"].includes(numero)) {

            ultimaFrequencia = ultimaFrequenciaNumber(sorteios, numero);

            const intervalo = index - ultimaAparicao;
            if (intervalo > maiorIntervalo) {
                maiorIntervalo = intervalo;
            }
            ultimaAparicao = index;

            frequenciaConsecutiva++;
            if (frequenciaConsecutiva > maiorFrequenciaConsecutiva) {
                maiorFrequenciaConsecutiva = frequenciaConsecutiva;
            }

        } else {
            frequenciaConsecutiva = 0;
        }
    });

    return [maiorIntervalo, maiorFrequenciaConsecutiva, ultimaFrequencia];
}

function ultimaFrequenciaNumber(sorteios, numero) {
    let contagem = 0;

    for (let i =  0; i < sorteios.length; i++) {
        const lista = sorteios[i];

        if (lista["dezenas"].includes(numero)) {
            contagem++;
        } else {
            break; // Interrompe a contagem se o número não estiver presente
        }
    }

    return contagem;
}
