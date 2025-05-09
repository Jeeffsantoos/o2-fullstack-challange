# Agent

## Inicialização do Agente de IA

Para inicializar o agente de IA, siga as instruções abaixo:

1.  **Construção da Imagem Docker:**
    Execute o seguinte comando na raiz do projeto para construir a imagem Docker:

    ```bash
    docker build -t o2-challange:dev .
    ```

2.  **Tratamento de Erro de Build (Código 127):**
    Caso a saída do comando `docker build` seja o código de erro `127`, execute os seguintes comandos para corrigir possíveis problemas de formatação no arquivo `script.sh`:

    ```bash
    sed -i 's/\r$//' script.sh
    ```
    Ou, alternativamente:
    ```bash
    tr -d '\r' < script.sh > script_unix.sh && mv script_unix.sh script.sh
    ```
    Esses comandos removem caracteres de fim de linha do tipo Windows (`\r`) que podem causar problemas em ambientes Linux.

3.  **Execução do Contêiner Docker:**
    Após a construção bem-sucedida da imagem, execute o seguinte comando para iniciar o contêiner Docker em segundo plano:

    ```bash
    sudo docker run -d -p 11434:11434 --name o2-challange o2-challange:dev
    ```
    Este comando mapeia a porta `11434` do contêiner para a porta `11434` da sua máquina local, permitindo o acesso ao agente.

## Variáveis de Ambiente

As seguintes variáveis de ambiente podem ser configuradas para o agente:

    ```bash
      DB_PORT=3306
      DB_USER=admin
      DB_HOST=localhost
      DB_PASSWORD=123
      DB_NAME=o2-challange
    ```

## Explicação das Rotas da API

Este arquivo define duas rotas para a sua aplicação utilizando o framework Express.js. Vamos detalhar cada uma delas:

**1. `POST api/v1/ollama/ask`**

* **Método HTTP:** `POST`
* **Endpoint:** `/ollama/ask`
* **Handler:** `ollamaController.askOllamaController`
* **Body:** `"question": "string"`
