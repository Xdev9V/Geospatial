define(["https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.js", "jquery", "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js", "https://api.mapbox.com/mapbox.js/plugins/turf/v3.0.11/turf.min.js", "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.3.0/mapbox-gl-draw.js", "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",/*"https://code.jquery.com/ui/1.12.1/jquery-ui.min.js",*/ "text! https://cdn.jsdelivr.net/gh/nelnawawy-ventiv/geotest/Demobase7.css"/*, "https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"*/], function (mapboxgl, jQuery, MapboxGeocoder, turf, MapboxDraw, slider1, slider2, Info) {
    "use strict";
    var map = '',
        bounds = '',
        geojsonFeature = {};
    var earth = 'none';
    var hzweatherpt = 'none';
    var MyStyle = 'dark-v10';
    var property = 'visible';
    var hzweatherline = 'none';
    var waterstress2030 = 'none';
    var auslanduse = 'none';
    var earth_h = 'none';
    var snowfall126 = 'none';
    var claims = 'none';
    var claim_info = '';
    var earthquake_h = 'none';
    var total_paid = 0;
    var avghouse = 'none';
    var claims_count = 0;
    var sealevel2030 = 'none';
    var globalforecast = 'none';
    var civilunrest = 'none';
    var temp_eu = 'none';
    var MODIS = 'none';
    var lng = 0;
    var lat = 0;
    var net_incurred_total = 0;
    var Business_Unit = 'none';
    var Coverage = 'none';
    var volcanerup = 'none';
    var manila100yr = 'none';
    var manilaldslide = 'none';

    function BasicControl() { };

    BasicControl.prototype.initialize = function (oControlHost, fnDoneInitializing, oDataStore) {

        document.getElementById("v30_ValueComboBox").addEventListener("change", myFunction);

        function myFunction() {

            var visibility = map.getLayoutProperty('Properties2', 'visibility');

            if (sessionStorage.getItem('visibility') === 'visible') {
                map.setLayoutProperty('Properties2', 'visibility', 'none');
                sessionStorage.setItem('visibility', 'none');
                //document.getElementById("v30_ValueComboBox").style.backgroundColor = '#9BA3A5';

            } else {

                map.setLayoutProperty('Properties2', 'visibility', 'visible');
                sessionStorage.setItem('visibility', 'visible');
                //document.getElementById("v30_ValueComboBox").style.backgroundColor = '#efbf13';
            }
        }

        document.getElementById("v42_ValueComboBox").addEventListener("change", myFunction2);

        function myFunction2() {

            var visibility = map.getLayoutProperty('points', 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty('points', 'visibility', 'none');
                //document.getElementById("v42_ValueComboBox").style.backgroundColor = '#9BA3A5';

            } else {

                map.setLayoutProperty('points', 'visibility', 'visible');
                //document.getElementById("v42_ValueComboBox").style.backgroundColor = '#EFE013';
            }
            //map.setLayoutProperty('points', 'visibility', 'visible');

        }

        document.getElementById("v54_ValueComboBox").addEventListener("change", myFunction4);

        function myFunction4() {

            var visibility = map.getLayoutProperty('Hazardous Weather - Tracks', 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty('Hazardous Weather - Tracks', 'visibility', 'none');
                //document.getElementById("v66_ValueComboBox").style.backgroundColor = '#9BA3A5';

            } else {

                map.setLayoutProperty('Hazardous Weather - Tracks', 'visibility', 'visible');
                //document.getElementById("v66_ValueComboBox").style.backgroundColor = '#EFE013';
            }

        }

        document.getElementById("v66_ValueComboBox").addEventListener("change", myFunction3);

        function myFunction3() {

            var visibility = map.getLayoutProperty('Hazardous Weather - Position', 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty('Hazardous Weather - Position', 'visibility', 'none');
                //document.getElementById("v54_ValueComboBox").style.backgroundColor = '#9BA3A5';

            } else {

                map.setLayoutProperty('Hazardous Weather - Position', 'visibility', 'visible');
                //document.getElementById("v54_ValueComboBox").style.backgroundColor = '#EFE013';
            }

        }

        document.getElementById("v78_ValueComboBox").addEventListener("change", myFunction5);

        function myFunction5() {

            var visibility = map.getLayoutProperty('Water Stress 2030', 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty('Water Stress 2030', 'visibility', 'none');
                //document.getElementById("v78_ValueComboBox").style.backgroundColor = '#9BA3A5';

            } else {

                map.setLayoutProperty('Water Stress 2030', 'visibility', 'visible');
                //document.getElementById("v78_ValueComboBox").style.backgroundColor = '#EFE013';
            }

        }

        document.getElementById("v90_ValueComboBox").addEventListener("change", myFunction7);

        function myFunction7() {

            var visibility = map.getLayoutProperty('Earthquakes - Last 30 Days', 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty('Earthquakes - Last 30 Days', 'visibility', 'none');
                //document.getElementById("v102_ValueComboBox").style.backgroundColor = '#9BA3A5';

            } else {

                map.setLayoutProperty('Earthquakes - Last 30 Days', 'visibility', 'visible');
                //document.getElementById("v102_ValueComboBox").style.backgroundColor = '#EFE013';
            }

        }

        document.getElementById("v102_ValueComboBox").addEventListener("change", myFunction8);

        function myFunction8() {

            var visibility = map.getLayoutProperty('Earthquake - Historical', 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty('Earthquake - Historical', 'visibility', 'none');
                //document.getElementById("v114_ValueComboBox").style.backgroundColor = '#9BA3A5';

            } else {

                map.setLayoutProperty('Earthquake - Historical', 'visibility', 'visible');
                //document.getElementById("v114_ValueComboBox").style.backgroundColor = '#EFE013';
            }

        }


        document.getElementById("v114_ValueComboBox").addEventListener("change", sealevelfunction);

        function sealevelfunction() {

            var visibility = map.getLayoutProperty('Sea Level Rise 2030', 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty('Sea Level Rise 2030', 'visibility', 'none');
                //document.getElementById("v126_ValueComboBox").style.backgroundColor = '#9BA3A5';

            } else {

                map.setLayoutProperty('Sea Level Rise 2030', 'visibility', 'visible');
                //document.getElementById("v126_ValueComboBox").style.backgroundColor = '#EFE013';
            }

        }

        document.getElementById("v126_ValueComboBox").addEventListener("change", myFunctionUSWA);

        function myFunctionUSWA() {

            var visibility = map.getLayoutProperty('Global Radar (GOES)', 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty('Global Radar (GOES)', 'visibility', 'none');
                //document.getElementById("v138_ValueComboBox").style.backgroundColor = '#9BA3A5';

            } else {

                map.setLayoutProperty('Global Radar (GOES)', 'visibility', 'visible');
                //document.getElementById("v138_ValueComboBox").style.backgroundColor = '#EFE013';
            }

        }



        document.getElementById("v137_ValueComboBox").addEventListener("change", myFunctionGCU);

        function myFunctionGCU() {

            var visibility = map.getLayoutProperty('Global Civil Unrest', 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty('Global Civil Unrest', 'visibility', 'none');
                //document.getElementById("v138_ValueComboBox").style.backgroundColor = '#9BA3A5';

            } else {

                map.setLayoutProperty('Global Civil Unrest', 'visibility', 'visible');
                //document.getElementById("v138_ValueComboBox").style.backgroundColor = '#EFE013';
            }

        }

        document.getElementById("v148_ValueComboBox").addEventListener("change", myFunctionMODIS);

        function myFunctionMODIS() {

            var visibility = map.getLayoutProperty('Global Fire and Thermal Activity', 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty('Global Fire and Thermal Activity', 'visibility', 'none');
                //document.getElementById("v138_ValueComboBox").style.backgroundColor = '#9BA3A5';

            } else {

                map.setLayoutProperty('Global Fire and Thermal Activity', 'visibility', 'visible');
                //document.getElementById("v138_ValueComboBox").style.backgroundColor = '#EFE013';
            }

        }

        document.getElementById("v148_ValueComboBox").addEventListener("change", myFunctionMODIS);

        function myFunctionMODIS() {

            var visibility = map.getLayoutProperty('Global Fire and Thermal Activity', 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty('Global Fire and Thermal Activity', 'visibility', 'none');
                //document.getElementById("v138_ValueComboBox").style.backgroundColor = '#9BA3A5';

            } else {

                map.setLayoutProperty('Global Fire and Thermal Activity', 'visibility', 'visible');
                //document.getElementById("v138_ValueComboBox").style.backgroundColor = '#EFE013';
            }

        }

        document.getElementById("v159_ValueComboBox").addEventListener("change", myFunctionVOL);

        function myFunctionVOL() {

            var visibility = map.getLayoutProperty('Significant Volcanic Eruptions', 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty('Significant Volcanic Eruptions', 'visibility', 'none');
                //document.getElementById("v138_ValueComboBox").style.backgroundColor = '#9BA3A5';

            } else {

                map.setLayoutProperty('Significant Volcanic Eruptions', 'visibility', 'visible');
                //document.getElementById("v138_ValueComboBox").style.backgroundColor = '#EFE013';
            }

        }

        document.getElementById("v170_ValueComboBox").addEventListener("change", myFunctionMN100yr);

        function myFunctionMN100yr() {

            var visibility = map.getLayoutProperty('Manila 100YR Floodplain', 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty('Manila 100YR Floodplain', 'visibility', 'none');
                //document.getElementById("v138_ValueComboBox").style.backgroundColor = '#9BA3A5';

            } else {

                map.setLayoutProperty('Manila 100YR Floodplain', 'visibility', 'visible');
                //document.getElementById("v138_ValueComboBox").style.backgroundColor = '#EFE013';
            }

        }

        document.getElementById("v181_ValueComboBox").addEventListener("change", myFunctionMNLD);

        function myFunctionMNLD() {

            var visibility = map.getLayoutProperty('Manila Landslide Hazard', 'visibility');

            if (visibility === 'visible') {
                map.setLayoutProperty('Manila Landslide Hazard', 'visibility', 'none');
                //document.getElementById("v138_ValueComboBox").style.backgroundColor = '#9BA3A5';

            } else {

                map.setLayoutProperty('Manila Landslide Hazard', 'visibility', 'visible');
                //document.getElementById("v138_ValueComboBox").style.backgroundColor = '#EFE013';
            }

        }

        jQuery("head link[rel='stylesheet']").last().after("<link href='https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css' rel='stylesheet' />");
        //jQuery("head link[rel='stylesheet']").last().after("<link href='https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css' />");
        jQuery("body").after("<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css' type='text/css' />");
        jQuery("body").prepend("<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.3.0/mapbox-gl-draw.css' type='text/css'/>");
        jQuery("tbody").after("<link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/nelnawawy-ventiv/geotest/Demobase7.css' rel='stylesheet' />");
        jQuery("head link[rel='stylesheet']").last().after("<link href='https://cdn.jsdelivr.net/gh/nelnawawy-ventiv/geotest/Demobase7.css' type='text/css' />");

        //jQuery("td style").prepend("<div id='map'></div><div class='calculation-box'><p>Draw a polygon using the draw tools.</p><div id='calculated-area'></div></div>");
        var mapContainer = oControlHost.container.id;

        //*** Step 2a make some minor adjustments to default map */
        mapboxgl.accessToken = 'pk.eyJ1IjoiZnhoYXdrIiwiYSI6ImNqaDZqYmVsajFwb3kycWs0dzM5aDFxbXgifQ.DcqavEFQJWPJ8eUAGLbK_A'; //Make sure to add Map Token Key
        map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/' + MyStyle,
            center: [-.165748, 51.507], //Center Map
            zoom: 5, //Change Default Zoom
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
        jQuery('body .mapboxgl-control-container').append('<div id=' + 'console' + '>' + '<div>' + '<div class=' + 'session' + ' ' + 'id=' + 'sliderbar' + ' ' + '>' + ' ' + '<p>' + '<font color=' + "#efbf13" + '>' + 'Historical - Year: ' + '<label id=' + 'active-Year' + '>' + '2019' + '</label>' + '</font>' +
            '<input id=' + 'slider' + ' ' + 'class=' + 'row' + ' ' + 'type=' + 'range' + ' ' + 'min=' + '2013' + ' ' + 'max=' + '2023' + ' ' + 'step=' + '1' + ' ' + 'value=' + '2020' + '/>' + '</p>' + '</div>');
        jQuery('body .mapboxgl-control-container').append('<div class=' + 'calculation-box' + '>' + '<p>' + 'Create boundaries with the draw tool to select markers' + '</p>' + '<div id=' + 'calculated-area' + '>' + '</div>');
        //jQuery('body .mapboxgl-control-container').append('<div id=' + 'main-legend' + ' ' + 'class=' + 'legend' + '>' + '<h4>' + 'Legend' + '</h4>' + '</div>'); //'<div>' + '<span style=' + '"background-image:' + " url('https://cdn.rawgit.com/mapbox/mapbox-gl-styles/master/sprites/bright-v9/_svg/town-hall-11.svg')" + '; padding: 10px 10px 5px 10px; left: auto; margin: auto;">' + '</span>' + 'Properties' + '</div>' + '<div>' + '<span style=' + '"background-color: #efbf13"' + '>' + '</span>' + 'Claims' + '</div>' + '<div>' + '<span style=' + '"background-color: #f80a0a"' + '>' + '</span>' + 'Wildfire' + '</div>');

        var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
        map.on('load', function () {

            map.addSource('earthquakes', {
                type: 'geojson',
                data: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
            });
            map.addLayer({
                "id": "Earthquakes - Last 30 Days",
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
                layers: ['Earthquakes - Last 30 Days'] // replace this with the name of the layer
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
        map.on('mouseenter', 'Earthquakes - Last 30 Days', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Earthquakes - Last 30 Days', function () {
            map.getCanvas().style.cursor = '';
        });

        map.on('load', function () {
            map.addLayer({
                "id": "Hazardous Weather - Position",
                "type": "circle",
                "minzoom": 0,
                "maxzoom": 22,
                "source": {
                    "type": "geojson",
                    "data": 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/Recent_Hurricanes_v1/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='
                }, 'layout': { 'visibility': hzweatherpt },
                'paint': {
                    "circle-color": [
                        "match",
                        ["get", "STORMTYPE"],
                        "Tropical Depression",
                        "#3633ff",
                        "Tropical Storm",
                        "#3633ff",
                        "Low",
                        "#d6ff33",
                        "Hurricane1",
                        "#ff3352",
                        "Hurricane2",
                        "#ff3352",
                        "Hurricane3",
                        "#ff3352",
                        "Hurricane4",
                        "#ff3352",
                        "#FF8A33"
                    ],
                    "circle-radius": 4,
                    "circle-opacity": 0.7,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#EE4234'//'#ffffff'

                }
            });
        });

        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Hazardous Weather - Position', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Hazardous Weather - Position', function () {
            map.getCanvas().style.cursor = '';
        });

        map.on('click', 'Hazardous Weather - Position', function (e) {
            //var Day = new Date(e.features[0].properties.FireDiscoveryDateTime);
            //var Day1 = Day.toUTCString();

            var features = map.queryRenderedFeatures(e.point, {
                layers: ['Hazardous Weather - Position'] // replace this with the name of the layer
            });

            if (!features.length) {
                return;
            }

            var feature = features[0];

            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<h3>' + 'Storm Name: ' + e.features[0].properties.STORMNAME + '</h3><p>' + 'Date: ' + e.features[0].properties.DAY + '/' + e.features[0].properties.MONTH + '/' + e.features[0].properties.YEAR + '<br>' + 'Intensity: ' + e.features[0].properties.INTENSITY + '</p>')
                .addTo(map);
        });

        map.on('load', function () {
            map.addLayer({
                "id": "Hazardous Weather - Tracks",
                "type": "line",
                "minzoom": 0,
                "maxzoom": 22,
                "source": {
                    "type": "geojson",
                    "data": 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/Recent_Hurricanes_v1/FeatureServer/1/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='
                }, 'layout': { 'visibility': hzweatherline },
                'paint': {
                    "line-color": [
                        "match",
                        ["get", "STORMTYPE"],
                        "Tropical Depression",
                        "#3633ff",
                        "Tropical Storm",
                        "#3633ff",
                        "Low",
                        "#d6ff33",
                        "Hurricane1",
                        "#ff3352",
                        "Hurricane2",
                        "#ff3352",
                        "Hurricane3",
                        "#ff3352",
                        "Hurricane4",
                        "#ff3352",
                        "#FF8A33"
                    ],
                    "line-width": 3

                }
            });
        });

        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Hazardous Weather - Tracks', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Hazardous Weather - Tracks', function () {
            map.getCanvas().style.cursor = '';
        });

        map.on('click', 'Hazardous Weather - Tracks', function (e) {
            var Day = new Date(e.features[0].properties.STARTDTG);
            var Day1 = Day.toUTCString();

            var features = map.queryRenderedFeatures(e.point, {
                layers: ['Hazardous Weather - Tracks'] // replace this with the name of the layer
            });

            if (!features.length) {
                return;
            }

            var feature = features[0];

            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<h3>' + 'Storm Name: ' + e.features[0].properties.STORMNAME + '</h3><p>' + 'Date: ' + Day1 + '<br>' + 'Storm Type: ' + e.features[0].properties.STORMTYPE + '</p>')
                .addTo(map);
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

            map.addSource('ws3028cl-36haid', {
                type: 'vector',
                url: 'mapbox://nevnd.5e6l64gw' //fxhawk.b7tr8njd'
            });
            map.addLayer({
                "id": "Water Stress 2030",
                "type": "fill",
                "source": "ws3028cl-36haid",
                "source-layer": "ws3028cl-36haid",
                "layout": {
                    "visibility": waterstress2030
                },
                "paint": {
                    //"fill-color": //"#009acd",
                    "fill-color": [
                        "match",
                        ["get", "ws3028cl"],
                        "2.8x or greater decrease",
                        "#009acd",
                        "2x decrease",
                        "#74b0d1",
                        "1.4x decrease",
                        "#abc8d9",
                        "Near normal",
                        "#dedede",
                        "1.4x increase",
                        "#f8ab95",
                        "2x increase",
                        "#ff7451",
                        "2.8x or greater increase",
                        "#ff1900",
                        "#808080"
                    ],
                    "fill-opacity": 0.6
                }

            });
        });

        map.on('click', 'Water Stress 2030', function (e) {


            var features = map.queryRenderedFeatures(e.point, {
                layers: ['Water Stress 2030'] // replace this with the name of the layer
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
                .setHTML('<h3>' + 'Basin ID: ' + feature.properties.BasinID + '</h3><p>' + '<br>' + 'Stress Level: ' + feature.properties.ws3028cl + '<br>' + 'Description: ' + feature.properties.ws3028tl + '<br>' + 'Area (km): ' + feature.properties.Area_km2 + '<br>' + '</p>')

                .addTo(map);

        });

        map.on('mouseenter', 'Water Stress 2030', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'Water Stress 2030', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('load', function () {
            map.addLayer({
                "id": "Australia Land Use",
                "type": "raster",
                "minzoom": 0,
                "maxzoom": 22,
                "source": {
                    "type": "raster",
                    "tiles": [
                        'https://www.environment.gov.au/mapping/rest/services/abares/CLUM_50m/MapServer/export?dpi=96&transparent=true&format=png32&layers=show%3A0&bbox={bbox-epsg-3857}&bboxSR=EPSG:3857&imageSR=EPSG:3857&size=256,256&f=image'//'https://www.asris.csiro.au/arcgis/rest/services/abares/clum_50m_current/MapServer/export?dpi=96&transparent=true&format=png32&layers=show%3A0&bbox={bbox-epsg-3857}&bboxSR=EPSG:3857&imageSR=EPSG:3857&size=256,256&f=image'
                    ]
                    ///"type": "geojson",
                    ///"data": 'https://services-ap1.arcgis.com/iA7fZQOnjY9D67Zx/arcgis/rest/services/OSM_AU_Landuse/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='

                }, 'layout': { 'visibility': auslanduse },
                'paint': {
                    //"fill-color": "#FCF11B",
                    //"fill-opacity": 0.7
                    'raster-opacity': 0.6
                }
            });



            //jQuery.getJSON(https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteoceanhydro_longduration_hazards_time/MapServer/legend?dynamicLayers=%5B17%5D&f=pjson)

        });

        map.on('load', function () {
            map.addLayer({
                "id": "Residential Dwelling Density",
                "type": "raster",
                "minzoom": 0,
                "maxzoom": 22,
                "source": {
                    "type": "raster",
                    "tiles": ['https://services.ga.gov.au/gis/rest/services/NEXIS_Residential_Dwelling_Density/MapServer/export?bbox=-3850823.969990419%2C-5369043.910844071%2C3041740.5461386135%2C-694146.6273126616&bboxSR=3112&layers=show%3A3&layerDefs=&size=&imageSR=3857&historicMoment=&format=png&transparent=true&dpi=&time=&timeRelation=esriTimeRelationOverlaps&layerTimeOptions=&dynamicLayers=&gdbVersion=&mapScale=&rotation=&datumTransformations=%5B3112%2C3857%5D&layerParameterValues=&mapRangeValues=&layerRangeValues=&clipping=&spatialFilter=&f=image']
                    //'https://services.ga.gov.au/gis/rest/services/NEXIS_Residential_Dwelling_Density/MapServer/3/query?where=1%3D1&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=%5B3112%2C+3857%5D&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson'
                    //'https://services.ga.gov.au/gis/rest/services/NEXIS_Residential_Dwelling_Density/MapServer/export?bbox=-3850823.969990419%2C-5369043.910844071%2C3041740.5461386135%2C-694146.6273126616&bboxSR=&layers=show%3A3&layerDefs=&size=&imageSR=3857&historicMoment=&format=png&transparent=true&dpi=&time=&timeRelation=esriTimeRelationOverlaps&layerTimeOptions=&dynamicLayers=&gdbVersion=&mapScale=&rotation=&datumTransformations=%5B3112%2C3857%5D&layerParameterValues=&mapRangeValues=&layerRangeValues=&clipping=&spatialFilter=&f=image'//'https://services.ga.gov.au/gis/rest/services/NEXIS_Residential_Dwelling_Density/MapServer/export?bbox=-3850823.969990419%2C-5369043.910844071%2C3041740.5461386135%2C-694146.6273126616&bboxSR=&layers=show%3A3&layerDefs=&size=&imageSR=&historicMoment=&format=png&transparent=true&dpi=&time=&timeRelation=esriTimeRelationOverlaps&layerTimeOptions=&dynamicLayers=&gdbVersion=&mapScale=&rotation=&datumTransformations=&layerParameterValues=&mapRangeValues=&layerRangeValues=&clipping=&spatialFilter=&f=image'
                    //'https://gislegacy.scc.qld.gov.au/arcgis/rest/services/Society/Society_Demographic_SCRC/MapServer/export?dpi=96&transparent=true&format=png32&layers=show%3A29&bbox={bbox-epsg-3857}&bboxSR=EPSG:3857&imageSR=EPSG:3857&size=256,256&f=image'
                    //,
                    //"tileSize": 400
                    //"data": 'https://gislegacy.scc.qld.gov.au/arcgis/rest/services/Society/Society_Demographic_SCRC/MapServer/29/query?where=1%3D1&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=%5B3035%2C+3857%5D&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson' //['https://climate.discomap.eea.europa.eu/arcgis/rest/services/Forest_Fires/FF_projections/MapServer/export?dpi=96&transparent=true&format=png32&datumTransformations=3035,3857&layers=show%3A0&bbox={bbox-epsg-3857}&bboxSR=EPSG:3857&imageSR=EPSG:3857&size=256,256&f=image'], //'https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Public_Wildfire_Perimeters_View/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='

                }, 'layout': { 'visibility': avghouse },
                'paint': {
                    "raster-opacity": 0.5
                    //"fill-color": "#FCF11B",
                    //"fill-opacity": 0.7
                }
            });




        });

        map.on('click', 'Residential Dwelling Density', function (e) {
            //var Day = new Date(e.features[0].properties.FireDiscoveryDateTime);
            //var Day1 = Day.toUTCString();

            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<h3>' + 'ID: ' + e.features[0].properties.Id + '</h3><p>' + 'Average Household Population' + '<br>' + 'Seasonal Severity Rating: ' + e.features[0].properties.Y_71_00 + '</p>')
                .addTo(map);
        });

        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Residential Dwelling Density', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Residential Dwelling Density', function () {
            map.getCanvas().style.cursor = '';
        });


        map.on('load', function () {

            map.addSource('cmip6snowssp126-2r08u0', {
                type: 'vector',
                url: 'mapbox://nevnd.c5wrnj5s' //fxhawk.b7tr8njd'
            });
            map.addLayer({
                "id": "Snowfall (2015 - 2100)",
                "type": "circle",
                "source": "cmip6snowssp126-2r08u0",
                "source-layer": "cmip6snowssp126-2r08u0",
                "layout": {
                    "visibility": snowfall126
                },
                "paint": {
                    'circle-color': [
                        'match',
                        ['get', 'Snowfall'],
                        "-0.24",
                        '#0098B6',
                        "-0.23",
                        '#0098B6',
                        "-0.22",
                        '#0098B6',
                        "-0.21",
                        '#0098B6',
                        "-0.20",
                        '#0098B6',
                        "-0.19",
                        '#00CEF7',
                        "-0.18",
                        '#00CEF7',
                        "-0.17",
                        '#00CEF7',
                        "-0.16",
                        '#00CEF7',
                        "-0.15",
                        '#00CEF7',
                        "-0.14",
                        '#00CEF7',
                        "-0.13",
                        '#00CEF7',
                        "-0.12",
                        '#00CEF7',
                        "-0.11",
                        '#00CEF7',
                        "-0.10",
                        '#00CEF7',
                        "-0.09",
                        '#4CDFFE',
                        "-0.08",
                        '#4CDFFE',
                        "-0.07",
                        '#4CDFFE',
                        "-0.06",
                        '#4CDFFE',
                        "-0.05",
                        '#4CDFFE',
                        "-0.04",
                        '#4CDFFE',
                        "-0.03",
                        '#4CDFFE',
                        "-0.02",
                        '#4CDFFE',
                        "-0.01",
                        '#4CDFFE',
                        "-0.0",
                        "#91EDFF",
                        "0.0",
                        "#91EDFF",
                        "0.01",
                        "#91EDFF",
                        "0.02",
                        "#91EDFF",
                        "0.03",
                        "#91EDFF",
                        "0.04",
                        "#91EDFF",
                        "0.05",
                        "#BFF4FF",
                        "0.06",
                        "#BFF4FF",
                        "white"
                    ],
                    "circle-radius": 5,
                    "circle-opacity": 0.6,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#FFFFFF'//'#ffffff'
                },

            });
        })

        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'Snowfall (2015 - 2100)', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'Snowfall (2015 - 2100)', function () {
            map.getCanvas().style.cursor = '';
        });

        map.on('click', 'Snowfall (2015 - 2100)', function (e) {
            //var Day = new Date(e.features[0].properties.FireDiscoveryDateTime);
            //var Day1 = Day.toUTCString();

            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('<h3>' + 'City Name: ' + e.features[0].properties.city_ascii + '</h3><p>' + 'Snowfall Change (Degrees Celsius): ' + e.features[0].properties.Snowfall + '</p>')
                .addTo(map);
        });

        map.on('load', function () {

            map.addSource('queryearthquakes-7gq3ih', {
                type: 'vector',
                url: 'mapbox://nevnd.bv5sflxt' //fxhawk.cjhhzt5rk00hw2xro80s4lgdy-8ybmv'
            });
            map.addLayer({
                'id': 'Earthquake - Historical',
                "type": "circle",
                "source": "queryearthquakes-7gq3ih",
                "source-layer": "queryearthquakes-7gq3ih",
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

            map.addSource('SSP19test2030-01ckid', {
                type: 'vector',
                url: 'mapbox://nevnd.b5mazals' //fxhawk.cjhhzt5rk00hw2xro80s4lgdy-8ybmv'
            });
            map.addLayer({
                'id': 'Sea Level Rise 2030',
                "type": "circle",
                "source": "SSP19test2030-01ckid",
                "source-layer": "SSP19test2030-01ckid",
                "layout": {
                    "visibility": sealevel2030
                },
                "paint": {
                    "circle-color": "#6EE4FF",
                    "circle-radius": 5,
                    "circle-opacity": 0.7,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#FFFFFF'//'#ffffff'
                }
            });
        });

        map.on('mouseenter', 'Sea Level Rise 2030', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'Sea Level Rise 2030', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('click', function (e) {


            var features = map.queryRenderedFeatures(e.point, {
                layers: ['Sea Level Rise 2030'] // replace this with the name of the layer
            });

            if (!features.length) {
                return;
            }

            var feature = features[0];
            //var TorDay = new Date(feature.properties.UTC_DATETIME);
            //var TorDay1 = TorDay.toUTCString();

            var popup = new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(feature.geometry.coordinates)
                .setHTML('<h3>' + feature.properties.Location + '</h3><p>' + '<br>' + 'Sea Level Rise: ' + feature.properties.SeaLevel + ' meters' + '<br>' + 'Year: ' + feature.properties.Year + '<br>' + '</p>')
                .setLngLat(feature.geometry.coordinates)
                .addTo(map);

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
                    'id': 'Global Radar (GOES)',
                    'type': 'raster',
                    'source': {
                        'type': 'raster',
                        'tiles': [
                            'https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/sat_meteo_imagery_time/MapServer/export?dpi=96&transparent=true&format=png32&layers=show%3A19&bbox={bbox-epsg-3857}&bboxSR=EPSG:3857&imageSR=EPSG:3857&size=256,256&f=image'  //export?bbox=-1.7146636848686654E7%2C-5031334.627614908%2C-3771922.5992581537%2C1.334888645168931E7&bboxSR=EPSG%3A3857&layers=show%3A19&layerDefs=&size=256%2C256&imageSR=EPSG%3A3857&format=png&transparent=true&dpi=96&time=&layerTimeOptions=&dynamicLayers=&gdbVersion=&mapScale=&rotation=&datumTransformations=&layerParameterValues=&mapRangeValues=&layerRangeValues=&f=image' //'https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/sat_meteo_imagery_time/MapServer/WmsServer?service=WMS&request=GetMap&version=1.3.0&layers=19&styles=&format=image/png&transparent=true&height=256&width=256&crs=EPSG:3857&bbox={bbox-epsg-3857}&time=' + timeBlock ////'https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WmsServer?service=WMS&request=GetMap&version=1.3.0&layers=1&styles=&format=image/png&transparent=true&height=256&width=256&crs=EPSG:3857&bbox={bbox-epsg-3857}&time=' + timeBlock
                        ],
                        'tileSize': 256
                    },
                    'layout': { 'visibility': globalforecast },
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

            map.addSource('GEDEvent_v22_07to08', {
                type: 'vector',
                url: 'mapbox://nevnd.cl97byrqp0vn321od1y6gxusf-67fws' //nevnd.ckr0tdn0u4rov20to1aq9z17x-5p275' //fxhawk.cjhhzt5rk00hw2xro80s4lgdy-8ybmv'
            });
            map.addLayer({
                'id': 'Global Civil Unrest',
                "type": "circle",
                "source": "GEDEvent_v22_07to08",
                "source-layer": "GEDEvent_v22_07to08",
                "layout": {
                    "visibility": civilunrest
                },
                "paint": {
                    "circle-color": "#FF8A33",
                    "circle-radius": 5,
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
                .setHTML('<h3>' + feature.properties.conflict_name + '</h3><p>' + '<br>' + 'Country: ' + feature.properties.country + '<br>' + 'Source Date: ' + feature.properties.source_date + '<br>' + ' Headline: ' + feature.properties.source_headline + '<br>' + ' Sources: ' + feature.properties.source_office + '<br>' + ' Civilian Deaths: ' + feature.properties.deaths_civilians + '</p>')

                .addTo(map);

        });

        map.on('mouseenter', 'Global Civil Unrest', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'Global Civil Unrest', () => {
            map.getCanvas().style.cursor = 'pointer';
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
                .setHTML('<h3>' + 'Fire Hotspot' + '</h3><p>' + 'Date: ' + Day1 + '<br>' + 'Day/Night: ' + e.features[0].properties.DAYNIGHT + '<br>' + 'Satellite: ' + e.features[0].properties.SATELLITE + '<br>' + 'Track: ' + e.features[0].properties.TRACK + '<br>' + 'Hours Old: ' + e.features[0].properties.HOURS_OLD + '</p>')
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
                "id": "Significant Volcanic Eruptions",
                "type": "circle",
                "source": {
                    "type": "geojson",
                    "data": 'https://services2.arcgis.com/FiaPA4ga0iQKduv3/arcgis/rest/services/test_Significant_Global_Volcanic_Eruptions_1/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='
                }, 'layout': { 'visibility': volcanerup },
                "paint": {
                    "circle-color": "#ff8000",
                    "circle-radius": 6,
                    "circle-opacity": 0.7,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#EE4234'//'#ffffff'
                }
            });
        });



        map.on('load', function () {

            map.addSource('MetroManila-100yr-5kos3x', {
                type: 'vector',
                url: 'mapbox://nevnd.49j84ldb' //nevnd.ckr0tdn0u4rov20to1aq9z17x-5p275' //fxhawk.cjhhzt5rk00hw2xro80s4lgdy-8ybmv'
            });
            map.addLayer({
                'id': 'Manila 100YR Floodplain',
                "type": "fill",
                "source": "MetroManila-100yr-5kos3x",
                "source-layer": "MetroManila-100yr-5kos3x",
                "layout": {
                    "visibility": manila100yr
                },
                "paint": {
                    "fill-color": "#52cbe3",
                    "fill-opacity": 0.6
                }
            });
        });

        map.on('load', function () {

            map.addSource('MetroManila-Landslide-1187xk', {
                type: 'vector',
                url: 'mapbox://nevnd.31gp17rl' //nevnd.ckr0tdn0u4rov20to1aq9z17x-5p275' //fxhawk.cjhhzt5rk00hw2xro80s4lgdy-8ybmv'
            });
            map.addLayer({
                'id': 'Manila Landslide Hazard',
                "type": "fill",
                "source": "MetroManila-Landslide-1187xk",
                "source-layer": "MetroManila-Landslide-1187xk",
                "layout": {
                    "visibility": manilaldslide
                },
                "paint": {
                    "fill-color": "#cc5008",
                    "fill-opacity": 0.6
                }
            });
        });

        map.on('load', function () {
            map.addSource('ACEN_Locations', {
                type: 'vector',
                url: 'mapbox://nevnd.cla8im64e2hsc20mv2zsy6icy-6iuzp'//'mapbox://fxhawk.cjhkjvk4202mi6mt2y4lkns44-7mdr6'
            });
            map.addLayer({
                'id': 'Properties2',
                'type': 'symbol',
                'source': 'ACEN_Locations',
                'source-layer': 'ACEN_Locations',
                "layout": {
                    "visibility": property,
                    "text-field": [
                        "format",
                        [
                            "get",
                            "Name"
                        ], { 'font-scale': 1 }
                    ],
                    "text-size": 12,
                    "icon-image": "windmill-11",
                    "text-anchor": "top-left",
                    "icon-size": 3,
                    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                    //'text-allow-overlap': true, 
                    //'icon-allow-overlap': true
                },
                "paint": {
                    "text-color": '#1d82ac', //'#261d1d', //'#f70707',//"rgb(152, 153, 29)",
                    "icon-opacity": 1,
                    "text-halo-color": '#02415c', //"#fff",
                    "text-halo-width": 0.2
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
            var url = 'http://www.ventivtech.com'
            var popup = new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(feature.geometry.coordinates)
                .setHTML('<h3>' + feature.properties.Name + '</h3>' + 'Capicity: ' + feature.properties.Capacity + '<br>' + 'Type: ' + feature.properties.Type + '</p>')
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
            //map.setFilter('Snowfall (2015 - 2100)', ['==', ['number', ['get', 'yr']], Year]);



            // update text in the UI
            document.getElementById('active-Year').innerText = Year;
        });


        // Add geolocate control to the map.
        var nav = new mapboxgl.GeolocateControl();
        map.addControl(nav, 'bottom-right');

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
            feature['properties'] = { 'name': oDataStore.getCellValue(iRow, 0), 'total_paid3': oDataStore.getCellValue(iRow, 21), 'Net_Incurred_Total': oDataStore.getCellValue(iRow, 22) }
            earth = oDataStore.getCellValue(iRow, 3)
            hzweatherpt = oDataStore.getCellValue(iRow, 4)
            MyStyle = oDataStore.getCellValue(iRow, 5)
            property = oDataStore.getCellValue(iRow, 6)
            hzweatherline = oDataStore.getCellValue(iRow, 7)
            waterstress2030 = oDataStore.getCellValue(iRow, 8)
            earthquake_h = oDataStore.getCellValue(iRow, 9)
            claims = oDataStore.getCellValue(iRow, 10)
            claim_info = oDataStore.getCellValue(iRow, 11)
            sealevel2030 = oDataStore.getCellValue(iRow, 12)
            globalforecast = oDataStore.getCellValue(iRow, 13)
            civilunrest = oDataStore.getCellValue(iRow, 14)
            MODIS = oDataStore.getCellValue(iRow, 15)
            Business_Unit = oDataStore.getCellValue(iRow, 16)
            Coverage = oDataStore.getCellValue(iRow, 17)
            volcanerup = oDataStore.getCellValue(iRow, 18)
            manila100yr = oDataStore.getCellValue(iRow, 19)
            manilaldslide = oDataStore.getCellValue(iRow, 20)



            geojsonFeature['features'].push(feature);
        }

        map.setStyle('mapbox://styles/mapbox/' + MyStyle);
        console.log('Style Check')


        console.log('test2')
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
                .setHTML('<h3>' + 'Claim: ' + Claim_N + '</h3>' + '<br>' + 'Total Net Incurred: ' + e.features[0].properties.Net_Incurred_Total.toLocaleString('en-US', { style: 'currency', currency: 'USD', }) + '<br>' + 'Paid: ' + Paid.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })/* + 'Claims TYTD: ' + total_claims*/ + '</p>')//+ 'Total Insured: $ ' + paidf + '<br>' + 'Claims TYTD: ' + total_claims + '</p>')
                .addTo(map);
        });




    };


    return BasicControl;
});// JavaScript source code
