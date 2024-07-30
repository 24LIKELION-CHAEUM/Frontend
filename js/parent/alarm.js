document.addEventListener("DOMContentLoaded", function() {
    function truncateText(element, maxLength) {
        let text = element.textContent;
        if (text.length > maxLength) {
            element.textContent = text.slice(0, maxLength) + '...';
        }
    }

    let titleElements = document.querySelectorAll('.notification-title');
    let messageElements = document.querySelectorAll('.notification-message');

    titleElements.forEach(function(element) {
        truncateText(element, 18);
    });
    messageElements.forEach(function(element) {
        truncateText(element, 24);
    });
});
