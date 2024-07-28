let map;

function initMap() {
    try {
        // Initialize the map
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: { lat: 37.5665, lng: 126.9780 } // Default to Seoul
        });

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    const userMarker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: "Your location",
                        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    });

                    map.setCenter(pos);
                },
                (error) => {
                    handleLocationError(true, map.getCenter(), error);
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, map.getCenter());
        }
    } catch (error) {
        console.error("Error initializing map: ", error);
    }
}

function handleLocationError(browserHasGeolocation, pos, error = {}) {
    console.error(browserHasGeolocation ?
        `Error: The Geolocation service failed (${error.message}).` :
        "Error: Your browser doesn't support geolocation.");
    map.setCenter(pos);
}

window.initMap = initMap;
