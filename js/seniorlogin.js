document.addEventListener('DOMContentLoaded', () => {
    const mealTimeButton = document.getElementById('meal-time');
    const mainView = document.getElementById('main-view');
    const mealTimeView = document.getElementById('meal-time-view');
    const backToMainButton = document.getElementById('back-to-main');
    const completeButton = document.querySelector('.complete-button');
    const mealTypeSelect = document.getElementById('meal-type-select');
    const hourInput = document.getElementById('hour');
    const minuteInput = document.getElementById('minute');
    const errorMessage = document.getElementById('error-message');
    const bottomSheet = document.getElementById('bottom-sheet');
    const overlay = document.getElementById('overlay');
    const mealTypeOptions = document.querySelectorAll('.meal-type-option');

    function checkInputValidity() {
        const mealType = mealTypeSelect.value;
        const hour = hourInput.value;
        const minute = minuteInput.value;
        
        if (mealType && hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
            completeButton.classList.add('enabled');
            completeButton.classList.remove('disabled');
            completeButton.disabled = false;
        } else {
            completeButton.classList.remove('enabled');
            completeButton.classList.add('disabled');
            completeButton.disabled = true;
        }
    }

    mealTimeButton.addEventListener('click', () => {
        mainView.classList.add('hidden');
        mealTimeView.classList.remove('hidden');
    });

    backToMainButton.addEventListener('click', () => {
        mealTimeView.classList.add('hidden');
        mainView.classList.remove('hidden');
    });

    mealTypeSelect.addEventListener('click', () => {
        bottomSheet.classList.remove('hidden');
        setTimeout(() => {
            bottomSheet.style.transform = 'translateY(0)';
            overlay.classList.add('visible');
            overlay.classList.remove('hidden');
        }, 10);
    });

    overlay.addEventListener('click', () => {
        bottomSheet.style.transform = 'translateY(100%)';
        overlay.classList.remove('visible');
        setTimeout(() => {
            bottomSheet.classList.add('hidden');
            overlay.classList.add('hidden');
        }, 300);
    });

    mealTypeOptions.forEach(option => {
        option.addEventListener('click', () => {
            mealTypeSelect.value = option.dataset.value;
            setTimeout(() => {
                bottomSheet.style.transform = 'translateY(100%)';
                overlay.classList.remove('visible');
                setTimeout(() => {
                    bottomSheet.classList.add('hidden');
                    overlay.classList.add('hidden');
                }, 300);
            }, 1000);
            checkInputValidity();
        });
    });

    hourInput.addEventListener('input', checkInputValidity);
    minuteInput.addEventListener('input', checkInputValidity);
});
