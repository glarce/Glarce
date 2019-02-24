const func = require('./functions')

let json = []
var index = 0

class Res
{
  constructor(key)
  {
    this.key = key

    this.newJson = {}
  }

  interactivity(parmas)
  {
    let interactive = []

    const keys = Object.keys(parmas)
    const xLength = keys.length
    for (let i = 0; i < xLength; i++)
    {
      let object = parmas[keys[i]]
      object.sec = Number(keys[i])
      object.executed = false
      // generate unique id
      object.id = Number(index.toString() + i.toString())

      interactive[i] = object
    }

    this.newJson.interactive = interactive
  }

  send(string, params = null)
  {
    if (isNaN(this.key))
    {
      console.log("Barcodes only")
    }
    else
    {
      this.newJson.scanType = "barcode"
      this.newJson.scan = this.key
    }

    if ("videos" == func.getType(string))
    {
      func.linkMediaFolder("videos")

      this.newJson.contentType = "video"
      this.newJson.videoData = {
        id: index,
        url: string,
        extension: func.getFileExtension(string)
      }

      if (this.newJson.interactive != undefined)
      {
        this.newJson.videoData.interactive = this.newJson.interactive
        delete this.newJson.interactive
      }

      if (params != null)
      {
        if (params.height != null) this.newJson.videoData.height = params.height
        else params.height = 16 / 3
        if (params.width != null) this.newJson.videoData.width = params.width;
        else params.width = 9 / 3
      }
      else
      {
        this.newJson.videoData.height = 16 / 3
        this.newJson.videoData.width = 9 / 3
      }
    }
    else if ("notify" == func.getType(string))
    {
      console.log("Notify")
      let notify = string.slice(func.getType(string).length + 1)
      console.log(notify)
      if ("alert" == func.getType(notify))
      {
        let notify = func.getFileExtension("alert")
        console.log(notify)
        this.newJson.contentType = "notify"
        this.newJson.notificationData = {}
        this.newJson.notificationData.action = "alert"
        this.newJson.notificationData.content = notify
      }
    }
    json.push(this.newJson)
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
  Res: Res,
  handlers:
  {
    getJSON: getJSON,
    increseIndex: increseIndex
  }
};