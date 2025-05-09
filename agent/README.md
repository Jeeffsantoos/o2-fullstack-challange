# Agent

Coloque aqui as instruções para inicializar o agente de IA

caso a saiida do build do docker seja 127 rode esse comando

jefferson@jefferson-GL503VM:~/Projetos/o2-fullstack-challange/agent$ sudo docker build -t o2-challange:dev .

sed -i 's/\r$//' script.sh
# ou
tr -d '\r' < script.sh > script_unix.sh && mv script_unix.sh script.sh

sudo docker run -d -p 11434:11434 --name o2-challange o2-challange:dev

