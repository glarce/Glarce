const mime = require('mime-types')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

/** Creates the http server */
const httpServer = (req, res) => {
	const loc = getURIPath(req.url)

	// ================
	// Status Managment
	// ================

	// Mime Type
	let mimeType = mime.lookup(path.extname(loc.path).substr(1))

	const check = checkServerParams(loc, mimeType)
	const statusCode = check.status
	mimeType = check.type

	res.writeHead(statusCode, {
		'Content-Type': mimeType
	})

	if (statusCode === 200) res.end(fs.readFileSync(loc.path))
	else {
		// eslint-disable-next-line no-console
		console.warn(chalk.red.bold(`${loc.path}: ${statusCode}`))
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

const checkServerParams = (loc, mime) => {
	let statusCode = 200
	let mimeType = mime

	// Make sure that the file exists
	if (!loc.exits) {
		statusCode = 404
		mimeType = 'text/html'
	}

	// If the mime type doesn't exist
	if (!mimeType) {
		// Throw internal server error
		statusCode = 500
		mimeType = 'text/html'
	}

	return {
		status: statusCode,
		mime: mimeType
	}
}

const getURIPath = url => {
	// File path
	let loc

	// If a file was specified provide them it.
	if (path.extname(url) !== '') {
		loc = url
	} else {
		// Otherwise give them the index.html at the location in the file tree.
		loc = url.slice(-1) === '/' ? `${url}index.html` : `${url}/index.html`
	}

	// Make path be a real path on the file system
	loc = path.normalize(`${__dirname}/../../../dist${loc}`)

	return {
		path: loc,
		exits: fs.existsSync(loc)
	}
}

module.exports = httpServer
