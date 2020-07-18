const Game = require("./Game.js")

const game = new Game("oi", "gal")
//game.insert(0)
game.insert(5) // p1
game.insert(5) // p2
game.insert(5) // p1
game.insert(5) // 4, player 2
game.insert(4) // p1
game.insert(4) // p2
game.insert(3) // p1
game.insert(4) // p2
game.insert(0) // p1
//game.insert(3)
game.insert(0)
game.insert(1) // p2
game.insert(3) // p1
game.insert(2) // p2



console.log(game)
console.log(game.checkDiagonalLeft())