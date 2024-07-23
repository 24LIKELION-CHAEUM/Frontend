// 입력 필드와 버튼을 선택합니다.
const inputId = document.querySelector('.input_id');
const inputPassword = document.querySelector('.input_password');
const signinBtn = document.getElementById('signin_btn');

// 입력 필드의 값이 변경될 때마다 호출되는 함수를 정의합니다.
function checkInputs() {
    if (inputId.value.trim() && inputPassword.value.trim()) {
        // 아이디와 비밀번호가 모두 입력되었으면 버튼을 활성화합니다.
        signinBtn.disabled = false;
    } else {
        // 아이디와 비밀번호가 모두 입력되지 않았으면 버튼을 비활성화합니다.
        signinBtn.disabled = true;
    }
}

// 입력 필드에 이벤트 리스너를 추가하여 값이 변경될 때마다 checkInputs 함수를 호출합니다.
inputId.addEventListener('input', checkInputs);
inputPassword.addEventListener('input', checkInputs);

// 페이지 로드 시에도 checkInputs 함수를 호출하여 초기 상태를 설정합니다.
window.addEventListener('load', checkInputs);
