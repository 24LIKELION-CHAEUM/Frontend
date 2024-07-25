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
                if (pageId === 'mypage') {
                    initializeMypage();
                }
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

function initializeMypage() {
    const editProfileButton = document.querySelector('.my-edit-profile-button');
    const modal = document.getElementById('modal');
    const closeModalButton = document.querySelector('.close');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    const signinBtn = document.getElementById('submit-button');
    signinBtn.disabled = true;

    const inputName = document.getElementById('name');
    const inputDob = document.getElementById('birthdate');
    inputName.addEventListener('input', checkInputs);
    inputDob.addEventListener('input', checkInputs);

    if (editProfileButton) {
        editProfileButton.addEventListener('click', () => {
            modal.classList.add('show');
            modalBackdrop.classList.add('show');
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            closeModal();
        });
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', () => {
            closeModal();
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        modalBackdrop.classList.remove('show');
    }
}

function checkInputs() {
    const inputName = document.getElementById('name');
    const inputDob = document.getElementById('birthdate');
    const dobError = document.getElementById('dob_error');
    const signinBtn = document.getElementById('submit-button');

    const nameValue = inputName.value.trim();
    const dobValue = inputDob.value.trim();

    const isNameValid = nameValue.length > 0;
    const isDobValid = dobValue.length === 8 && /^\d{8}$/.test(dobValue);

    if (isNameValid && isDobValid) {
        signinBtn.disabled = false;
        dobError.style.display = 'none';
        inputDob.classList.remove('error');
    } else {
        signinBtn.disabled = true;
        if (!isDobValid && dobValue.length > 0) {
            dobError.style.display = 'block';
            inputDob.classList.add('error');
        } else {
            dobError.style.display = 'none';
            inputDob.classList.remove('error');
        }
    }
}