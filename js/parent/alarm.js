document.addEventListener("DOMContentLoaded", function() {
    function truncateText(element, maxLength) {
        let text = element.textContent;
        if (text.length > maxLength) {
            element.textContent = text.slice(0, maxLength) + '...';
        }
    }

    let profileNameElements = document.querySelectorAll('.profile_name');
    let profileName2Elements = document.querySelectorAll('.profile_name2');

    profileNameElements.forEach(function(element) {
        truncateText(element, 18);
    });
    profileName2Elements.forEach(function(element) {
        truncateText(element, 24);
    });
});