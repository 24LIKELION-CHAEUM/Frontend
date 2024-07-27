// 입력 필드와 버튼을 변수에 저장
const inputId = document.querySelector('.input_id');
const inputPassword = document.querySelector('.input_password');
const signinBtn = document.getElementById('signin_btn'); // id로 선택

// 입력 필드의 값이 변경될 때 호출되는 함수
function validateInputs() {
    // 두 입력 필드의 값이 모두 비어 있지 않으면 버튼 활성화
    if (inputId.value.trim() !== '' && inputPassword.value.trim() !== '') {
        signinBtn.disabled = false; // 버튼 활성화
    } else {
        signinBtn.disabled = true; // 버튼 비활성화
    }
}

// 입력 필드에 이벤트 리스너 추가
inputId.addEventListener('input', validateInputs);
inputPassword.addEventListener('input', validateInputs);
