//Import libaries
const func = require('./functions'),
  chalk = require('chalk')

/**
 * This is the json object that holds the Glarce app settings
 */
const json = []

let index = 1

class Res
{
  constructor(key)
  {
    // Set the barcode id to key
    this.key = key
    // Declare newJson which will be added to "json"
    this.newJson = {}
    // Link this.js to this.javascript (functions)
    this.js = this.javascript
    // Add media types
    /**
     * All the media types
     * At the moment this is just to reduece weird compilation results that end without error, but in the future we may make this an easier way to insert build functions
     */
    this.handlers = func.getDirectories(`${__dirname}/res/handlers/`)
    this.mediaTypes = [
      'video',
      'aframe'
    ]
  }

  /**
   * Set the type of media you are adding
   */
  type(type)
  {
    this.type = type.toLowerCase()
    this.handlers.forEach(item =>
    {
      if (item.slice(0, -3) === this.type)
      {
        const Handler = require(`${__dirname}/res/handlers/${item}`)
        const handle = new Handler(index)
        const localFuncs = handle.getLocalFuncs()

        localFuncs.forEach(item =>
        {
          this[item] = handle[item]
        })
      }
    })
  }

  // ---------------------------------------------------------------------------
  // Video stuff

  /**
   * Loads vids
   */

  send()
  {
    // Check if this.type is valid
    this.checkTypes()
    // Makes sure there is a barcode specified
    this.addBarcode()

    // Make sure that there is an id
    this.newJson.id = index

    // Build the app
    this.build()

    // Add this builds json to all of the json
    json.push(this.newJson)

    // Increment index
    index++
  }
  params(params)
  {
    this.params = params
  }

  checkTypes()
  {
    if (!this.type) throw new Error(chalk.bold.red(`${this.key}: You must set a media type before calling send(). You can do this by using ${chalk.cyan('res.type(type)')}`))
    else this.checkTypesIsValid()
  }

  checkTypesIsValid()
  {
    let typeIsValid = false
    this.mediaTypes.forEach(item =>
    {
      if (item === this.type) typeIsValid = true
    })

    if (!typeIsValid) throw new Error(chalk.bold.red(`${this.key}: ${chalk.cyan(this.type)} is not a valid type`))
  }

  addBarcode()
  {
    if (isNaN(this.key))
      throw new Error(chalk.bold.red(`${index}: No barcode key was set. Set it using the first paramater of app.get`))

    else
    {
      this.newJson.scanType = 'barcode'
      this.newJson.scan = this.key
    }
  }
}

/**
 * Returns JSON only available in this scope
 */
function getJSON()
{
  return json
}

module.exports = {
  Res,
  handlers:
  {
    getJSON
  }
}