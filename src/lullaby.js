
var lullaby = {};

//Requires
const glm = require('gl-matrix');
const gauge = require('./charts/gauge.js');

(function (exports) {
    //Exported functions
    exports.createGaugeChart = gauge.createGaugeChart;

    //Creates var in document if not on server side
    if (typeof window !== 'undefined') {
        window.lullaby = exports;
    }
})(typeof exports === 'undefined' ? (this['lullaby'] = {}) : exports);





