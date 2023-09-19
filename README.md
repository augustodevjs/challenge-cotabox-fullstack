# Desafio FullStack com Vue.js, Nest.js e Graphql.

<h1><img width="100%" src="./frontend/src//shared/assets/image-01.png"></h1>
<h1><img width="100%" src="./frontend/src//shared/assets/image-02.png"></h1>
<h1><img width="100%" src="./frontend/src//shared/assets/image-03.png"></h1>
<h1><img width="100%" src="./frontend/src//shared/assets/image-04.png"></h1>
<h1><img width="100%" src="./frontend/src//shared/assets/image-05.png"></h1>
<h1><img width="100%" src="./frontend/src//shared/assets/image-06.png"></h1>

## Como rodar o projeto:

### Entre no diretório do backend

```
$ cd ./backend

crie um arquivo .env e copie os dados do .env.example para esse arquivo
```

### Rode o comando do docker

```
$ docker compose up --build

Certifique-se que a porta 5432 na sua máquina está liberada. Após isso entre na url -- localhost:3000/graphql para vê o playground do grahql.
```

### Rode o comando para caso queira vê os testes unitários

```
$ npm run test
```

### Entre no diretório do frontend

```
$ cd ./frontend
```

### Instale as dependências do node_modules

```
$ npm install
```

### Rode o projeto

```
$ npm run serve

Entre na url -- localhost:8080
```
