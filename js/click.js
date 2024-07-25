document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.input_id');
    const searchIcon = document.querySelector('.search');

    if (searchInput && searchIcon) {
        function updateSearchIcon() {
            if (searchInput.value.trim() !== '' && !document.activeElement.isEqualNode(searchInput)) {
                searchIcon.src = '/assets/x.svg'; 
            } else {
                searchIcon.src = '/assets/search.svg'; 
            }
        }

        searchInput.addEventListener('input', updateSearchIcon);
        searchInput.addEventListener('blur', updateSearchIcon);
        searchInput.addEventListener('focus', updateSearchIcon);

        searchIcon.addEventListener('click', function() {
            if (searchIcon.src.includes('x.svg')) {
                searchInput.value = ''; 
                searchInput.dispatchEvent(new Event('input')); 
                searchInput.focus(); 
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

    var searchButton = document.getElementById("search_button");
    var dropdown = document.getElementById("dropdown");

    searchButton.addEventListener("click", function() {
        dropdown.style.display = 'block';
    });
});
