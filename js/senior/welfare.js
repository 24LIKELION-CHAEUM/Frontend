document.addEventListener('DOMContentLoaded', function() {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨 
        }; 
    //지도생성
    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    var username = '홍길동';

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
    if (navigator.geolocation) {
        
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {
            
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            
            userPosition = { lat: lat, lng: lon };
            var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            
            // 마커 표시
            displayMarker(locPosition);
            
             // 사용자의 위치를 주소로 변환하여 표시합니다
               // 사용자의 위치를 위도 경도로 표시합니다
               var userLocationElement = document.getElementById('user-location');
               userLocationElement.innerHTML = `
                   <div class="location-container">
                       <img src="/img/위치.svg" alt="location icon" class="location-icon">
                       <span class="location-text">내 위치</span>
                       <span class="locationtt"> ${lat.toFixed(5)}, ${lon.toFixed(5)}</span>
                   </div>
               `;

          }, function(error) {
            console.error("Error occurred. Error code: " + error.code);
            // Handle error here
          });  

    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        
        var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
            message = 'geolocation을 사용할수 없어요..'
            
        displayMarker(locPosition, message);
    }
    
    // 지도에 마커 표시하는 함수입니다
    function displayMarker(locPosition) {
    
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({  
            map: map, 
            position: locPosition
        }); 
        
        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);      
    }    
    
// 마커를 표시할 위치와 title 객체 배열입니다 
var positions = [
    {
        title: '더사랑재가 복지센터', 
        latlng: new kakao.maps.LatLng(37.5366709, 127.122407),
        phone: '02-123-4567',
        address: '서울특별시 송파구'
    },
    {
        title: '서울특별시 동부 노인보호전문기관', 
        latlng: new kakao.maps.LatLng(37.5442229, 127.1251818),
        phone: '02-234-5678',
        address: '서울특별시 송파구'
    },
    {
        title: '송파노인재가 복지센터', 
        latlng: new kakao.maps.LatLng( 37.5289146, 127.1181769),
        phone: '02-345-6789',
        address: '서울특별시 송파구'
    },

];

// 마커 이미지의 이미지 주소입니다
var imageSrc = "/img/위치.png"; 
    
for (var i = 0; i < positions.length; i ++) {
    
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(31, 36); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
    
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });
}

//바텀시트
function displayBottomSheet(facilities) {
        var bottomSheet = document.getElementById('bottom-sheet');
        var facilityList = document.getElementById('facility-list');
        facilityList.innerHTML = '';

        facilities.forEach(function(facility) {
            var item = document.createElement('div');
            item.className = 'facility-item';
            var distance = userPosition ? calculateDistance(userPosition.lat, userPosition.lng, facility.y, facility.x) : 0;
            var walkingTime = Math.ceil(distance / 80); // Average walking speed is 80 meters per minute
            item.innerHTML = `
                <img src="/img/facility.svg" alt="Facility Image">
                <div class="facility-info">
                    <h2>${username}님과 가까운 주변 복지시설<h2>
                    <div class="facility-name">${positions.title}</div>
                    <div class="facility-address">${positions.address}</div>
                    <div class="facility-distance">${distance}m | 도보 ${walkingTime}분</div>
                    <button class="call-button" onclick="makeCall('${positions.phone}')">전화</button>
                </div>
            `;
            facilityList.appendChild(item);
        });

        bottomSheet.classList.add('active');
        
    
}

    function calculateDistance(lat1, lon1, lat2, lon2) {
        var R = 6371e3; // metres
        var φ1 = lat1 * Math.PI/180;
        var φ2 = lat2 * Math.PI/180;
        var Δφ = (lat2 - lat1) * Math.PI/180;
        var Δλ = (lon2 - lon1) * Math.PI/180;

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        var d = R * c;
        return Math.round(d); // distance in meters
    }

    function makeCall(phoneNumber) {
     window.location.href = `tel:${phoneNumber}`;
    }
  
      // Toggle bottom sheet functionality
      var bottomSheet = document.getElementById('bottom-sheet');
      var bottomSheetHandle = document.getElementById('bottom-sheet-handle');
      
      bottomSheetHandle.addEventListener('click', function() {
          if (bottomSheet.classList.contains('active')) {
              bottomSheet.classList.remove('active');
              bottomSheet.style.height = '30%'; // Move back to initial position
          } else {
              bottomSheet.classList.add('active');
              bottomSheet.style.height = `calc(100vh - ${document.querySelector('.search-bar').offsetHeight + 24}px)`; // Fully show the bottom sheet
          }
      });
  

    // 검색 기능 추가
    var infowindow = new kakao.maps.InfoWindow({zIndex:1});

    var ps = new kakao.maps.services.Places(); // 장소 검색 객체를 생성합니다


    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status) {
        if (status === kakao.maps.services.Status.OK) {
            var bounds = new kakao.maps.LatLngBounds();

            for (var i = 0; i < data.length; i++) {
                displaySearchMarker(data[i]);    
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }       

        map.setBounds(bounds);
       
        } 
    }

    // 지도에 마커를 표시하는 함수입니다
    function displaySearchMarker(place) {
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });

        kakao.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }
    // 검색 버튼 클릭 이벤트
    document.getElementById('search-button').addEventListener('click', function() {
        var keyword = document.getElementById('search-input').value;
        if (keyword) {
            ps.keywordSearch(keyword, placesSearchCB); 
        }
    });
});
