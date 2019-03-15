const symlinkDir = require('symlink-dir')

const chalk = require('chalk')

function getType(string)
{
  var x = string.search("/")
  return string.slice(0, x)
}

function getFileExtension(string)
{
  var x = string.match(/\.[0-9a-z]+$/i)
  var x = x.toString()
  return (x.slice(1))
}

function linkMediaFolder(media)
{
  symlinkDir('media/' + media, 'node_modules/Glarce/public/' + media)
    .then(result =>
    {
      //> { reused: false }

      return symlinkDir('media/' + media, 'node_modules/Glarce/public/' + media)
    })
    .then(result =>
    {
      //> { reused: true }
    })
    .catch(err => console.error(err))
}

function symlink(dir)
{
  symlinkDir(dir, 'node_modules/Glarce/public/' + dir)
    .then(result =>
    {
      return symlinkDir(dir, 'node_modules/Glarce/public/' + dir)
    })
    .then(result =>
    {})
    .catch(err => console.error(chalk.bold.red(err)))
}

module.exports = {
  getType: getType,
  getFileExtension: getFileExtension,
  linkMediaFolder: linkMediaFolder,
  symlink: symlink
};