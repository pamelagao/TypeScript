var map;
var addresses = [];
var mapMarkers = [];
var Toronto = { lat: 43, lng: -79.38 };
// class for map markers
var MapMarker = /** @class */ (function () {
    function MapMarker(address) {
        this.Address = address;
    }
    return MapMarker;
}());
$.ajax({
    url: './PublicPlaces.json',
    dataType: 'json',
    success: function (data) {
        addresses = data;
        for (var _i = 0, addresses_1 = addresses; _i < addresses_1.length; _i++) {
            var i = addresses_1[_i];
            var newMapMarker = new MapMarker(i.address);
            mapMarkers.push(newMapMarker);
        }
        // console.log(mapMarkers);
    }
});
var markerIndex = 0;
// set laglng to 'mapMarkers' object
function setLatLng() {
    mapMarkers[markerIndex].LatLng = getLatLng(mapMarkers[markerIndex].Address);
}
window.onload = function () {
    var _loop_1 = function (i) {
        getLatLng(mapMarkers[i]);
        setTimeout(function () {
            getMarker(mapMarkers[i].LatLng);
        }, 500);
    };
    // for (let i = 0; i < 10 ; i++) {
    for (var i = 0; i < 50; i++) {
        _loop_1(i);
    }
};
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: Toronto,
        zoom: 8
    });
}
function getLatLng(map) {
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({
        'address': map.Address
    }, function (results, status) {
        if (status === 'OK') {
            map.LatLng = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
            };
            getMarker(map.LatLng);
        }
        else {
            setTimeout(function () { getLatLng(map); }, 200);
            // setInterval( getLatLng(map), 200);
        }
    });
    return map.LatLng;
}
function getMarker(marker) {
    var marker = new google.maps.Marker({
        position: marker,
        map: map
    });
}
