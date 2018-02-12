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
    circle.drawCircle(gl);
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