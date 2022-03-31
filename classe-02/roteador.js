const express = require('express');
const { obterLocalizacao } = require('./src/controladores/localizacao');

const roteador = express();

roteador.post('/votacao/:pais/:ip', obterLocalizacao);

module.exports = roteador;