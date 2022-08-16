"use strict";

var gl;
var points;
var program;
var NumPoints = 5000;
var origin;
var xp = 0.0;
var yp = 0.0;
var right = true;
var up = true;
var c1 = vec3(0.0, 0.0, -1.0);
var c2 = vec3(0.0, -100.5, -1.0);
var r1 = 0.5;
var r2 = 100.0;
var c3 = vec3(1.5, 0.0, -1.0);
var r3 = 0.4;
var rnd = vec2(Math.random(), Math.random());

window.onload = function init() // The first function to get executed
    {
        var canvas = document.getElementById("gl-canvas");

        gl = canvas.getContext("webgl", {
            premultipliedAlpha: false // Ask for non-premultiplied alpha
        }); // Initializing WebGL API
        if (!gl) { alert("WebGL isn't available"); }

        var focal_length = 1.0;


        // And, add our initial point into our array of points

        points = [];
        var iter = 0;
        for (var i = -1; i <= 1; i += 2) {
            iter += 1;
            console.log(iter);
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




        // console.log("good");

        render();

        // Associate out shader variables with our data buffer

    };


function render() {
    origin = vec3(xp, yp, 0.0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
    // var offset = gl.getAttribLocation(program, "offset");
    // if (xp >= 2.5 || xp <= -2.5) {
    //     right = !right;
    // }
    // if (xp < 2.5 && right) {
    //     xp += 0.01;
    // } else if (xp > -2.5 && !right) {
    //     xp -= 0.01;
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


    var origin_ = gl.getUniformLocation(program, "origin");
    gl.uniform3fv(origin_, origin);

    var op = gl.getUniformLocation(program, "rnd");
    gl.uniform2fv(op, rnd);

    var center1 = gl.getUniformLocation(program, "center1");
    gl.uniform3fv(center1, c1);

    var center2 = gl.getUniformLocation(program, "center2");
    gl.uniform3fv(center2, c2);

    var center3 = gl.getUniformLocation(program, "center3");
    gl.uniform3fv(center3, c3);

    var radius1 = gl.getUniformLocation(program, "r1");
    gl.uniform1f(radius1, r1);

    var radius3 = gl.getUniformLocation(program, "r3");
    gl.uniform1f(radius3, r3);

    var radius2 = gl.getUniformLocation(program, "r2");
    gl.uniform1f(radius2, r2);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, points.length);
    //window.requestAnimationFrame(render);
}