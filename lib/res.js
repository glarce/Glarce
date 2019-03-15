const func = require('./functions')

let json = []
var index = 0

class Res {
  constructor(key) {
    this.key = key

    this.newJson = {}
  }

  interactivity(parmas) {
    let interactive = []

    const keys = Object.keys(parmas)
    const xLength = keys.length
    for (let i = 0; i < xLength; i++) {
      let object = parmas[keys[i]]
      object.sec = Number(keys[i])
      object.executed = false
      // generate unique id
      object.id = Number(index.toString() + i.toString())

      interactive[i] = object
    }

    this.newJson.interactive = interactive
  }

  send(string, params = null) {
    if (isNaN(this.key)) {
      console.error(chalk.bold.red(`${index}: Barcodes only`))
    }
    else {
      this.newJson.scanType = 'barcode'
      this.newJson.scan = this.key
    }

    let isVid = false

    if (string.constructor === Array) {
      isVid = "videos" === func.getType(string[0])
    }
    else {
      isVid = 'videos' === func.getType(string)
    }

    if (isVid) {
      func.linkMediaFolder('videos')

      this.newJson.contentType = 'video'
      this.newJson.videoData = {
        id: index
      }

      this.newJson.videoData.vids = []

      if (string.constructor === Array) {
        for (var i = 0; i < string.length; i++) {
          this.newJson.videoData.vids[i] = {
            url: string[i],
            extension: func.getFileExtension(string[i])
          }
        }
      }
      else {
        this.newJson.videoData.vids[0] = {
          url: string,
          extension: func.getFileExtension(string)
        }
      }

      if (typeof this.newJson.interactive !== 'undefined') {
        this.newJson.videoData.interactive = this.newJson.interactive
        delete this.newJson.interactive
      }


      if (params != null) {
        if (params.height != null) this.newJson.videoData.height = params.height
        else params.height = 9 / 3
        if (params.width != null) this.newJson.videoData.width = params.width
        else params.width = 16 / 3
      }
      else {
        this.newJson.videoData.height = 9 / 3
        this.newJson.videoData.width = 16 / 3
      }
    }

    json.push(this.newJson)
  }
}

function getJSON() {
  return json
}

function increseIndex() {
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