// Important libraries
let fs = require('fs-extra')
let { normalize } = require('path')
let shell = require('shelljs')

// Styling libraries
let chalk = require('chalk')
let _cliProgress = require('cli-progress')

// Res and its hadnelers
let Res = require('./lib/res').Res
let resHandlers = require('./lib/res').handlers

// Fucntions
const funcs = require('./lib/functions')

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

    const dirs = funcs.getDirectories('./media/')

    dirs.forEach(item => {
      fs.ensureSymlinkSync(normalize(`${__dirname}/../../media/${item}`), normalize(`${__dirname}/public/${item}`))
    })

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
        throw new Error(chalk.red.bold(`'${input}' is not a recognised set command`))
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

      build.funct(new Res(build.string))

      this.bar.update(i + 1)
    }
  }

  start() {
    this.bar = new _cliProgress.Bar(
      {}, _cliProgress.Presets.shades_classic)
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
    }
    else {
      info(chalk.red('Starting a dev server'))
      info(chalk.bold.red('DO NOT USE THIS FOR PRODUCTION'))
    }

    info('')

    shell.exec(`node ./node_modules/@vue/cli-service/bin/vue-cli-service ${flags}`,
      {
        cwd: 'node_modules/Glarce'
      })

    info('')
    info(chalk.green('Moving build files to ./dist/'))
    fs.move('./node_modules/Glarce/dist', './dist/',
      {
        overwrite: true
      }, err => {
        if (err) throw new Error(chalk.bold.red(err))
      })

    if (this.server)
      this.startServer()
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