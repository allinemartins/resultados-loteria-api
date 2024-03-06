const cron = require('node-cron');
const axios = require('axios');

const apiUrl = 'https://resultados-loteria-api.vercel.app/';


async function madeRequest(nmRequest) {
  const url = apiUrl+nmRequest;
  try {    
    const resposta = await axios.get(url);
    console.log('Request made with success:', resposta.data);
  } catch (erro) {
    console.error('Error in the made request:', `${erro.message} ${url}`);
  }
}

//Running every hour
cron.schedule('* * * * *', () => {  
  madeRequest('');
});

//Running every day at 10pm
cron.schedule('0 22 * * *', () => {
  madeRequest('updateData/lotoFacil');
});

//Running on Tuesdays, Thursdays and Saturdays at 22:30hrs
cron.schedule('30 22 * * 2,4,6', () => {
  madeRequest('updateData/megaSena');
});

//Running from Monday to Saturday at 11pm
cron.schedule('0 23 * * 1-6', () => {
  madeRequest('updateData/quina');
});