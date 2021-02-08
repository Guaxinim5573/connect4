/**
 * A Connect 4 player
 * @class
 */
class Player {
	/**
	 * @param {String} name Player's name
	 * @param {Game} game Player's game
	 * @param {Number} id Player's id
	 */
	constructor(name, game, id) {
		this.name = name
		this.game = game
		this.id = id
	}
}

module.exports = Player