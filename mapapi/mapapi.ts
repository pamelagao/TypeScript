let map : any;
let addresses : any[] = [];
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

$.ajax({
    url : './PublicPlaces.json',
    dataType : 'json',
    success : function (data) {

        addresses = data;

        for (let i of addresses) {
            let newMapMarker : MapMarker = new MapMarker(i.address);
            mapMarkers.push(newMapMarker);   
        }
        // console.log(mapMarkers);
    }
});

let markerIndex : number = 0;

// set laglng to 'mapMarkers' object
function setLatLng() : void {
    mapMarkers[markerIndex].LatLng = getLatLng(mapMarkers[markerIndex].Address);
}

window.onload = function () {

    // for (let i = 0; i < 10 ; i++) {
    for (let i = 0; i < 50; i++) {

        getLatLng(mapMarkers[i]);

        setTimeout( function(){ 
        
            getMarker(mapMarkers[i].LatLng);
            
        }, 500); 
    }
}

function initMap () {

    map = new google.maps.Map(

        document.getElementById('map'), 
        { 
            center: Toronto,
            zoom: 8
        }
    );
}

function getLatLng (map : MapMarker) : LatLng {
        
    let geocoder : object = new google.maps.Geocoder;

    geocoder.geocode(
        {
            'address' : map.Address
        },
        function (results, status) {

            if (status === 'OK') {

                map.LatLng = {
                    lat : results[0].geometry.location.lat(),
                    lng : results[0].geometry.location.lng()
                }

                getMarker(map.LatLng);

            } else {

                setTimeout( function(){ getLatLng(map) } , 200);
                // setInterval( getLatLng(map), 200);
            }
        }
    );
    return map.LatLng;
}

function getMarker (marker : LatLng) {

    let marker = new google.maps.Marker({
        position: marker,
        map: map
    });
}