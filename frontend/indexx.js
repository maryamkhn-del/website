document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

function initializeEventListeners() {
    const header = document.querySelector("header");
    const menuIcon = document.querySelector("#menu-icon");
    const navList = document.querySelector('.navlist');
    const signInButton = document.getElementById('signin-btn');
    const modal = document.getElementById('signin-modal');
    const closeButton = document.querySelector('.modal .close');
    const loginBtn = document.getElementById('login-btn');

    // Toggle the menu on icon click
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navList.classList.toggle('active');
    });

    // Apply sticky class to header on scroll
    window.addEventListener("scroll", () => {
        header.classList.toggle("sticky", window.scrollY > 120);
    });

    // Display the modal on sign-in button click
    signInButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close the modal on click of close button or outside the modal
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle login when login button is clicked
    loginBtn.addEventListener('click', async () => {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();
        const error = document.getElementById('login-error');

        if (email && password) {
            try {
                const response = await fetch('http://localhost:6001/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert(`Welcome back, ${data.user.name}!`);
                    error.style.display = 'none';
                    localStorage.setItem('user', JSON.stringify(data));

                    // Optionally, redirect to home page or close modal
                    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
                    document.getElementById('home').classList.remove('hidden');
                    modal.style.display = 'none';
                } else {
                    error.textContent = data.message || 'Invalid email or password.';
                    error.style.display = 'block';
                }
            } catch (err) {
                error.textContent = 'An error occurred. Please try again later.';
                error.style.display = 'block';
            }
        } else {
            error.textContent = 'All fields are required!';
            error.style.display = 'block';
        }
    });
    


}


