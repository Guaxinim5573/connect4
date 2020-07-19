/**
 * Representa um jogador
 * @class
 */
class Player {
	/**
	 * @param {String} name Nome do jogador
	 * @param {Game} game Game que o jogador está jogando
	 * @param {Number} id Player id
	 */
	constructor(name, game, id) {
		this.name = name
		this.game = game
		this.id = id
	}
}

module.exports = Player