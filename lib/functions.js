const symlinkDir = require('symlink-dir')

const chalk = require('chalk')

function getType(string)
{
  const x = string.search('/')
  return string.slice(0, x)
}

function getFileExtension(string)
{
  return (string.match(/\.[0-9a-z]+$/i).toString().slice(1))
}

function linkMediaFolder(media)
{
  symlinkDir(`media/${media}`, `node_modules/Glarce/public/${media}`)
    .then(result =>
    {
      return symlinkDir(`media/${media}`, `node_modules/Glarce/public/${media}`)
    })
    .catch(err => console.error(err))
}

function symlink(dir)
{
  symlinkDir(dir, 'node_modules/Glarce/public/' + dir)
    .then(result =>
    {
      return symlinkDir(dir, `node_modules/Glarce/public/${dir}`)
    })
    .catch(err => console.error(chalk.bold.red(err)))
}

module.exports = {
  getType,
  getFileExtension,
  linkMediaFolder,
  symlink
}