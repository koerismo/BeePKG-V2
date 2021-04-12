// https://developer.valvesoftware.com/wiki/Valve_Texture_Format

/*
Stupid VTF Conversion Library
by Baguettery

Code based off of documentation from VDC, TeamSpen's srctools, and sprays.tk
Only supports RGBA8888

*/

String.prototype.toBytes = function() {
  return this.split('').map((x)=>{return x.charCodeAt()})
}

Number.prototype.toBytes = function(len) {
  return Array(len).fill('').map((x,y)=>{return (this >>> y*8) & 0xFF })
}

Number.prototype.toShort = function() {
  return [this & 0xFF, (this >>> 8) & 0xFF] // I have no idea how this works, I just transcribed it from sprays.tk
}


function writeVTFHeader(isize) {

  var flags = 0x0004 /* Clamp S */ +
              0x0008 /* Clamp T */ +
              0x0200 /* No LOD */ +
              0x0100 /* No mipmaps */ +
              0x2000 /* Eight bit alpha */

  var header = [
    ...(  'VTF\0'.toBytes(4)  ),  /* Beginning thing. */
    7,0,0,0,  1,0,0,0,            /* Reallllly stretched out version number, I guess. */
    64,0,0,0,                     /* Header size. Taking it from sprays.tk again lmao */
    ...( (isize).toShort() ),       /* Width */
    ...( (isize).toShort() ),       /* Height */
    ...( flags.toBytes(4) ),      /* Flags */
    1,                            /* # Of frames*/
    0                             /* First frame */
  ]

  header = header.concat(Array(64-header.length-8).fill(0)) /* Fuck you, filling the rest of the header with 0s. */
  header = header.concat([
    1, 13,  /* # Of Mipmaps,  DXT1 low-res data ID */
    0, 0,

    0, 0,   /* I don't know what this does, but I'll just assume that it'll work. */
    0, 1
  ])

  return header
}


function dataFromImageURL(isrc,isize) {
  return new Promise( (resolve, reject) => { /* Since this is an async function, make a new promise to keep everything nice. */

    let canv = document.createElement('CANVAS')
    canv.width = 128, canv.height = 128
    let ctx = canv.getContext('2d')

    let img = new Image()
    img.onload = function() {
      try {ctx.drawImage(img,0,0,isize,isize)}
      catch(e) {reject(e)}
      //ctx.fillRect(0,0,128,128)
      resolve(ctx.getImageData(0,0,isize,isize))
    }
    img.src = isrc

  })
}


async function createVTF(isrc) {
  let VTFBody = await dataFromImageURL(isrc,128)
  let VTFHeader = writeVTFHeader(128)
  let file = VTFHeader.concat(Array.from(VTFBody.data))
  return new Uint8Array(file)
}
