
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

    compareDate(data) {
        if (data && data != '') {
            // Convertendo as strings de data para objetos Date
            const dataConcurso = new Date(data);
            const dataAtual = new Date(this.getDate());            
            return dataAtual > dataConcurso;
        }
        return true;
    }

}

module.exports = Commons