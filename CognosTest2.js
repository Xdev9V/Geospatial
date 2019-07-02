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





    return BasicControl;
});

