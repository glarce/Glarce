const func = require('../../functions')
const chalk = require('chalk')

let vids = []
let interactiveCounter = 0
let index = 0

class Videos {
	constructor(_index) {
		index = _index
		this.newJson = []
	}

	getLocalFuncs() {
		return ['build', 'interactivity', 'loadVids', 'setDefaultValues']
	}

	build() {
		this.setDefaultValues()

		vids.forEach((item, index) => {
			this.newJson.videoData.vids[index] = {
				url: item,
				extension: func.getFileExtension(item)
			}
		})

		if (typeof this.newJson.interactive !== 'undefined') {
			this.newJson.videoData.interactive = this.newJson.interactive
			delete this.newJson.interactive
		}
	}

	setDefaultValues() {
		this.newJson.contentType = 'video'
		this.newJson.videoData = {
			id: index,
			vids: [],
			height: this.params.height || 9 / 3,
			width: this.params.width || 16 / 3
		}
	}

	interactivity(params) {
		// Check if it is a video
		if (this.type !== 'video') throw new Error(chalk.bold.red(`\n${this.key}: Interactivity is only available to the video class. You can use the video class by using ${chalk.cyan('res.type(\'video\')')}`))

		const interactive = []

		Object.keys(params).forEach((item, _index) => {
			const object = params[item]
			object.sec = Number(item)
			object.executed = false

			// Generate unique id
			object.id = interactiveCounter++

			interactive[_index] = object
		})

		this.newJson.interactive = interactive
	}

	loadVids(arr) {
		if (arr.constructor !== Array) {
			throw new Error(chalk.bold.red(`${this.key}: Adding videos as string is not allowed, please put it in an array`))
		}
		vids = arr
	}

}

module.exports = Videos