const { GoogleGenerativeAI } = require('@google/generative-ai');

async function inicializaModelo(modelo) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = await genAI.getGenerativeModel({ model: modelo });
  return model;
}

module.exports = inicializaModelo;
