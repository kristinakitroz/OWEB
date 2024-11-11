// Counter
function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let current = 0;
    const increment = target / 100;
    
    function updateCount() {
        if (current < target) {
            current = Math.ceil(current + increment);
            counter.innerText = current + (target === 500 ? '+' : '%');
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = target + (target === 500 ? '+' : '%');
        }
    }
    
    updateCount();
}
//Na sekoe skrolanje na stranata animacijata se izvrsuva
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
           
            const counters = entry.target.querySelectorAll('.stat-value');
            counters.forEach(counter => {
            
                counter.innerText = '0' + (counter.getAttribute('data-target') === '500' ? '+' : '%');
                animateCounter(counter);
            });
        }
    });
}, {
    threshold: 0.5 
});

// Tekst animacii
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            
            entry.target.classList.remove('visible');
            
           
            void entry.target.offsetWidth;
            
          
            entry.target.classList.add('visible');
        } else {
         
            entry.target.classList.remove('visible');
        }
    });
}


const textObserver = new IntersectionObserver(handleIntersection, {
    threshold: 0.2 
});

document.addEventListener("DOMContentLoaded", function() {

    const statsSection = document.getElementById('about');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    document.querySelectorAll('.animated-title, .animated-text').forEach((el) => {
        textObserver.observe(el);
    });

    //Login
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.querySelector('.login-btn');
    const closeLoginBtn = document.querySelector('#loginModal .close-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });
    }

    if (closeLoginBtn) {
        closeLoginBtn.addEventListener('click', function() {
            loginModal.style.display = 'none';
        });
    }

    //Signup 
    const signupModal = document.getElementById('signupModal');
    const signupBtn = document.querySelector('.signup-btn');
    const closeSignupBtn = document.querySelector('#signupModal .close-btn');

    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.style.display = 'flex';
        });
    }

    if (closeSignupBtn) {
        closeSignupBtn.addEventListener('click', function() {
            signupModal.style.display = 'none';
        });
    }

    // Close
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });
});

// Form Validacija
function validateLoginForm(event) {
    event.preventDefault();
    console.log('Login form submitted');
}

function validateSignupForm(event) {
    event.preventDefault();
    console.log('Signup form submitted');
}