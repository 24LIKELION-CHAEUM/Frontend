document.addEventListener('DOMContentLoaded', () => {
    const mealTimeButton = document.getElementById('meal-time');
    const medicationButton = document.getElementById('medication');
    const mainView = document.getElementById('main-view');
    const mealTimeView = document.getElementById('meal-time-view');
    const medicationView = document.getElementById('medication-view');
    const backToMainButton = document.getElementById('back-to-main');
    const backToMainMedicationButton = document.getElementById('back-to-main-medication');
    const registerButton = document.getElementById('register-meal-time');
    const mealTypeSelect = document.getElementById('meal-type-select');
    const hourInput = document.getElementById('hour');
    const minuteInput = document.getElementById('minute');
    const medicationNameInput = document.getElementById('medication-name');
    const medicationHourInput = document.getElementById('medication-hour');
    const medicationMinuteInput = document.getElementById('medication-minute');
    const medicationDays = document.querySelectorAll('.day-button');
    const errorMessage = document.getElementById('error-message');
    const bottomSheet = document.getElementById('bottom-sheet');
    const overlay = document.getElementById('overlay');
    const mealTypeOptions = document.querySelectorAll('.meal-type-option');
    const registeredMealTimeLabel = document.querySelector('.meal-time-label span');
    const registeredMealTimes = document.querySelector('.meal-times');
    const completeRegistrationButton = document.querySelector('.complete-button');
    const registeredMedicationContainer = document.querySelector('.registered-medication');
    const medicationCountElement = document.querySelector('.medication-count');

    let previousHourValue = '';
    let previousMinuteValue = '';
    let registeredMeals = {};
    let registeredMedications = [];

    function validateTimeInput() {
        const hour = parseInt(hourInput.value, 10);
        const minute = parseInt(minuteInput.value, 10);
        let isValid = true;

        if (isNaN(hour) || hour < 0 || hour > 23) {
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
            registerButton.classList.add('enabled');
            registerButton.classList.remove('disabled');
            registerButton.disabled = false;
        } else {
            registerButton.classList.remove('enabled');
            registerButton.classList.add('disabled');
            registerButton.disabled = true;
        }
    }

    function updateRegisteredMealTimes() {
        registeredMealTimes.innerHTML = '';
        Object.keys(registeredMeals).forEach(meal => {
            const mealSpan = document.createElement('span');
            mealSpan.textContent = meal;
            mealSpan.classList.add('registered-meal-time');
            registeredMealTimes.appendChild(mealSpan);
        });
        checkAllMealsRegistered();
    }

    function checkAllMealsRegistered() {
        if (registeredMeals['아침'] && registeredMeals['점심'] && registeredMeals['저녁']) {
            completeRegistrationButton.classList.add('enabled');
            completeRegistrationButton.classList.remove('disabled');
            completeRegistrationButton.disabled = false;
        } else {
            completeRegistrationButton.classList.remove('enabled');
            completeRegistrationButton.classList.add('disabled');
            completeRegistrationButton.disabled = true;
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

    medicationButton.addEventListener('click', () => {
        mainView.classList.add('hidden');
        medicationView.classList.remove('hidden');
    });

    backToMainMedicationButton.addEventListener('click', () => {
        medicationView.classList.add('hidden');
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
            mealTypeOptions.forEach(opt => {
                const checkIcon = opt.querySelector('.check-icon');
                if (checkIcon) {
                    checkIcon.remove();
                }
            });
            const checkIcon = document.createElement('img');
            checkIcon.src = '/assets/check_activated.svg'; // Use the path to your colored check icon
            checkIcon.alt = 'check';
            checkIcon.classList.add('check-icon', 'colored-check-icon');
            option.appendChild(checkIcon);

            mealTypeSelect.value = option.dataset.value;
            setTimeout(() => {
                bottomSheet.style.transform = 'translateY(100%)';
                overlay.classList.remove('visible');
                setTimeout(() => {
                    bottomSheet.classList.add('hidden');
                    overlay.classList.add('hidden');
                }, 300);
            }, 300);
            checkInputValidity();
        });
    });

    hourInput.addEventListener('input', () => {
        const value = hourInput.value;
        if (!/^\d*$/.test(value) || parseInt(value, 10) < 0 || parseInt(value, 10) > 23) {
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

    medicationNameInput.addEventListener('focus', () => {
        medicationNameInput.classList.add('input-focused');
    });
    medicationNameInput.addEventListener('blur', () => {
        medicationNameInput.classList.remove('input-focused');
    });

    medicationNameInput.addEventListener('input', () => {
        medicationNameInput.style.color = '#000';
        checkMedicationInputValidity();
    });

    medicationHourInput.addEventListener('input', () => {
        medicationHourInput.style.color = '#000';
        checkMedicationInputValidity();
    });

    medicationMinuteInput.addEventListener('input', () => {
        medicationMinuteInput.style.color = '#000';
        checkMedicationInputValidity();
    });

    medicationDays.forEach(dayButton => {
        dayButton.addEventListener('click', () => {
            dayButton.classList.toggle('selected');
            checkMedicationInputValidity();
        });
    });

    function checkMedicationInputValidity() {
        const medicationName = medicationNameInput.value.trim();
        const hour = medicationHourInput.value.trim();
        const minute = medicationMinuteInput.value.trim();
        const selectedDays = Array.from(medicationDays).filter(dayButton => dayButton.classList.contains('selected')).length;

        if (medicationName && hour && minute && selectedDays > 0 && validateMedicationTimeInput() && registeredMedications.length < 3) {
            document.getElementById('register-medication').classList.add('enabled');
            document.getElementById('register-medication').classList.remove('disabled');
            document.getElementById('register-medication').disabled = false;
        } else {
            document.getElementById('register-medication').classList.remove('enabled');
            document.getElementById('register-medication').classList.add('disabled');
            document.getElementById('register-medication').disabled = true;
        }
    }

    function validateMedicationTimeInput() {
        const hour = parseInt(medicationHourInput.value, 10);
        const minute = parseInt(medicationMinuteInput.value, 10);
        return !isNaN(hour) && hour >= 0 && hour <= 23 && !isNaN(minute) && minute >= 0 && minute <= 59;
    }

    document.getElementById('register-medication').addEventListener('click', () => {
        if (!document.getElementById('register-medication').disabled) {
            const medicationName = medicationNameInput.value.trim();
            const hour = medicationHourInput.value.trim().padStart(2, '0');
            const minute = medicationMinuteInput.value.trim().padStart(2, '0');
            const selectedDays = Array.from(medicationDays).filter(dayButton => dayButton.classList.contains('selected')).map(dayButton => dayButton.textContent).join(',');

            registeredMedications.push({
                name: medicationName,
                time: `${hour}:${minute}`,
                days: selectedDays
            });

            updateRegisteredMedications();
            medicationNameInput.value = '';
            medicationHourInput.value = '';
            medicationMinuteInput.value = '';
            medicationDays.forEach(dayButton => dayButton.classList.remove('selected'));
            checkMedicationInputValidity();
        }
    });

    function updateRegisteredMedications() {
        const medicationCount = registeredMedications.length;
        if (medicationCount > 0) {
            document.querySelector('.registered-medication .medication-label .text').textContent = '등록된 약';
        }
        medicationCountElement.textContent = `${medicationCount}회`;
        if (medicationCount === 3) {
            document.getElementById('register-medication').classList.remove('enabled');
            document.getElementById('register-medication').classList.add('disabled');
            document.getElementById('register-medication').disabled = true;
        }
    }

    registerButton.addEventListener('click', () => {
        if (!registerButton.disabled) {
            const mealType = mealTypeSelect.value;
            const hour = hourInput.value.padStart(2, '0');
            const minute = minuteInput.value.padStart(2, '0');

            registeredMeals[mealType] = `${hour}:${minute}`;
            registeredMealTimeLabel.textContent = '등록된 식사시간';
            updateRegisteredMealTimes();
            mealTypeSelect.value = '';
            hourInput.value = '';
            minuteInput.value = '';
            checkInputValidity();
        }
    });

    // Call checkInputValidity initially to ensure button is correctly enabled/disabled on page load
    checkInputValidity();
});
