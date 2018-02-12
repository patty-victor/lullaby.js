attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;

varying lowp vec4 vColor;

void main() {
  gl_Position = aVertexPosition;
  vColor = aVertexColor;
}