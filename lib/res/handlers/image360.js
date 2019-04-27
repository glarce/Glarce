const chalk = require('chalk')

const Image = require('./image')

/**
 * 360° image backend. Extends image
 */
class Image360 extends Image {
	constructor(id) {
		super(id)

		this.type = 'img360'
	}

	setSize() {
		throw Error(chalk.bold.red(`\n${this.id}: setSize is not used with 360° images`))
	}
}

module.exports = Image360