const symlinkDir = require('symlink-dir')
const
{
  readdirSync
} = require('fs')
const
{
  normalize
} = require('path')

const chalk = require('chalk')

const getDirectories = source =>
  readdirSync(source).map(name => name)

function getType(string)
{
  const x = string.search('/')
  return string.slice(0, x)
}

function getFileExtension(string)
{
  return (string.match(/\.[0-9a-z]+$/i).toString().slice(1))
}

function linkMediaFolder()
{
  const dirs = getDirectories('./media/')

  for (let i = 0; i < dirs.length; i++)
  {
    symlinkDir(normalize(`${__dirname}/../../../media/${dirs[i]}`), normalize(`${__dirname}/../public/${dirs[i]}`))
      .then(() =>
        (
          symlinkDir(normalize(`${__dirname}/../../../media/${dirs[i]}`), normalize(`${__dirname}/../public/${dirs[i]}`))
        ))
      .catch(err => console.error(chalk.bold.red(err)))
  }
}

function symlink(dir)
{
  symlinkDir(dir, `node_modules/Glarce/public/${dir}`)
    .then(() =>
      (
        symlinkDir(dir, `node_modules/Glarce/public/${dir}`)
      ))
    .catch(err => console.error(chalk.bold.red(err)))
}

module.exports = {
  getType,
  getFileExtension,
  linkMediaFolder,
  symlink
}