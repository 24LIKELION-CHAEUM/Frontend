const inputName = document.getElementById('input_name');
const inputDob = document.getElementById('input_dob');
const dobError = document.getElementById('dob_error');
const signinBtn = document.getElementById('signin_btn');

function checkInputs() {
    const nameValue = inputName.value.trim();
    const dobValue = inputDob.value.trim();

    // 이름 확인
    const isNameValid = nameValue.length > 0;

    // 생년월일 확인
    const isDobValid = dobValue.length === 8 && /^\d{8}$/.test(dobValue);

    // 이름 비어있지 않고, 생년월일 유효 -> 버튼 활성화
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

inputName.addEventListener('input', checkInputs);
inputDob.addEventListener('input', checkInputs);

window.addEventListener('load', checkInputs);
