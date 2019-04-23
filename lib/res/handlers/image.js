class Video {
	constructor(id) {
		/** The index / ID of this object. Same as the marker id  */
		this.id = id
        
		/**
         * Displays an image
         * @param {String} img The image that you want to display
         */
		this.loadImg = this.loadImage
	}
    
	/**
     * Displays an image
     * @param {String} img The image that you want to display
     */
	loadImage(img) {
		/** The location of the image */
		this.img = img
	}
    
	build() {
		this.newJson.contentType = 'img'
		this.newJson.videoData = {
			id: this.id,
			img: this.img
		}
	}
    
	getLocalFuncs() {
		return ['build', 'loadImage', 'loadImg']
	}
}

module.exports = Video