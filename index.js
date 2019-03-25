// Important libraries
let fs = require('fs-extra')
let shell = require('shelljs')

// Styling libraries
let chalk = require('chalk')
let _cliProgress = require('cli-progress')

// Res and its hadnelers
let Res = require('./lib/res').Res
let resHandlers = require('./lib/res').handlers

// Quicker programing variables
const info = console.info

// Assume that it is not a test
let isTest = true
let testResult = 'noop'
class Glarce {
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
      case 'test':
        this.test_name = variable
        isTest = false
        console.log(chalk.yellow(`Running test "${variable}"`))
        break
      default:
        console.error(chalk.red.bold(`'${input}' is not a recognised set command`))
        break
    }
  }
  constructor() {
    this.buildLength = 0
    this.getBuilds = []

    this.json = []
    console.log(process.env.test)
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

      isTest && this.bar.update(i + 1)
    }
  }

  start() {
    isTest && console.log('\x1Bc')
    isTest && info(chalk.cyan(
      `======================
        Glarce
  Web AR, Simplified
======================

`
    ))
    this.bar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)
    isTest && this.bar.start(this.buildLength, 0)
    // Build
    this.build()

    // Grab json resHandeler
    this.json = resHandlers.getJSON()

    isTest && this.bar.stop()
    info('')

    isTest && info(chalk.green('Saving JSON' + isTest))
    fs.writeFileSync('./node_modules/Glarce/src/app.json', JSON.stringify(this.json))
    info('')

    if (process.env.production) {
      isTest && info(chalk.green('Running build!'))
    } else {
      isTest && info(chalk.red('Starting a dev server'))
      isTest && info(chalk.bold.red('DO NOT USE THIS FOR PRODUCTION'))
    }

    info('')

    let Vue = require('./node_modules/@vue/cli-service/lib/Service')

    let vue = new Vue(__dirname)

    vue.run(process.env.production ? 'build' : 'serve', {
        https: true
      })
      .then(() => {
        info('')
        isTest && info(chalk.green('Moving build files to ./dist/'))
        fs.move('./node_modules/Glarce/dist', `./${isTest ? '' : this.test_name + '/'}dist/`, {
          overwrite: true
        }, err => {
          if (err) return console.error(chalk.bold.red(err))
        })

        if (this.server)
          this.startServer()
        if (!isTest) testResult = true
      })
      .catch(err => {
        console.log(err)
        if (isTest) process.exit(1)
        else testResult = false
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

    fs, shell, _cliProgress, Res, resHandlers = null

    console.log('\x1Bc')
    isTest && info(chalk.green('Memory cleared'))

    // ============
    // Start server
    // ============
    const Ws = require('./lib/webServer')

    this.server = new Ws(this.server)
  }
  async getTestResults() {
    var wait = ms => new Promise((r, j) => setTimeout(r, ms))
    let check = async () => {
      await wait(2000)

      if (testResult === 'noop') await check()
      else return testResult
    }
    await check()
    return testResult
  }
}

module.exports = Glarce