define(["https://api.tiles.mapbox.com/mapbox-gl-js/v0.29.0/mapbox-gl.js", "jquery"], function(mapboxgl, jQuery) {
    "use strict";
    var map = '',
        bounds = '',
        geojsonFeature = {};

    function BasicControl() {};

    BasicControl.prototype.initialize = function(oControlHost, fnDoneInitializing, oDataStore) {

        jQuery("head link[rel='stylesheet']").last().after("<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.34.0/mapbox-gl.css' rel='stylesheet' />");

        var mapContainer = oControlHost.container.id;

        //*** Step 2a make some minor adjustments to default map */
        mapboxgl.accessToken = 'pk.eyJ1IjoiZnhoYXdrIiwiYSI6ImNqaDZqYmVsajFwb3kycWs0dzM5aDFxbXgifQ.DcqavEFQJWPJ8eUAGLbK_A'; //Make sure to add Map Token Key
        map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
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
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
map.on('load', function () {
     
    map.addSource('earthquakes',{
	 	type: 'geojson',
		data: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
		});
   map.addLayer({
 "id": "Earthquakes-last 30days",
 "type": "circle",
 "source": "earthquakes",
 "layout": {
                "visibility": earth"
            },
 "paint": {
 "circle-color": "#f00", 
 "circle-radius": {
 "property": "mag",
 "base": 1.8,
 "stops": [
 [{zoom: 0, value: 2}, 2],
 [{zoom: 0, value: 8}, 15],
 [{zoom: 11, value: 2}, 20],
 [{zoom: 11, value: 8}, 900],
 [{zoom: 20, value: 2}, 40],
 [{zoom: 20, value: 8}, 2250]
 ],
  
 }, "circle-opacity": 0.7
 }
 });
});


        console.log(geojsonFeature)

        map.on("load", function() {
            map.addSource("points", {
                "type": "geojson",
                "data": geojsonFeature
            });


            map.addLayer({
                "id": "points",
                "type": "circle",
                "source": "points",
                "paint": {
                    'circle-radius': {
                        'base': 1.75,
                        'stops': [
                            [6, 3],
                            [8, 5],
                            [10, 7],
                            [12, 10],
                            [16, 20]
                        ]

                    },
                    "circle-color": "#B42222"
                },
                "filter": ["==", "$type", "Point"],

            });
        });

        //Zoom and Fit map to points
        geojsonFeature.features.forEach(function(feature) {
            bounds.extend(feature.geometry.coordinates);
        });

        map.fitBounds(bounds, {
            padding: 40
        });



    };


    BasicControl.prototype.setData = function(oControlHost, oDataStore) {
        console.log('2 Set Data')
            //Default GeoJSON
        geojsonFeature = {
            "type": "FeatureCollection",
            "features": []
        }

        var iRowCount = oDataStore.rowCount;
	var earth = null    
        for (var iRow = 0; iRow < iRowCount; iRow++) {

            var feature = {}
            feature['type'] = 'Feature'
            feature['geometry'] = {
                'type': 'Point',
                'coordinates': [parseFloat(oDataStore.getCellValue(iRow, 1)), parseFloat(oDataStore.getCellValue(iRow, 2))],
            }
            feature['properties'] = { 'name': oDataStore.getCellValue(iRow, 0) }
	    earth = oDataStore.getCellValue(iRow, 3) 
		
            geojsonFeature['features'].push(feature)
        }

        console.log(earth)

    };



    return BasicControl;
});
