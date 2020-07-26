const Player = require("./Player.js")

function splitArray(array, size) {
	const result = []
	for(let i = 0;i < array.length;i += size) {
		result.push(array.slice(i, i + size))
	}
	return result
}

game.board.map(p => {
	if(p === 1) return "A"
	else if(p === 0) return "B"
	else if(p === 2) {
		return emojis[game.winner.id]
	}
	else return "NOP"
})

/**
 * Uma classe que representa um jogo
 * @class
 */
class Game {
	/**
	 * @param {String} player1 Player 1 name
	 * @param {String} player2 Player 2 name
	 */
	constructor(player1, player2, options = {}) {
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
		this.columns = new Array(7).fill(0)

		/**
		 * Status do jogo
		 * IN_PROGRESS, TIE, WIN
		 */
		this.status = "IN_PROGRESS"

		/** Quantas jogadas já foram feitas */
		this.plays = 0

		/** Quem ganhou o jogo */
		this.winner = null

		/** Opções */
		this.options = options
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
		if(winner !== null) {
			this.status = "WIN"
			this.winner = this.players[winner]
		}
		if(this.plays >= 42 && winner === null) {
			this.status = "TIE"
		}
		return true
	}

	/**
	* Checa quem se alguém ganhou
	* @returns {?number} Quem ganhou
	*/
	checkWinner() {
		const horizontal = this.checkHorizontal()
		if(horizontal !== null) return horizontal
		const vertical = this.checkVertical()
		if(vertical !== null) return vertical
		const diagonalLeft = this.checkDiagonalLeft()
		if(diagonalLeft !== null) return diagonalLeft
		const diagonalRight = this.checkDiagonalRight()
		if(diagonalRight !== null) return diagonalRight

		return null
	}

	checkHorizontal() {
		const array = splitArray(this.board, 7)
		let index = 0
		for(let l = 0;l < array.length;l++) {
			const line = array[l]
			const previus = [null, null, null]
			for(let i = 0;i < line.length;i++) {
				index++
				const part = line[i]
				if(part === null) {
					previus.pop()
					previus.unshift(part)
					continue
				}
				if(previus.every(p => p === part)) {
					if(this.options.getWinnerLine) {
						this.board[index-1] = 2
						this.board[index-2] = 2
						this.board[index-3] = 2
						this.board[index-4] = 2
					}
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
			let index = 0 + (i * 1)
			const line = array.map(e => e[i])
			const previus = [null, null, null]
			for(let i = 0;i < line.length;i++) {
				index+=7
				const part = line[i]
				if(part === null) {
					previus.pop()
					previus.unshift(part)
					continue
				}
				if(previus.every(p => p === part)) {
					if(this.options.getWinnerLine) {
						this.board[index-7] = 2
						this.board[index-14] = 2
						this.board[index-21] = 2
						this.board[index-28] = 2
					}
					return part
				}
				previus.pop()
				previus.unshift(part)
			}
		}
		return null
	}

	checkDiagonalRight() {
		const array = splitArray(this.board, 7)
		for(let l = 0;l < array.length - 3;l++) {
			const line = array[l]
			let index = 0 + (l * 7)
			for(let i = 0;i < line.length - 3;i++) {
				index++
				const part = line[i]
				if(part === null) continue
				const others = [array[l+1][i+1], array[l+2][i+2], array[l+3][i+3]]
				if(others.every(p => p === part)) {
					if(this.options.getWinnerLine) {
						this.board[index-1] = 2
						this.board[index+7] = 2
						this.board[index+15] = 2
						this.board[index+23] = 2
					}
					return part
				}
			}
		}
		return null
	}


	checkDiagonalLeft() {
		const array = splitArray(this.board, 7)
		for(let l = 2;l >= 0;l--) {
			let index = 6 + (l * 7)
			const line = array[l]
			for(let i = line.length - 1;i >= 3;i--) {
				index--
				const part = line[i]
				if(part === null) continue
				const others = [array[l+1][i-1], array[l+2][i-2], array[l+3][i-3]]
				if(others.every(p => p === part)) {
					if(this.options.getWinnerLine) {
						this.board[index+1] = 2
						this.board[index+7] = 2
						this.board[index+13] = 2
						this.board[index+19] = 2
					}
					return part
				}
			}
		}
		return null
	}
}
module.exports = Game