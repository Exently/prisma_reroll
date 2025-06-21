window.addEventListener("DOMContentLoaded", () => {
    const page = window.location.pathname.split("/").pop().replace(".html", "");
    const menuBar = document.querySelector('.menu-bar');
    const menuToggle = document.querySelector('.mobile-menu-toggle');

    // Set active menu item
    document.querySelectorAll('.menu-bar button').forEach(btn => {
        if (btn.dataset.match === page) {
            btn.classList.add("active");
        }
    });

    // Mobile menu toggle with smooth animation
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        const mobileMenu = document.querySelector('.mobile-menu');
        mobileMenu.classList.toggle('active');
        
        // Toggle the icon animation
        const svg = menuToggle.querySelector('svg');
        svg.classList.toggle('rotate-90');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBar.contains(e.target) && !menuToggle.contains(e.target)) {
            menuBar.classList.remove('active');
            menuToggle.classList.remove('active');
            document.querySelector('.mobile-menu').classList.remove('active');
            menuToggle.querySelector('svg').classList.remove('rotate-90');
        }
    });
});