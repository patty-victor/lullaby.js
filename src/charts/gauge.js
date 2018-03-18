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
//Creates a gauge chart and returns it's object
function createGaugeChart(canvasId, options) {
    //If no options was passed create a default object
    if (!options) {
        options = createDefaultGaugeChartOptions();
    }

    const gl = genericFuntions.initGlContext(canvasId, options.clearColor, options.width, options.height);

    //Context not created
    if (!gl) {
        console.log("GL context could not be created.");
        return;
    }

    //Draw gauge areas
    drawGaugeAreas(gl, options);

    //Draw gauge pointer
    drawGaugePointer(gl, options);
}

////Private
//Draw gauge areas
function drawGaugeAreas(gl, options) {
    //Draw the gauge circles
    if (options.areas) {
        var currentRotation = options.initialRotation;

        //For every area in areas array create the circle
        for (var i = 0; i < options.areas.length; i++) {
            var areaOptions = options.areas[i];

            //Build the circle options
            var circleOptions = {
                center: options.center,
                radius: options.radius,
                innerRadius: options.innerRadius,
                fillColor: areaOptions.fillColor,
                degreeInit: currentRotation,
                degreeEnd: currentRotation + areaOptions.degrees,
            }

            //If has areas separations
            if (options.areasSeparation) {
                //Add the left separation if not the first
                if (i != 0) {
                    circleOptions.degreeInit += options.areasSeparation / 2;
                }

                //Add the right separation if not the last
                if (i != options.areas.length) {
                    circleOptions.degreeEnd -= options.areasSeparation / 2;
                }
            }

            //Draw the circle
            circle.drawCircle(gl, circleOptions);

            currentRotation += areaOptions.degrees;
        }
    }
}

//Draw gauge pointer
function drawGaugePointer(gl, options) {

    if (!options.pointerRadius || !options.pointerColor || !options.pointerSize || !options.pointerAnchor) {
        return;
    }


    var xCenter = options.center.x + options.pointerAnchor.x / options.width;
    var yCenter = options.center.y + options.pointerAnchor.y / options.height;

    //Draw the circle pointer
    var circleOptions = {
        center: {x: xCenter, y: yCenter},
        radius: options.pointerRadius,
        innerRadius: 0,
        degreeInit: 0,
        degreeEnd: 360,
        fillColor: options.pointerColor,
    };

    //Draw the circle
    circle.drawCircle(gl, circleOptions);

    // var pointerArrow = options.pointerSize - options.pointerRadius

    // var xArrow = 
}

//Creates default gauge chart options
function createDefaultGaugeChartOptions() {

    var area1 = {
        degrees: 60,
        fillColor: { r: 0.047, g: 0.596, b: 0.592, a: 1.0 },
    };

    var area2 = {
        degrees: 60,
        fillColor: { r: 0.972, g: 0.815, b: 0.325, a: 1.0 },
    }

    var area3 = {
        degrees: 60,
        fillColor: { r: 0.792, g: 0.301, b: 0.2, a: 1.0 },
    }

    var options = {
        width: defaultChartSize.width,
        height: defaultChartSize.height,
        clearColor: defaultClearColor,
        radius: 300,
        innerRadius: 150,
        initialRotation: -90,
        center: { x: 0.0, y: -0.8 },
        areasSeparation: 2,
        areas: [area1, area2, area3],
        pointerRadius: 20,
        pointerSize: 100,
        pointerColor: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        pointerAnchor: { x: 0.0, y: 20 },
        pointerPosition: 0.5
    };

    return options;
}