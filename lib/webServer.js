// TODO: HTTPS Suport
// TODO: Implement it into Glarce class

// Import server modules
const http = require('http')
const https = require('https')

// Styling
const chalk = require('chalk')

// Other server stuff
const selfsigned = require('selfsigned')

const createServer = require('./webServer/createServer')

class WebServer {

	/**
   * Basic, mimimalistic webserver that runs the server system.
   * Currently in dev. Not designed to be used outside of the Glarce project
   * @param {object}
   */
	constructor(config) {
		// Ensure that config exists
		if (!config)
			throw new Error(chalk.red.bold('Config must exist'))

		/**
     * Server Port
     */
		this.port = this.secure ? 80 : 443
		if (config.port) this.port = config.port
		console.log(`Server is starting on port ${this.secure ? 'http' : 'https'}://localhost:${this.port}/`)

		/**
     * If it is running in HTTPS mode or not
     */
		this.secure = false
		if (config.secure) {
			this.secure = config.secure

			if (this.key) {

				/** Private key for the web server */
				this.key = config.key

				/** Web server certificate */
				this.cert = config.cert
			} else {
				// Generate self singed certificate
				const pems = selfsigned.generate(
					{
						name: 'commonName',
						value: 'localhost'
					},
					{
						days: 365
					})

				this.key = pems.private
				this.cert = pems.cert
			}
			this.createHTTPS()
		} else {
			this.createHTTP()
		}
	}

	/** HTTP server */
	createHTTP() {
		//Intialize server
		this.server = http.createServer(createServer())

		// Start server
		this.server.listen(this.port)
	}

	/** HTTPS server */
	createHTTPS() {
		//Intialize server
		this.server = https.createServer(
			{
				key: this.key,
				cert: this.cert
			}, createServer())

		// Start server
		this.server.listen(this.port)
	}
}

module.exports = WebServer