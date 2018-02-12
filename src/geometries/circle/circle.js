//Exports
exports.drawCircle = drawCircle;

//Requires
var genericFunctions = require('../../genericFunctions.js');

//Shaders sources
var vShaderSrc = require('./vertex.glsl');
var fShaderSrc = require('./fragment.glsl');

////Public (exported)
//Draw the circle geometry
function drawCircle(gl, options) {
    //If no options create default circle options
    if (!options) {
        options = createDefaultCircleOptions();
    }

    //Load the shaders
    var vShader = genericFunctions.loadShader(gl, gl.VERTEX_SHADER, vShaderSrc);
    var fShader = genericFunctions.loadShader(gl, gl.FRAGMENT_SHADER, fShaderSrc);

    //Init the shader program and using it
    var program = genericFunctions.createProgram(gl, vShader, fShader);
    gl.useProgram(program);

    //Initializing the buffer
    var vertexCount = initBuffers(gl, program, options);

    //Checks if the buffer has vertex
    if (vertexCount < 0) {
        console.log('Failed to set the positions of the vertices from circle geometrie');
        return null;
    }

    // Draw a line
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexCount);
}

////Private
//Init the positions buffer
function initBuffers(gl, program, options) {
    // Create a buffers objects
    var vertexBuffer = gl.createBuffer();
    var colorBuffer = gl.createBuffer();

    ////Build vertex and colors buffer
    var vertices = [];
    var vertCount = 2;
    var rgbaCount = 4;
    var colors = [];

    //Calculate the relative size of radius for canvas width and height
    var relativeWidthRadius = options.radius / gl.canvas.width;
    var relativeHeightRadius = options.radius / gl.canvas.height;
    //Calculate the inner radius relative as well if needed
    var relativeWidthInnerRadius;
    var relativeHeightInnerRadius;

    if (options.innerRadius) {
        relativeWidthInnerRadius = options.innerRadius / gl.canvas.width;
        relativeHeightInnerRadius = options.innerRadius / gl.canvas.height;
    }

    //Create positions
    for (var degree = options.degreeInit; degree <= options.degreeEnd; degree += 1) {
        //Degrees to radians
        var rad = degree * Math.PI / 180;

        //Vertice 1
        var vert1 = [
            Math.sin(rad) * relativeWidthRadius + options.center.x,
            Math.cos(rad) * relativeHeightRadius + options.center.y,
        ];

        //Vertice 2
        //With no inner radius
        if (!options.innerRadius) {
            var vert2 = [
                0 + options.center.x,
                0 + options.center.y,
            ];
        }
        //With inner radius
        else {
            var vert2 = [
                Math.sin(rad) * relativeWidthInnerRadius + options.center.x,
                Math.cos(rad) * relativeHeightInnerRadius + options.center.y,
            ];
        }

        //Colors for vertices 1 and 2
        var color1 = [options.fillColor.r, options.fillColor.g, options.fillColor.b, options.fillColor.a];
        var color2 = [options.fillColor.r, options.fillColor.g, options.fillColor.b, options.fillColor.a];

        //Add the new vertices to the array
        vertices = vertices.concat(vert1);
        vertices = vertices.concat(vert2);
        //Add the new colors to the array
        colors = colors.concat(color1);
        colors = colors.concat(color2);
    }

    var vertexCount = vertices.length / vertCount;

    ////Bind vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    gl.enableVertexAttribArray(aVertexPosition);
    gl.vertexAttribPointer(aVertexPosition, vertCount, gl.FLOAT, false, 0, 0);


    ////Bind colors buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    var aVertexColor = gl.getAttribLocation(program, 'aVertexColor');
    gl.enableVertexAttribArray(aVertexColor);
    gl.vertexAttribPointer(aVertexColor, rgbaCount, gl.FLOAT, false, 0, 0);

    return vertexCount;
}

//Creates default gauge chart options
function createDefaultCircleOptions() {
    var options = {
        center: { x: 0.0, y: 0.0 },
        radius: 50,
        innerRadius: 20,
        degreeInit: 0.0,
        degreeEnd: 360,
        fillColor: { r: 1.0, g: 0.0, b: 0.0, a: 1.0 },
    };

    return options;
}