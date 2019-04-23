const Image = require('./image')

class Image360 extends Image {
	constructor(id) {
		super(id)

		this.type = 'img360'
	}
}

module.exports = Image360