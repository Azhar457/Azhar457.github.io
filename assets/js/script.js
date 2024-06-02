window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    // var navbar = document.getElementById('navbar');
    if (window.scrollY > 50) { // Nilai 50 dapat disesuaikan
        navbar.classList.add('fixed-top');
    } else {
        navbar.classList.remove('fixed-top');
    }
});