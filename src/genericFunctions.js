//Exports
exports.initGlContext = initGlContext;
exports.createProgram = createProgram;
exports.loadShader = loadShader;

////Public (exported)
//Init the canvas with the passed id
function initGlContext(canvasId, clearColor, width, height) {
    const canvas = document.getElementById(canvasId);
    //Canvas not found
    if (!canvas) {
        console.log("Canvas element not found.");
        return false;
    }

    const gl = canvas.getContext("webgl");

    // Only continue if WebGL is available and working
    if (!gl) {
        console.log("Unable to initialize WebGL. Your browser or machine may not support it.");
        return false;
    }

    //Set chart size
    canvas.width = width;
    gl.maxWidth = width;

    canvas.height = height;
    gl.maxHeight = height;

    gl.viewport(0, 0, canvas.width, canvas.height);

    //Set the clear color
    gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    return gl;
}

//Creates a shader program
function createProgram(gl, vShader, fShader) {
    //Create the gl program
    var program = gl.createProgram();
    //Atach both shaders
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);

    //Link the program
    gl.linkProgram(program);

    // Check that shader program was able to link to WebGL
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        var error = gl.getProgramInfoLog(program);
        console.log('Failed to link program: ' + error);
        gl.deleteProgram(program);
        gl.deleteShader(fShader);
        gl.deleteShader(vShader);
        return null;
    }

    //Return program if no errors ocurred
    return program;
}

//Loads a new shader
function loadShader(gl, type, source) {
    var shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    //Check if compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log("An error occurred compiling the shaders:" + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    //Return the shader if no errors occured
    return shader;
}