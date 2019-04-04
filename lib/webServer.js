// TODO: HTTPS Suport
// TODO: Implement it into Glarce class

// Import server modules
const http = require('http')
const https = require('https')

// Import other node modules
const fs = require('fs')
const path = require('path')

// Styling
const chalk = require('chalk')

// Other server stuff
const mime = require('mime-types')
const selfsigned = require('selfsigned')


class WebServer
{

  /**
   * Basic, mimimalistic webserver that runs the server system.
   * Currently in dev. Not designed to be used outside of the Glarce project
   * @param {object}
   */
  constructor(config)
  {
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
    if (config.secure)
    {
      this.secure = config.secure

      if (this.key)
      {

        /**
         * Private key for the web server
         */
        this.key = config.key

        /**
         * Web server certificate
         */
        this.cert = config.cert
      }
      else
      {
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
    }
    else
    {
      this.createHTTP()
    }
  }

  createHTTP()
  {

    /**
     * HTTP server
     */
    this.server = http.createServer(this.createServer.bind(this))

    // Start server
    this.server.listen(this.port)
  }

  createHTTPS()
  {

    /**
     * HTTPS server
     */
    this.server = https.createServer(
    {
      key: this.key,
      cert: this.cert
    }, this.createServer.bind(this))

    // Start server
    this.server.listen(this.port)
  }

  // ================
  //  SERVER BACKEND
  // ================

  /**
   * DO NOT CALL OUT SIDE OF THE WebServer CLASS
   * The function that is called in http.createServer()
   */
  createServer(req, res)
  {
    const loc = this.getPath(req.url)

    // ================
    // Status Managment
    // ================

    // Mime Type
    let mimeType = mime.lookup(path.extname(loc.path).substr(1))

    const check = this.checks(loc, mimeType)
    const statusCode = check.status
    mimeType = check.type

    res.writeHead(statusCode,
    {
      'Content-Type': mimeType
    })

    if (statusCode === 200)
      res.end(fs.readFileSync(loc.path))
    else
    {
      console.error(chalk.red.bold(`${loc.path}: ${statusCode}`))
      if (fs.existsSync(`${__dirname}/../../../dist/${statusCode}.html`))
      {
        res.end(fs.readFileSync(`${__dirname}/../../../dist/${statusCode}.html`))
        console.info(chalk.yellow.bold(`Served up ${statusCode} error page.`))
      }
      else
      {
        res.end(`Error: ${statusCode}`)
      }
    }
  }

  checks(loc, mime)
  {
    let statusCode = 200
    let mimeType = mime

    // Make sure that the file exists
    if (!loc.exits)
    {
      statusCode = 404
      mimeType = 'text/html'
    }

    // If the mime type doesn't exist
    if (!mimeType)
    {
      // Throw internal server error
      statusCode = 500
      mimeType = 'text/html'
    }

    return {
      status: statusCode,
      mime: mimeType
    }
  }

  /**
   * INTERNAL FUNCTRION. DO NOT CALL
   * Generates path based on the request
   */
  getPath(url)
  {
    // File path
    let loc

    // If a file wasn't specified
    if (path.extname(url) === '')
    {
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