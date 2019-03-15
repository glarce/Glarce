// Important libraries
const fs = require('fs-extra')
const shell = require('shelljs')

// Styling libraries
const chalk = require('chalk')
const _cliProgress = require('cli-progress')

// Res and its hadnelers
const Res = require('./lib/res').Res
const resHandlers = require('./lib/res').handlers

// Quicker programing variables
const info = console.info

class Glarce
{
  constructor()
  {
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

  set(input, variable)
  {
    switch (input)
    {
      case 'publicPath':
        if (process.env.production) process.env.publicPath = variable
        break
      case 'devPublicPath':
        if (!process.env.production) process.env.publicPath = variable
        break
      default:
        break
    }
  }

  get(string, funct)
  {
    this.buildLength++

    this.getBuilds[this.getBuilds.length] = {
      string,
      funct
    }
  }

  build()
  {
    for (let i = 0; i < this.getBuilds.length; i++)
    {
      const build = this.getBuilds[i]

      resHandlers.increseIndex()
      build.funct(new Res(build.string))

      this.bar.update(i + 1)
    }
  }

  start()
  {
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

    if (process.env.production)
    {
      info(chalk.green('Running build!'))
    }
    else
    {
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
    }, err =>
    {
      if (err) return console.error(chalk.bold.red(err))
    })
  }
}

module.exports = Glarce