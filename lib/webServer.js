// TODO: Basic Webserver
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
  const json = JSON.parse(fs.readFileSync('./mime.json'))

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
    this.server = http.createServer(this.createServer)
  }

  /**
   * DO NOT CALL OUT SIDE OF THE WebServer CLASS
   * The function that is called in http.createServer()
   */
  createServer(req, res) {
    // Convert https://trac.nginx.org/nginx/browser/nginx/conf/mime.types to json (https://jsfiddle.net/g3p1sarq/55/)

    let loc = this.getPath(res)

    // ================
    // Status Managment
    // ================

    // Status code
    let statusCode = 200

    // Mime Type
    let mime = types[path.extname(req.url)]

    if (!loc.exits) {
      statusCode = 404
      mime = 'text/html'
    }

    if (!mime) {
      statusCode = 500
      mime = 'text/html'
    }

    res.writeHead(stausCode, {
      'Content-Type': mime
    })

    if (statusCode != 200)
      console.error(chalk.red.bold(`${path}: ${statusCode}`))

    res.end(fs.readFileSync(loc))
  }

  /**
   * INTERNAL FUNCTRION. DO NOT CALL
   * Generates path based on the request
   */
  getPath(req) {
    // File path
    let loc

    // If a file wasn't specified
    if (path.extname(req.url) == '') {
      if (req.url.slice(-1) == '/')
        loc = `${req.url}index.html`
      else
        loc = `${req.url}/index.html`
    }
    // If a file was specifed
    else
      loc = req.url

    // Make path be a real path on the file system
    if (loc.charAt(0) == '/')
      loc = `./dist${loc}`
    else
      loc = `./dist/${loc}`

    return {
      path: loc,
      exits: fs.existsSync(loc)
    }
  }
}

module.exports = WebServer;