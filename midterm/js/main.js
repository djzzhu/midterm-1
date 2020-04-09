/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var dataset = "https://raw.githubusercontent.com/djzzhu/JZ/master/PPR_Assets.geojson"
var featureGroup;

var myStyle = function(data) {
  switch (data.properties.PPR_USE) {
    case 'ATHLETIC':
    case 'GOLF':
    case 'MULTI_USE':
    case 'RECREATION_SITE':
    case 'ZOO_HABITAT':
    return {color: "#ff1000"};
      break;

    case 'BARN':
    case 'BOATHOUSE':
    case 'BREEZEWAY_ISLAND_LOT':
    case 'FARM':
    case 'GREENHOUSE_NURSERY':
    case 'GUARD_BOX':
    case 'OPERATIONS_MAINTENANCE_STORAGE':
    case 'OTHER':
    case 'SHED':
    case 'STABLES':
    case 'STAGE_STANDS':
    case 'RESTROOMS':
    return {color: "#feb236"};
      break;

    case 'COMMUNITY_PARK':
    case 'GARDEN':
    case 'ICE_RINK':
    case 'MINI_PARK':
    case 'NEIGHBORHOOD_PARK':
    case 'PAVILION_SHELTER':
    case 'POOL':
    case 'SQUARE_PLAZA':
    case 'YOUTH_TOT_PLAY_AREAS':
    return {color: "#405d27"};
      break;

    case 'CONCESSIONS_RETAIL_CAFE':
    case 'ENVIRONMENTAL_EDUCATION_CENTER':
    case 'MUSEUM':
    case 'OLDER_ADULT_CENTER':
    case 'STATUE_MONUMENT_SCULPTURE':
    case 'HISTORIC_HOUSE':
    return {color: "#034f84"};
      break;

    case 'GREENWAY_PARKWAY':
    case 'REGIONAL_CONSERVATION_WATERSHED':
    case 'RESERVOIR':
    return {color: "#86af49"};
      break;
}
};

var showResults = function() {
  $('#intro').hide();
  $('#results').show();
};


var eachFeatureFunction = function(layer) {
  layer.on('click', function (event) {
    if (layer.feature.properties.ASSET_NAME !== ''){
    $(".information").text(layer.feature.properties.ASSET_NAME);
    $(".address").text(layer.feature.properties.ADDRESS);
  };
    showResults();
  });
};

var myFilter = function(feature) {
    if(feature.properties.PPR_USE != '')
  return true;
};

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      filter: myFilter
    }).addTo(map);

    featureGroup.eachLayer(eachFeatureFunction);
  });
});


/* =================
next.addListener('click', function() {
          map.setZoom(8);
          map.setCenter(marker.getPosition());
        });
=================== */
