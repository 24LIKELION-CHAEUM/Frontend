document.querySelectorAll('.select').forEach(function(select) {
    select.addEventListener('click', function() {
        selectOption(this);
    });
});

function selectOption(element) {
    document.querySelectorAll('.select').forEach(function(select) {
        select.classList.remove('selected');
        //선택되지 않음
        select.querySelector('.check').src = '/assets/check_unactivated.svg';
    });

    element.classList.add('selected');
    //선택됨
    element.querySelector('.check').src = '/assets/check_activated.svg';

    //버튼 활성화
    document.getElementById('signin_btn').disabled = false;
}
