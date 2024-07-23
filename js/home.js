document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // 기본 링크 클릭 동작을 방지합니다.

            // 모든 메뉴에서 활성화 상태 제거
            navItems.forEach(el => {
                el.classList.remove('active');
                const img = el.querySelector('img');
                img.src = el.getAttribute('data-inactive-src');
            });

            // 클릭된 메뉴에 활성화 상태 추가
            item.classList.add('active');
            const activeImg = item.querySelector('img');
            activeImg.src = item.getAttribute('data-active-src');
        });
    });
});
