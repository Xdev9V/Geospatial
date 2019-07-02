//1. Define Require Module
define(["https://api.tiles.mapbox.com/mapbox-gl-js/v0.29.0/mapbox-gl.js", "jquery"], function(mapboxgl, jQuery) {
    "use strict";
    var map = '',
        bounds = '',
        geojsonFeature = {};


    //2. Create and Name Control
    function BasicControl() {};

    //3. Add Initialize method to Control
    BasicControl.prototype.initialize = function(oControlHost, fnDoneInitializing) {
        console.log('1. Hello init ******************')
        console.log(requirejs.s.contexts._.config)
        fnDoneInitializing();
    };

    //4. Add SetData method to control
    BasicControl.prototype.setData = function(oControlHost, oDataStore) {
        console.log('2. SetData *****************')
    };

    //5. Add SetData method to control
    BasicControl.prototype.draw = function(oControlHost) {
        oControlHost.container.innerHTML = "Hello World!!  Map PlaceHolder";
        console.log('3. Draw ******************')
    };

    //6. Return new Control 
    return BasicControl;
});
