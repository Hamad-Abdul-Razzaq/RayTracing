attribute vec4 vPosition;
varying vec4 vPos;
uniform float n_0;
void main(){ 
    gl_PointSize = 1.0;
    gl_Position = vPosition;
    vPos = vPosition;
    }