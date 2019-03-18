// TODO: HTTPS Suport
// TODO: Implement it into Glarce class

// Import server modules
const http = require('http')

// Import other node modules
const fs = require('fs')
const path = require('path')

// Styling
const chalk = require('chalk')

const mime = require('mime-types')


class WebServer {
  constructor(config) {
    // Ensure that config exists
    if (!config)
      console.error(chalk.red.bold('Config must exist'))

    /**
     * Server Port
     */
    this.port = 80
    if (config.port) this.port = config.port

    /**
     * If it is running in HTTPS mode or not
     */
    this.secure = false
    if (config.secrue) this.secure = config.secrue

    /**
     * HTTP server
     */
    this.server = http.createServer(this.createServer.bind(this))

    // Start server
    this.server.listen(this.port)
  }

  /**
   * DO NOT CALL OUT SIDE OF THE WebServer CLASS
   * The function that is called in http.createServer()
   */
  createServer(req, res) {
    let loc = this.getPath(req.url)

    // ================
    // Status Managment
    // ================

    // Status code
    let statusCode = 200

    // Mime Type
    let mimeType = mime.lookup(path.extname(loc.path).substr(1))

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

    res.writeHead(statusCode, {
      'Content-Type': mimeType
    })

    if (statusCode === 200)
      res.end(fs.readFileSync(loc.path))
    else
      console.error(chalk.red.bold(`${loc.path}: ${statusCode}`))
    if (fs.existsSync(`${__dirname}/../../../dist/${statusCode}.html`)) {
      res.end(fs.readFileSync(`${__dirname}/../../../dist/${statusCode}.html`))
      console.info(chalk.yellow.bold(`Served up ${statusCode} error page.`))
    }
  }

  /**
   * INTERNAL FUNCTRION. DO NOT CALL
   * Generates path based on the request
   */
  getPath(url) {
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
}

module.exports = WebServer