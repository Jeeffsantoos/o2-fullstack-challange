const { Router } = require('express');
const { ollamaController } = require('../../../../controllers/ollama.controller');

const routes = Router();

routes.post('/ollama/ask', ollamaController.askOllamaController);

routes.get('/status', (request, response) => {
    return response.status(200).json({
        message: 'Welcome to o2-challange agent',
        version: 'v1.0.0',
        status: 'Server is ok.',
    });
});
module.exports = routes ;

