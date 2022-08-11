"use strict";

var gl;
var points;

var NumPoints = 5000;

window.onload = function init() // The first function to get executed
    {
        var canvas = document.getElementById("gl-canvas");

        gl = WebGLUtils.setupWebGL(canvas); // Initializing WebGL API
        if (!gl) { alert("WebGL isn't available"); }

        //
        //  Initialize our data for the Sierpinski Gasket
        //

        // First, initialize the corners of our gasket with three points.

        var vertices = [
            vec2(-1, -1),
            vec2(0, 1),
            vec2(1, -1)
        ];

        // Specify a starting point p for our iterations
        // p must lie inside any set of three vertices

        var u = add(vertices[0], vertices[1]);
        var v = add(vertices[0], vertices[2]);
        var p = scale(0.25, add(u, v));

        // And, add our initial point into our array of points

        points = [];

        // Compute new points
        // Each new point is located midway between
        // last point and a randomly chosen vertex

        for (var i = -1; i <= 1; i += 2) {
            for (var j = -1; j <= 1; j += 2) {
                p = vec2(i, -j)
                points.push(p);
            }

        }
        //
        //  Configure WebGL
        //
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        //  Load shaders and initialize attribute buffers

        var program = initShaders(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(program);

        // Load the data into the GPU
        var bufferId = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
        var offset = gl.getAttribLocation(program, "offset");


        var vPosition = gl.getAttribLocation(program, "vPosition");
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        render();

        // Associate out shader variables with our data buffer

    };


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, points.length);
}