// class FloatingButtonManager {
//     constructor() {
//         this.floatingButton = document.getElementById("floatingButton");
//         this.floatingButtonOpen = document.getElementById("floating-button-open");
//         this.floatingButtonClose = document.getElementById("floating-button-close");
//         this.iconList = document.getElementById("iconList");
//     }
//
//     toggleFloatingMenu() {
//         const isOpen = this.iconList.classList.contains("show");
//
//         if (!isOpen) {
//             this.iconList.classList.add("show");
//             this.floatingButtonOpen.style.display = "none";
//             this.floatingButtonClose.style.display = "block";
//             this.iconList.style.transform = "translateY(0)";
//             this.iconList.style.opacity = "1";
//         } else {
//             this.iconList.classList.remove("show");
//             this.floatingButtonOpen.style.display = "block";
//             this.floatingButtonClose.style.display = "none";
//             this.iconList.style.transform = "translateY(20px)";
//             this.iconList.style.opacity = "0";
//         }
//     }
//
//     init() {
//         this.floatingButton.addEventListener("click", () => this.toggleFloatingMenu());
//     }
// }
const floatingButton = document.getElementById("floatingButton");
const floatingButtonOpen = document.getElementById("floating-button-open");
const floatingButtonClose = document.getElementById("floating-button-close");
const iconList = document.getElementById("iconList");

function toggleFloatingMenu() {
    const isOpen = iconList.classList.contains("show");

    if (!isOpen) {
        iconList.classList.add("show");
        floatingButtonOpen.style.display = "none";
        floatingButtonClose.style.display = "block";
        iconList.style.transform = "translateY(0)";
        iconList.style.opacity = "1";
    } else {
        iconList.classList.remove("show");
        floatingButtonOpen.style.display = "block";
        floatingButtonClose.style.display = "none";
        iconList.style.transform = "translateY(20px)";
        iconList.style.opacity = "0";
    }
}

function init() {
    if (floatingButton) {
        floatingButton.addEventListener("click", toggleFloatingMenu);
    }
}

init();