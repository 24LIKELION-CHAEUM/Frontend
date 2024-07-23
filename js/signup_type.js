// signup_type.js

// 페이지 로드 시 모든 .select 요소에 클릭 이벤트 리스너 추가
document.querySelectorAll('.select').forEach(function(select) {
    select.addEventListener('click', function() {
        selectOption(this);
    });
});

function selectOption(element) {
    // 모든 .select 요소에서 selected 클래스를 제거
    document.querySelectorAll('.select').forEach(function(select) {
        select.classList.remove('selected');
        // 체크 이미지 변경 (선택되지 않음)
        select.querySelector('.check').src = '../assets/check_unactivated.svg';
    });

    // 클릭된 요소에 selected 클래스 추가
    element.classList.add('selected');
    // 체크 이미지 변경 (선택됨)
    element.querySelector('.check').src = '../assets/check_activated.svg';

    // 버튼 활성화
    document.getElementById('signin_btn').disabled = false;
}

// 버튼 클릭 시 페이지 이동 또는 다른 동작을 추가할 수 있습니다.
