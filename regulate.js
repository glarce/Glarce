/** 
 * This file is intended to allow certain parts of the program to be modified
 */
let memory = {
	letInfo: true,
	letWebInfo: true
}

/** This is a wrapper over console.info that must be used */
const info = (info) => {
	// eslint-disable-next-line no-console
	memory.letInfo && console.log(info)
}

const webInfo = (info) => {
	// eslint-disable-next-line no-console
	memory.letWebInfo && console.log(info)
}

const modify = (memType) => {
	memory[memType] = !memory[memType]
}

module.exports = {
	info,
	webInfo,
	memory,
	modify
}