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

    let previousHourValue = '';
    let previousMinuteValue = '';

    function validateTimeInput() {
        const hour = parseInt(hourInput.value, 10);
        const minute = parseInt(minuteInput.value, 10);
        let isValid = true;

        if (isNaN(hour) || hour < 0 || hour > 24) {
            isValid = false;
        }
        if (isNaN(minute) || minute < 0 || minute > 59) {
            isValid = false;
        }

        if (!isValid) {
            errorMessage.classList.remove('hidden');
        } else {
            errorMessage.classList.add('hidden');
        }

        return isValid;
    }

    function checkInputValidity() {
        const mealType = mealTypeSelect.value;
        const hour = hourInput.value;
        const minute = minuteInput.value;

        if (mealType && hour !== '' && minute !== '' && validateTimeInput()) {
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

    hourInput.addEventListener('input', () => {
        const value = hourInput.value;
        if (!/^\d*$/.test(value) || parseInt(value, 10) < 0 || parseInt(value, 10) > 24) {
            hourInput.value = previousHourValue;
            errorMessage.classList.remove('hidden');
        } else {
            previousHourValue = value;
            errorMessage.classList.add('hidden');
        }
        checkInputValidity();
    });

    minuteInput.addEventListener('input', () => {
        const value = minuteInput.value;
        if (!/^\d*$/.test(value) || parseInt(value, 10) < 0 || parseInt(value, 10) > 59) {
            minuteInput.value = previousMinuteValue;
            errorMessage.classList.remove('hidden');
        } else {
            previousMinuteValue = value;
            errorMessage.classList.add('hidden');
        }
        checkInputValidity();
    });

    hourInput.addEventListener('focus', () => {
        hourInput.classList.add('input-focused');
    });
    hourInput.addEventListener('blur', () => {
        hourInput.classList.remove('input-focused');
    });
    minuteInput.addEventListener('focus', () => {
        minuteInput.classList.add('input-focused');
    });
    minuteInput.addEventListener('blur', () => {
        minuteInput.classList.remove('input-focused');
    });
});
