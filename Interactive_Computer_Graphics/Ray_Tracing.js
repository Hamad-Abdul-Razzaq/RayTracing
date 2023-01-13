"use strict";
let response, data;
let data_fetched = 0;
var gl;
var points;
var program;
var NumPoints = 5000;
var origin;
var xp = 0.0;
var yp = 0.0;
var zp = 0.3; 
var right = true;
var up = true;
var c1 = vec3(0.0, 0.0, -1.0);
var c2 = vec3(0.0, -100.5, -1.0);
var r1 = 0.5;
var r2 = 100.0;
var c3 = vec3(1.5, 0.0, -1.0);
var r3 = 0.4;
var rnd = vec2(Math.random(), Math.random());
var width;
let height = 0;
let data_ = [];
function Word2float(word) {
    var byte1, byte2, byte3, byte4;
    byte1 = Math.round(word.x);
    byte2 = Math.round(word.y);
    byte3 = Math.round(word.z);
    byte4 = Math.round(word.w);
    var mant;
    var mask = 1;
    var power = -23;
    for (var i = 0; i < 8; i++) {
        var v = (byte4 & mask) >> i;
        if (v == 1) {
            mant += Math.pow(2, power);
        }
        power++;
        mask = mask << 1;
    }
    mask = 1;
    for (var i = 0; i < 8; i++) {
        var v = (byte3 & mask) >> i;
        if (v == 1) {
            mant += Math.pow(2, power);
        }
        power++;
        mask = mask << 1;
    }
    mask = 1;
    for (var i = 0; i < 7; i++) {
        var v = (byte2 & mask) >> i;
        if (v == 1) {
            mant += Math.pow(2, power);
        }
        power++;
        mask = mask << 1;
    }
    var sign = ((byte2 & mask) >> 8);
    var exp;
    if (((byte1 & mask) >> 8) == 1) {
        exp = byte1 - 255;
    } else {
        exp = byte1;
    }
    console.log(Math.pow(-1, sign) * Math.pow(2, exp) * mant)

}



function float2Word(a, lst) {
    let exp, mant;
    exp = Math.floor(Math.log2(Math.abs(a))) + 1;
    console.log("Exponent:", exp);
    mant = Math.abs(a) / (Math.pow(2, exp));
    console.log("Mant:", mant);
    console.log(mant * Math.pow(2, exp));
    let temp = mant;
    let temp2;
    let byte1 = 0,
        byte2 = 0,
        byte3 = 0,
        byte4 = 0;
    if (exp < 0) {
        if (exp == -Infinity) {
            byte1 = 0
        } else {
            byte1 = 255 + exp
        }
    } else {
        if (exp == Infinity) {
            byte1 = 0
        } else {
            byte1 = exp
        }
    }
    if (a < 0) {
        byte2 += 1;
    }
    for (var i = -1; i >= -7; i--) {
        byte2 = byte2 << 1;
        temp2 = temp - Math.pow(2, i)
        if (temp2 >= 0) {
            byte2 += 1
            temp = temp2
        }
    }
    for (var i = -8; i >= -14; i--) {
        temp2 = temp - Math.pow(2, i)
        if (temp2 >= 0) {
            byte3 += 1
            temp = temp2
        }
        byte3 = byte3 << 1;
    }
    temp2 = temp - Math.pow(2, -15)
    if (temp2 >= 0) {
        byte3 += 1
        temp = temp2
    }
    for (var i = -15; i >= -22; i--) {
        temp2 = temp - Math.pow(2, i)
        if (temp2 >= 0) {
            byte4 += 1
            temp = temp2
        }
        byte4 = byte4 << 1;
    }
    temp2 = temp - Math.pow(2, -23)
    if (temp2 >= 0) {
        byte4 += 1
        temp = temp2
    }
    lst.push(byte1)
    lst.push(byte2)
    lst.push(byte3)
    lst.push(byte4)
    Word2float(vec4(byte1, byte2, byte3, byte4))
    return lst;
}

function ReadPly(response, data){
    let metadata = {
        type: 'text/plain'
      }
    let file = new File([data], "bun_zipper_res4.ply", metadata)
    let reader = new FileReader();
    let str_data
    reader.readAsText(file)
    reader.onload = function(){
        // console.log(this.result.slice())
        str_data = this.result.slice();
        let lines = str_data.split(/\r?\n/);
        for (var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].split(/\r? /);
        }
        let f;
        let start, n;
        for (var i = 0; i < lines.length; i++){
            if (lines[i].length == 3) {
                if (lines[i][0] === "element" && lines[i][1] == "vertex") {
                    n = parseInt(lines[i][2]);
                }
                else if  (lines[i][0] === "element" && lines[i][1] == "face") {
                    f = parseInt(lines[i][2]);
                }
            }
            else if (lines[i][0] === "end_header") {
                start = i + 1;
                break;
            }
            
        }
        let vertices = [];
        for (var j = start; j < n + start; j++) {
            var arr = [];
            for (var k = 0; k < 3; k++) {
                arr.push(parseFloat(lines[j][k]));
            }
            vertices.push(arr)
        }
        for (var i = n + start; i <  n + start + f; i++){
            for (var j = 1; j < 4; j++){
                let index = parseInt(lines[i][j]);
                data_.push(vertices[index][0])
                data_.push(vertices[index][1])
                data_.push(vertices[index][2])
                data_.push(0.0)
            }
        }
    height = f*3;
    console.log(data_)
    init()
    }
    }

window.onload = function init1(){
    let URL = "https://raw.githubusercontent.com/HamadAbdulRazzaq/RayTracing-with-Shaders/main/Interactive_Computer_Graphics/bun_zipper_res3.ply";
    var a = fetch(URL).then(response => response.blob().then(data => ReadPly(response, data)))
    
}

function init() // The first function to get executed
    {
        var canvas = document.getElementById("gl-canvas");
        gl = canvas.getContext("webgl2", {
            premultipliedAlpha: false // Ask for non-premultiplied alpha
        }); // Initializing WebGL API
        if (!gl) { alert("WebGL isn't available"); }

        var focal_length = 1.0;
        // const texture = loadTexture(gl, "https://raw.githubusercontent.com/HamadAbdulRazzaq/RayTracing-with-Shaders/main/Interactive_Computer_Graphics/Normal_Sphere.png");
        // console.log(texture);

        // And, add our initial point into our array of points
        
        // data_fetched = ReadPly("https://raw.githubusercontent.com/HamadAbdulRazzaq/RayTracing-with-Shaders/main/Interactive_Computer_Graphics/bun_zipper_res4.ply");
        // while ( data_fetched == 0){

        // }







        // float2Word(32);

        points = [];
        var iter = 0;
        for (var i = -1; i <= 1; i += 2) {
            iter += 1;
            for (var j = -1; j <= 1; j += 2) {
                var x = i;
                var y = -j;
                var p = vec3(i, -j, -1.0);
                points.push(p);

            }

        }
        // window.alert("2");
        //
        //  Configure WebGL
        //
        gl.viewport(0, 0, canvas.width, canvas.height);

        //  Load shaders and initialize attribute buffers

        program = initShaders(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(program);
        console.log(gl.getParameter(gl.MAX_TEXTURE_SIZE))
        console.log(height)
        var textureLocation = gl.getUniformLocation(program, "scene");
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        const level = 0;
        const internalFormat = gl.RGBA32F;
        const Format = gl.RGBA;
        const border = 0;
        const type_ = gl.FLOAT;
        width = 1;
        const alignment = 1;
        
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, Format, type_, new Float32Array(data_));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(textureLocation, 0);






        // Texture Start
        // var all_coord = [
        //     0.0, -100.5, -1.0, 100.0,
        //     0.0, 0.0, -1.0, 0.5,
        // ];







        // Texture End
        // console.log("good");
        // var tp = gl.getUniformLocation(program, "type");
        // gl.uniform1f(tp, type);
        // var scene = gl.getUniformLocation(program, "scene")
        // gl.uniform3fv(scene, all_coord);
        var n = gl.getUniformLocation(program, "n");
        gl.uniform1f(n, 2.0);

        render();

        // Associate out shader variables with our data buffer

    };

//
// Initialize a texture and load an image.
// When the image finished loading copy it into the texture.
//





function render() {
    // origin = vec3(xp, yp, zp);
    origin = vec3(0.0, 0.15, 0.2);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
    // var offset = gl.getAttribLocation(program, "offset");
    if (xp >= 2.5 || xp <= -2.5) {
        right = !right;
    }
    if (xp < 2.5 && right) {
        xp += 0.01;
    } else if (xp > -2.5 && !right) {
        xp -= 0.01;
    }
    

    // if (zp >= 500 || zp <= 0.0) {
    //     right = !right;
    // }
    // if (zp < 500 && right) {
    //     zp += 0.2;
    //     // yp -= 100.5 / 1250;
    // } else if (zp >= 0.0 && !right) {
    //     zp -= 0.2;
    //     // yp += 100.5 / 1250;
    // }

    // if (yp >= 0.5 || yp <= -0.5){
    //     up = !up;
    // }
    // if (yp < 2.0 && up){
    //     yp += 0.01;
    // }
    // else if (yp > -2.0 && !up){
    //     yp -= 0.01;
    // }

    var vPosition = gl.getAttribLocation(program, "vPos");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var tw = gl.getUniformLocation(program, "texture_width");
    gl.uniform1i(tw, width);

    var th = gl.getUniformLocation(program, "texture_height");
    gl.uniform1i(th, height);

    var origin_ = gl.getUniformLocation(program, "origin");
    gl.uniform3fv(origin_, origin);

    var op = gl.getUniformLocation(program, "rnd");
    gl.uniform2fv(op, rnd);


    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, points.length);
    // window.requestAnimationFrame(render);
}