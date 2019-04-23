const Image = require('./image')

class Imgae360 extends Image {
	constructor(id) {
		super(id)

		this.type = 'img360'
	}
}

module.exports = Imgae360