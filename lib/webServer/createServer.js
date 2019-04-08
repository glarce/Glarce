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

	res.writeHead(statusCode,
		{
			'Content-Type': mimeType
		})

	if (statusCode === 200)
		res.end(fs.readFileSync(loc.path))
	else {
		console.error(chalk.red.bold(`${loc.path}: ${statusCode}`))
		if (fs.existsSync(path.normalize(`${__dirname}/../../../dist/${statusCode}.html`))) {
			res.end(fs.readFileSync(path.normalize(`${__dirname}/../../../dist/${statusCode}.html`)))
			console.info(chalk.yellow.bold(`Served up ${statusCode} error page.`))
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

	// If a file wasn't specified
	if (path.extname(url) === '') {
		if (url.slice(-1) === '/')
			loc = `${url}index.html`
		else
			loc = `${url}/index.html`
	}
	// If a file was specifed
	else
		loc = url

	// Make path be a real path on the file system
	loc = path.normalize(`${__dirname}/../../../dist${loc}`)

	return {
		path: loc,
		exits: fs.existsSync(loc)
	}
}

module.exports = httpServer