const burgerButton = document.getElementById("burger-button");
const blur = document.querySelector(".blur");
const headerNav = document.querySelector(".header__nav");

const links = [ { selector: "a[href=\"#about\"]", sectionId: "about" }, {
    selector: "a[href=\"#reviews\"]", sectionId: "reviews",
}, { selector: "a[href=\"#faq\"]", sectionId: "faq" }, {
    selector: "a[href=\"#contacts\"]", sectionId: "contacts",
}, { selector: "a[href=\"#request\"]", sectionId: "request" } ];

function toggleMenu() {
    if (blur) {
        const isVisible = blur.style.visibility === "visible";
        blur.style.opacity = isVisible ? "0" : "1";
        blur.style.visibility = isVisible ? "hidden" : "visible";
    }
    if (headerNav) {
        headerNav.style.display = headerNav.style.display === "flex" ? "none" : "flex";
    }

	 // Блокировка/разблокировка скролла
    if (blur.style.visibility === "visible") {
        document.body.style.overflow = "hidden"; // Блокируем скролл
    } else {
        document.body.style.overflow = "auto"; // Разблокируем скролл
    }
}

//
// function scrollToSection(sectionId) {
//     const section = document.getElementById(sectionId);
//     if (section) {
//         const sectionTop = section.getBoundingClientRect().top + window.scrollY - headerNav.offsetHeight;
//
//         window.scrollTo({
//             top: sectionTop, behavior: "smooth",
//         });
//     }
// }

function initNavLinks() {
    links.forEach(({ selector, sectionId }) => {
        const linkElements = document.querySelectorAll(selector);
        linkElements.forEach(link => {
            link.addEventListener("click", (e) => {
                document.body.style.overflowY = "auto";

                if (blur) {
                    blur.style.opacity = "0";
                    blur.style.visibility = "hidden";
                }

                if (window.innerWidth <= 1300 && headerNav) {
                    headerNav.style.display = "none";
                }

            });
        });
    });
}

function initMobileMenu() {
    if (burgerButton) {
        burgerButton.addEventListener("click", toggleMenu);
    }
    if (blur) {
        blur.addEventListener("click", toggleMenu);
    }
    initNavLinks();
}

if (burgerButton && blur && headerNav) {
    initMobileMenu();
}
