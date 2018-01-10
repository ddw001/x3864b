
var marker;
var map;
var geocoder;
var infowindow = new google.maps.InfoWindow({
    size: new google.maps.Size(150,50)
});
function showMap(la, lo, name) {
  $("#map_wrapper").show();
  var map_pos = new google.maps.LatLng(la,lo);
  var mapOptions = {
       zoom: 15,
       mapTypeId: google.maps.MapTypeId.ROADMAP,
       center: map_pos
  };
  map = new google.maps.Map(document.getElementById("map"),mapOptions);
  if (name) {
      marker = createMarker(map_pos, name);
  }
  google.maps.event.addListener(map, 'click', function() {
     infowindow.close();
  });
  google.maps.event.addListener(map, 'click', function(event) {
      if (marker) {
         marker.setMap(null);
         marker = null;
      }
      $(".loc_lat").val(event.latLng.lat());
      $(".loc_lng").val(event.latLng.lng());
      marker = createMarker(event.latLng, name);
  });




    $("#searchbox").autocomplete({

        source: function(request, response) {

        if (geocoder == null){
            geocoder = new google.maps.Geocoder();
        }
        geocoder.geocode( {'address': request.term }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var searchLoc = results[0].geometry.location;
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();
                var latlng = new google.maps.LatLng(lat, lng);
                var bounds = results[0].geometry.bounds;

                geocoder.geocode({'latLng': latlng}, function(results1, status1) {
                    if (status1 == google.maps.GeocoderStatus.OK) {
                        if (results1[1]) {
                            response($.map(results1, function(loc) {
                                return {
                                    label  : loc.formatted_address,
                                    value  : loc.formatted_address,
                                    bounds   : loc.geometry.bounds
                                }
                            }));
                        }
                    }
                });
            }
        });
    },
        select: function(event,ui, test){
            var pos = ui.item.position;
            var lct = ui.item.locType;
            var bounds = ui.item.bounds;
            /*
            var resultBounds = new google.maps.LatLngBounds(

                ui.item.geometry.viewport.getSouthWest(),
                ui.item.geometry.viewport.getNorthEast()
            );

            map.fitBounds(resultBounds);
            */
            if (bounds){
                map.fitBounds(bounds);
            }
        }
    });
}

function createMarker(latlng, html) {
    var contentString = html;
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        zIndex: Math.round(latlng.lat()*-100000)<<5
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString);
        infowindow.open(map,marker);
        });
    google.maps.event.trigger(marker, 'click');
    return marker;
}


