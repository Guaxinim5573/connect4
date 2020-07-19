/**
 * Representa um jogador
 * @class
 */
class Player {
	/**
	 * @param {String} name Nome do jogador
	 * @param {Object} user Objeto contendo toda a informação do usuário
	 * @param {Game} game Game que o jogador está jogando
	 * @param {Number} id Player id
	 */
	constructor(name, user, game, id) {
		this.name = name
		this.user = user
		this.game = game
		this.id = id
	}
}

module.exports = Player