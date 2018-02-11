//Exports
exports.initGlContext = initGlContext;

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
    canvas.height = height;

    //Set the clear color
    gl.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);

    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    return gl;
}