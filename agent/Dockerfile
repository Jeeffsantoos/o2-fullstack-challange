FROM  ollama/ollama:latest

COPY ./script.sh /tmp/script.sh

WORKDIR /tmp

RUN chmod +x script.sh
RUN ./script.sh

EXPOSE 11434
