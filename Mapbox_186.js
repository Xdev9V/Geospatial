define(["https://api.tiles.mapbox.com/mapbox-gl-js/v1.2.0/mapbox-gl.js", "jquery", "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.min.js","https://api.tiles.mapbox.com/mapbox.js/plugins/turf/v3.0.11/turf.min.js","https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.js", "https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js", "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js", "https://rca-uat.ventivtech.com/cognos11/ventiv/javascript/HtmlSlider/HtmlSlider.css"], function(mapboxgl, jQuery, MapboxGeocoder, turf, MapboxDraw, slider, slider1, sCSS) {
    "use strict";
    var map = '',
        bounds = '',
        geojsonFeature = {};
     var earth = 'none';	
     var radar = 'none';
     var MyStyle = 'light-v9'
     var property = 'visible';
     var lightning = 'none';
     var hurricane = 'none';
     var hazardous = 'none';
     var earth_h = 'none';
     var tornadoes = 'none';
     var claims = 'none';
     var claim_info = '';

    function BasicControl() {};

    BasicControl.prototype.initialize = function(oControlHost, fnDoneInitializing, oDataStore) {

        jQuery("head link[rel='stylesheet']").last().after("<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.2.0/mapbox-gl.css' rel='stylesheet' />");
		jQuery("head link[rel='stylesheet']").last().after("<link href='https://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css' />");
	    jQuery("body").after("<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.css' type='text/css' />");
        jQuery("body").prepend("<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.css' type='text/css'/>");
        jQuery("mapboxgl-control-container").prepend('<div id=' + 'console' + '>' +  '</div>' + '<div class=' + 'session' + ' ' +  'id=' + 'sliderbar' + ' ' + '>' + ' ' + '<h5>' + '<font color=' + "black" + '>' + 'Historical - Year: ' + '<label id=' + 'active-Year' + '>' + '2013' + '</label>' + '</font>' +
	'<input id=' + 'slider' + ' ' + 'class=' +'row' + ' ' + 'type=' + 'range' + ' ' + 'min=' + '2013' + ' ' + 'max='+ '2019' + ' ' +  'step=' + '1' + ' ' + 'value=' + '2013'  + '/>' + '</h5>' + '</div>');
		
		//jQuery( 'tbody').append('<h3>Michael</h3>'); //.mapboxgl-canvas
		
		
        //jQuery("td style").prepend("<div id='map'></div><div class='calculation-box'><p>Draw a polygon using the draw tools.</p><div id='calculated-area'></div></div>");
	    var mapContainer = oControlHost.container.id;

        //*** Step 2a make some minor adjustments to default map */
        mapboxgl.accessToken = 'pk.eyJ1IjoiZnhoYXdrIiwiYSI6ImNqaDZqYmVsajFwb3kycWs0dzM5aDFxbXgifQ.DcqavEFQJWPJ8eUAGLbK_A'; //Make sure to add Map Token Key
        map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/dark-v9',
            center: [-96, 37.8], //Update Map Center to mid US
            zoom: 3, //Change Default Zoom
            interactive: true //Set Interactive to true
        });

        //Set up the Bounds variable
        bounds = new mapboxgl.LngLatBounds();

        //Tell Cognos that we are done initializing 
        fnDoneInitializing();

    };


    BasicControl.prototype.setData = function(oControlHost, oDataStore) {
        console.log('2 Set Data')
            //Default GeoJSON
        geojsonFeature = {
            "type": "FeatureCollection",
            "features": []
        }

        var iRowCount = oDataStore.rowCount;
	  
        for (var iRow = 0; iRow < iRowCount; iRow++) {

            var feature = {}
            feature['type'] = 'Feature'
            feature['geometry'] = {
                'type': 'Point',
                'coordinates': [parseFloat(oDataStore.getCellValue(iRow, 1)), parseFloat(oDataStore.getCellValue(iRow, 2))],
            }
            feature['properties'] = { 'name': oDataStore.getCellValue(iRow, 0) }
	            earth = oDataStore.getCellValue(iRow, 3) 
                radar = oDataStore.getCellValue(iRow, 4)
	            MyStyle = oDataStore.getCellValue(iRow, 5)
                property = oDataStore.getCellValue(iRow, 6)
		        lightning = oDataStore.getCellValue(iRow, 7)
		        hurricane = oDataStore.getCellValue(iRow, 8)
		        hazardous = oDataStore.getCellValue(iRow, 9)
		        earth_h = oDataStore.getCellValue(iRow, 10)
		        tornadoes = oDataStore.getCellValue(iRow, 11)
                claims = oDataStore.getCellValue(iRow, 12)
		        claim_info = oDataStore.getCellValue(iRow, 13)
		
            geojsonFeature['features'].push(feature)
            map.setStyle('mapbox://styles/mapbox/' + MyStyle);        }
		
		console.log('test2')
		map.on('click', 'points', function (e) {
	var coordinates = e.features[0].geometry.coordinates.slice();
	var description = e.features[0].properties.description;
 
// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}
 
new mapboxgl.Popup()
.setLngLat(coordinates)
.setHTML('<div id=' + 'console' + '>' +  '</div>' + '<div class=' + 'session' + ' ' +  'id=' + 'sliderbar' + ' ' + '>' + ' ' + '<h5>' + '<font color=' + "black" + '>' + 'Historical - Year: ' + '<label id=' + 'active-Year' + '>' + '2013' + '</label>' + '</font>' +
	'<input id=' + 'slider' + ' ' + 'class=' +'row' + ' ' + 'type=' + 'range' + ' ' + 'min=' + '2013' + ' ' + 'max='+ '2019' + ' ' +  'step=' + '1' + ' ' + 'value=' + '2013'  + '/>' + '</h5>' + '</div>')
	.addTo(map);
});


        

    };


    return BasicControl;
});
