define(["https://api.tiles.mapbox.com/mapbox-gl-js/v0.45.0/mapbox-gl.js", "jquery"], function(mapboxgl, jQuery) {
    "use strict";
    var map = '',
        bounds = '',
        geojsonFeature = {};
     
	function BasicControl() {};

    BasicControl.prototype.initialize = function(oControlHost, fnDoneInitializing, oDataStore) {

        jQuery("head link[rel='stylesheet']").last().after("<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.45.0/mapbox-gl.css' rel='stylesheet' />");
		jQuery("body").after("<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.min.js'></script>");
		JQuery("body").after("<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.css' type='text/css' />")

        var mapContainer = oControlHost.container.id;

        //*** Step 2a make some minor adjustments to default map */
        mapboxgl.accessToken = 'pk.eyJ1IjoiZnhoYXdrIiwiYSI6ImNqaDZqYmVsajFwb3kycWs0dzM5aDFxbXgifQ.DcqavEFQJWPJ8eUAGLbK_A'; //Make sure to add Map Token Key
        map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [-96, 37.8], //Update Map Center to mid US
            zoom: 3, //Change Default Zoom
            interactive: true //Set Interactive to true
        });

        //Set up the Bounds variable
        bounds = new mapboxgl.LngLatBounds();

        //Tell Cognos that we are done initializing 
        fnDoneInitializing();

    };

    BasicControl.prototype.draw = function(oControlHost) {

        console.log('3. Draw ******************')

        var oPage = oControlHost.page;
	    
	    map.addControl(new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
            }));
          	
	// Add geolocate control to the map.
	var nav = new mapboxgl.GeolocateControl();
	map.addControl(nav, 'bottom-right');     
 
    };
 
    return BasicControl;
});
