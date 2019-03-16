// TODO: Basic Webserver
// TODO: HTTPS Suport
// TODO: Implement it into Glarce class

// Import server modules
const http = require('http')

// Import other node modules
const fs = require('fs')
const path = require('path')

// File types
const types JSON.parse(fs.readFileSync('./mime.json'))

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
   * The function that is called in the http.createServer().
   */
  createServer(req, res) {
    // Convert https://trac.nginx.org/nginx/browser/nginx/conf/mime.types to json (https://jsfiddle.net/g3p1sarq/55/)
  }
}

module.exports = WebServer;