const mime = require('mime-types')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

/** Creates the http server */
const httpServer = (req, res) => {
	const location = getURIPath(req.url)

	// ================
	// Status Managment
	// ================

	let mimeType = mime.lookup(path.extname(location.path).substr(1))

	const check = checkServerParams(location, mimeType)
	const statusCode = check.status
	mimeType = check.type

	res.writeHead(statusCode, {
		'Content-Type': mimeType
	})

	if (statusCode === 200) res.end(fs.readFileSync(location.path))
	else {
		// eslint-disable-next-line no-console
		console.warn(chalk.red.bold(`${location.path}: ${statusCode}`))
		if (
			fs.existsSync(
				path.normalize(`${__dirname}/../../../dist/${statusCode}.html`)
			)
		) {
			res.end(
				fs.readFileSync(
					path.normalize(`${__dirname}/../../../dist/${statusCode}.html`)
				)
			)
			// eslint-disable-next-line no-console
			console.warn(chalk.yellow.bold(`Served up ${statusCode} error page.`))
		} else {
			res.end(`Error: ${statusCode}`)
		}
	}
}

const checkServerParams = (location, mime) => {
	let statusCode = 200
	let mimeType = mime

	// Make sure that the file exists
	if (!location.exits) {
		statusCode = 404
		mimeType = 'text/html'
	}

	if (!mimeType) {
		statusCode = 500
		mimeType = 'text/html'
	}

	return {
		status: statusCode,
		mime: mimeType
	}
}

const getURIPath = url => {
	let location

	// If a file was specified provide them it.
	if (path.extname(url) !== '') {
		location = url
	} else {
		// Otherwise give them the index.html at the location in the file tree.
		location = url.slice(-1) === '/' ? `${url}index.html` : `${url}/index.html`
	}

	// Make path be a real path on the file system
	location = path.normalize(`${__dirname}/../../../dist${location}`)

	return {
		path: location,
		exits: fs.existsSync(location)
	}
}

module.exports = httpServer
