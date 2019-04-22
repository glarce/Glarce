const UglifyJS = require('uglify-es')

class Aframe {
	constructor(index) {
		this.index = index

		this.js = this.javascript
	}

	getLocalFuncs() {
		return ['build', 'javascript', 'js', 'assets', 'aframe']
	}

	build() {
		const rand = Math.floor((Math.random() * 999999) + 1)
		const js = UglifyJS.minify(`var aframeFuncton${rand}=${String(this.aframejs)};aframeFuncton${rand}()`,
			{
				toplevel: true
			})
		this.newJson.contentType = 'aframe'
		this.newJson.aframeData = {
			id: this.index,
			js: js.code,
			assets: this.aframeAssets,
			aframe: this.aframeHtml
		}
	}

	/** Add javascript to the build */
	javascript(js) {
		this.aframejs = js
	}
  
	/** Adds asset html to the build */
	assets(html) {
		this.aframeAssets = String(html)
	}

	/** Adds aframe code the the build */
	aframe(html) {
		this.aframeHtml = String(html)
	}
}

module.exports = Aframe