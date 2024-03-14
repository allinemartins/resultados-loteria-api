
class Commons {

    getDate(date = null) {
        if (!date) {
            const dataAtual = new Date();
            const dia = dataAtual.getDate();
            const mes = dataAtual.getMonth() + 1; // Lembrando que os meses são indexados de 0 a 11
            const ano = dataAtual.getFullYear();

            // Formatando para o formato "YYYY-MM-DD"
            const dataFormatada = `${ano}-${mes}-${dia}`;
            return dataFormatada;
        }
        return date;
    }

    formateDate(date) {
        const partsDate = date.split("/");
        return partsDate[2] + "-" + partsDate[1] + "-" + partsDate[0];
    }

    compareDate(data) {
        if (data && data != '') {
            // Convertendo as strings de data para objetos Date
            const dataConcurso = new Date(data);
            // Adicionando um dia para garantir que seja o final do dia
            dataConcurso.setDate(dataConcurso.getDate() + 1);
            // Ajustando a hora para o final do dia
            dataConcurso.setHours(0, 0, 0, 0);

            const dataAtual = new Date(this.getDate());
            // Ajustando a hora para o final do dia
            dataAtual.setHours(0, 0, 0, 0);
            return dataAtual > dataConcurso;
        }
        return true;
    }

}

module.exports = Commons