document.addEventListener("DOMContentLoaded", function() {
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
    plusButton.addEventListener('click', function() {
        document.getElementById('modal1').classList.add('show');
        modalBackdrop.classList.add('show');
    });

    // 모달 내의 취소 버튼을 눌렀을 때 모달을 숨기기
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('modal1').classList.remove('show');
        modalBackdrop.classList.remove('show');
    });


    const next1 = document.getElementById('next1');
    next1.addEventListener('click', function() {
        document.getElementById('modal3').classList.add('show');
    });


});