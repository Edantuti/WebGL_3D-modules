let createCanvas = function(canvasId){
    var popup = document.getElementById(canvasId);
    var canvas = document.createElement("canvas");
    canvas.style.borderColor = "red";
    canvas.style.borderWidth = "2px";
    canvas.style.borderStyle = "solid";
    canvas.id = "display";
    popup.appendChild(canvas)
}
var gl;
let GLInstance = function(canvasId){
    var canvas = document.getElementById(canvasId);
    gl = canvas.getContext('webgl2');
    if(!gl){
        console.error("WebGL context is not available."); return null;
    }
    gl.clearColor(1.0,1.0,1.0,1.0);
    gl.fClear = function(){
        this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT); return this;
    }
    gl.fSetSize = function(w, h){
        this.canvas.style.width = w+"px";
        this.canvas.style.height = h+"px";
        this.canvas.width = w;
        this.canvas.height = h;

        this.viewport(0,0,w,h);
        return this;
    }
    return gl;
}
let initShaderProgram = function(gl, vsSource, fsSource){
        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
            alert('Unable to initialize the shader program:' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }

        return shaderProgram;
}
let loadShader = function(gl, type, source){
        const shader = gl.createShader(type);

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
            alert('An error occurred compiling the shaders: '+gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
}

export{createCanvas, GLInstance, initShaderProgram, loadShader};