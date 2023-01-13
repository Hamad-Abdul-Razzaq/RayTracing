var textureLocation = gl.getUniformLocation(program, u_texture);

// Create a texture.
var texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);

// fill texture with 1x3 pixels
const level = 0;
const internalFormat = gl.RGBA; // I've also tried to work with gl.LUMINANCE
//   but it feels harder to debug
const width = 1;
const height = 3;
const border = 0;
const type = gl.UNSIGNED_BYTE;
const data = new Uint8Array([
    // R,   G,   B, A (unused)    // : 'texel' index (?)
    64, 0, 0, 0, // : 0
    0, 128, 0, 0, // : 1
    0, 0, 255, 0, // : 2
]);
const alignment = 1; // should be uneccessary for this texture, but 
gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment); //   I don't think this is hurting
gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, internalFormat, type, data);

// set the filtering so we don't need mips and it's not filtered
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);