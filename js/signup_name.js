// 입력 필드와 버튼을 선택합니다.
const inputName = document.getElementById('input_name');
const inputDob = document.getElementById('input_dob');
const dobError = document.getElementById('dob_error');
const signinBtn = document.getElementById('signin_btn');

// 입력 필드의 값이 변경될 때마다 호출되는 함수를 정의합니다.
function checkInputs() {
    const nameValue = inputName.value.trim();
    const dobValue = inputDob.value.trim();

    // 이름 입력값 확인
    const isNameValid = nameValue.length > 0;

    // 생년월일 입력값 확인
    const isDobValid = dobValue.length === 8 && /^\d{8}$/.test(dobValue);

    // 이름 필드가 비어있지 않고, 생년월일 필드가 유효하면 버튼 활성화
    if (isNameValid && isDobValid) {
        signinBtn.disabled = false;
        inputDob.classList.remove('error');
        dobError.style.display = 'none';
    } else {
        signinBtn.disabled = true;
        if (!isDobValid && dobValue.length > 0) {
            inputDob.classList.add('error');
            dobError.style.display = 'block';
        } else {
            inputDob.classList.remove('error');
            dobError.style.display = 'none';
        }
    }
}

// 입력 필드에 이벤트 리스너를 추가하여 값이 변경될 때마다 checkInputs 함수를 호출합니다.
inputName.addEventListener('input', checkInputs);
inputDob.addEventListener('input', checkInputs);

// 페이지 로드 시에도 checkInputs 함수를 호출하여 초기 상태를 설정합니다.
window.addEventListener('load', checkInputs);
