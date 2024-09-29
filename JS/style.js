document.addEventListener('DOMContentLoaded', function() {
    const selects = document.querySelectorAll('select');

    selects.forEach(select => {
        select.addEventListener('mousedown', function() {
            this.classList.add('open');
        });

        select.addEventListener('blur', function() {
            this.classList.remove('open');
        });
    });
});