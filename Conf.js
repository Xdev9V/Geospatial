define(["https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.js", "jquery", "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js", "https://api.mapbox.com/mapbox.js/plugins/turf/v3.0.11/turf.min.js", "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.3.0/mapbox-gl-draw.js", "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",/*"https://code.jquery.com/ui/1.12.1/jquery-ui.min.js",*/ "text! https://cdn.jsdelivr.net/gh/nelnawawy-ventiv/geotest/Demobase7h.css"], function (mapboxgl, jQuery, MapboxGeocoder, turf, MapboxDraw, slider1, slider2, Info) {
    "use strict";
    var map = '',
        bounds = '',
        geojsonFeature = {};
    var earth = 'none';
    var radar = 'none';
    var MyStyle = 'dark-v11';
    var property = 'visible';
    var lightning = 'none';
    var hurricane = 'none';
    var hazardous = 'none';
    var earth_h = 'none';
    var tornadoes = 'none';
    var claims = 'none';
    var claim_info = '';
    var earthquake_h = 'none';
    var total_paid = 0;
    var wildfire_p = 'none';
    var claims_count = 0;
    var tornado_24 = 'none';
    var usweatheralerts = 'none';
    var flooding_r = 'none';
    var globaltemp = 'none';
    var civilunrest = 'none';
    var snowfall_72 = 'none';
    var MODIS = 'none';
    var minustemp = 'none';
    var maxustemp = 'none';
    var tsunami = 'none';
    var globalradar = 'none';

    function BasicControl() { };

    BasicControl.prototype.initialize = function (oControlHost, fnDoneInitializing, oDataStore) {

        

        jQuery("head link[rel='stylesheet']").last().after("<link href='https://api.mapbox.com/mapbox-gl-js/v2.11.0/mapbox-gl.css' rel='stylesheet' />");
        //jQuery("head link[rel='stylesheet']").last().after("<link href='https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css' />");
        jQuery("body").after("<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css' type='text/css' />");
        jQuery("body").prepend("<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.3.0/mapbox-gl-draw.css' type='text/css'/>");
        jQuery("tbody").after("<link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/nelnawawy-ventiv/geotest/Demobase7h.css' rel='stylesheet' />");
        jQuery("head link[rel='stylesheet']").last().after("<link href='https://cdn.jsdelivr.net/gh/nelnawawy-ventiv/geotest/Demobase7.css' type='text/css' />");

        //jQuery("td style").prepend("<div id='map'></div><div class='calculation-box'><p>Draw a polygon using the draw tools.</p><div id='calculated-area'></div></div>");
        var mapContainer = oControlHost.container.id;

        //*** Step 2a make some minor adjustments to default map */
        mapboxgl.accessToken = 'pk.eyJ1IjoiZnhoYXdrIiwiYSI6ImNqaDZqYmVsajFwb3kycWs0dzM5aDFxbXgifQ.DcqavEFQJWPJ8eUAGLbK_A'; //Make sure to add Map Token Key
        map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/' + MyStyle,
            center: [-.165748, 51.507], //Center Map
            zoom: 7, //Change Default Zoom
            interactive: true //Set Interactive to true
        });

        //Set up the Bounds variable
        bounds = new mapboxgl.LngLatBounds();

        //Tell Cognos that we are done initializing 
        fnDoneInitializing();

    };

    BasicControl.prototype.draw = function (oControlHost) {

        console.log('3. Draw ******************')

        var oPage = oControlHost.page;
        //jQuery('body .mapboxgl-control-container').append('<div id=' + 'console' + '>' + '<div>' + '<div class=' + 'session' + ' ' + 'id=' + 'sliderbar' + ' ' + '>' + ' ' + '<p>' + '<font color=' + "#efbf13" + '>' + 'Historical - Year: ' + '<label id=' + 'active-Year' + '>' + '2019' + '</label>' + '</font>' +
        //jQuery('body .mapboxgl-control-container').append('<div id=' + 'map-overlay top' + '>' + '<div>' + '<div class=' + 'map-overlay-inner' + ' ' + 'input id=' + 'slider' + ' ' + '>' + ' ' + '<h2>' + 'Historical - Year: ' + '</h2>' + '<label id=' + 'active-Year' + '>' + '2019' + '</label>' +
        jQuery('body .mapboxgl-control-container').append('<div id=' + 'console' + '>' + '<div>' + '<div class=' + 'session' + ' ' + 'id=' + 'sliderbar' + ' ' + '>' + ' ' + '<p>' + '<font color=' + "black" + ' style=' + 'font-size:0.7vw;' + '>' + 'Historical - Year: ' + '<label id=' + 'active-Year' + '>' + '2020' + '</label>' + '</font>' +
            '<input id=' + 'slider' + ' ' + 'type=' + 'range' + ' ' + 'min=' + '2018' + ' ' + 'max=' + '2023' + ' ' + 'step=' + '1' + ' ' + 'value=' + '2022' + '/>' + '</div>');
        jQuery('body .mapboxgl-control-container').append('<div class=' + 'calculation-box' + '>' + '<p>' + 'Create boundaries with the draw tool to select markers' + '</p>' + '<div id=' + 'calculated-area' + '>' + '</div>');
        //jQuery('body .mapboxgl-control-container').append('<div id=' + 'main-legend' + ' ' + 'class=' + 'legend' + '>' + '<h4>' + 'Legend' + '</h4>' + '</div>'); //'<div>' + '<span style=' + '"background-image:' + " url('https://cdn.rawgit.com/mapbox/mapbox-gl-styles/master/sprites/bright-v9/_svg/town-hall-11.svg')" + '; padding: 10px 10px 5px 10px; left: auto; margin: auto;">' + '</span>' + 'Properties' + '</div>' + '<div>' + '<span style=' + '"background-color: #efbf13"' + '>' + '</span>' + 'Claims' + '</div>' + '<div>' + '<span style=' + '"background-color: #f80a0a"' + '>' + '</span>' + 'Wildfire' + '</div>');

        var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
        map.on('load', function () {

            map.addSource('earthquakes', {
                type: 'geojson',
                data: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
            });
            map.addLayer({
                "id": "Earthquakes-last 30days",
                "type": "circle",
                "source": "earthquakes",
                "layout": {
                    "visibility": earth
                },
                "paint": {
                    "circle-color": "#f00",
                    "circle-radius": {
                        "property": "mag",
                        "base": 1.8,
                        "stops": [
                            [{ zoom: 0, value: 2 }, 2],
                            [{ zoom: 0, value: 8 }, 15],
                            [{ zoom: 11, value: 2 }, 20],
                            [{ zoom: 11, value: 8 }, 900],
                            [{ zoom: 20, value: 2 }, 40],
                            [{ zoom: 20, value: 8 }, 2250]
                        ],

                    }, "circle-opacity": 0.7,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#EE4234'//'#ffffff'
                }
            });
        });

        map.on('click', function (e) {

            var features = map.queryRenderedFeatures(e.point, {
                layers: ['Earthquakes-last 30days'] // replace this with the name of the layer
            });

            if (!features.length) {
                return;
            }

            var feature = features[0];
            var Day = new Date(feature.properties.time);
            var Day1 = Day.toUTCString();

            var popup = new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(feature.geometry.coordinates)
                .setHTML('<h3>' + feature.properties.place + '</h3><p>' + 'Magnitude: ' + feature.properties.mag + '<br>' + 'Date: ' + Day1 + '<br>' + 'source: http://earthquake.usgs.gov/earthquakes' + '</p>')
                .setLngLat(feature.geometry.coordinates)
                .addTo(map);

        });
        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'Earthquakes-last 30days', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Earthquakes-last 30days', function () {
            map.getCanvas().style.cursor = '';
        });

        map.on('load', function () {
            var frameCount = 1;
            for (var i = 0; i < frameCount; i++) {
                var revi = frameCount - i;
                var t = new Date();
                var d = t.getTime();
                var newD = d - 60 * 1000 * revi * 30;
                var datetext = new Date(newD);
                var newDiso = datetext.toISOString();
                var timeBlock = newDiso;
                map.addLayer({
                    'id': 'Radar-Today',
                    'type': 'raster',
                    'source': {
                        'type': 'raster',
                        'tiles': [
                            'https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WmsServer?service=WMS&request=GetMap&version=1.3.0&layers=1&styles=&format=image/png&transparent=true&height=256&width=256&crs=EPSG:3857&bbox={bbox-epsg-3857}&time=' + timeBlock
                        ],
                        'tileSize': 256
                    },
                    'layout': { 'visibility': radar },
                    'paint': {
                        'raster-opacity': 1,
                        'raster-opacity-transition': {
                            duration: 0
                        }
                    }
                });
            }

        });

        map.on("load", function () {
            map.addSource("points", {
                "type": "geojson",
                "data": geojsonFeature
            });


            map.addLayer({
                "id": "points",
                "type": "circle",
                "source": "points",
                "layout": {
                    "visibility": claims
                },
                "paint": {
                    'circle-radius': {
                        'base': 5.75,
                        'stops': [
                            [6, 6],
                            [8, 6],
                            [10, 8],
                            [12, 9],
                            [16, 10]
                        ]

                    },
                    "circle-color": "#efbf13",
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff'
                },
                "filter": ["==", "$type", "Point"],

            });


        });


        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'points', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'points', function () {
            map.getCanvas().style.cursor = '';
        });



        map.on('load', function () {
            map.addLayer({
                "id": "Hurricane-Today",
                "type": "raster",
                "minzoom": 0,
                "maxzoom": 22,
                "source": {
                    "type": "raster",
                    "tiles": ['https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteocean_tropicalcyclones_trackintensityfcsts_time/MapServer/export?dpi=96&transparent=true&format=png32&layers=show%3A0&bbox={bbox-epsg-3857}&bboxSR=EPSG:3857&imageSR=EPSG:3857&size=256,256&f=image'],
                    // https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteocean_tropicalcyclones_trackintensityfcsts_time/MapServer/export?dpi=96&transparent=true&format=png8&bbox=-19257827.773674857%2C-287473.82805563323%2C-8679055.928092321%2C8087387.216363874&bboxSR=102100&imageSR=102100&size=768%2C608&f=image
                    "tileSize": 256

                }, 'layout': { 'visibility': hurricane },
            });
        });

        map.on('load', function () {
            var frameCount = 1;
            for (var i = 0; i < frameCount; i++) {
                var revi = frameCount - i;
                var t = new Date();
                var d = t.getTime();
                var newD = d - 60 * 1000 * revi * 30;
                var datetext = new Date(newD);
                var newDiso = datetext.toISOString();
                var timeBlock = newDiso;
                map.addLayer({
                    'id': 'Lightning-Today',
                    'type': 'raster',
                    'source': {
                        'type': 'raster',
                        'tiles': [
                            'https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer/WmsServer?service=WMS&request=GetMap&version=1.3.0&layers=1&styles=&format=image/png&transparent=true&height=256&width=256&crs=EPSG:3857&bbox={bbox-epsg-3857}&time=' + timeBlock
                        ],
                        'tileSize': 256
                    },
                    'layout': { 'visibility': lightning },
                    'paint': {
                        'raster-opacity': 1,
                        'raster-opacity-transition': {
                            duration: 0
                        }
                    }
                });
            }

        });

        map.on('load', function () {
            map.addLayer({
                "id": "Hazardous Weather - Today",
                "type": "raster",
                "minzoom": 0,
                "maxzoom": 22,
                "source": {
                    "type": "raster",
                    "tiles": ['https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteoceanhydro_longduration_hazards_time/MapServer/export?dpi=96&transparent=true&format=png32&layers=show%3A0&bbox={bbox-epsg-3857}&bboxSR=EPSG:3857&imageSR=EPSG:3857&size=256,256&f=image'],
                    // https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteocean_tropicalcyclones_trackintensityfcsts_time/MapServer/export?dpi=96&transparent=true&format=png8&bbox=-19257827.773674857%2C-287473.82805563323%2C-8679055.928092321%2C8087387.216363874&bboxSR=102100&imageSR=102100&size=768%2C608&f=image
                    "tileSize": 256

                }, 'layout': { 'visibility': hazardous },
            });

            //jQuery.getJSON(https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteoceanhydro_longduration_hazards_time/MapServer/legend?dynamicLayers=%5B17%5D&f=pjson)

        });

        map.on('load', function () {
            map.addLayer({
                "id": "Wildfire",
                "type": "circle",
                "minzoom": 0,
                "maxzoom": 22,
                "source": {
                    "type": "geojson",
                    "data": 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/USA_Wildfires_v1/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='//'https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Public_Wildfire_Perimeters_View/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='


                }, 'layout': { 'visibility': wildfire_p },
                'paint': {
                    'circle-radius': 5,
                    'circle-color': 'rgba(247, 12, 12, 0.4)',
                    'circle-stroke-color': '#ffffff', //'rgba(4, 0, 0, 1)',
                    'circle-stroke-width': 1
                }
            });




        });

        map.on('click', 'Wildfire', function (e) {
            var Day = new Date(e.features[0].properties.FireDiscoveryDateTime);
            var Day1 = Day.toUTCString();

            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<h3>' + 'IncidentName: ' + e.features[0].properties.IncidentName + '</h3><p>' + 'Date: ' + Day1 + '<br>' + 'Daily Acres Affected: ' + Math.round(e.features[0].properties.DailyAcres) + '</p>')
                .addTo(map);
        });

        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Wildfire', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Wildfire', function () {
            map.getCanvas().style.cursor = '';
        });




        map.on('load', function () {

            map.addSource('HistTorPath2019shape-5sozpv', {
                type: 'vector',
                url: 'mapbox://nevnd.4gf3vfwd' //fxhawk.b7tr8njd'
            });
            map.addLayer({
                "id": "Tornadoes - Historical",
                "type": "line",
                "source": "HistTorPath2019shape-5sozpv",
                "source-layer": "HistTorPath2019shape-5sozpv",
                "layout": {
                    "visibility": tornadoes
                },
                "paint": {
                    "line-color": "hsl(275, 71%, 60%)",
                    "line-opacity": 0.67,
                    "line-width": 5
                },

            });
        })
        map.on('load', function () {

            map.addSource('queryearthquakes20182022-3pr9wn', {
                type: 'vector',
                url: 'mapbox://nevnd.6trtqcg4' //fxhawk.cjhhzt5rk00hw2xro80s4lgdy-8ybmv'
            });
            map.addLayer({
                'id': 'Earthquake - Historical',
                "type": "circle",
                "source": "queryearthquakes20182022-3pr9wn",
                "source-layer": "queryearthquakes20182022-3pr9wn",
                "layout": {
                    "visibility": earthquake_h
                },
                "paint": {
                    "circle-color": "#f00",
                    "circle-radius": {
                        "property": "mag",
                        "base": 3, //1.8,
                        "stops": [
                            [{ zoom: 0, value: 4 }, 2],
                            [{ zoom: 0, value: 8 }, 15],
                            [{ zoom: 11, value: 4 }, 20],
                            [{ zoom: 11, value: 8 }, 900],
                            [{ zoom: 20, value: 4 }, 40],
                            [{ zoom: 20, value: 8 }, 2250]
                        ],

                    }, "circle-opacity": 0.7,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#EE4234'//'#ffffff'
                }
            });
        });

        map.on('load', function () {
            map.addLayer({
                "id": "Tornadoes - 24HR",
                "type": "circle",
                "minzoom": 0,
                "maxzoom": 22,
                "source": {
                    "type": "geojson",
                    "data": 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/NOAA_storm_reports_v1/FeatureServer/1/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='//'https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Public_Wildfire_Perimeters_View/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='

                }, 'layout': { 'visibility': tornado_24 },
                'paint': {
                    'circle-radius': 5,
                    'circle-color': 'hsl(275, 71%, 60%)',
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff'
                    //'circle-outline-color': 'white'
                    //'circle-outline-color': 'rgba(4, 0, 0, 1)'
                }
            });

        });

        map.on('load', function () {
            map.addLayer({
                "id": "US Weather Alerts",
                "type": "fill",
                "minzoom": 0,
                "maxzoom": 22,
                "source": {
                    "type": "geojson",
                    "data": 'https://api.weather.gov/alerts/active'

                }, 'layout': { 'visibility': usweatheralerts },
                'paint': {
                    'fill-color': 'hsl(275, 71%, 60%)',
                    'fill-opacity': 0.7,
                    'fill-outline-color': '#ffffff'
                    //'circle-outline-color': 'white'
                    //'circle-outline-color': 'rgba(4, 0, 0, 1)'
                }
            });
        });

        map.on('click', 'US Weather Alerts', function (e) {


            var features = map.queryRenderedFeatures(e.point, {
                layers: ['US Weather Alerts'] // replace this with the name of the layer
            });

            if (!features.length) {
                return;
            }

            var feature = features[0];

            //var coordinates = e.feature.geometry.slice();

            /*while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }*/


            var popup = new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(e.lngLat)
                //.setLngLat(feature.geometry.coordinates[0])
                .setHTML('<h3>' + feature.properties.headline + '</h3><p>' + '<br>' + 'Effective: ' + feature.properties.effective + '<br>' + 'Expires: ' + feature.properties.expires + '<br>' + ' Event Type: ' + feature.properties.event + '<br>' + ' Severity: ' + feature.properties.severity + '<br>' + ' Status: ' + feature.properties.status + '</p>')

                .addTo(map);

        });

        map.on('mouseenter', 'US Weather Alerts', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'US Weather Alerts', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('load', function () {
            map.addLayer({
                'id': 'US Flood Zones',
                'type': 'raster',
                "minzoom": 0,
                "maxzoom": 22,
                'source': {
                    'type': 'raster',
                    'tiles': [
                        'https://coast.noaa.gov/arcgis/rest/services/FloodExposureMapper/CFEM_CoastalFloodHazardComposite/MapServer/export?bbox={bbox-epsg-3857}&bboxSR=&layers=&layerDefs=&size=&imageSR=&historicMoment=&format=png&transparent=true&dpi=96&time=&layerTimeOptions=&dynamicLayers=&gdbVersion=&mapScale=&rotation=&datumTransformations=&layerParameterValues=&mapRangeValues=&layerRangeValues=&f=image'],
                    //'{bbox-epsg-3857}'
                    //'https://coast.noaa.gov/arcgis/rest/services/FloodExposureMapper/CFEM_CoastalFloodHazardComposite/MapServer/export?bbox=-1.4711160122108094E7%2C5361692.717992013%2C-6122471.817885257%2C6646614.59027732&bboxSR=&layers=&layerDefs=&size=&imageSR=&historicMoment=&format=png&transparent=true&dpi=96&time=&layerTimeOptions=&dynamicLayers=&gdbVersion=&mapScale=&rotation=&datumTransformations=&layerParameterValues=&mapRangeValues=&layerRangeValues=&f=image'], //'https://coast.noaa.gov/arcgis/services/FloodExposureMapper/CFEM_CoastalFloodHazardComposite/MapServer/export?dpi=96&transparent=true&format=png32&layers=show%3A0&bbox={bbox-epsg-3857}&bboxSR=EPSG:3857&imageSR=EPSG:3857&size=256,256&f=image'],  // query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=
                    'tilesize': 256

                },
                'layout': { 'visibility': flooding_r }
            });
        });

        map.on('load', function () {

            map.addSource('GEDEvent_v22_01to09-39nist', {
                type: 'vector',
                url: 'mapbox://nevnd.6614eh33' //nevnd.ckr0tdn0u4rov20to1aq9z17x-5p275' //fxhawk.cjhhzt5rk00hw2xro80s4lgdy-8ybmv'
            });
            map.addLayer({
                'id': 'Global Civil Unrest',
                "type": "circle",
                "source": "GEDEvent_v22_01to09-39nist",
                "source-layer": "GEDEvent_v22_01to09-39nist",
                "layout": {
                    "visibility": civilunrest
                },
                "paint": {
                    "circle-color": "#FF8A33",
                    "circle-radius": {
                        "property": "best",
                        "base": 3, //1.8,
                        "stops": [
                            [{ zoom: 0, value: 1 }, 2],
                            [{ zoom: 0, value: 100 }, 15],
                            [{ zoom: 11, value: 1 }, 20],
                            [{ zoom: 11, value: 100 }, 900],
                            [{ zoom: 20, value: 1 }, 40],
                            [{ zoom: 20, value: 100 }, 2250]
                        ],

                    },
                    "circle-opacity": 0.7,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#EE4234'//'#ffffff'
                }
            });
        });

        map.on('click', 'Global Civil Unrest', function (e) {


            var features = map.queryRenderedFeatures(e.point, {
                layers: ['Global Civil Unrest'] // replace this with the name of the layer
            });

            if (!features.length) {
                return;
            }

            var feature = features[0];

            //var coordinates = e.feature.geometry.slice();

            /*while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }*/


            var popup = new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(e.lngLat)
                //.setLngLat(feature.geometry.coordinates[0])
                .setHTML('<h3>' + feature.properties.conflict_name + '</h3><p>' + 'Country: ' + feature.properties.country + '<br>' + 'Source Date: ' + feature.properties.source_date + '<br>' + ' Headline: ' + '<i>' + feature.properties.source_headline + '</i>' + '<br>' + ' Sources: ' + feature.properties.source_office + '<br>' + ' Civilian Deaths: ' + feature.properties.deaths_civilians + '<br>' + 'Estimated Total Fatalities: ' + feature.properties.best + '</p>')

                .addTo(map);

        });

        map.on('mouseenter', 'Global Civil Unrest', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'Global Civil Unrest', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('load', function () {
            map.addLayer({
                "id": "Snowfall - 72HR",
                "type": "fill",
                "minzoom": 0,
                "maxzoom": 22,
                "source": {
                    "type": "geojson",
                    "data": 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/NDFD_SnowFall_v1/FeatureServer/2/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='//'https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Public_Wildfire_Perimeters_View/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='

                }, 'layout': { 'visibility': snowfall_72 },
                'paint': {
                    'fill-color': 'hsl(260, 96%, 49%)',
                    'fill-opacity': 0.5
                    //'circle-outline-color': 'white'
                    //'circle-outline-color': 'rgba(4, 0, 0, 1)'
                }
            });




        });

        map.on('mouseenter', 'Tornadoes - Historical', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'Tornadoes - Historical', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('click', function (e) {


            var features = map.queryRenderedFeatures(e.point, {
                layers: ['Tornadoes - 24HR'] // replace this with the name of the layer
            });

            if (!features.length) {
                return;
            }

            var feature = features[0];
            var TorDay = new Date(feature.properties.UTC_DATETIME);
            var TorDay1 = TorDay.toUTCString();

            var popup = new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(feature.geometry.coordinates)
                .setHTML('<h3>' + feature.properties.COUNTY + ', ' + feature.properties.STATE + '</h3><p>' + '<br>' + 'Location: ' + feature.properties.LOCATION + '<br>' + 'Date: ' + TorDay1 + '<br>' + ' Comments: ' + feature.properties.COMMENTS + '</p>')
                .setLngLat(feature.geometry.coordinates)
                .addTo(map);

        });

        map.on('click', function (e) {


            var features = map.queryRenderedFeatures(e.point, {
                layers: ['Earthquake - Historical'] // replace this with the name of the layer
            });

            if (!features.length) {
                return;
            }

            var feature = features[0];

            var popup = new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(feature.geometry.coordinates)
                .setHTML('<h3>' + feature.properties.place + '</h3><p>' + 'Magnitude: ' + feature.properties.mag + '<br>' + 'Year: ' + feature.properties.Year + ' Month: ' + feature.properties.Month + ' Day: ' + feature.properties.Day + '</p>')
                //.setLngLat(feature.geometry.coordinates)
                .addTo(map);

        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'Earthquake - Historical', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Earthquake - Historical', function () {
            map.getCanvas().style.cursor = '';
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'Earthquake - Historical', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Earthquake - Historical', function () {
            map.getCanvas().style.cursor = '';
        });

        map.on('load', function () {
            map.addLayer({
                "id": "Global Fire and Thermal Activity",
                "type": "circle",
                "minzoom": 0,
                "maxzoom": 22,
                "source": {
                    "type": "geojson",
                    "data": 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/MODIS_Thermal_v1/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='


                }, 'layout': { 'visibility': MODIS },
                'paint': {
                    'circle-radius': 5,
                    'circle-color': '#c4340c',//'rgba(247, 12, 12, 0.4)',
                    'circle-stroke-color': '#ffffff', //'rgba(4, 0, 0, 1)',
                    'circle-stroke-width': 1
                }
            });




        });

        map.on('click', 'Global Fire and Thermal Activity', function (e) {
            var Day = new Date(e.features[0].properties.ACQ_DATE);
            var Day1 = Day.toUTCString();

            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<h3>' + 'Fire Hotspot' + '</h3><p>' + 'Date: ' + Day1 + '<br>' + 'Day/Night: ' + e.features[0].properties.DAYNIGHT + '<br>' + 'Hours Old: ' + e.features[0].properties.HOURS_OLD + '</p>')
                .addTo(map);
        });

        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Global Fire and Thermal Activity', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Global Fire and Thermal Activity', function () {
            map.getCanvas().style.cursor = '';
        });


        map.on('load', function () {
            map.addLayer({
                "id": "Tsunami",
                "type": "circle",
                "minzoom": 0,
                "maxzoom": 22,
                "source": {
                    "type": "geojson",
                    "data": 'https://services2.arcgis.com/C8EMgrsFcRFL6LrL/ArcGIS/rest/services/tsunami_events/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='///'https://www.ngdc.noaa.gov/hazel/hazard-service/api/v1/tsunamis/events?minYear=2021'

                }, 'layout': { 'visibility': tsunami },
                'paint': {
                    'circle-color': '#1483c7',
                    'circle-opacity': 0.7,
                    'circle-stroke-color': '#91e1f2',
                    'circle-stroke-width': 1,
                    "circle-radius": {
                        "property": "EQ_MAGNITUDE_RANK",
                        "base": 1.8,
                        "stops": [
                            [{ zoom: 0, value: 2 }, 2],
                            [{ zoom: 0, value: 8 }, 15],
                            [{ zoom: 11, value: 2 }, 20],
                            [{ zoom: 11, value: 8 }, 900],
                            [{ zoom: 20, value: 2 }, 40],
                            [{ zoom: 20, value: 8 }, 2250]
                        ],

                    },
                    //'circle-outline-color': 'white'
                    //'circle-outline-color': 'rgba(4, 0, 0, 1)'
                }
            });
        });

        map.on('click', 'Tsunami', function (e) {
            var Day = new Date(e.features[0].properties.ACQ_DATE);
            var Day1 = Day.toUTCString();

            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<h3>' + 'Historically Significant Tsunami' + '</h3><p>' + 'Date: ' + e.features[0].properties.MONTH + "/" + e.features[0].properties.DAY + "/" + e.features[0].properties.YEAR + '<br>' + 'Location: ' + e.features[0].properties.LOCATION_NAME + '<br>' + 'Intensity: ' + e.features[0].properties.TS_INTENSITY + '<br>' + 'Damage: ' + e.features[0].properties.DAMAGE_TOTAL_DESCRIPTION + '<br>' + 'Injuries: ' + e.features[0].properties.INJURIES_TOTAL_DESCRIPTION + '<br>' + 'Deaths: ' + e.features[0].properties.DEATHS_TOTAL_DESCRIPTION + '</p>')
                .addTo(map);
        });

        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Tsunami', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Tsunami', function () {
            map.getCanvas().style.cursor = '';
        });

        map.on('load', function () {
            map.addSource('aerisweather-layers', {
                type: 'raster',
                tiles: [
                    'https://maps1.aerisapi.com/mA09d6UbckvIzJgLCWzs7_FuG4M8lYxoOJUTvtvyMy2c5hhpSdmE9L89KyBSGU/radar-global/{z}/{x}/{y}/current.png',
                    'https://maps2.aerisapi.com/mA09d6UbckvIzJgLCWzs7_FuG4M8lYxoOJUTvtvyMy2c5hhpSdmE9L89KyBSGU/radar-global/{z}/{x}/{y}/current.png',
                    'https://maps3.aerisapi.com/mA09d6UbckvIzJgLCWzs7_FuG4M8lYxoOJUTvtvyMy2c5hhpSdmE9L89KyBSGU/radar-global/{z}/{x}/{y}/current.png',
                    'https://maps4.aerisapi.com/mA09d6UbckvIzJgLCWzs7_FuG4M8lYxoOJUTvtvyMy2c5hhpSdmE9L89KyBSGU/radar-global/{z}/{x}/{y}/current.png'
                ],
                tileSize: 256,
                attribution: '<a href="https://www.aerisweather.com/">AerisWeather</a>'
            });
            map.addLayer({
                id: 'Global Weather Radar',
                type: 'raster',
                source: 'aerisweather-layers',
                minzoom: 0,
                maxzoom: 22,
                "layout": {
                    "visibility": globalradar
                },
                'paint': {
                    'raster-opacity': 1,
                    'raster-opacity-transition': {
                        duration: 0
                    }
                }
            });
        });

        map.on('load', () => {
            map.addSource('aeristemps', {
                type: 'raster',
                tiles: [
                    'https://maps1.aerisapi.com/mA09d6UbckvIzJgLCWzs7_CYzzAPNCnZpW0NWFictnXWspQJkzAhi9XIRH6D6D/temperatures,temperatures-text/{z}/{x}/{y}/current.png',
                    'https://maps2.aerisapi.com/mA09d6UbckvIzJgLCWzs7_CYzzAPNCnZpW0NWFictnXWspQJkzAhi9XIRH6D6D/temperatures,temperatures-text/{z}/{x}/{y}/current.png',
                    'https://maps3.aerisapi.com/mA09d6UbckvIzJgLCWzs7_CYzzAPNCnZpW0NWFictnXWspQJkzAhi9XIRH6D6D/temperatures,temperatures-text/{z}/{x}/{y}/current.png',
                    'https://maps4.aerisapi.com/mA09d6UbckvIzJgLCWzs7_CYzzAPNCnZpW0NWFictnXWspQJkzAhi9XIRH6D6D/temperatures,temperatures-text/{z}/{x}/{y}/current.png'
                ],
                tileSize: 256,
                attribution: '<a href="https://www.aerisweather.com/">AerisWeather</a>'
            });
            map.addLayer({
                id: 'Global Temps',
                'type': 'raster',
                'source': 'aeristemps',
                "layout": {
                    "visibility": globaltemp
                },
                'paint': {
                    'raster-fade-duration': 0
                }
            });
        });


        map.on('load', function () {
            map.addSource('Properties2', {
                type: 'vector',
                url: 'mapbox://nevnd.cl2sfekux0fy920o0lzm2npvw-61a2t'//'mapbox://fxhawk.cjhkjvk4202mi6mt2y4lkns44-7mdr6'
            });
            map.addLayer({
                'id': 'Properties2',
                'type': 'circle',
                'source': 'Properties2',
                'source-layer': 'Properties2',
                "layout": {
                    "visibility": property//,
                    /*"text-field": [
                        "format",
                        [
                            "get",
                            "Office"
                        ], { 'font-scale': 1 }
                    ],
                    "text-size": 12,
                    "text-anchor": "top-left",
                    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                    //'text-allow-overlap': true, 
                    //'icon-allow-overlap': true*/
                },
                "paint": {
                    "circle-color": '#1d82ac',
                    "circle-radius": 5.75,
                    "circle-stroke-color": "white",
                    "circle-stroke-width": 1
                    //"text-color": '#1d82ac', //'#261d1d', //'#f70707',//"rgb(152, 153, 29)",
                    //"icon-opacity": 1,
                    //"text-halo-color": '#02415c', //"#fff",
                    //"text-halo-width": 0.2
                }
            });
        })

        map.on('click', function (e) {
            var features = map.queryRenderedFeatures(e.point, {
                layers: ['Properties2'] // replace this with the name of the layer
            });

            if (!features.length) {
                return;
            }

            var feature = features[0];
            var propvalue = Number(feature.properties.Value);
            var url = 'http://www.ventivtech.com'
            var popup = new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(feature.geometry.coordinates)
                .setHTML('<h3>' + feature.properties.Office + '</h3>' + 'Street: ' + feature.properties.Street + '<br>' + 'Insured Value: ' + propvalue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + '</p>')
                .setLngLat(feature.geometry.coordinates)

                .addTo(map);
        });
        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'Properties2', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Properties2', function () {
            map.getCanvas().style.cursor = '';
        });

        document.getElementById('slider').addEventListener('input', function (e) {
            var Year = parseInt(e.target.value);
            // update the map

            map.setFilter('Earthquake - Historical', ['==', ['number', ['get', 'Year']], Year]);
            map.setFilter('Tornadoes - Historical', ['==', ['number', ['get', 'yr']], Year]);



            // update text in the UI
            document.getElementById('active-Year').innerText = Year;
        });


        // Add geolocate control to the map.
        var nav = new mapboxgl.GeolocateControl();
        map.addControl(nav, 'bottom-right');

        // Add geolocate control to the map.
        var navig = new mapboxgl.NavigationControl();
        map.addControl(navig, 'bottom-right');

        map.addControl(new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        }));

        //Zoom and Fit map to points
        geojsonFeature.features.forEach(function (feature) {
            bounds.extend(feature.geometry.coordinates);
        });

        map.fitBounds(bounds, {
            padding: 60

        });

        var draw = new MapboxDraw({
            displayControlsDefault: true,
            controls: {
                polygon: true,
                trash: true
            }
        });
        map.addControl(draw);

        // map.on('draw.create', updateArea);
        map.on('draw.delete', updateArea);
        map.on('draw.update', updateArea);
        map.on('draw.combine', updateArea);



        map.on('draw.create', function (e) {
            var userPolygon = e.features[0];


            // generate bounding box from polygon the user drew
            var polygonBoundingBox = turf.bbox(userPolygon);

            var southWest = [polygonBoundingBox[0], polygonBoundingBox[1]];
            var northEast = [polygonBoundingBox[2], polygonBoundingBox[3]];

            var northEastPointPixel = map.project(northEast);
            var southWestPointPixel = map.project(southWest);

            var features = map.queryRenderedFeatures([southWestPointPixel, northEastPointPixel], { layers: ['points'] });



            window.aggr = features.reduce(function (memo, feature, Paid3) {

                if (!(undefined === turf.intersect(feature, userPolygon))) {
                    // only add the property, if the feature intersects with the polygon drawn by the user

                    var Paid3 = feature.properties.total_paid3;

                    console.log("2****************")

                    console.log(Paid3)

                }
                return memo + Paid3;
            }, 0);

            console.log(aggr)


            updateArea()

        });



        map.on('draw.update', function (e) {
            var userPolygon = e.features[0];


            // generate bounding box from polygon the user drew
            var polygonBoundingBox = turf.bbox(userPolygon);

            var southWest = [polygonBoundingBox[0], polygonBoundingBox[1]];
            var northEast = [polygonBoundingBox[2], polygonBoundingBox[3]];

            var northEastPointPixel = map.project(northEast);
            var southWestPointPixel = map.project(southWest);

            var features = map.queryRenderedFeatures([southWestPointPixel, northEastPointPixel], { layers: ['points'] });



            window.aggr = features.reduce(function (memo, feature, Paid3) {

                if (!(undefined === turf.intersect(feature, userPolygon))) {
                    // only add the property, if the feature intersects with the polygon drawn by the user

                    var Paid3 = feature.properties.total_paid3;

                    console.log("2****************")

                    console.log(Paid3)

                }
                return memo + Paid3;
            }, 0);

            console.log(aggr)
            console.log(e)

            updateArea()

        });




        function updateArea(e) {

            var data = draw.getAll();
            var options2 = { style: 'currency', currency: 'USD' };
            var numberFormat2 = new Intl.NumberFormat('en-US', options2);
            console.log(data)

            var answer = document.getElementById('calculated-area');
            if (data.features.length > 0) {

                answer.innerHTML = '<p><strong>' + 'Value: ' + window.aggr.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + '</strong></p>';
            } else {
                answer.innerHTML = '';
                if (e.type !== 'draw.delete') alert("Use the draw tools to draw a polygon!");
            }
        }




    };


    BasicControl.prototype.setData = function (oControlHost, oDataStore) {
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
            feature['properties'] = { 'name': oDataStore.getCellValue(iRow, 0), 'total_paid3': oDataStore.getCellValue(iRow, 24) }
            earth = oDataStore.getCellValue(iRow, 3)
            radar = oDataStore.getCellValue(iRow, 4)
            MyStyle = oDataStore.getCellValue(iRow, 5)
            property = oDataStore.getCellValue(iRow, 6)
            lightning = oDataStore.getCellValue(iRow, 7)
            hurricane = oDataStore.getCellValue(iRow, 8)
            hazardous = oDataStore.getCellValue(iRow, 9)
            earthquake_h = oDataStore.getCellValue(iRow, 10)
            tornadoes = oDataStore.getCellValue(iRow, 11)
            claims = oDataStore.getCellValue(iRow, 12)
            claim_info = oDataStore.getCellValue(iRow, 13)
            wildfire_p = oDataStore.getCellValue(iRow, 14)
            tornado_24 = oDataStore.getCellValue(iRow, 15)
            usweatheralerts = oDataStore.getCellValue(iRow, 16)
            flooding_r = oDataStore.getCellValue(iRow, 17)
            globaltemp = oDataStore.getCellValue(iRow, 18)
            civilunrest = oDataStore.getCellValue(iRow, 19)
            snowfall_72 = oDataStore.getCellValue(iRow, 20)
            MODIS = oDataStore.getCellValue(iRow, 21)
            // rainviewer = oDataStore.getCellValue(iRow, 22)
            tsunami = oDataStore.getCellValue(iRow, 22)
            globalradar = oDataStore.getCellValue(iRow, 23)

            // map.setStyle('mapbox://styles/mapbox/' + MyStyle);
            geojsonFeature['features'].push(feature)
        }
        map.setStyle('mapbox://styles/mapbox/' + MyStyle);
        console.log('Style Check')
        map.on('click', 'points', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var Paid = e.features[0].properties.total_paid3;
            var Claim_N = e.features[0].properties.name;
            var Street_N = e.features[0].properties.Street;
            var City_N = e.features[0].properties.Accident_City;

            var options2 = { style: 'currency', currency: 'USD' };
            var numberFormat2 = new Intl.NumberFormat('en-US', options2);
            var paidr = Math.round(Paid * Math.pow(10, 2)) / Math.pow(10, 2).toFixed(2);
            var paidf = paidr.toLocaleString();

            var total_claims = e.features[0].properties.claims_count;


            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML('<h3>' + 'Claim: ' + Claim_N + '</h3>' + /*'Street: ' + Street_N + '<br>' + 'City: ' + City_N + '<br>' + */'Paid: ' + Paid.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })/* + 'Claims TYTD: ' + total_claims*/ + '</p>')//+ 'Total Insured: $ ' + paidf + '<br>' + 'Claims TYTD: ' + total_claims + '</p>')
                .addTo(map);
        });




    };


    return BasicControl;
});
