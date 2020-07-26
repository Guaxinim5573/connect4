# Connect4
Código para evento do servidor de Discord LabNegro.
Esta é a dependência criada especialmente para o bot funcionar.

# Connect4 Jogo
![Connect4 Gameplay](https://upload.wikimedia.org/wikipedia/commons/a/ad/Connect_Four.gif)

Connect Four é um [jogo de conexão](https://pt.qwe.wiki/wiki/Connection_game) de 2 jogadores onde os jogadores colocam uma peça em uma das 7 colunas, onde o objetivo é **conectar quatro de suas peças em uma linha, evitando o seu adversário de fazer o mesmo.**

## Sumário

- [Instalação](#Instalação)
- [Exemplos](#Exemplos)
 - [Contribuidores](#Contribuidores)

## Instalação
Com [npm](https://npmjs.org/)
```
npm install git+https://github.com/Guaxinim5573/connect4.git
```

## Exemplos

```js
const {Game} = require("connect-4")
const game = new Game("player 1 name", "player 2 name")

game.insert(0) // Player 1 coloca peça na primeira coluna
game.insert(6) // Player 2 coloca peça na ultima coluna
game.insert(5) // Player 1 coloca peça na sexta coluna
game.currentPlayer // Player: {name: "player 2 name", id: 1, game: game}

const valid = game.insert(9) // Player 1 tenta colocar peça na décima coluna
if(!valid) {
	// Jogada inválida
}
game.status // IN_PROGRESS, TIE, WIN
game.winner // Quem ganhou o jogo, se alguém tiver ganho
game.board // Retorna o quadro do jogo
```

# Contribuidores
**Guaxinim**

<img src="https://img.shields.io/static/v1?label=&message=Guaxinim%232753&logo=discord&style=flat&color=blue&logoColor=white">
<a target="_blank" href="https://github.com/Guaxinim5573"><img src="https://img.shields.io/static/v1?label=Follow&message=Guaxinim5573&logo=github&style=social"></a>



**5antos**

<img src="https://img.shields.io/static/v1?label=&message=5antos%234876&logo=discord&style=flat&color=blue&logoColor=white">
<a target="_blank" href="https://github.com/5antos"><img src="https://img.shields.io/static/v1?label=Follow&message=5antos&logo=github&style=social"></a>
