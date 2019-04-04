// Important libraries
let fs = require('fs-extra')

// Styling libraries
let chalk = require('chalk')
let _cliProgress = require('cli-progress')

// Res and its hadnelers
let Res = require('./lib/res').Res
let resHandlers = require('./lib/res').handlers

// Quicker programing variables
const info = console.info

class Glarce {
  constructor() {
    console.log('\x1Bc')
    info(chalk.cyan(
      `======================
        Glarce
  Web AR, Simplified
======================

`
    ))

    this.buildLength = 0
    this.getBuilds = []

    this.json = []
  }

  /**
   *  publicPath:
   *  Sets the path for production.
   *  app.set('publicPath', '/myPublicPath/')
   *
   *  devPublicPath:
   *  Sets the defult path for the development server
   *  app.set('devPublicPath', '/myDevPath/')
   *
   *  server:
   *  Sets up a server acording to the config you put in. Read the offical documentation on gitbooks
   *  app.set('server', confing)
   */
  set(input, variable) {
    switch (input) {
      case 'publicPath':
        if (process.env.production) process.env.publicPath = variable
        break
      case 'devPublicPath':
        if (!process.env.production) process.env.publicPath = variable
        break
      case 'server':
        this.server = variable
        break
      default:
        console.error(chalk.red.bold(`'${input}' is not a recognised set command`))
        break
    }
  }

  get(string, funct) {
    this.buildLength++

    this.getBuilds[this.getBuilds.length] = {
      string,
      funct
    }
  }

  build() {
    for (let i = 0; i < this.getBuilds.length; i++) {
      const build = this.getBuilds[i]

      resHandlers.increseIndex()
      build.funct(new Res(build.string))

      this.bar.update(i + 1)
    }
  }

  start() {
    this.bar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)
    this.bar.start(this.buildLength, 0)

    // Build
    this.build()

    // Grab json resHandeler
    this.json = resHandlers.getJSON()

    this.bar.stop()
    info('')

    // Set terminal commands
    let flags = 'serve --https'
    if (process.env.production) flags = 'build'

    info(chalk.green('Saving JSON'))
    fs.writeFileSync('./node_modules/Glarce/src/app.json', JSON.stringify(this.json))

    info('')

    if (process.env.production) {
      info(chalk.green('Running build!'))
    } else {
      info(chalk.red('Starting a dev server'))
      info(chalk.bold.red('DO NOT USE THIS FOR PRODUCTION'))
    }

    info('')
    let Vue = require('./node_modules/@vue/cli-service/lib/Service')
    let vue = new Vue(__dirname)

    vue.run(process.env.production ? 'build' : 'serve', {
      https: true
    })
      .then(() => {
        info('')
        info(chalk.green('Moving build files to ./dist/'))
        if (process.env.production === 'build') {
          fs.move('./node_modules/Glarce/dist', './dist/', {
            overwrite: true
          }, err => {
            if (err) return console.error(chalk.bold.red(err))
          })
        }
        if (this.server)
          this.startServer()
      })
      .catch(err => {
        console.log(err)
        process.exit(1)
      })
  }

  /**
   * INTERNAL FUNCTION, DO NOT CALL
   * Cleans up memory and prepares server
   */
  startServer() {
    // ===============
    // Clean up memory
    // ===============

    delete this.bar
    delete this.buildLength
    delete this.getBuilds
    delete this.json

    fs = shell = _cliProgress = Res = resHandlers = null

    console.log('\x1Bc')
    info(chalk.green('Memory cleared'))

    // ============
    // Start server
    // ============
    const Ws = require('./lib/webServer')

    this.server = new Ws(this.server)
  }
}

module.exports = Glarce
