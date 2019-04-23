class Image {
	/**
     * Class initialier
     * @param {Number} id The marker id
     */
	constructor(id) {
		/** The index / ID of this object. Same as the marker id  */
		this.id = id
        
		/**
         * Displays an image
         * @param {String} img The image that you want to display
         */
		this.loadImg = this.loadImage
        
		/** The media type is */
		this.type = 'img'
	}
    
	/**
     * Displays an image
     * @param {String} img The image that you want to display
     */
	loadImage(img) {
		/** The location of the image */
		this.img = img
	}

	/**
	 * Set the correct width and height of the image
	 * @param {Number} width The width of your image in meters
	 * @param {Number} height The height of your image in meters
	 */
	setSize(width, height) {
		/** The width of the image in meters */
		this.width = width

		/** The height of the image in meters */
		this.height = height
	}
    
	build() {
		this.newJson.contentType = this.type
		this.newJson.imgData = {
			id: this.id,
			img: this.img,
			height: this.height || 9 / 3,
			width: this.width || 16 / 3
		}
	}
    
	getLocalFuncs() {
		return ['build', 'loadImage', 'loadImg', 'setSize']
	}
}

module.exports = Image