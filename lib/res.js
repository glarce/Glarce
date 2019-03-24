const func = require('./functions')
const chalk = require('chalk')

let json = []
let index = 0

class Res
{
  constructor(key)
  {
    this.key = key

    this.newJson = {}

    this.js = this.javascript
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
      console.error(chalk.bold.red(`${this.key}: Adding videos as string is no longer suported, put it in an array`))
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
    if (this.type != 'video') console.error(chalk.bold.red(`\n${this.key}: Interactivity is only available to video. You can set it to a video by using ${chalk.cyan('res.type(\'video\')')}`))

    const interactive = []

    const keys = Object.keys(parmas)
    for (let i = 0; i < keys.length; i++)
    {
      const object = parmas[keys[i]]
      object.sec = Number(keys[i])
      object.executed = false
      // generate unique id
      object.id = Number(index.toString() + i.toString())

      interactive[i] = object
    }

    this.newJson.interactive = interactive
  }

  // ---------------------------------------------------------------------------
  // Aframe code

  isAframe()
  {
    if (this.type != 'aframe') console.error(chalk.bold.red(`\n${this.key}: These functions are only available to aframe. You can set it to aframe by using ${chalk.cyan('res.type(\'aframe\')')}`))
  }

  javascript(js)
  {
    this.isAframe()

    this.aframejs = js
    console.log(js)
  }

  assets(html)
  {
    this.isAframe()

    this.aframeAssets = html
  }

  aframe(html)
  {
    this.isAframe()

    this.aframeHtml = html
  }

  // ---------------------------------------------------------------------------
  // Build code

  send()
  {
    if (!this.type) console.error(chalk.bold.red(`${this.key}: You must set a media type before calling send(). You can set it by using ${chalk.cyan('res.type(type)')}`))

    if (isNaN(this.key))
    {
      console.error(chalk.bold.red(`${index}: No barcode key was set. Set it using the first paramater of app.get`))
    }
    else
    {
      this.newJson.scanType = 'barcode'
      this.newJson.scan = this.key
    }

    if (this.type == 'video')
      this.buildVideo()
    else if (this.type == 'aframe')
      this.buildAframe()

    json.push(this.newJson)
  }

  /**
   * INTERNAL FUNTION, DO NOT CALL
   * Builds for video media type
   */
  buildVideo()
  {
    func.linkMediaFolder('videos')

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
    const rand = Math.floor((Math.random() * 999999) + 1)

    let js;

    js = UglifyJS.minify(`var aframeFuncton${rand}=${this.aframejs};aframeFuncton${rand}()`,
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

function getJSON()
{
  return json
}

function increseIndex()
{
  index += 1
}

module.exports = {
  Res,
  handlers:
  {
    getJSON,
    increseIndex
  }
}