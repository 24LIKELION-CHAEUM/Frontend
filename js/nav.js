document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.querySelector('#main-content');
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const pageId = this.getAttribute('data-id');
            loadPage(pageId);
            updateNavIcons(pageId);
            window.history.pushState({ pageId }, '', `${pageId}.html`);
        });
    });

    function loadPage(pageId) {
        fetch(`/html/${pageId}.html`)
            .then(response => response.text())
            .then(data => {
                mainContent.innerHTML = data;
            })
            .catch(error => {
                mainContent.innerHTML = '<p>페이지를 로드할 수 없습니다.</p>';
            });
    }

    function updateNavIcons(activePageId) {
        navItems.forEach(item => {
            const img = item.querySelector('img');
            const isActive = item.getAttribute('data-id') === activePageId;
            img.src = isActive ? item.getAttribute('data-active-src') : item.getAttribute('data-inactive-src');
        });
    }

    // 기본 페이지 로드 및 네비게이션 아이콘 업데이트
    const initialPageId = window.location.pathname.split('/').pop().split('.')[0] || 'home';
    loadPage(initialPageId);
    updateNavIcons(initialPageId);

    // 브라우저 뒤로가기/앞으로가기 버튼 처리
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.pageId) {
            loadPage(event.state.pageId);
            updateNavIcons(event.state.pageId);
        }
    });
});
