const axios = require('axios');
const { json } = require('express');
const fs = require('fs/promises');

const obterLocalizacao = async (req, res) => {
    const { pais, ip } = req.params;
    const { voto } = req.body;

    const apiKey = '58cafbe4558f425d8e8c731e3b26fbe0';

    try {
        const localizacao = await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}&ip_address=${ip}`);

        if (!localizacao.data.country) {
            return res.status(400).json("O IP informado não é valido");
        }

        if (pais === localizacao.data.country) {
            const votoValido = {
                ip: ip,
                voto: voto
            }

            const votosArmazenados = JSON.parse(await fs.readFile('./src/dados/votos.json'));
            votosArmazenados.push(votoValido);
            fs.writeFile('./src/dados/votos.json', JSON.stringify(votosArmazenados, null, 2));

            return res.status(200).json('Voto válido');
        }

        return res.status(400).json("O IP enviado não coincide com o país da votação");

    } catch (error) {
        return res.status(400).json(error.message);
    }

};

module.exports = {
    obterLocalizacao
}