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

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        document.querySelector('.mobile-menu').classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBar.contains(e.target) && !menuToggle.contains(e.target)) {
            menuBar.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});