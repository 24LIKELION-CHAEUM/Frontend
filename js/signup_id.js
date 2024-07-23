const inputId = document.querySelector('.input_id');
const inputPassword = document.querySelector('.input_password');
const signinBtn = document.getElementById('signin_btn');

//값이 변경될 때마다 호출
function checkInputs() {
    if (inputId.value.trim() && inputPassword.value.trim()) {
        // 아이디 비밀번호 모두 입력 -> 버튼 활성화
        signinBtn.disabled = false;
    } else {
        // 아이디와 비밀번호가 모두 입력되지 않음 -> 버튼 비활성화
        signinBtn.disabled = true;
    }
}

//값이 변경될 때마다 checkInputs 함수 호출
inputId.addEventListener('input', checkInputs);
inputPassword.addEventListener('input', checkInputs);

//페이지 로드 시에도 checkInputs 함수 호출,초기 상태 설정
window.addEventListener('load', checkInputs);
