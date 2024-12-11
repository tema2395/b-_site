
function initScrollEffects() {
    const fixedText = document.querySelector(".register__header-title");
    const blocks = document.querySelectorAll(".register__stages-card");

    window.addEventListener("scroll", () => {
        blocks.forEach(block => {
            const blockRect = block.getBoundingClientRect();
            const textRect = fixedText.getBoundingClientRect();

            if (textRect.bottom > blockRect.top && textRect.top < blockRect.bottom) {
                block.style.transform = "scale(1.1)";
            } else {
                block.style.transform = "scale(1)";
            }
        });
    });
}

function initScrollToTopButtons() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    const scrollToTopBtnMobile = document.getElementById("scrollToTopBtnMobile");

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    scrollToTopBtnMobile.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}

// Инициализация всех функций
document.addEventListener("DOMContentLoaded", () => {
    // initSmoothScroll();
	if (window.innerWidth > 750) {
        	initScrollEffects();
    	}
    initScrollToTopButtons();
});
