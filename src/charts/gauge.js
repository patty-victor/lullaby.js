//Exports
exports.createGaugeChart = createGaugeChart;

//Requires
var genericFuntions = require('../genericFunctions.js');
var circle = require('../geometries/circle/circle.js');

//Globals
const defaultClearColor = {
    r: 0.9,
    g: 0.9,
    b: 0.9,
    a: 1.0,
};
const defaultChartSize = {
    width: 400,
    height: 300,
}

////Public (exported)
//Creates a gauge chart and return it's object
function createGaugeChart(canvasId, options) {
    //If no options was passed create a default object
    if (!options) {
        options = createDefaultGaugeChartOptions();
    }

    const gl = genericFuntions.initGlContext(canvasId, options.clearColor, options.width, options.height);

    //Context not created
    if (!gl) {
        console.log("GL context could not be created.")
        return;
    }

    //Draw the circle
    var optionsCircle1 = {
        center: { x: 0.0, y: -0.8 },
        radius: 300,
        innerRadius: 100,
        degreeInit: -90.0,
        degreeEnd: -32.0,
        fillColor: { r: 0.047, g: 0.596, b: 0.592, a: 1.0 },
    };

    var optionsCircle2 = {
        center: { x: 0.0, y: -0.8 },
        radius: 300,
        innerRadius: 100,
        degreeInit: -28.0,
        degreeEnd: 28.0,
        fillColor: { r: 0.972, g: 0.815, b: 0.325, a: 1.0 }, 
    };

    var optionsCircle3 = {
        center: { x: 0.0, y: -0.8 },
        radius: 300,
        innerRadius: 100,
        degreeInit: 32.0,
        degreeEnd: 90.0,
        fillColor: { r: 0.792, g: 0.301, b: 0.2, a: 1.0 },
    };

    circle.drawCircle(gl, optionsCircle1);
    circle.drawCircle(gl, optionsCircle2);
    circle.drawCircle(gl, optionsCircle3);
}

////Private
//Creates default gauge chart options
function createDefaultGaugeChartOptions() {
    var options = {
        width: defaultChartSize.width,
        height: defaultChartSize.height,
        clearColor: defaultClearColor,
        externalRadio: 20,
        internalRadio: 5,
        angle: 0.5,
    };

    return options;
}