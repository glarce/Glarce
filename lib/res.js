//Import libaries
const chalk = require('chalk'),
	func = require('./functions')

/**
 * This is the json object that holds the Glarce app settings
 */
const json = []

let index = 1

class Res {
	constructor(key) {
		// Set the barcode id to key
		this.key = key
		// Declare newJson which will be added to "json"
		this.newJson = {}

		/**
     * All the media types
     * At the moment this is just to reduece weird compilation results that end without error, but in the future we may make this an easier way to insert build functions
     */
		this.handlers = func.getDirectories(`${__dirname}/res/handlers/`)
		this.mediaTypes = ['video', 'aframe']
	}

	/**
   * Set the type of media you are adding
   */
	type(type) {
		// Set type to the added type
		this.type = type.toLowerCase()

		// Add functions for type
		this.handlers.forEach(item => {
			// Gets compares the file to the type
			if (item.slice(0, -3) === this.type) {
				// Grab the type for the handeler
				const Handler = require(`${__dirname}/res/handlers/${item}`)
				// Create the handeler
				const handle = new Handler(index)
				// Ask the handeller for the functions it needs
				const localFuncs = handle.getLocalFuncs()

				// Adds said functions to this object
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
		// Check if this.type is valid
		this.checkTypes()
		// Makes sure there is a barcode specified
		this.addBarcode()

		// Make sure that there is an id
		this.newJson.id = index

		// Build the app
		this.build()

		// Add this builds json to all of the json
		json.push(this.newJson)

		// Increment index
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
		this.mediaTypes.forEach(item => {
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

/**
 * Returns JSON only available in this scope
 */
function getJSON() {
	return json
}

module.exports = {
	Res,
	handlers: {
		getJSON
	}
}
