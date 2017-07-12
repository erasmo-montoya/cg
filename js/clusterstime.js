
var map;
function clearMarkers(){
  markers.map(function(marker){
    marker.setMap(null);
  })
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {lat: -28.024, lng: 140.887}
  });
}

function leer(){
  var data = {
          tableName: 'Eruptions',
          attributes: ['Year','Country','Latitude','Longitude']
      }
  $.ajax({
      url: 'https://lypqoj49qj.execute-api.us-east-2.amazonaws.com/dev/disasters/getData',
      type: 'POST',
      crossDomain: true,
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      success: function(data) {
          console.log(data);
          locations = data.Items.map(function(data){
            return {lat: data.Latitude, lng: data.Longitude}
          });
          var markers = locations.map(function(location, i) {
            return new google.maps.Marker({
              position: location,
              //label: labels[(i) % labels.length]
              label: "x"+i
            });
          });

          // Add a marker clusterer to manage the markers.
          var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

      },
      error: function(xhr, ajaxOptions, thrownError) {
      }
  });
}
