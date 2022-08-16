attribute vec4 vPos;
uniform vec3 origin;
varying vec4 vPosition;
uniform vec3 center1;
uniform vec3 center2;
uniform vec3 center3;
uniform float r1;
uniform float r2;
uniform float r3;
uniform vec2 rnd;

void main() {
    gl_Position = vPos;
    vPosition = vPos;
}