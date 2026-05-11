
/**
 * Main navigation menu element that toggles between open and closed states.
 * @type {HTMLElement|null}
 */
document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const mainNav = document.getElementById("main-nav");

    if (burger && mainNav) {
        burger.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("is-open");
            burger.classList.toggle("is-active", isOpen);
            burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    }

    const itemsWithSubmenu = document.querySelectorAll("#main-nav li");

    itemsWithSubmenu.forEach((item) => {
        const directLink = item.querySelector(":scope > a");
        const directSubmenu = item.querySelector(":scope > ul");

        if (!directLink || !directSubmenu) return;

        directLink.addEventListener("click", (e) => {
            if (window.innerWidth <= 980) {
                e.preventDefault();
                item.classList.toggle("is-open");
            }
        });
    });

    document.addEventListener("click", (e) => {
        if (!mainNav || !burger) return;

        if (window.innerWidth <= 980 && !mainNav.contains(e.target) && !burger.contains(e.target)) {
            mainNav.classList.remove("is-open");
            burger.classList.remove("is-active");
            burger.setAttribute("aria-expanded", "false");

            document.querySelectorAll("#main-nav li.is-open").forEach((item) => {
                item.classList.remove("is-open");
            });
        }
    });
});
