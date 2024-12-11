// class CookieConsentManager {
//     constructor() {
//         this.cookieKey = 'cookiesAccepted';
//         this.cookieOverlay = document.getElementById('cookie-overlay');
//         this.cookieAcceptButton = document.getElementById('cookie-accept');
//
//         // Инициализация, если элементы найдены
//         if (this.cookieOverlay && this.cookieAcceptButton) {
//             this.init();
//         }
//     }
//
//     checkConsent() {
//         const cookiesAccepted = localStorage.getItem(this.cookieKey);
//         this.cookieOverlay.style.display = cookiesAccepted ? 'none' : 'block';
//     }
//
//     acceptCookies() {
//         localStorage.setItem(this.cookieKey, 'true');
//         this.cookieOverlay.style.display = 'none';
//     }
//
//     init() {
//         console.log("Инициализация CookieConsentManager");
//         this.checkConsent();
//         this.cookieAcceptButton.addEventListener('click', () => this.acceptCookies());
//     }
// }
//
// new CookieConsentManager();
const cookieKey = 'cookiesAccepted';
const cookieOverlay = document.getElementById('cookie-overlay');
const cookieAcceptButton = document.getElementById('cookie-accept');

function checkConsent() {
    const cookiesAccepted = localStorage.getItem(cookieKey);
    cookieOverlay.style.display = cookiesAccepted ? 'none' : 'block';
}

function acceptCookies() {
    localStorage.setItem(cookieKey, 'true');
    cookieOverlay.style.display = 'none';
}

function init() {
    console.log("Инициализация Cookie Consent");
    checkConsent();
    if (cookieAcceptButton) {
        cookieAcceptButton.addEventListener('click', acceptCookies);
    }
}

// Инициализация управления согласиями на использование файлов cookie
init();