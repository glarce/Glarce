const { readdirSync, ensureSymlinkSync } = require('fs-extra')
const { normalize } = require('path')

const getDirectories = source => readdirSync(source).map(name => name)

/** Gets the file extension of any givin string */
function getFileExtension(string) {
	return string
		.match(/\.[0-9a-z]+$/i)
		.toString()
		.slice(1)
}

function linkMediaFolder() {
	const dirs = getDirectories('./media/')

	dirs.forEach(item => {
		ensureSymlinkSync(
			normalize(`${__dirname}/../../../media/${item}`),
			normalize(`${__dirname}/../public/${item}`)
		)
	})
}

module.exports = {
	getFileExtension,
	linkMediaFolder,
	getDirectories
}
