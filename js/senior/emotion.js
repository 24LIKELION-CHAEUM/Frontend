document.addEventListener("DOMContentLoaded", function() {
    // 임의로 초반에는 false 상태가 되도록 저장
    localStorage.setItem('recordedEmotion', 'false');
    localStorage.setItem('recordedEmotionComment', 'false');
    toggleVisibility();

    const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
    
    // 현재 날짜 정보 가져오기
    const today = new Date();
    const currentDay = today.getDay();
    const currentDate = today.getDate();
    const fullDate = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const dayOfWeek = daysOfWeek[(currentDay + 6) % 7]; // 월요일이 시작이 되도록 조정

    // 주의 시작 날짜 계산 (월요일)
    const startDate = new Date(today);
    startDate.setDate(currentDate - (currentDay === 0 ? 6 : currentDay - 1));

    // 주간 날짜 생성
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        weekDates.push({
            day: daysOfWeek[i],
            date: date.getDate()
        });
    }

    // 주간 달력 표시
    const weekCalendar = document.getElementById('week-calendar');
    weekCalendar.innerHTML = weekDates.map(({ day, date }, index) => `
        <div class="day ${index === (currentDay === 0 ? 6 : currentDay - 1) ? 'active' : ''}">
            <span class="day-name">${day}</span>
            <span class="day-date">${date}</span>
        </div>
    `).join('');

    document.getElementById('full-date').textContent = fullDate;
    document.getElementById('day-of-week').textContent = `${dayOfWeek}요일`;

    const plusButton = document.getElementById('plus-button');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const submitButton = document.getElementById('submit-button');
    const recordedEmotionStatus = document.getElementById('recorded-emotion-status');
    const errorMessage = document.getElementById('error-message');

    plusButton.addEventListener('click', function() {
        document.getElementById('modal').classList.add('show');
        modalBackdrop.classList.add('show');
    });

    // 모달 내의 취소 버튼을 눌렀을 때 모달을 숨기기
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('modal').classList.remove('show');
        modalBackdrop.classList.remove('show');
    });

    const emotionButtons = document.querySelectorAll('.emotion-btn');
    let selectedEmotion = null;
    let selectedEmoji = null;

    emotionButtons.forEach(button => {
        button.addEventListener('click', function() {
            emotionButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedEmotion = button.innerText.trim();
            selectedEmoji = button.querySelector('.emotion-emoji').textContent.trim();
            validateForm();
        });
    });

    const hourInput = document.getElementById('hour');
    const minuteInput = document.getElementById('minute');
    const reasonInput = document.getElementById('reason');

    [hourInput, minuteInput].forEach(input => {
        input.addEventListener('blur', function(event) {
            if (event.target.value.length === 1) {
                event.target.value = '0' + event.target.value;
            }
            validateForm();
        });
    });

    [hourInput, minuteInput, reasonInput].forEach(input => {
        input.addEventListener('input', validateForm);
    });


    function validateTime(hour, minute) {
        const hourNum = parseInt(hour, 10);
        const minuteNum = parseInt(minute, 10);
        if (isNaN(hourNum) || isNaN(minuteNum)) {
            return false;
        }
        return hourNum >= 0 && hourNum < 24 && minuteNum >= 0 && minuteNum < 60;
    }

    function convertTo12HourFormat(hour, minute) {
        const hourNum = parseInt(hour, 10);
        const minuteNum = parseInt(minute, 10);
        const period = hourNum < 12 ? '오전' : '오후';
        const hour12 = hourNum % 12 || 12; 
        return `${period} ${hour12}:${minuteNum < 10 ? '0' + minuteNum : minuteNum}`;
    }
    
    function validateForm() {
        const hour = hourInput.value.trim();
        const minute = minuteInput.value.trim();
        const reason = reasonInput.value.trim();

        const isTimeValid = validateTime(hour, minute);

        if (selectedEmotion && hour && minute && reason && isTimeValid) {
            submitButton.disabled = false;
            errorMessage.classList.add('hidden');
        } else {
            submitButton.disabled = true;
            if (!isTimeValid) {
                errorMessage.classList.remove('hidden');
                errorMessage.textContent = '시간 입력을 확인해주세요';
            } else {
                errorMessage.classList.add('hidden');
            }
        }
    }

    submitButton.addEventListener('click', function() {
        // 기록된 감정 상태 업데이트
        recordedEmotionStatus.textContent = selectedEmotion.replace(/[^\uAC00-\uD7A3]/g, '');

        // .mood-item 요소 업데이트
        const moodItem = document.querySelector('.mood-item');
        moodItem.querySelector('.emoji').textContent = selectedEmoji;
        moodItem.querySelector('.mood-title').textContent = selectedEmotion.replace(/[^\uAC00-\uD7A3]/g, '');
        moodItem.querySelector('.mood-time').textContent = convertTo12HourFormat(hourInput.value, minuteInput.value);
        moodItem.querySelector('.mood-reason').textContent = reasonInput.value;

        // 모달 초기화
        selectedEmotion = null;
        selectedEmoji = null;
        hourInput.value = '';
        minuteInput.value = '';
        reasonInput.value = '';
        emotionButtons.forEach(btn => btn.classList.remove('selected'));
        submitButton.disabled = true;
        errorMessage.classList.add('hidden');

        // 감정 기록 상태를 로컬 스토리지에 저장
        localStorage.setItem('recordedEmotion', 'true');
        toggleVisibility();

        const plusButton = document.getElementById('plus-button');
        plusButton.src = '/assets/add_unactivated.svg';
        plusButton.style.pointerEvents = 'none'; // 클릭 불가능하게 설정
    });


    function truncateText(element, maxLength) {
        let text = element.textContent;
        if (text.length > maxLength) {
            element.textContent = text.slice(0, maxLength) + '...';
        }
    }

    let reasonElement = document.querySelectorAll('.comment-reason');
    let commentElement = document.querySelectorAll('.comment-reason');

    reasonElement.forEach(function(element) {
        truncateText(element, 19);
    });
    commentElement.forEach(function(element) {
        truncateText(element, 30);
    });

    function toggleVisibility() {
        const isRecorded = localStorage.getItem('recordedEmotion') === 'true';
        const isCommented = localStorage.getItem('recordedEmotionComment') === 'true';

        document.querySelector('.mood-list').style.display = isRecorded ? 'block' : 'none';
        document.querySelector('.mood-list2').style.display = isRecorded ? 'none' : 'block';
        document.querySelector('.comment-list').style.display = isCommented ? 'block' : 'none';
        document.querySelector('.comment-list2').style.display = isCommented ? 'none' : 'block';
    }
});
