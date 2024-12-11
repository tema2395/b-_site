// class ContentToggleManager {
//     constructor() {
//         this.button1 = document.getElementById("business-btn");
//         this.button2 = document.getElementById("current_accounts-btn");
//         this.businessContent = document.getElementById("business-content");
//         this.currentAccountsContent = document.getElementById("current-accounts-content");
//     }
//
//     validateElements() {
//         if (!this.button1 || !this.button2 || !this.businessContent || !this.currentAccountsContent) {
//             return false;
//         }
//         return true;
//     }
//
//     updateButtonClasses(activeButton) {
//         const buttons = [this.button1, this.button2];
//         buttons.forEach(button => {
//             const isActive = button === activeButton;
//             button.classList.toggle("button__default", isActive);
//             button.classList.toggle("button__default-white", !isActive);
//
//             const textElement = button.querySelector("span");
//             textElement.classList.toggle("text-20-white", isActive);
//             textElement.classList.toggle("text-20-black", !isActive);
//         });
//     }
//
//     showContent(activeButton) {
//         if (activeButton === this.button1) {
//             this.businessContent.style.display = "grid";
//             this.currentAccountsContent.style.display = "none";
//         } else {
//             this.businessContent.style.display = "none";
//             this.currentAccountsContent.style.display = "grid";
//         }
//     }
//
//     init() {
//         if (!this.validateElements()) return;
//
//         this.updateButtonClasses(this.button1);
//         this.showContent(this.button1);
//
//         const activeButtonId = localStorage.getItem("activeButton");
//         if (activeButtonId) {
//             const activeButton = document.getElementById(activeButtonId);
//             if (activeButton) {
//                 this.updateButtonClasses(activeButton);
//                 this.showContent(activeButton);
//             }
//         }
//
//         this.button1.addEventListener("click", () => {
//             localStorage.setItem("activeButton", this.button1.id);
//             this.updateButtonClasses(this.button1);
//             this.showContent(this.button1);
//         });
//
//         this.button2.addEventListener("click", () => {
//             localStorage.setItem("activeButton", this.button2.id);
//             this.updateButtonClasses(this.button2);
//             this.showContent(this.button2);
//         });
//     }
// }

const button1 = document.getElementById("business-btn");
const button2 = document.getElementById("current_accounts-btn");
const businessContent = document.getElementById("business-content");
const currentAccountsContent = document.getElementById("current-accounts-content");

function validateElements() {
    return button1 && button2 && businessContent && currentAccountsContent;
}

function updateButtonClasses(activeButton) {
    const buttons = [button1, button2];
    buttons.forEach(button => {
        const isActive = button === activeButton;
        button.classList.toggle("button__default", isActive);
        button.classList.toggle("button__default-white", !isActive);

        const textElement = button.querySelector("span");
        textElement.classList.toggle("text-20-white", isActive);
        textElement.classList.toggle("text-20-black", !isActive);
    });
}

function showContent(activeButton) {
    if (activeButton === button1) {
        businessContent.style.display = "grid";
        currentAccountsContent.style.display = "none";
    } else {
        businessContent.style.display = "none";
        currentAccountsContent.style.display = "grid";
    }
}

function init() {
    if (!validateElements()) return;

    updateButtonClasses(button1);
    showContent(button1);

    const activeButtonId = localStorage.getItem("activeButton");
    if (activeButtonId) {
        const activeButton = document.getElementById(activeButtonId);
        if (activeButton) {
            updateButtonClasses(activeButton);
            showContent(activeButton);
        }
    }

    button1.addEventListener("click", () => {
        localStorage.setItem("activeButton", button1.id);
        updateButtonClasses(button1);
        showContent(button1);
    });

    button2.addEventListener("click", () => {
        localStorage.setItem("activeButton", button2.id);
        updateButtonClasses(button2);
        showContent(button2);
    });
}

// Инициализация переключателя контента
init();