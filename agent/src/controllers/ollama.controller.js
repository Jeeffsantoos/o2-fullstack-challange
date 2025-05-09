const { askOllama } = require('../services/ollama.service');

async function askOllamaController(req, res, next) {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const ollamaResponse = await askOllama(question);

    res.status(200).json(ollamaResponse);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  ollamaController: {
    askOllamaController,
  },
};
