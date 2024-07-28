document.addEventListener('DOMContentLoaded', function() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const searchButton = document.getElementById("search-button");
    const clearButton = document.getElementById("clear-button");
    const searchInput = document.getElementById('search-input');  
    const checkmarkButtons = document.querySelectorAll('.profile-checkmark');
    const checkmarkLabel = document.querySelectorAll('.dropdown-checkmark');

    function truncateText(element, maxLength) {
        const text = element.textContent;
        if (text.length > maxLength) {
            element.textContent = text.slice(0, maxLength) + '...';
        }
    }

    const profileNames = document.querySelectorAll('.profile-name');
    profileNames.forEach(name => {
        truncateText(name, 11);
    });

    searchButton.addEventListener("click", function() {
        if (searchInput.value.trim() !== '') {
            dropdownMenu.style.display = 'block';
            clearButton.style.display = 'none';
        }
    });

    checkmarkButtons.forEach(button => {
        button.addEventListener('click', function () {
            button.classList.toggle('disabled');
        });
    });
    
    checkmarkLabel.forEach(button => {
        button.addEventListener('click', function () {
            button.classList.toggle('disabled');
        });
    });

    document.addEventListener('click', function(event) {
        if (dropdownMenu.style.display === 'block' && !dropdownMenu.contains(event.target) && !searchButton.contains(event.target)) {
            dropdownMenu.style.display = 'none';
            searchButton.style.display = 'none';
            clearButton.style.display = 'block';
        }
    });

    clearButton.addEventListener('click', function() {
        searchInput.value = ''; 
        dropdownMenu.style.display = 'none';  
        searchButton.style.display = 'block';  
        clearButton.style.display = 'none';  
    });
});
