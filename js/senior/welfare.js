document.addEventListener('DOMContentLoaded', function() {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨 
        }; 
    //지도생성
    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    var username = '홍길동';
    var userPosition = null;
    var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
        infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    var defaultFacilities = [
        {
            title: '동그라미재가노인복지센터',
            address: '서울 서초구 강남대로8길 49 201호',
            sub: '서브 텍스트 공백포함 20자 넘어가면 ... 으로',
            phone: '0507-1346-6046',
            lat: 337.469150863,
            lon: 127.043199747,
            distance: 0.468,
            walkingTime: 8
        },
        {
            title: '양재노인종합복지관',
            address: '서울 서초구 강남대로30길 73-7 서초노인종합복지관',
            sub: '서브 텍스트 공백포함 20자 넘어가면 ... 으로',
            phone: '02-578-1515',
            lat: 37.48297489999999,
            lon: 127.0408069,
            distance: 1.8,
            walkingTime: 29
        },
        {
            title: '서초구립 본마을데이케어센터',
            address: '서울 서초구 본마을2길 2 본마을 노인복지센터',
            sub: '서브 텍스트 공백포함 20자 넘어가면 ... 으로',
            phone: '02-6933-1515',
            lat: 37.454417636,
            lon: 127.053431926,
            distance: 2.1,
            walkingTime: 33
        }
    ];

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
            
            // 예시 데이터를 사용하여 주소 표시
            var detailAddr = "서울특별시 서초구 강남대로"; // 예시 주소
            var arr = detailAddr.split(" ");
            var city = arr[0];
            var district = arr[1];
            var subDistrict = arr[2];
            var userLocationElement = document.getElementById('user-location');
            userLocationElement.innerHTML = `
                <div class="location-container">
                    <img src="/img/위치.svg" alt="location icon" class="location-icon">
                    <span class="location-text">내 위치</span>
                    <span class="locationtt"> ${city} ${district} ${subDistrict}</span>
                </div>
            `;

            // 기본 시설 정보 표시
            displayBottomSheet(defaultFacilities);
            displayMarkers(defaultFacilities);

          }, function(error) {
            console.error("Error occurred. Error code: " + error.code);
            // Handle error here
          });  

    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        
        var locPosition = new kakao.maps.LatLng(37.566826, 126.9786567),    
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

    // 지도에 시설 마커들을 표시하는 함수
    function displayMarkers(facilities) {
        // 마커 이미지의 이미지 주소입니다
        var imageSrc = "/img/위치.png"; 
        
        for (var i = 0; i < facilities.length; i++) {
            
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(31, 36); 
            
            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
            
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: new kakao.maps.LatLng(facilities[i].lat, facilities[i].lon), // 마커를 표시할 위치
                title: facilities[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage // 마커 이미지 
            });
        }
    }


    // 문자열 길이 제한 함수
    function truncateString(str, num) {
        return (str.length <= num) ? str : str.slice(0, num) + '...';
    }

    //바텀시트
    function displayBottomSheet(facilities, title = `${username} 님과 가까운 주변 복지시설`) {
        var bottomSheet = document.getElementById('bottom-sheet');
        var facilityList = document.getElementById('facility-list');
        facilityList.innerHTML = '';
        if (facilities.length === 0) {
            facilityList.innerHTML = `<div class="no-results-message"> 검색 결과가 없어요 다시 검색해주세요!</div>`;
        } else {
            facilities.forEach(function(facility, index) {
                var item = document.createElement('div');
                item.className = 'facility-item';
                var truncatedTitle = truncateString(facility.title, 15);
                var truncatedSub = truncateString(facility.sub, 20);
                var truncatedAddress = truncateString(facility.address, 25);
                var distance = facility.distance;
                var walkingTime = facility.walkingTime;
                item.innerHTML = `
                    <div class="facility-info">
                        ${index === 0 ? `<h2>${title}</h2>` : ''}
                        <img src="/img/facility.svg" alt="Facility Image">
                        <div class="facility-name">${truncatedTitle}</div>
                        <div class="facility-address">${truncatedSub}</div>
                        <div class="facility-distance">${distance}km | 도보 ${walkingTime}분</div>
                        <div class="facility-address">${truncatedAddress}</div>
                        <button class="call-button" onclick="showCallPopup('${facility.title}', '${facility.phone}')">
                            <img src = "/img/call.svg" alt="call">
                        </button>
                    </div>
                `;
                facilityList.appendChild(item);
            });
        }
            bottomSheet.classList.add('active');
    }


    function makeCall(phoneNumber) {
        window.location.href = `tel:${phoneNumber}`;
    }
    
     // 팝업창을 보여주는 함수
     window.showCallPopup = function(facilityName, phoneNumber) {
        var popupBackground = document.createElement('div');
        popupBackground.className = 'popup-background active';
        document.body.appendChild(popupBackground);
        
        var popup = document.getElementById('call-popup');
        var popupFacilityName = document.getElementById('popup-facility-name');
        var confirmCallButton = document.getElementById('confirm-call');
        
        popupFacilityName.textContent = `${facilityName}에 전화할까요?`;
        confirmCallButton.onclick = function() {
            makeCall(phoneNumber);
        };

        // 팝업을 화면 가운데에 표시
        popup.classList.add('active');

        // 팝업 닫기 버튼 이벤트
        document.getElementById('cancel-call').onclick = function() {
            popup.classList.remove('active');
            popupBackground.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(popupBackground);
            }, 300); // 배경 페이드 아웃 시간과 맞춤
        };
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
            bottomSheet.style.height = `calc(100vh - 110px)`; // Fully show the bottom sheet
        }
    });

    // 검색 기능 추가
    document.getElementById('search-button').addEventListener('click', function() {
        var searchInput = document.getElementById('search-input').value;
        if (searchInput.includes('노인') || searchInput.includes('복지') || searchInput.includes('시설')) {
            map.setLevel(5); // 지도를 줌 아웃
            // 예시 데이터로 검색 결과 표시
            var searchResults = [
                {
                    title: '서초성심노인복지센터',
                    address: '서울 서초구 반포대로22길 61 서초노인회관',
                    sub: '서브 텍스트 공백포함 20자 넘어가면 ... 으로',
                    phone: '02-987-6543',
                    lat: 37.490571397,
                    lon: 127.011758060,
                    distance: 4.6,
                    walkingTime: 74
                },
                {
                    title: '강남구립 논현노인종합복지관',
                    address: '서울특별시 강남구 논현동 125-13',
                    sub: '서브 텍스트 공백포함 20자 넘어가면 ... 으로',
                    phone: '02-541-0226',
                    lat: 37.512038952696244,
                    lon: 127.02612524032651,
                    distance: 5.4,
                    walkingTime: 13
                },
                {
                    title: '역삼노인복지관',
                    address: '서울특별시 강남구 도곡로27길 27',
                    sub: '서브 텍스트 공백포함 20자 넘어가면 ... 으로',
                    phone: '02-501-5674',
                    lat: 37.494545171,
                    lon: 127.041836735,
                    distance: 3.3,
                    walkingTime: 56
                }
            ];
            displayBottomSheet(searchResults, "검색 결과");
            displayMarkers(searchResults);
        }
        else{
            displayBottomSheet([], "검색 결과");

        }
    });

});
