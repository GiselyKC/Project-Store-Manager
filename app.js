const express = require('express');
require('express-async-errors'); 
const middlewareErrors = require('./middlewares/error');

const app = express();
const router = require('./router');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// o 'express.json' permite que a nossa API consiga enxergar o body com obj.json
app.use(express.json());
app.use('/', router);
app.use(middlewareErrors);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
