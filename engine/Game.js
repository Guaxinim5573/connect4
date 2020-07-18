const Player = require("./Player.js")

function splitArray(array, size) {
	const result = []
	for(let i = 0;i < array.length;i += size) {
		result.push(array.slice(i, i + size))
	}
	return result
}

/**
 * Uma classe que representa um jogo
 * @class
 */
class Game {
	/**
	 * @param {String} player1 Player 1 name
	 * @param {String} player2 Player 2 name
	 */
	constructor(player1, player2) {
		this.players = [new Player(player1, this, 0), new Player(player2, this, 1)]
		/** Quadro do jogo */
		this.board = new Array(42).fill(null)
		/*
			0   , 1   , 2   , 3   , 4   , 5   , 6
			7   , 8   , 9   , 10  , 11  , 12  , 13
			14  , 15  , 16  , 17  , 18  , 19  , 20
			21  , 22  , 23  , 24  , 25  , 26  , 27
			28  , 29  , 30  , 31  , 32  , 33  , 34
			35  , 36  , 37  , 38  , 39  , 40  , 41
		*/


		/** Quantas peças existe em cada coluna */
		this.columns = new Array(6).fill(0)

		/**
		 * Status do jogo
		 * IN_PROGRESS, TIE, WINNER
		 */
		this.status = "IN_PROGRESS"

		/** Quantas jogadas já foram feitas */
		this.plays = 0
	}

	get currentPlayer() {
		return (this.plays % 2 === 0) ? this.players[0] : this.players[1]
	}

	/**
	 * Coloca uma peça em alguma coluna
	 * @param {Number} column Número da coluna, começando do 0
	 * @returns {Boolean} Se a jogada é válida
	 */
	insert(column) {
		// Se a coluna já está cheia
		if(this.columns[column] >= 6) return false
		// Pega onde a peça ficará no quadro do jogo
		const index = (6 - this.columns[column]) * 7 - (7 - column)
		this.board[index] = this.currentPlayer.id
		this.columns[column]++
		this.plays++
		return true
	}

	checkHorizontal() {
		const array = splitArray(this.board, 7)
		for(let l = 0;l < array.length;l++) {
			const line = array[l]
			const previus = [null, null, null]
			for(let i = 0;i < line.length;i++) {
				const part = line[i]
				if(part === null) continue
				if(previus.every(p => p === part)) {
					return part
				}
				previus.pop()
				previus.unshift(part)
			}
		}
		return null
	}

	checkVertical() {
		const array = splitArray(this.board, 7)
		for(let i = 0;i < array.length;i++) {
			const line = array.map(e => e[i])
			const previus = [null, null, null]
			for(let i = 0;i < line.length;i++) {
				const part = line[i]
				//console.log(part)
				if(part === null) continue
				if(previus.every(p => p === part)) {
					return part
				}
				previus.pop()
				previus.unshift(part)
			}
		}
		return null
	}

	checkDiagonalRight() {
		const array = this.board
		for(let i = 0;i < array.length;i++) {
			const part = array[i]
			if(part === null) continue
			const nextParts = [this.board[i + 8], this.board[i + 16], this.board[i + 24]]
			if(nextParts.every(p => p === part)) {
				return part
			}
		}
		return null
	}

	checkDiagonalLeft() {
		const array = this.board
		for(let i = 0;i < array.length;i++) {
			const part = array[i]
			if(part === null) continue
			const nextParts = [this.board[i + 6], this.board[i + 12], this.board[i + 18]]
			if(nextParts.every(p => p === part)) {
				return part
			}
		}
		return null
	}
}
module.exports = Game