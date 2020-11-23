import {createCanvas, GLInstance, initShaderProgram} from './modules/module.js';
import {drawScene, initBuffers} from './modules/shader.js';
createCanvas('firewall-content');
var Gl = new GLInstance('display').fClear().fSetSize(1280, 720);

const indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
	];

const color = [
    [1.0,  1.0,  1.0,  1.0],    // Front face: white
    [1.0,  0.0,  0.0,  1.0],    // Back face: red
    [0.0,  1.0,  0.0,  1.0],    // Top face: green
    [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
    [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
    [1.0,  0.0,  1.0,  1.0],    // Left face: purple
  ];
const position = [
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    
    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,
    
    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,
    
    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,
    
    // Right face
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,
    
    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
  ];

const vsSource = `
attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying lowp vec4 vColor;

void main(void){
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = aVertexColor;
}
`;


const fsSource = `
varying lowp vec4 vColor;
void main(void){
    gl_FragColor = vColor;
}
`;

const shaderProgram = initShaderProgram(Gl, vsSource, fsSource)

const programInfo = {
    program: shaderProgram,
    attribLocations:{
        vertexPosition: Gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: Gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations:{
        projectionMatrix: Gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: Gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
    },
};

const buffers = initBuffers(Gl, position, color, indices);
var then = 1;

function render(now){
    now *= 0.001;
    const deltaTime = now - then;
    then = now;

    drawScene(Gl, programInfo, buffers, deltaTime);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);


//above this belongs to the main function

