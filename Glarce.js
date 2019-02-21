var fs = require('fs-extra');
var json = [];
var index = 0;
var shell = require("shelljs")
const symlinkDir = require('symlink-dir')
module.exports = function Glarce() {
  this.set = function(input, variable) {}
  this.get = function(string, funct) {
    index = index + 1
    funct(new res(string))
  }
  this.start = function() {
    console.log(JSON.stringify(json))
    symlinkDir('media', 'node_modules/Glarce/public/media')
      .then(result => {
        console.log(result)
        //> { reused: false }

        return symlinkDir('media', 'node_modules/Glarce/public/media')
      })
      .then(result => {
        console.log(result)
        //> { reused: true }
      })
      .catch(err => console.error(err))
    fs.writeFile('./node_modules/Glarce/src/app.json', JSON.stringify(json), 'utf8', (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
      shell.exec("node ./node_modules/@vue/cli-service/bin/vue-cli-service build", {
        cwd: "node_modules/Glarce"
      })
      fs.move('./node_modules/Glarce/dist', './dist/', {
        overwrite: true
      }, err => {
        if (err) return console.error(err);
      });
    });



  }
}

function res(key) {
  this.send = function(string, params = null) {
    var newJson = {}
    if (isNaN(key)) {
      console.log("Barcodes only")
    } else {
      newJson.scanType = "barcode"
      newJson.scan = key
    }
    if ("videos" == getType(string)) {
      newJson.contentType = "videos"
      newJson.videoData = {}
      newJson.videoData.id = index
      newJson.videoData.url = string
      newJson.videoData.extension = getFileExtension(string)
      if (params != null) {
        if (params.height != null) newJson.videoData.height = params.height
        else params.height = 16 / 9
        if (params.width != null) newJson.videoData.width = params.width;
        else params.width = 9 / 3;
      } else {
        newJson.videoData.height = 16 / 9
        newJson.videoData.width = 9 / 3
      }
    }
    json.push(newJson)
  }
}

function getType(string) {
  var x = string.search("/")
  return string.slice(0, x)
}

function getFileExtension(string) {
  var x = string.match(/\.[0-9a-z]+$/i)
  var x = x.toString()
  return (x.slice(1))
}