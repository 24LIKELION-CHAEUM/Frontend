document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.input_id');
    const searchIcon = document.querySelector('.search');

    if (searchInput && searchIcon) {
        searchInput.addEventListener('input', function() {
            if (searchInput.value.trim() !== '') {
                searchIcon.src = '/assets/x.svg'; 
            } else {
                searchIcon.src = '/assets/search.svg'; 
            }
        });

        searchIcon.addEventListener('click', function() {
            if (searchIcon.src.includes('x.svg')) {
                searchInput.value = ''; 
                searchInput.dispatchEvent(new Event('input')); 
            }
        });
    }

    function truncateText(element, maxLength) {
        const text = element.textContent;
        if (text.length > maxLength) {
            element.textContent = text.slice(0, maxLength) + '...';
        }
    }

    const profileNames = document.querySelectorAll('.profile_name');
    profileNames.forEach(name => {
        truncateText(name, 11);
    });
});
