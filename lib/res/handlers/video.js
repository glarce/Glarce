const func = require('../../functions')
const chalk = require('chalk')

let vids = []
let interactiveCounter = 0
let index = 0

class Videos
{
  constructor(_index)
  {
    index = _index
    this.newJson = []
  }

  getLocalFuncs()
  {
    return ['build', 'interactivity', 'loadVids', 'setDefualtValues']
  }

  build()
  {
    this.setDefualtValues()

    for (let i = 0; i < vids.length; i++)
    {
      this.newJson.videoData.vids[i] = {
        url: vids[i],
        extension: func.getFileExtension(vids[i])
      }
    }

    if (typeof this.newJson.interactive !== 'undefined')
    {
      this.newJson.videoData.interactive = this.newJson.interactive
      delete this.newJson.interactive
    }
  }

  setDefualtValues()
  {
    this.newJson.contentType = 'video'
    this.newJson.videoData = {
      id: index,
      vids: [],
      height: 9 / 3,
      width: 16 / 3
    }

    // Change parameters if they exist
    if (this.params.height) this.newJson.videoData.height = this.params.height
    if (this.params.width) this.newJson.videoData.width = this.params.width
  }

  interactivity(params)
  {
    // Check if it is a video
    if (this.type !== 'video') throw new Error(chalk.bold.red(`\n${this.key}: Interactivity is only available to the video class. You can use the video class by using ${chalk.cyan('res.type(\'video\')')}`))

    // Declares the interactive object
    const interactive = []

    Object.keys(params).forEach((item, _index) =>
    {
      const object = params[item]
      object.sec = Number(item)
      object.executed = false

      // generate unique id
      object.id = interactiveCounter++

      interactive[_index] = object
    })

    this.newJson.interactive = interactive
  }

  loadVids(arr)
  {
    if (arr.constructor !== Array)
    {
      throw new Error(chalk.bold.red(`${this.key}: Adding videos as string is not allowed, please put it in an array`))
    }
    vids = arr
  }

}

module.exports = Videos