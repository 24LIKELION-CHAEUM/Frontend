document.addEventListener('DOMContentLoaded', () => {
    const resultItems = document.querySelectorAll('.result_item');
    const signinBtn = document.getElementById('signin_btn');
    const modal = document.getElementById('myModal');
    const modalHandler = document.querySelector('.modal-handler');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const relationSpan = document.querySelector('.relation');
    const searchContainer = document.querySelector('.signin_input'); // 검색창 컨테이너
    let selectedItem = null; // 현재 선택된 프로필을 저장할 변수

    // 프로필 클릭 시
    resultItems.forEach(item => {
        item.addEventListener('click', () => {
            resultItems.forEach(el => {
                el.classList.remove('selected');
                el.querySelector('.profile-checkmark').style.display = 'block'; // 체크마크 보이게 설정
            });
            item.classList.add('selected');
            item.querySelector('.profile-checkmark').style.display = 'none'; // 선택된 아이템에서 체크마크 숨김
            modal.classList.add('show');
            modalBackdrop.classList.add('show');
            signinBtn.disabled = false;
            selectedItem = item; // 선택된 프로필 저장
        });
    });

    // 모달 닫기
    modalHandler.addEventListener('click', () => {
        closeModal();
    });

    modalBackdrop.addEventListener('click', () => {
        closeModal();
    });

    // 모달에서 관계 아이템 클릭 시
    document.querySelectorAll('.relation-btn-wrapper').forEach(btnWrapper => {
        btnWrapper.addEventListener('click', () => {
            const relationText = btnWrapper.getAttribute('data-relation');
            relationSpan.textContent = ` | ${relationText}`; // .relation에 텍스트 반영

            // 선택된 프로필의 체크마크와 검색창 숨기기
            if (selectedItem) {
                selectedItem.querySelector('.profile-checkmark').style.display = 'none'; // 체크마크 숨김
                selectedItem.classList.remove('selected'); // 선택 상태 제거
                searchContainer.style.display = 'none'; // 검색창 숨기기
            }

            // 버튼 텍스트 변경
            signinBtn.textContent = '회원가입 완료';

            closeModal();
        });
    });

    function closeModal() {
        modal.classList.remove('show');
        modalBackdrop.classList.remove('show');
    }
});
