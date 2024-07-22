document.addEventListener('DOMContentLoaded', function() {
    const inputBefore = document.getElementById('input-before');
    const inputDuring = document.getElementById('input-during');
    const inputComplete = document.getElementById('input-complete');
    const inputError = document.getElementById('input-error');

    inputBefore.addEventListener('focus', function() {
        this.classList.add('input-during');
    });

    inputBefore.addEventListener('blur', function() {
        this.classList.remove('input-during');
        if (this.value.length > 0) {
            this.classList.add('input-complete');
        } else {
            this.classList.remove('input-complete');
        }
    });

    inputDuring.addEventListener('focus', function() {
        this.classList.add('input-during');
    });

    inputDuring.addEventListener('blur', function() {
        this.classList.remove('input-during');
        if (this.value.length > 0) {
            this.classList.add('input-complete');
        } else {
            this.classList.remove('input-complete');
        }
    });

    inputComplete.addEventListener('focus', function() {
        this.classList.add('input-during');
    });

    inputComplete.addEventListener('blur', function() {
        this.classList.remove('input-during');
        if (this.value.length > 0) {
            this.classList.add('input-complete');
        } else {
            this.classList.remove('input-complete');
        }
    });

    inputError.addEventListener('focus', function() {
        this.classList.add('input-during');
        this.classList.remove('input-error');
    });

    inputError.addEventListener('blur', function() {
        this.classList.remove('input-during');
        if (this.value.length > 0) {
            this.classList.add('input-complete');
        } else {
            this.classList.add('input-error');
        }
    });
});
