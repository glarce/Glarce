import otherFile from './otherFile'

let api, otherThing

otherThing = {
  style: 'barcode',
  value: 6,
  media: [{
      type: 'video',
      src: 'path/to/video.webm',
      width: 5.3333333,
      height: 3
    },
    {
      type: 'obj',
      src: 'path/to/obj.obj'
    },
    {
      type: 'aframe',
      html: 'path/to/file.html',
      js: function() { // can be included using an es6 import and added as a variable

      },
      assets: 'path.to/assets.html'
    }
  ]
}


api = [
  /* Standard inline */
  {
    style: 'barcode',
    value: 5,
    media: [{
        type: 'video',
        src: 'path/to/video.webm',
        width: 5.3333333,
        height: 3
      },
      {
        type: 'obj',
        src: 'path/to/obj.obj'
      },
      {
        type: 'aframe',
        html: 'path/to/file.html',
        js: function() { // can be included using an es6 import and added as a variable

        },
        assets: 'path.to/assets.html'
      }
    ]
  },

  /* Other variale */
  otherThing,

  /* External file */
  otherFile
]

export default api;