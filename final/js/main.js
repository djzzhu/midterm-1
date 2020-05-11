var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});

var Stamen_TonerLite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGVubmlzODAwMCIsImEiOiJjazh1bGpueDIwY2VjM2ZwNnV6bXlwaWp5In0.uBuHwp5X9GHrrQgQCuJSnw', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="http://mapbox.com">Mapbox</a>',
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




var state = {
  position: {
    marker: null,
    updated: null
  }
};

var goToOrigin = _.once(function(lat, lng) {
  map.setView([lat, lng], 14);
});

var updatePosition = function(lat, lng, updated) {
  if (state.position.marker) { map.removeLayer(state.position.marker); }
  state.position.marker = L.circleMarker([lat, lng], {color: "red"});
  state.position.updated = updated;
  state.position.marker.addTo(map);
  goToOrigin(lat, lng);
};

var origin;
var destination;



$(document).ready(function() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      origin = [position.coords.longitude, position.coords.latitude]
      updatePosition(position.coords.latitude, position.coords.longitude, position.timestamp);
    });
  } else {
    alert("Unable to access geolocation API!");
  };

  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      filter: myFilter,
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
