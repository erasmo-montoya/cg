
var map;
var markers;
var markerCluster;

function clearMarkers(){
  if (markers) {
    markers.map(function(marker){
      marker.setMap(null);
    })
  }
  if (markerCluster){
    markerCluster.clearMarkers()
  }
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {lat: -12.046374, lng: -77.042793}
  });
  leer();

}

function leer(){
  var selectTable = document.getElementById("selectTable");
  var table = selectTable.options[selectTable.selectedIndex].value;
  var selectYear = document.getElementById("selectYear");
  var year = selectYear.options[selectYear.selectedIndex].value;
  var data = {
          tableName: table,
          attributes: ['Year','Latitude','Longitude','Location_Name']
      }
  $.ajax({
      url: 'https://lypqoj49qj.execute-api.us-east-2.amazonaws.com/dev/disasters/getData',
      type: 'POST',
      crossDomain: true,
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      success: function(data) {

          clearMarkers();
          may = data.Items.filter(function(data){
            return data.Year < year
          });
          console.log(may.length);
          locations = may.map(function(may){
            return {lat: may.Latitude, lng: may.Longitude}
          });
          console.log(may);
          markers = locations.map(function(location, i) {
            return new google.maps.Marker({
              position: location,
              //label: labels[i]

              //label: labels[(i) % labels.length]
            });
          });

          // Add a marker clusterer to manage the markers.
          markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

      },
      error: function(xhr, ajaxOptions, thrownError) {
      }
  });
}
