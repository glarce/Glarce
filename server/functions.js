const symlinkDir = require('symlink-dir')

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
      console.log(result)
      console.log("norm: { reused: false }");
      //> { reused: false }

      return symlinkDir('media/' + media, 'node_modules/Glarce/public/' + media)
    })
    .then(result =>
    {
      console.log(result)
      console.log("norm: { reused: true }");
      //> { reused: true }
    })
    .catch(err => console.error(err))
}

function symlink(dir)
{
  symlinkDir(dir, 'node_modules/Glarce/public/' + dir)
    .then(result =>
    {
      console.log(result)

      return symlinkDir(dir, 'node_modules/Glarce/public/' + dir)
    })
    .then(result =>
    {
      console.log(result)
    })
    .catch(err => console.error(err))
}

module.exports = {
  getType: getType,
  getFileExtension: getFileExtension,
  linkMediaFolder: linkMediaFolder,
  symlink: symlink
};