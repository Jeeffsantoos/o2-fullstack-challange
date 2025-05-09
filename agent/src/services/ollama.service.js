const db = require('../config/database');
const OLLAMA_URL = 'http://localhost:11434/api/chat';

async function askOllama(question) {
  const SYSTEM_PROMPT = `
Você é uma assistente de IA especializada em gerar consultas SQL para um banco de dados relacional MySQL.

A estrutura do banco de dados é a seguinte:

Tabelas e colunas:

1. products (Produtos no estoque e suas quantidades disponíveis)
  - id (int, PK)
  - name (varchar)
  - description (text)
  - available_quantity (int)
  - unit_price (decimal)
  - category (varchar)
  - created_at (datetime)

2. sales (vendas que contêm informações sobre valor e dia)
  - id (int, PK)
  - sale_date (datetime)
  - total_value (decimal)

3. sale_items (informações sobre quais itens foram vendidos)
  - id (int, PK)
  - sale_id (int, FK → sales.id)
  - product_id (int, FK → products.id)
  - quantity (int)
  - unit_price (decimal)

4. stock_movements (movimentações de entrada e de saída no estoque)
  - id (int, PK)
  - product_id (int, FK → products.id)
  - type (enum: 'in', 'out')
  - quantity (int)
  - movement_date (datetime)

Relacionamentos:

- sale_items.sale_id → sales.id
- sale_items.product_id → products.id
- stock_movements.product_id → products.id

Instruções:

1. Analise a pergunta do usuário e identifique as informações desejadas.
2. Gere apenas a consulta SQL correspondente, com base nas tabelas e colunas disponíveis.
3. Não retorne explicações ou comentários — apenas a SQL pura.
`;

  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    body: JSON.stringify({
      model: "llama2",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Pergunta: ${question}` }
      ],
      stream: false
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  function extractSQLQueries(text) {
    const regex = /(?:SELECT|INSERT|UPDATE|DELETE)[\s\S]+?;/gi;
    const matches = text.match(regex);
    return matches
      ? matches.map(q => q.replace(/\s+/g, ' ').trim())
      : [];
  }

  const queries = extractSQLQueries(data.message.content);

  if (!queries.length) {
    return { answer: 'Não foi possível obter a sua resposta!' };
  }


  const connection = await db.connect();

  const [results] = await connection.query(queries[0]);

  const explainPrompt = `
Você é uma assistente que gera respostas em português com base em resultados de consultas SQL.

Pergunta original do usuário: "${question}"
Resultado da consulta: ${JSON.stringify(results)}

Gere uma resposta amigável e compreensível para o usuário final, explicando o resultado de forma clara e direta. Não mostre a SQL nem repita a estrutura JSON.
`;

  const explainRes = await fetch(OLLAMA_URL, {
    method: 'POST',
    body: JSON.stringify({
      model: "llama2",
      messages: [
        { role: "user", content: explainPrompt }
      ],
      stream: false
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!explainRes.ok) {
    return { answer: 'Não foi possível obter a sua resposta!' };
  }

  const explainData = await explainRes.json();
  const answer = explainData.message.content.trim();

  return { answer: answer };
}

module.exports = {
  askOllama
};
