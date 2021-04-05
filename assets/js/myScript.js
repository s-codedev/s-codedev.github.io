AOS.init({
    mobile: false
});

const scene = document.getElementById("scene");
const parallax = new Parallax(scene);

const scriptURL = 'https://script.google.com/macros/s/AKfycbwaffBsPgd0becl4D8TkHz68Ot7H27padrrU12rxc7W8XxbC5y0miByKd443FoTNQC4/exec'
const form = document.forms['contactForm']
const btnKirim = document.querySelector('.btnKirim');
const btnLoading = document.querySelector('.btnLoading');
const navBar = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-link');


window.addEventListener('scroll', function() {
    navBar.classList.toggle('scroll', window.scrollY > 10)
})

navLinks.forEach(navLink => {
    navLink.addEventListener('click', function() {
        navLinks.forEach(navLink => navLink.classList.remove('active'))
        this.classList.add('active')
    })
})

form.addEventListener('submit', e => {
    e.preventDefault()
    btnKirim.classList.add('d-none');
    btnLoading.classList.remove('d-none');
    fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => {
            console.log('Success!', response);
            btnKirim.classList.remove('d-none');
            btnLoading.classList.add('d-none');
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                html: '<b>Terima Kasih! </b>Pesan sudah terkirim'
            });
            form.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            btnKirim.classList.remove('d-none');
            btnLoading.classList.add('d-none');
            Swal.fire({
                icon: 'error',
                title: 'Ooops',
                html: '<b>Mohon Maaf! </b>Pesan gagal terkirim'
            });
        })
})