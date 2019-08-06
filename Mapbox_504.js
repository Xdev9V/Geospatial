define(["https://api.tiles.mapbox.com/mapbox-gl-js/v1.2.0/mapbox-gl.js", "jquery", "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.min.js","https://api.tiles.mapbox.com/mapbox.js/plugins/turf/v3.0.11/turf.min.js","https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.js", "https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js", "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js","text! https://rca-uat.ventivtech.com/cognos11/ventiv/javascript/HtmlSlider/C_HtmlSlider.js"], function(mapboxgl, jQuery, MapboxGeocoder, turf, MapboxDraw, slider1, slider2, sCSS) {
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
       // jQuery("tbody").after("<link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/Xdev9/Geospatial/Mapbox_8.css' rel='stylesheet' />");
		 jQuery("head link[rel='stylesheet']").last().after("<link href='https://cdn.jsdelivr.net/gh/Xdev9/Geospatial/Mapbox_8.css' type='text/css' />");
		
		jQuery( 'tbody').last().after('<h3>Michael</h3>');
		
		
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

    BasicControl.prototype.draw = function(oControlHost) {

        console.log('3. Draw ******************')

        var oPage = oControlHost.page;
		
		{
	var sValueTextItem = oControlHost.configuration ? oControlHost.configuration["Value text item"] : "";
	this.m_oValueTextItem = sValueTextItem ? oControlHost.page.getControlByName( sValueTextItem ) : null;
	this.m_sParameter = oControlHost.configuration ? oControlHost.configuration.Parameter : "pMin";
	var sRangeType = ( oControlHost.configuration ? oControlHost.configuration["Range type"] : "" ) || "min";
	var oParameter = oControlHost.getParameter( this.m_sParameter );
	var sParameterValue = ( oParameter && ( oParameter.values.length > 0 ) ) ? oParameter.values[0].use : ( ( sRangeType == "min" ) ? this.m_max : this.m_min ) || 0;
	var sHtml = '<style>' + sCSS + '</style>';
	sHtml += '<input class="clsHtmlSlider" type="range" min="' + ( this.m_min || 0 ) + '" max="' + ( this.m_max || 100 ) + '" value="' + sParameterValue + '" rangeType="' + sRangeType + '"/>';
	var el = oControlHost.container;
	el.innerHTML = sHtml;
	this.m_input = el.querySelector( "input" );
	this.onChange( oControlHost );
	this.m_input.onchange = this.onChange.bind( this, oControlHost, false );
	this.m_input.onmouseup = this.onMouseUp.bind( this, oControlHost, true );
};
	    
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
map.on('load', function ()  {
     
    map.addSource('earthquakes',{
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

 map.on('click', function(e) {   
   
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
		 'layout': {'visibility': radar},
        'paint': { 'raster-opacity': 1,
            'raster-opacity-transition': {
            duration: 0
         }}
     }, 'aeroway-taxiway');
}
 	
});

            map.on("load", function() {
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
                    "circle-color": "#ffff00"
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
      
      
      
      map.on('load', function() {
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
				
            },  'layout': {'visibility': hurricane},
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
        'id': 'Lightning-Today',
        'type': 'raster',
        'source': {
        'type': 'raster',
        'tiles': [
        'https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer/WmsServer?service=WMS&request=GetMap&version=1.3.0&layers=1&styles=&format=image/png&transparent=true&height=256&width=256&crs=EPSG:3857&bbox={bbox-epsg-3857}&time='+timeBlock
],
        'layout': {'visibility': 'none'},
        'tileSize': 256
         },
		 'layout': {'visibility': lightning},
        'paint': { 'raster-opacity': 1,
            'raster-opacity-transition': {
            duration: 0
         }}
     }, 'aeroway-taxiway');
}
  
});
      
 map.on('load', function() {
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
				
            },  'layout': {'visibility': hazardous},
        });
		
    });	     
	
	    map.on('load', function () {
   
    map.addSource('torn-9u8vfn', {
        type: 'vector',
        url: 'mapbox://fxhawk.b7tr8njd'
    });
	map.addLayer({
            "id": "Tornados - Historical",
            "type": "line",
            "source": "torn-9u8vfn",
            "source-layer": "torn-9u8vfn",
            "layout": {
                "visibility": tornadoes},
            "paint": {
                "line-color": "hsl(275, 71%, 60%)",
                "line-opacity": 0.67,
                "line-width": 5
            },
        
		});
		})
	 
	    
	  
	    
	// Add geolocate control to the map.
	var nav = new mapboxgl.GeolocateControl();
	map.addControl(nav, 'bottom-right'); 
	    
	map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
        }));    

        //Zoom and Fit map to points
        geojsonFeature.features.forEach(function(feature) {
            bounds.extend(feature.geometry.coordinates);
        });

        map.fitBounds(bounds, {
            padding: 60
        });
		
		var draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
        polygon: true,
        trash: true
        }
        });
        map.addControl(draw);
	    
	    map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);
 
function updateArea(e) {
var data = draw.getAll();
var answer = document.getElementById('calculated-area');
if (data.features.length > 0) {
var area = turf.area(data);
// restrict to area to 2 decimal points
var rounded_area = Math.round(area*100)/100;
answer.innerHTML = '<p><strong>' + rounded_area + '</strong></p><p>square meters</p>';
} else {
answer.innerHTML = '';
if (e.type !== 'draw.delete') alert("Use the draw tools to draw a polygon!");
}
}

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
