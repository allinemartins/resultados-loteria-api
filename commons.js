
class Commons {

    getDate(date = null) {
        const dataAtual = date ? new Date(date) : new Date();
        const dia = dataAtual.getDate();
        const mes = dataAtual.getMonth() + 1; // Lembrando que os meses são indexados de 0 a 11
        const ano = dataAtual.getFullYear();

        // Formatando para o formato "YYYY-MM-DD"
        const dataFormatada = `${ano}-${mes}-${dia}`;
        return dataFormatada;
    }

    formateDate(date) {
        const partsDate = date.split("/");
        return partsDate[2] + "-" + partsDate[1] + "-" + partsDate[0];
    }

}

module.exports = Commons