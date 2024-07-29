document.addEventListener("DOMContentLoaded", function() {
    // HTML 요소 선택
    const hourInput = document.getElementById('hour');
    const minuteInput = document.getElementById('minute');
    const errorMessage = document.getElementById('error-message');
    const openModalBtn = document.getElementById('reason'); // 모달을 여는 버튼
    const modal = document.getElementById('myModal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const relationButtons = document.querySelectorAll('.relation-btn-wrapper'); // 모달 내 버튼들
    const reasonElement = document.getElementById('reason'); // 선택된 식사 시간 구분을 표시할 요소
    const submitButton = document.getElementById('submit-button2'); // 등록 버튼
    const recordedEmotionStatus = document.getElementById('recorded-emotion-status'); // 선택한 식사 시간 구분 표시 요소
    const span1 = document.querySelector('.span1'); // 문구를 변경할 요소

    // 선택된 식사 시간 구분을 저장할 변수
    let selectedRelation = null;
    const selectedRelations = new Set(); // 선택된 식사 시간 구분을 저장할 Set

    // 시간 유효성 검사
    function validateTime(hour, minute) {
        const hourNum = parseInt(hour, 10);
        const minuteNum = parseInt(minute, 10);
        return !isNaN(hourNum) && hourNum >= 0 && hourNum < 24 &&
               !isNaN(minuteNum) && minuteNum >= 0 && minuteNum < 60;
    }

    function validateMedicationForm() {
        const hour = hourInput.value.trim();
        const minute = minuteInput.value.trim();
        const isTimeValid = validateTime(hour, minute);
        const isFormValid = isTimeValid && selectedRelation !== null;

        // 시간 유효성 검사 및 에러 메시지 표시
        if (hour || minute) {
            if (!isTimeValid) {
                errorMessage.classList.remove('hidden');
            } else {
                errorMessage.classList.add('hidden');
            }
        } else {
            errorMessage.classList.add('hidden');
        }

        // 등록 버튼 활성화/비활성화
        submitButton.disabled = !isFormValid;
    }

    // 입력 필드 변경 시 동작 처리
    [hourInput, minuteInput].forEach(input => {
        input.addEventListener('input', validateMedicationForm);
    });

    // 초기 검사
    validateMedicationForm();

    // 모달 열기
    openModalBtn.addEventListener('click', function() {
        modal.classList.add('show');
        modalBackdrop.classList.add('show');
    });

    // 모달 닫기 함수
    function closeModal() {
        modal.classList.remove('show');
        modalBackdrop.classList.remove('show');
    }

    // 모달 외부 클릭 시 닫기
    modalBackdrop.addEventListener('click', closeModal);

    // 모달 내부 클릭 시 이벤트 전파 방지
    const modalContent = document.querySelector('.modal-content');
    modalContent.addEventListener('click', function(event) {
        event.stopPropagation(); // 모달 내부 클릭 시 닫히지 않도록
    });

    // 모달 내 버튼 클릭 시 상태 변경 및 선택한 값 표시
    relationButtons.forEach(buttonWrapper => {
        buttonWrapper.addEventListener('click', function() {
            // 선택 상태 초기화
            relationButtons.forEach(btn => btn.classList.remove('selected'));
            
            // 현재 클릭한 버튼을 선택 상태로 변경
            this.classList.add('selected');
            
            // 선택된 식사 시간 구분 저장
            selectedRelation = this.getAttribute('data-relation');
            reasonElement.textContent = selectedRelation;

            // 모달을 1초 후에 닫기
            setTimeout(() => {
                closeModal();
            }, 1000);
        });
    });

    // 등록 버튼 클릭 시 선택한 식사 시간 구분 업데이트 및 필드 초기화
    submitButton.addEventListener('click', function() {
        if (selectedRelation) {
            // 선택된 식사 시간 구분 추가
            selectedRelations.add(selectedRelation);
            
            // '없음'에 선택된 식사 시간 구분 업데이트 (아침, 점심, 저녁 순서로 정렬)
            const sortedRelations = ['아침', '점심', '저녁'].filter(relation => selectedRelations.has(relation));
            recordedEmotionStatus.textContent = sortedRelations.join(' '); // 쉼표 대신 공백으로 구분

            span1.textContent = '🍚     등록된 식사 시간';

            // 입력 필드와 선택된 식사 시간 구분 초기화
            hourInput.value = '';
            minuteInput.value = '';
            selectedRelation = null;
            reasonElement.textContent = '식사 시간 구분을 선택해주세요';

            submitButton.disabled = true;
        }
    });
});
