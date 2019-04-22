//Import libaries
const chalk = require('chalk'),
	func = require('./functions')	
 

/** This is the json object that holds the Glarce app settings */
const json = []

let index = 1

class Res {
	constructor(key) {
		this.key = key
		this.newJson = {}

		this.handlers = func.getDirectories(`${__dirname}/res/handlers/`)
		this.handlers.forEach((item, index) => {
			this.handlers[index] = item.slice(0, -3)
		})
	}

	/** Set the type of media you are adding */
	type(type) {
		this.type = type.toLowerCase()

		// Link functions for the appropriate type

		this.handlers.forEach(item => {
			// Compares the handlers name without it's extension to "type"
			if (item === this.type) {
				const Handler = require(`${__dirname}/res/handlers/${item}.js`)
				const handle = new Handler(index)
				const localFuncs = handle.getLocalFuncs()

				// Adds functions from the handler to the local scope
				localFuncs.forEach(item => {
					this[item] = handle[item]
				})
			}
		})
	}

	// ---------------------------------------------------------------------------
	// Compilation

	/**
   * Loads vids
   */

	send() {
		this.checkTypes()
		// Makes sure there is a barcode specified
		this.addBarcode()

		this.newJson.id = index

		this.build()

		// Append newJson to the overall package
		json.push(this.newJson)

		index++
	}

	params(params) {
		this.params = params
	}

	checkTypes() {
		if (!this.type)
			throw new Error(
				chalk.bold.red(
					`${
						this.key
					}: You must set a media type before calling send(). You can do this by using ${chalk.cyan(
						'res.type(type)'
					)}`
				)
			)
		else this.checkTypesIsValid()
	}

	checkTypesIsValid() {
		let typeIsValid = false
		this.handlers.forEach(item => {
			if (item === this.type) typeIsValid = true
		})

		if (!typeIsValid)
			throw new Error(
				chalk.bold.red(
					`${this.key}: ${chalk.cyan(this.type)} is not a valid type`
				)
			)
	}

	addBarcode() {
		if (isNaN(this.key))
			throw new Error(
				chalk.bold.red(
					`${index}: No barcode key was set. Set it using the first paramater of app.get`
				)
			)
		else {
			this.newJson.scanType = 'barcode'
			this.newJson.scan = this.key
		}
	}
}

/** Returns JSON only available in this scope */
function getJSON() {
	return json
}

module.exports = {
	Res,
	handlers: {
		getJSON
	}
}
