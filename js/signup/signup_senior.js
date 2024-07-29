document.addEventListener("DOMContentLoaded", function() {
    // 각 option 요소 선택
    const optionElements = document.querySelectorAll('.option');

    // 각 option 요소에 클릭 이벤트 리스너 추가
    optionElements.forEach(option => {
        option.addEventListener('click', function() {
            // data-href 속성 값으로 페이지 이동
            const href = this.getAttribute('data-href');
            if (href) {
                window.location.href = href;
            }
        });
    });
});
