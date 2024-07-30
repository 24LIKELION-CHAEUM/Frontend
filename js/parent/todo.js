document.addEventListener("DOMContentLoaded", function() {
    const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
    const today = new Date();
    const currentDay = today.getDay(); // 0 (일요일)부터 6 (토요일)까지의 숫자
    const currentDate = today.getDate();
    const fullDate = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const dayOfWeek = daysOfWeek[(currentDay + 6) % 7]; // 일요일을 월요일로 맞추기

    const weekCalendar = document.getElementById('week-calendar');
    const plusButton = document.getElementById('plus-button');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modal2 = document.getElementById('modal2');
    const hourInput2 = document.getElementById('hour2');
    const minuteInput2 = document.getElementById('minute2');
    const errorMessage2 = document.getElementById('error-message2');
    const submitButton2 = document.getElementById('submit-button2');
    const taskNameInput2 = document.getElementById('reason2');
    const taskDays = document.querySelectorAll('.repeat-btn');
    const tasks = document.querySelectorAll('.task');

    // 현재 날짜 정보와 주간 날짜 생성
    function calculateWeekDates() {
        const startDate = new Date(today);
        startDate.setDate(currentDate - (currentDay === 0 ? 6 : currentDay - 1));

        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            weekDates.push({
                day: daysOfWeek[i],
                date: date.getDate()
            });
        }
        return weekDates;
    }

    // 주간 달력 표시
    function displayWeekCalendar() {
        const weekDates = calculateWeekDates();
        weekCalendar.innerHTML = weekDates.map(({ day, date }, index) => `
            <div class="day ${index === (currentDay === 0 ? 6 : currentDay - 1) ? 'active' : ''}">
                <span class="day-name">${day}</span>
                <span class="day-date">${date}</span>
            </div>
        `).join('');
    }

    tasks.forEach(task => {
        const checkButton = task.querySelector('.task-status img');
        checkButton.addEventListener('click', () => {
            task.classList.toggle('completed');
        });
    });

    // 모달 열기 및 닫기
    function openModal(modal) {
        modal.classList.add('show');
        modalBackdrop.classList.add('show');
    }

    function closeModal() {
        modal2.classList.remove('show');
        modalBackdrop.classList.remove('show');
    }

    // 할 일 등록 폼 유효성 검사
    function validateTaskForm() {
        const taskName = taskNameInput2.value.trim();
        const hour = hourInput2.value.trim();
        const minute = minuteInput2.value.trim();
        const selectedDays = Array.from(taskDays).filter(dayButton => dayButton.classList.contains('selected')).length;
        const isTimeValid = validateTime(hour, minute);

        if (hour || minute) {
            if (!isTimeValid) {
                errorMessage2.classList.remove('hidden');
            } else {
                errorMessage2.classList.add('hidden');
            }
        } else {
            errorMessage2.classList.add('hidden');
        }

        if (taskName && hour && minute && selectedDays > 0 && isTimeValid) {
            submitButton2.classList.add('enabled');
            submitButton2.classList.remove('disabled');
            submitButton2.disabled = false;
        } else {
            submitButton2.classList.remove('enabled');
            submitButton2.classList.add('disabled');
            submitButton2.disabled = true;
        }
    }

    function validateTime(hour, minute) {
        const hourNum = parseInt(hour, 10);
        const minuteNum = parseInt(minute, 10);
        return !isNaN(hourNum) && hourNum >= 0 && hourNum < 24 && !isNaN(minuteNum) && minuteNum >= 0 && minuteNum < 60;
    }

    function handleSubmit() {
        if (!submitButton2.disabled) {
            const optionText = selectedOption.querySelector('.option-title').textContent;
            if (optionText === "다른 할 일 추가하기") {
                openModal(modal2);
            }
            resetOptionAndButton(); 
        }
    }

    function resetOptionAndButton() {
        selectedOption = null;
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
        submitButton.classList.remove('enabled');
    }

    plusButton.addEventListener('click', () => openModal(modal2));

    const closeModalButtons = document.querySelectorAll('.close');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    submitButton2.addEventListener('click', () => {
        if (!submitButton2.disabled) {
            taskNameInput2.value = '';
            hourInput2.value = '';
            minuteInput2.value = '';
            taskDays.forEach(dayButton => dayButton.classList.remove('selected'));
            validateTaskForm();
        }
    });

    [taskNameInput2, hourInput2, minuteInput2].forEach(input => {
        input.addEventListener('input', validateTaskForm);
    });

    taskDays.forEach(dayButton => {
        dayButton.addEventListener('click', () => {
            dayButton.classList.toggle('selected');
            validateTaskForm();
        });
    });

    displayWeekCalendar();
    document.getElementById('full-date').textContent = fullDate;
    document.getElementById('day-of-week').textContent = `${dayOfWeek}요일`;
});
