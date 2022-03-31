const axios = require('axios');
const fs = require('fs/promises');

const obterEmpresa = async (req, res) => {
    const { dominioEmpresas } = req.params;

    const apiKey = 'f8e63e54325246df82ccbd12966df19e';

    try {
        const respostaEmpresa = await axios.get(`https://companyenrichment.abstractapi.com/v1/?api_key=${apiKey}&domain=${dominioEmpresas}`);

        if (respostaEmpresa.data.name) {
            const empresasArmazenadas = JSON.parse(await fs.readFile('./src/dados/empresas.json'));
            empresasArmazenadas.push(respostaEmpresa.data);
            fs.writeFile('./src/dados/empresas.json', JSON.stringify(empresasArmazenadas, null, 2));
        }

        res.send(respostaEmpresa.data).json();
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    obterEmpresa
}