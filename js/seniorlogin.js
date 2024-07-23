document.addEventListener('DOMContentLoaded', () => {
    const breakfastTime = document.getElementById('breakfast-time');
    const lunchTime = document.getElementById('lunch-time');
    const dinnerTime = document.getElementById('dinner-time');
    const completeButton = document.querySelector('.complete-button');
    const mealTimeButton = document.getElementById('meal-time');
    const mainView = document.getElementById('main-view');
    const mealTimeView = document.getElementById('meal-time-view');
    const backToMainButton = document.getElementById('back-to-main');
    const mealTypeSelect = document.getElementById('meal-type');
    const hourInput = document.getElementById('hour');
    const minuteInput = document.getElementById('minute');
    const errorMessage = document.getElementById('error-message');

    function checkMealTimes() {
        if (breakfastTime.value && lunchTime.value && dinnerTime.value) {
            completeButton.classList.add('enabled');
            completeButton.classList.remove('disabled');
            completeButton.disabled = false;
        } else {
            completeButton.classList.remove('enabled');
            completeButton.classList.add('disabled');
            completeButton.disabled = true;
        }
    }

    function validateTimeInputs() {
        const hour = parseInt(hourInput.value, 10);
        const minute = parseInt(minuteInput.value, 10);
        if (
            !isNaN(hour) && hour >= 0 && hour <= 23 &&
            !isNaN(minute) && minute >= 0 && minute <= 59
        ) {
            errorMessage.classList.add('hidden');
            return true;
        } else {
            errorMessage.classList.remove('hidden');
            return false;
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

    breakfastTime.addEventListener('input', checkMealTimes);
    lunchTime.addEventListener('input', checkMealTimes);
    dinnerTime.addEventListener('input', checkMealTimes);
    hourInput.addEventListener('input', validateTimeInputs);
    minuteInput.addEventListener('input', validateTimeInputs);
});
