/*
 Author: 
 Ed Gonzalez  
 edgonzalez@icdata.io
 www.icdata.io 
 www.linkedin.com/in/ed-gonzalez-9683696
 
	Free for personal and commercial use under the CCA 3.0 license
	I just ask for you give me credit for the code and tell your friends about it.
	Note this is a very simple implementation, and is only meant to get you started using Custom Controls, and the MapBox API
*/

//Step 1 Add reference tp MapBox API, and to jQuery API, then add variables to be used 
//Step 2 Add Initialize Code and set up default map. Make sure to add Map Token Key
//Step 2a Make some minor adjustments to default map, and setup Bounds Variable


define(["https://api.tiles.mapbox.com/mapbox-gl-js/v0.29.0/mapbox-gl.js", "jquery"], function(mapboxgl, jQuery) {
    "use strict";

    var map = '',
        bounds = '',
        geojsonFeature = {};

    function BasicControl() {};


       


    return BasicControl;
});
