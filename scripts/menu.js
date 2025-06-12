window.addEventListener("DOMContentLoaded", () => {
    const page = window.location.pathname.split("/").pop().replace(".html", "");

    document.querySelectorAll('.menu-bar button').forEach(btn => {
        if (btn.dataset.match === page) {
            btn.classList.add("active");
        }
    });
});