# Connect4
Small package to easily make connect 4 games in your project.

# Connect4 Jogo
![Connect4 Gameplay](https://upload.wikimedia.org/wikipedia/commons/a/ad/Connect_Four.gif)

Connect 4 is a two-player [connection](https://en.wikipedia.org/wiki/Connection_game) [board game](https://en.wikipedia.org/wiki/Board_game), in which the player choose a colorand then take turns dropping colored discs into a seven-column, six-row vertically suspended grid. **The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs.**
[Read more in Wikipedia](https://en.wikipedia.org/wiki/Connect_Four)

## Sumary

- [Install](#Install)
- [Examples]#Examples)
- [Contributors](#Contributors)

## Install
With [npm](https://npmjs.org/)
```
npm install git+https://github.com/Guaxinim5573/connect4.git
```

## Examples

```js
const {Game} = require("connect-4")
const game = new Game("player 1 name", "player 2 name")

game.insert(0) // Player 1 put a disk in first column
game.insert(6) // Player 2 put a disk in the last column
game.insert(5) // Player 1 put a disk in the 6th column
game.currentPlayer // Player: {name: "player 2 name", id: 1, game: game}

const valid = game.insert(9) // Player 1 make a invalid move
if(!valid) {
	// Invalid move
}
game.status // IN_PROGRESS, TIE, WIN
game.winner // Who won the game, if there's a winner
game.board // Game board
```

# Contributors
**Guaxinim**

<img src="https://img.shields.io/static/v1?label=&message=Guaxinim%232753&logo=discord&style=flat&color=blue&logoColor=white">
<a target="_blank" href="https://github.com/Guaxinim5573"><img src="https://img.shields.io/static/v1?label=Follow&message=Guaxinim5573&logo=github&style=social"></a>



**5antos**

<img src="https://img.shields.io/static/v1?label=&message=5antos%234876&logo=discord&style=flat&color=blue&logoColor=white">
<a target="_blank" href="https://github.com/5antos"><img src="https://img.shields.io/static/v1?label=Follow&message=5antos&logo=github&style=social"></a>
