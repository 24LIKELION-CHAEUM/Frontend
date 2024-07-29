let map;
let markers = [];
let bottomSheet;
let facilitiesList;
let userLocationDiv;

function initMap() {
    try {
        // Initialize the map
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: { lat: 37.5665, lng: 126.9780 } // Default to Seoul
        });

        bottomSheet = document.getElementById('bottom-sheet');
        facilitiesList = document.getElementById('facilities-list');
        userLocationDiv = document.getElementById('user-location');
        document.getElementById('close-bottom-sheet').onclick = () => {
            bottomSheet.style.transform = 'translateY(100%)';
        };

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

                    // Set user's current location in the bottom sheet
                    userLocationDiv.textContent = `내 위치: (${pos.lat.toFixed(5)}, ${pos.lng.toFixed(5)})`;

                    // Fetch welfare facilities based on user's location
                    fetchFacilities(pos.lat, pos.lng);
                },
                (error) => {
                    handleLocationError(true, map.getCenter(), error);
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, map.getCenter());
        }

        document.getElementById('search-button').onclick = searchFacilities;
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

function fetchFacilities(lat, lng) {
    const apiUrl = 'http://openapi.seoul.go.kr:8088/524943446c69616d36355a75736e71/xml/fcltOpenInfo_OWI/1/5/';

    fetch(apiUrl)
        .then(response => response.text())
        .then(data => {
            console.log('Seoul Open API response:', data);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const facilities = Array.from(xmlDoc.getElementsByTagName('row'));
            displayFacilities(facilities);
        })
        .catch(error => {
            console.error('Error fetching facilities:', error);
        });
}

function displayFacilities(facilities) {
    clearMarkers();
    facilitiesList.innerHTML = ''; // Clear the list

    facilities.forEach(facility => {
        const latElement = facility.getElementsByTagName('LAT')[0];
        const lngElement = facility.getElementsByTagName('LNG')[0];
        const nameElement = facility.getElementsByTagName('FACLT_NM')[0];
        const phoneElement = facility.getElementsByTagName('TEL_NO')[0];

        if (!latElement || !lngElement || !nameElement) {
            console.warn('Missing required data in facility:', facility);
            return;
        }

        const lat = parseFloat(latElement.textContent);
        const lng = parseFloat(lngElement.textContent);
        const name = nameElement.textContent;
        const phone = phoneElement ? phoneElement.textContent : 'N/A';

        const position = { lat, lng };

        const marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
            }
        });

        marker.addListener('click', () => {
            map.setCenter(marker.getPosition());
            showFacilityDetails({ name, phone });
        });

        markers.push(marker);

        const facilityItem = document.createElement('div');
        facilityItem.className = 'facility-item';
        facilityItem.innerHTML = `
            <span>${name}</span>
            <button class="call-button" onclick="makeCall('${phone}')">전화</button>
        `;
        facilitiesList.appendChild(facilityItem);
    });

    bottomSheet.style.transform = 'translateY(0)';
}

function clearMarkers() {
    markers.forEach(marker => {
        marker.setMap(null);
    });
    markers = [];
    facilitiesList.innerHTML = '';
}

function showFacilityDetails(facility) {
    // Implement the logic to display facility details in the bottom sheet
}

function makeCall(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
}

function searchFacilities() {
    const searchQuery = document.getElementById('search-box').value;
    const apiUrl = `http://openapi.seoul.go.kr:8088/524943446c69616d36355a75736e71/xml/fcltOpenInfo_OWI/1/5/${searchQuery}`;

    fetch(apiUrl)
        .then(response => response.text())
        .then(data => {
            console.log('Search API response:', data);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const facilities = Array.from(xmlDoc.getElementsByTagName('row'));
            displayFacilities(facilities);
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
}

window.initMap = initMap;
