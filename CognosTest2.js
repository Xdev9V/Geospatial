define(["https://api.tiles.mapbox.com/mapbox-gl-js/v0.45.0/mapbox-gl.js", "jquery"], function(mapboxgl, jQuery) {
    "use strict";
    var map = '',
        bounds = '',
        geojsonFeature = {};

    function BasicControl() {};

    BasicControl.prototype.initialize = function(oControlHost, fnDoneInitializing, oDataStore) {

        jQuery("head link[rel='stylesheet']").last().after("<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.45.0/mapbox-gl.css' rel='stylesheet' />");

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

map.on('style.load', function (e) {
    console.log(e.style.sprite);
    map.addSource('markers', {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-71.047660, 42.344951]
                },
                "properties": {
                    "title": "$3,333",
                    "marker-symbol": "default_marker"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-71.045734, 42.346703]
                },
                "properties": {
                    "title": "$1,223",
                    "marker-color": "#ff00ff",
                    "marker-symbol": "secondary_marker"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-71.045353, 42.345353]
                },
                "properties": {
                    "title": "$3,454",
                    "marker-color": "#ff00ff",
                    "marker-symbol": "secondary_marker"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-71.044351, 42.347288]
                },
                "properties": {
                    "title": "$1,232",
                    "marker-color": "#ff00ff",
                    "marker-symbol": "secondary_marker"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-71.044731, 42.346166]
                },
                "properties": {
                    "title": "$4,232",
                    "marker-color": "#ff00ff",
                    "marker-symbol": "secondary_marker"
                }
            }
			
			
			]
        }
    });

    map.addLayer({
        "id": "markers",
        "source": "markers",
        "type": "circle",
        "paint": {
        "circle-radius": 5,
        "circle-color": "#FF0000"
        }
    });
});

               

        //Zoom and Fit map to points
        geojsonFeature.features.forEach(function(feature) {
            bounds.extend(feature.geometry.coordinates);
        });

        map.fitBounds(bounds, {
            padding: 40
        });

console.log('test')

    };

    BasicControl.prototype.draw = function(oControlHost) {

        console.log('3. Draw ******************')

        var oPage = oControlHost.page;

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
       map.on('load', function() {
    var frameCount = 7;
    for (var i = 0; i < frameCount; i++) {
    var revi= frameCount-i;
    var t = new Date();
    var d = t.getTime();
    var newD=d-60*1000*revi*30;
    var datetext = new Date(newD);
    var newDiso=datetext.toISOString();
    var timeBlock = newDiso;
    map.addLayer({
        'id': 'Radar-Today',
        'type': 'raster',
        'source': {
        'type': 'raster',
        'tiles': [
        'https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WmsServer?service=WMS&request=GetMap&version=1.3.0&layers=1&styles=&format=image/png&transparent=true&height=256&width=256&crs=EPSG:3857&bbox={bbox-epsg-3857}&time='+timeBlock
],
        'tileSize': 256
         },
		 'layout': {'visibility': 'visible'},
        'paint': { 'raster-opacity': 1,
            'raster-opacity-transition': {
            duration: 0
         }}
     }, 'aeroway-taxiway');
}
  
	
}); 
               

        //Zoom and Fit map to points
        geojsonFeature.features.forEach(function(feature) {
            bounds.extend(feature.geometry.coordinates);
        });

        map.fitBounds(bounds, {
            padding: 40
        });

console.log('test')

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
            geojsonFeature['features'].push(feature)
        }

        console.log(geojsonFeature)

    };



    return BasicControl;
});

