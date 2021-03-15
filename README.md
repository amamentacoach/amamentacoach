<h1 align="center">
  👶 AmamentaCoach 🍼
</h1>

<h4 align="center">
  <i>O Coach para amamentação do prematuro.</i><br>
</h4>

<h4 align="center">
  O AmamentaCoach foi pensado para auxiliar mães na desafiadora jornada de amamentar um bebê prematuro.
</h4>

<div align="center">
  <h4>
    <a href="#requisitos">Requisitos</a> |
    <a href="#ambiente-de-desenvolvimento">Ambiente de desenvolvimento</a> |
    <a href="https://github.com/joao-alex/amamentacoach/releases">Releases</a> |
    <a href="#participantes">Participantes</a>
  </h4>
</div>

## Requisitos

Para funcionar corretamente, você vai precisar:
- [Node.js](nodejs.org) (versão 12.14.x ou mais recente)
- [Yarn](https://yarnpkg.com/) (versão 1.22.4 ou mais recente) opcional
- [React Native CLI](https://reactnative.dev/) (versão 0.63)

## Ambiente de desenvolvimento

Realize o clone do repositório em algum diretório de preferencia:
```
git clone https://github.com/joao-alex/amamentacoach.git
```
Depois de clonado o repositório, para executar o backend digite:
```
cd ./backend
npm install ou yarn install
npm run dev ou yarn dev
```
Para executar o aplicativo digite:
```
cd ./mobile
npm install ou yarn install
react-native run-android
```

## Executando com Docker Compose
1. Clone o repositório
2. Declare as variáveis de ambiente necessárias no arquivo "**database.config**", seguindo o formato especificado no arquivo "database.config.example". 
3. Execute
```
docker-compose up
```

## Participantes

