document.addEventListener('DOMContentLoaded', function() {
    const initialPageId = window.location.pathname.split('/').pop().split('.')[0] || 'home';
    if (initialPageId === 'mypage') {
        initializeMypage();
    }
    
    const realUpload = document.querySelector('.real-upload');
    const upload = document.querySelector('.edit-icon');
    upload.addEventListener('click', () => realUpload.click());
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
        
        const inputName = document.getElementById('name');
        const inputDob = document.getElementById('birthdate');
        const dobError = document.getElementById('dob_error');
        
        inputName.value = '';
        inputDob.value = '';
        dobError.style.display = 'none';
        inputDob.classList.remove('error');
        
        const signinBtn = document.getElementById('submit-button');
        signinBtn.disabled = true;
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
