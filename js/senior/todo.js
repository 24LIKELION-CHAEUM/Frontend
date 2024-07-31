document.addEventListener("DOMContentLoaded", function() {
    const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
    const today = new Date();
    const currentDay = today.getDay();
    const currentDate = today.getDate();
    const fullDate = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const dayOfWeek = daysOfWeek[(currentDay + 6) % 7]; 
    const tasks = document.querySelectorAll('.task');
    const options = document.querySelectorAll('.option');
    const submitButton = document.getElementById('submit-button');

    const weekCalendar = document.getElementById('week-calendar');
    const plusButton = document.getElementById('plus-button');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modal1 = document.getElementById('modal1');
    const modal2 = document.getElementById('modal2');
    const modal3 = document.getElementById('modal3');
    const hourInput = document.getElementById('hour');
    const minuteInput = document.getElementById('minute');
    const submitButton3 = document.getElementById('submit-button3');
    const errorMessage = document.getElementById('error-message');
    const medicationNameInput = document.getElementById('reason');
    const medicationDays = document.querySelectorAll('.repeat-btn');
    const recordedEmotionStatus = document.getElementById('mediation-status');

    // modal2
    const hourInput2 = document.getElementById('hour2');
    const minuteInput2 = document.getElementById('minute2');
    const errorMessage2 = document.getElementById('error-message2');
    const submitButton2 = document.getElementById('submit-button2');
    const taskNameInput2 = document.getElementById('reason2');
    const taskDays = document.querySelectorAll('.repeat-btn2');

    let selectedOption = null; // 현재 선택된 옵션 저장 변수

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

    options.forEach(option => {
        option.addEventListener('click', function() {
            // 모든 옵션에서 'selected' 클래스 제거
            options.forEach(opt => opt.classList.remove('selected'));
            // 클릭한 옵션에 'selected' 클래스 추가
            this.classList.add('selected');
            // 선택된 옵션 저장
            selectedOption = this;
            // '다음' 버튼 활성화
            submitButton.disabled = false;
        });
    });

    // 옵션 해제 및 '다음' 버튼 비활성화
    function resetOptionAndButton() {
        options.forEach(option => option.classList.remove('selected'));
        selectedOption = null;
        submitButton.disabled = true;
    }

    // 시간 유효성 검사
    function validateTime(hour, minute) {
        const hourNum = parseInt(hour, 10);
        const minuteNum = parseInt(minute, 10);
        return !isNaN(hourNum) && hourNum >= 0 && hourNum < 24 && !isNaN(minuteNum) && minuteNum >= 0 && minuteNum < 60;
    }

    // 약물 등록 폼 유효성 검사
    function validateMedicationForm() {
        const medicationName = medicationNameInput.value.trim();
        const hour = hourInput.value.trim();
        const minute = minuteInput.value.trim();
        const selectedDays = Array.from(medicationDays).filter(dayButton => dayButton.classList.contains('selected')).length;
        const isTimeValid = validateTime(hour, minute);

        // 시간 유효성 검사
        if (hour || minute) {
            if (!isTimeValid) {
                errorMessage.classList.remove('hidden');
            } else {
                errorMessage.classList.add('hidden');
            }
        } else {
            errorMessage.classList.add('hidden');
        }

        // 버튼 활성화 조건 검사
        if (medicationName && hour && minute && selectedDays > 0 && isTimeValid) {
            submitButton3.classList.add('enabled');
            submitButton3.classList.remove('disabled');
            submitButton3.disabled = false;
        } else {
            submitButton3.classList.remove('enabled');
            submitButton3.classList.add('disabled');
            submitButton3.disabled = true;
        }
    }

    // 할 일 등록 폼 유효성 검사 (modal2)
    function validateTaskForm() {
        const taskName = taskNameInput2.value.trim();
        const hour = hourInput2.value.trim();
        const minute = minuteInput2.value.trim();
        const selectedDays = Array.from(taskDays).filter(dayButton => dayButton.classList.contains('selected')).length;
        const isTimeValid = validateTime(hour, minute);

        // 시간 유효성 검사
        if (hour || minute) {
            if (!isTimeValid) {
                errorMessage2.classList.remove('hidden');
            } else {
                errorMessage2.classList.add('hidden');
            }
        } else {
            errorMessage2.classList.add('hidden');
        }

        // 버튼 활성화 조건 검사
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

    // 등록된 약물 상태 업데이트
    function updateRecordedEmotionStatus() {
        const selectedDaysCount = Array.from(medicationDays).filter(dayButton => dayButton.classList.contains('selected')).length;
        const statusText = selectedDaysCount > 0 ? `${selectedDaysCount}회` : '없음';
        recordedEmotionStatus.textContent = statusText;
    }

    // 모달 열기 및 닫기
    function openModal(modal) {
        // 모든 모달 닫기
        const modals = [modal1, modal2, modal3];
        modals.forEach(m => m.classList.remove('show'));

        // 모달 백드롭 숨기기
        modalBackdrop.classList.remove('show');

        // 지정된 모달 열기
        modal.classList.add('show');
        modalBackdrop.classList.add('show');
    }

    function closeModal() {
        modal1.classList.remove('show');
        modal2.classList.remove('show');
        modal3.classList.remove('show');
        modalBackdrop.classList.remove('show');
        resetOptionAndButton(); // 모달 닫을 때 선택된 옵션과 버튼 상태 초기화
    }

    // 옵션 선택 후 '다음' 버튼 클릭 시 페이지 이동
    function handleSubmit() {
        if (!submitButton.disabled && selectedOption) {
            const optionText = selectedOption.querySelector('.option-title').textContent;

            if (optionText === "투약할 약 추가하기") {
                openModal(modal3);
            } else if (optionText === "다른 할 일 추가하기") {
                openModal(modal2);
            }

            // 모달 닫을 때 선택된 옵션과 버튼 상태 초기화
            resetOptionAndButton();
        }
    }

    // 이벤트 리스너 등록
    plusButton.addEventListener('click', () => openModal(modal1));

    const closeModalButtons = document.querySelectorAll('.close');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    submitButton.addEventListener('click', handleSubmit);

    [medicationNameInput, hourInput, minuteInput].forEach(input => {
        input.addEventListener('input', validateMedicationForm);
    });

    medicationDays.forEach(dayButton => {
        dayButton.addEventListener('click', () => {
            dayButton.classList.toggle('selected');
            validateMedicationForm();
        });
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

    submitButton3.addEventListener('click', () => {
        if (!submitButton3.disabled) {
            updateRecordedEmotionStatus();

            // 입력 필드 초기화
            medicationNameInput.value = '';
            hourInput.value = '';
            minuteInput.value = '';
            medicationDays.forEach(dayButton => dayButton.classList.remove('selected'));
            validateMedicationForm();
        }
    });

    submitButton2.addEventListener('click', () => {
        if (!submitButton2.disabled) {
            // 입력 필드 초기화
            taskNameInput2.value = '';
            hourInput2.value = '';
            minuteInput2.value = '';
            taskDays.forEach(dayButton => dayButton.classList.remove('selected'));
            validateTaskForm();
        }
    });

    // 초기화
    displayWeekCalendar();
    document.getElementById('full-date').textContent = fullDate;
    document.getElementById('day-of-week').textContent = `${dayOfWeek}요일`;
});
