var map;
var addresses;
var mapMarkers = [];
var Toronto = { lat: 43, lng: -79.38 };
// class for map markers
var MapMarker = /** @class */ (function () {
    function MapMarker(address) {
        this.Address = address;
    }
    return MapMarker;
}());
function initMap() {
    var geocoder = new google.maps.Geocoder;
    map = new google.maps.Map(document.getElementById('map'), {
        center: Toronto,
        zoom: 8
    });
}
