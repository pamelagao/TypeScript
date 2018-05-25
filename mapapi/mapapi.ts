let map : any;
let addresses : any[];
let mapMarkers : MapMarker[] = [];

// interface
interface LatLng {
    lat : number,
    lng : number
}

let Toronto : LatLng = { lat : 43, lng : -79.38 };

// class for map markers
class MapMarker {
    Address : string;
    LatLng : LatLng;

    public constructor (address : string) {
        this.Address = address;
    }
}

function initMap () {

    let geocoder : object = new google.maps.Geocoder;

    map = new google.maps.Map(
        document.getElementById('map'), 
        { 
            center: Toronto,
            zoom: 8
        }
    );
}