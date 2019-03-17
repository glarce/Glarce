// TODO: HTTPS Suport
// TODO: Implement it into Glarce class

// Import server modules
const http = require('http')

// Import other node modules
const fs = require('fs')
const path = require('path')

// Styling
const chalk = require('chalk')

// File types
let types = {};

// Type genorater contained to save memory
{
  // Raw JSON
  const json = JSON.parse(fs.readFileSync(`${__dirname}/mime.json`))

  for (var i = 0; i < json.length; i++) {
    // File type that we are dealing with
    const type = json[i]
    // Extentions that come under this type
    const typeEx = type.extentions

    for (var b = 0; b < typeEx.length; b++) {
      types[typeEx[b]] = type.mime
    }
  }
}

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
    // Convert https://trac.nginx.org/nginx/browser/nginx/conf/mime.types to json (https://jsfiddle.net/g3p1sarq/55/)

    let loc = this.getPath(req.url)

    // ================
    // Status Managment
    // ================

    // Status code
    let statusCode = 200

    // Mime Type
    let mime = types[path.extname(loc.path).substr(1)]

    // Make sure that the file exists
    if (!loc.exits) {
      statusCode = 404
      mime = 'text/html'
    }

    // If the mime type doesn't exist
    if (!mime) {
      // Throw internal server error
      statusCode = 500
      mime = 'text/html'
    }

    res.writeHead(statusCode, {
      'Content-Type': mime
    })

    if (statusCode != 200)
      console.error(chalk.red.bold(`${loc.path}: ${statusCode}`))

    if (statusCode === 200)
      res.end(fs.readFileSync(loc.path))
    else
      res.end(`Error: ${statusCode}`)
  }

  /**
   * INTERNAL FUNCTRION. DO NOT CALL
   * Generates path based on the request
   */
  getPath(url) {
    // File path
    let loc

    // If a file wasn't specified
    if (path.extname(url) == '') {
      if (url.slice(-1) == '/')
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

module.exports = WebServer;