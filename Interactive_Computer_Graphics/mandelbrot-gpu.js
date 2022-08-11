"use strict";

var gl;
var points;
// var color;
var program;
var NumPoints = 5000;
// var nt = 100;
window.onload = function init() // The first function to get executed
    {
        var canvas = document.getElementById("gl-canvas");

        gl = canvas.getContext("webgl", {
            premultipliedAlpha: false // Ask for non-premultiplied alpha
        }); // Initializing WebGL API
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
        // color = [];
        // window.alert("Here we go1");

        // Compute new points
        // Each new point is located midway between
        // last point and a randomly chosen vertex
        var iter = 0;
        for (var i = -1; i <= 1; i += 2) {
            iter += 1;
            console.log(iter);
            for (var j = -1; j <= 1; j += 2) {
                var x = i;
                var y = -j;
                // var mx = x * 2;
                // var my = y * 2;
                p = vec2(i, -j);
                // window.alert("Here we go");
                points.push(p);
                // var a = math.complex(mx, my);
                // var n_0 = math.complex(0, 0);
                // var count = 1;
                // for (var n = 1; n <= nt; n += 1) {
                //     n_0 = math.add(math.multiply(n_0, n_0), a);
                //     var real_2 = Math.pow(math.re(n_0), 2);
                //     var imag_2 = Math.pow(math.im(n_0), 2);
                //     var abs = Math.pow(real_2 + imag_2, 0.5);
                //     if (abs > 2) {
                //         break;
                //     } else {
                //         count += 1;
                //     }
                // }
                // if (count < 5) {
                //     color.push(vec4(0.0, 0.0, ((nt / 3) - count) * 1 / (nt / 3), 1.0));
                // } else if (count >= nt) {
                //     color.push(vec4(0.0, 0.0, 0.0, 1.0));
                // } else if (count >= nt - (8 * nt / 10)) {
                //     color.push(vec4(1.0, 1.0, 1.0, 1.0));

                // } else {
                //     color.push(vec4(0.0, 0.0, (nt - count) * 1 / nt, 1.0));
                // }

            }

        }
        // window.alert("2");
        //
        //  Configure WebGL
        //
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        //  Load shaders and initialize attribute buffers

        program = initShaders(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(program);
        // Load the data into the GPU
        // var cBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        // gl.bufferData(gl.ARRAY_BUFFER, flatten(color), gl.STATIC_DRAW);
        // window.alert("2");

        // var vColor = gl.getAttribLocation(program, "vColor");
        // gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
        // gl.enableVertexAttribArray(vColor);


        var bufferId = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
        // var offset = gl.getAttribLocation(program, "offset");


        var vPosition = gl.getAttribLocation(program, "vPosition");
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        render();

        // Associate out shader variables with our data buffer

    };


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, points.length);
}