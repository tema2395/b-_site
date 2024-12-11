function initAccordion() {
    const accordionContent = document.querySelectorAll(".about-page__content-accordion");

    accordionContent.forEach(accordion => {
        accordion.addEventListener("click", () => {
            const body = accordion.querySelector(".content-accordion__body");
            const arrowIcon = accordion.querySelector("#arrow-icon");
            const isOpen = accordion.classList.toggle("open");

            body.style.marginTop = isOpen ? "15px" : "0";
            body.style.height = isOpen ? `${body.scrollHeight}px` : "0";
            arrowIcon.style.transform = isOpen ? "rotate(45deg)" : "rotate(0)";
        });
    });
}

// Вызов функции для инициализации аккордеона
initAccordion();