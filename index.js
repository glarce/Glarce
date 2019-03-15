var fs = require('fs-extra');
var json = [
{}];
var shell = require("shelljs")

const Res = require('./lib/res').Res
const resHandlers = require('./lib/res').handlers

module.exports = class Glarce
{
  set(input, variable)
  {
    switch (input) {
      case "publicPath":
        if(process.env.production) process.env.publicPath = variable
        break;
      case "devPublicPath":
        if(!process.env.production) process.env.publicPath = variable
      default:
        break;
    }
  }

  get(string, funct)
  {
    resHandlers.increseIndex()
    funct(new Res(string))
  }

  start()
  {
    json = resHandlers.getJSON()

    var production;
    if (process.env.production) production = "build"
    else production = "serve --https"

    console.log(JSON.stringify(json))
    fs.writeFile('./node_modules/Glarce/src/app.json', JSON.stringify(json), 'utf8', (err) =>
    {
      if (err) throw err;
      console.log('The file has been saved!');
      shell.exec(`node ./node_modules/@vue/cli-service/bin/vue-cli-service ${production}`,
      {
        cwd: "node_modules/Glarce"
      })
      fs.move('./node_modules/Glarce/dist', './dist/',
      {
        overwrite: true
      }, err =>
      {
        if (err) return console.error(err);
      });
    });
  }
}