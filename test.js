const Game = require("./Game.js")

const game = new Game("oi", "gal")
game.insert(1)
game.insert(2)
game.insert(1)
game.insert(3)
game.insert(1)
game.insert(2)
game.insert(1)


console.log(game)
console.log(game.checkVertical())