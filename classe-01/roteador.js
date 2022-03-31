const express = require('express');
const { obterEmpresa } = require('./src/controladores/empresas');

const roteador = express();

roteador.get('/empresas/:dominioEmpresas', obterEmpresa);


module.exports = roteador;