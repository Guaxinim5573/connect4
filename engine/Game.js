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
	 * @param {Object} user1 Player 1 full info
	 * @param {String} player2 Player 2 name
	 * @param {Object} user2 Player 2 full info
	 */
	constructor(player1, user1, player2, user2) {
		this.players = [new Player(player1, user1, this, 0), new Player(player2, user2, this, 1)]
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
		this.columns = new Array(7).fill(0)

		/**
		 * Status do jogo
		 * IN_PROGRESS, TIE, WIN
		 */
		this.status = "IN_PROGRESS"

		/** Quantas jogadas já foram feitas */
		this.plays = 0

		this.winner = null
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
		if(this.columns[column] >= 6) return false
		if(this.status !== "IN_PROGRESS") return false
		const index = (6 - this.columns[column]) * 7 - (7 - column)
		this.board[index] = this.currentPlayer.id
		this.columns[column]++
		this.plays++

		const winner = this.checkWinner()
		if(winner) {
			this.status = "WIN"
			this.winner = this.players[winner]
		}
		if(this.plays >= 42 && !winner) {
			this.status = "TIE"
		}
		return true
	}

	checkWinner() {
		const horizontal = this.checkHorizontal()
		if(horizontal) return horizontal
		const vertical = this.checkVertical()
		if(vertical) return vertical
		const diagonalLeft = this.checkDiagonalLeft()
		if(diagonalLeft) return diagonalLeft
		const diagonalRight = this.checkDiagonalRight()
		if(diagonalRight) return diagonalRight

		return null
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