document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.querySelector('#main-content');
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const pageId = this.getAttribute('data-id');
            loadPage(pageId);
            updateNavIcons(pageId);
            updateActiveNavItem(this);
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

    function updateActiveNavItem(activeItem) {
        navItems.forEach(item => {
            item.classList.remove('active'); 
        });
        activeItem.classList.add('active'); 
    }

    const initialPageId = window.location.pathname.split('/').pop().split('.')[0] || 'home';
    loadPage(initialPageId);
    updateNavIcons(initialPageId);
    updateActiveNavItem(document.querySelector(`.nav-item[data-id="${initialPageId}"]`)); 

    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.pageId) {
            loadPage(event.state.pageId);
            updateNavIcons(event.state.pageId);
            updateActiveNavItem(document.querySelector(`.nav-item[data-id="${event.state.pageId}"]`)); 
        }
    });
});
