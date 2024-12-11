class ScrollToTopManager {
    constructor() {
        this.scrollToTopBtn = document.getElementById("scrollToTopBtn");
    }

    init() {
        this.scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
}