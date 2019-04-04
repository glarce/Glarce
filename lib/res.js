const func = require('./functions')
const chalk = require('chalk')
const fs = require('fs-extra')

const json = []

let index, interactiveIndex

index = 1
interactiveIndex = 1

class Res
{
  constructor(key)
  {
    // Set the barcode id to key
    this.key = key
    // Declare newJson
    this.newJson = {}
    // Link this.js to this.javascript (functions)
    this.js = this.javascript
    // Add media types
    /**
     * All the media types
     * At the moment this is just to reduece wierd complation results that end without error, but in the future we may make this an easier way to insert build functions
     */
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
  }

  // ---------------------------------------------------------------------------
  // Video stuff

  /**
   * Loads vids
   */
  loadVids(arr)
  {
    if (arr.constructor !== Array)
    {
      throw new Error(chalk.bold.red(`${this.key}: Adding videos as string is no longer suported, put it in an array`))
    }

    this.vids = arr
  }

  params(params)
  {
    this.params = params
  }

  /**
   * Adding interactivity. For videos only
   */
  interactivity(parmas)
  {
    // Check if it is a video
    if (this.type !== 'video') throw new Error(chalk.bold.red(`\n${this.key}: Interactivity is only available to video. You can set it to a video by using ${chalk.cyan('res.type(\'video\')')}`))

    // Declares the interactive object
    const interactive = []

    const keys = Object.keys(parmas)
    for (let i = 0; i < keys.length; i++)
    {
      const object = parmas[keys[i]]
      object.sec = Number(keys[i])
      object.executed = false

      // generate unique id
      object.id = interactiveIndex
      interactiveIndex++

      interactive[i] = object
    }

    this.newJson.interactive = interactive
  }

  // ---------------------------------------------------------------------------
  // Aframe code

  /**
   * Checks if this.type === 'aframe'
   */
  isAframe()
  {
    if (this.type !== 'aframe') throw new Error(chalk.bold.red(`\n${this.key}: These functions are only available to aframe. You can set it to aframe by using ${chalk.cyan('res.type(\'aframe\')')}`))
  }

  /**
   * Add javascript to the build
   */
  javascript(js)
  {
    this.isAframe()

    this.aframejs = js
  }

  /**
   * Adds asset html to the build
   */
  assets(html)
  {
    this.isAframe()

    this.aframeAssets = String(html)
  }

  /**
   * Adds aframe code the the build
   */
  aframe(html)
  {
    this.isAframe()

    this.aframeHtml = String(html)
  }

  // ---------------------------------------------------------------------------
  // Build code

  send()
  {
    // Check if this.type is valid
    this.checkTypes()
    // Makes sure there is a barcode specified
    this.addBarcode()

    // Make sure that there is an id
    this.newJson.id = index

    // Build for videos if it is a video
    if (this.type === 'video')
      this.buildVideo()
    // Build for aframe if it is aframe
    else if (this.type === 'aframe')
      this.buildAframe()

    // Add this builds json to all of the json
    json.push(this.newJson)

    // Increment index
    index++
  }

  checkTypes()
  {
    if (!this.type) throw new Error(chalk.bold.red(`${this.key}: You must set a media type before calling send(). You can set it by using ${chalk.cyan('res.type(type)')}`))
    else this.checkTypesIsValid()
  }

  checkTypesIsValid()
  {
    let typeIsValid = false

    for (let i = 0; i < this.mediaTypes.length; i++)
    {
      if (this.mediaTypes[i] === this.type) typeIsValid = true
    }

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

  /**
   * INTERNAL FUNTION, DO NOT CALL
   * Builds for video media type
   */
  buildVideo()
  {
    this.newJson.contentType = 'video'
    this.newJson.videoData = {
      id: index,
      vids: []
    }

    for (let i = 0; i < this.vids.length; i++)
    {
      this.newJson.videoData.vids[i] = {
        url: this.vids[i],
        extension: func.getFileExtension(this.vids[i])
      }
    }

    if (typeof this.newJson.interactive !== 'undefined')
    {
      this.newJson.videoData.interactive = this.newJson.interactive
      delete this.newJson.interactive
    }

    this.buildVideoParameters()
  }

  buildVideoParameters()
  {
    // Set defults for params
    this.newJson.videoData.height = 9 / 3
    this.newJson.videoData.width = 16 / 3

    // Change parameters if they exist
    if (this.params.height) this.newJson.videoData.height = this.params.height
    if (this.params.width) this.newJson.videoData.width = this.params.width
  }

  /**
   * INTERNAL FUNTION, DO NOT CALL
   * Builds for video media type
   */
  buildAframe()
  {
    const UglifyJS = require('uglify-es')

    const rand = Math.floor((Math.random() * 999999) + 1)

    const js = UglifyJS.minify(`var aframeFuncton${rand}=${String(this.aframejs)};aframeFuncton${rand}()`,
    {
      toplevel: true
    })

    this.newJson.contentType = 'aframe'
    this.newJson.aframeData = {
      id: index,
      js: js.code,
      assets: this.aframeAssets,
      aframe: this.aframeHtml
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