// Inisialisasi AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });
});

// Kredensial sederhana untuk demo
const DEMO_CREDENTIALS = {
    username: 'wenky',
    password: '123'
};

function showSuccessMessage() {
    // Cek apakah pesan sukses sudah ada
    let successMessage = document.getElementById('loginSuccess');
    if (!successMessage) {
        // Buat elemen pesan sukses
        successMessage = document.createElement('div');
        successMessage.id = 'loginSuccess';
        successMessage.className = 'text-green-500 text-center mt-4 font-semibold hidden';
        successMessage.textContent = 'Login berhasil!';
        
        // Masukkan setelah form
        const form = document.querySelector('form');
        form.parentNode.insertBefore(successMessage, form.nextSibling);
    }
    
    // Tampilkan pesan
    successMessage.classList.remove('hidden');
}

function showLoadingSpinner() {
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.innerHTML = `
        <svg class="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading...
    `;
    submitButton.disabled = true;
    submitButton.classList.add('opacity-75');
}


function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
        // Tampilkan loading spinner
        showLoadingSpinner();
        
        // Tampilkan pesan sukses
        showSuccessMessage();
        
        // Disable tombol login
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.classList.add('opacity-50');
        
        // Delay sebelum redirect
        setTimeout(() => {
            // Simpan status login di sessionStorage
            sessionStorage.setItem('isLoggedIn', 'true');
            // Redirect ke halaman utama
            window.location.href = 'index.html';
        }, 1000); // Delay 1 detik
    } else {
        alert('Username atau password salah!');
    }
}

function handleLogout() {
    // Hapus status login dan redirect ke halaman login
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

// Cek status login saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Jika ini adalah halaman index.html
    if (!window.location.pathname.includes('login.html')) {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            window.location.href = 'login.html';
        }
    }
});


// Smooth scrolling untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Mengambil tinggi navbar
            const navHeight = document.getElementById('navbar').offsetHeight;
            
            // Menghitung posisi scroll dengan kompensasi navbar
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Tambahkan fungsi toggle menu
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('show');
    mobileMenu.classList.toggle('hidden');
}

// Tutup menu saat link di klik
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
    });
});

// Existing scroll event listener
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const navBar = document.getElementById('navbar');
    
    if (!navBar.contains(e.target) && mobileMenu.classList.contains('show')) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
    }
});