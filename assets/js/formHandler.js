// class FormHandler {
//     constructor() {
//         this.sendRequest = document.getElementById("send-request");
//         this.maxSubmissions = 3;
//         this.submitCount = this.getSubmitCount();
//         console.log(this.sendRequest);
//         this.init();
//     }
//
//     getSubmitCount() {
//         return parseInt(localStorage.getItem("submitCount")) || 0;
//     }
//
//     setSubmitCount(count) {
//         localStorage.setItem("submitCount", count);
//     }
//
//     validateForm() {
//         const inputs = {
//             name: document.getElementById("name-input-form"),
//             email: document.getElementById("email-input-form"),
//             phone: document.getElementById("phone-number-form"),
//             phoneContainer: document.getElementById("phone-input-container-form"),
//             comment: document.getElementById("comment-input-form"),
//         };
//
//         // Удаляем ошибки с предыдущих проверок
//         Object.values(inputs).forEach(input => {
//             if (input) {
//                 input.classList.remove("custom-input-error");
//             }
//         });
//
//         const radioButtons = document.querySelectorAll(".radio-checkmark");
//         let hasError = false;
//
//         // Проверка полей формы
//         if (inputs.name && !inputs.name.value) {
//             inputs.name.classList.add("custom-input-error");
//             hasError = true;
//         }
//
//         if (inputs.email && !inputs.email.value) {
//             inputs.email.classList.add("custom-input-error");
//             hasError = true;
//         }
//
//         if (inputs.phone && !inputs.phone.value) {
//             inputs.phoneContainer.classList.add("custom-input-error");
//             hasError = true;
//         }
//
//         const selectedBusinessForm = document.querySelector("input[name=\"businessForm-form\"]:checked");
//         if (!selectedBusinessForm) {
//             radioButtons.forEach(radio => {
//                 radio.style.borderColor = "#fe2121";
//             });
//             hasError = true;
//         } else {
//             radioButtons.forEach(radio => {
//                 radio.style.borderColor = "";
//             });
//         }
//
//         return { hasError, inputs };
//     }
//
//     async submitForm() {
//         if (this.submitCount >= this.maxSubmissions) {
//             alert("Вы достигли лимита на отправку заявок.");
//             return;
//         }
//
//         const { hasError, inputs } = this.validateForm();
//         if (hasError) return;
//
//         const dataToSend = {
//             name: inputs.name.value,
//             email: inputs.email.value,
//             phone_number: `+7${inputs.phone.value.replace(/\D/g, "")}`, // Убираем все нецифровые символы
//             comment: inputs.comment.value,
//             type: document.querySelector("input[name=\"businessForm-form\"]:checked")?.value || "", // Используем оператор опциональной цепочки
//         };
//
//         try {
//             const response = await fetch("/api/consultation", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(dataToSend),
//             });
//
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//
//             this.submitCount++;
//             this.setSubmitCount(this.submitCount);
//
//             if (this.submitCount >= this.maxSubmissions) {
//                 if (this.sendRequest) {
//                     this.sendRequest.disabled = true;
//                 }
//                 alert("Вы достигли лимита на отправку заявок.");
//             }
//
//             // Очистка формы
//             this.clearForm(inputs);
//         } catch (error) {
//             console.error("Ошибка:", error);
//         }
//     }
//
//     clearForm(inputs) {
//         Object.values(inputs).forEach(input => {
//             if (input) {
//                 input.value = "";
//             }
//         });
//         document.querySelectorAll("input[name=\"businessForm-form\"]")
//             .forEach(radio => radio.checked = false);
//     }
//
//     init() {
//         if (this.sendRequest) {
//             this.sendRequest.addEventListener("click", () => this.submitForm());
//         }
//     }
// }
//
// const phoneInput = document.getElementById("phone-number-form");
// if (phoneInput) {
//     phoneInput.addEventListener("input", () => {
//         let value = phoneInput.value.replace(/\D/g, "");
//
//         if (value.length > 10) {
//             value = value.slice(0, 10);
//         }
//
//         const formattedValue = value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "($1) $2-$3-$4");
//         phoneInput.value = formattedValue;
//     });
// }
const sendRequest = document.getElementById("send-request");
const maxSubmissions = 3;
let submitCount = getSubmitCount();

function getSubmitCount() {
    return parseInt(localStorage.getItem("submitCount")) || 0;
}

function setSubmitCount(count) {
    localStorage.setItem("submitCount", count);
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validateForm() {
    const inputs = {
        name: document.getElementById("name-input-form"),
        email: document.getElementById("email-input-form"),
        phone: document.getElementById("phone-number-form"),
        phoneContainer: document.getElementById("phone-input-container-form"),
        comment: document.getElementById("comment-input-form"),
    };

    // Удаляем ошибки с предыдущих проверок
    Object.values(inputs).forEach(input => {
        if (input) {
            input.classList.remove("custom-input-error");
        }
    });

    const radioButtons = document.querySelectorAll(".radio-checkmark");
    let hasError = false;

    // Проверка полей формы
    if (inputs.name && !inputs.name.value) {
        inputs.name.classList.add("custom-input-error");
        hasError = true;
    }

        if (inputs.email) {
        if (!inputs.email.value) {
            inputs.email.classList.add("custom-input-error");
            hasError = true;
        } else if (!validateEmail(inputs.email.value)) {
            inputs.email.classList.add("custom-input-error");
            hasError = true;
        }
    }

    if (inputs.phone && !inputs.phone.value) {
        inputs.phoneContainer.classList.add("custom-input-error");
        hasError = true;
    }

    const selectedBusinessForm = document.querySelector("input[name=\"businessForm-form\"]:checked");
    if (!selectedBusinessForm) {
        radioButtons.forEach(radio => {
            radio.style.borderColor = "#fe2121";
        });
        hasError = true;
    } else {
        radioButtons.forEach(radio => {
            radio.style.borderColor = "";
        });
    }

    return { hasError, inputs };
}

async function submitForm() {
    if (submitCount >= maxSubmissions) {
        alert("Вы достигли лимита на отправку заявок.");
        return;
    }

    const { hasError, inputs } = validateForm();
    if (hasError) return;

    const dataToSend = {
        name: inputs.name.value,
        email: inputs.email.value,
        phone_number: `+7${inputs.phone.value.replace(/\D/g, "")}`, // Убираем все нецифровые символы
        comment: inputs.comment.value,
        type: document.querySelector("input[name=\"businessForm-form\"]:checked")?.value || "", // Используем оператор опциональной цепочки
    };

    try {
        const response = await fetch("/api/consultation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        submitCount++;
        setSubmitCount(submitCount);

        if (submitCount >= maxSubmissions) {
            if (sendRequest) {
                sendRequest.disabled = true;
            }
            alert("Вы достигли лимита на отправку заявок.");
        }

        // Очистка формы
        clearForm(inputs);
    } catch (error) {
        console.error("Ошибка:", error);
    }
}

function clearForm(inputs) {
    Object.values(inputs).forEach(input => {
        if (input) {
            input.value = "";
        }
    });
    document.querySelectorAll("input[name=\"businessForm-form\"]")
        .forEach(radio => radio.checked = false);
}

function init() {
    if (sendRequest) {
        sendRequest.addEventListener("click", submitForm);
    }
}

// Инициализация формы
init();

const phoneInput = document.getElementById("phone-number-form");
if (phoneInput) {
    phoneInput.addEventListener("input", () => {
        let value = phoneInput.value.replace(/\D/g, "");

        if (value.length > 10) {
            value = value.slice(0, 10);
        }

        const formattedValue = value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "($1) $2-$3-$4");
        phoneInput.value = formattedValue;
    });
}

const phoneInput2 = document.getElementById("phone-number-form-modal");
if (phoneInput2) {
    phoneInput2.addEventListener("input", () => {
        let value = phoneInput2.value.replace(/\D/g, "");

        if (value.length > 10) {
            value = value.slice(0, 10);
        }

        const formattedValue = value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "($1) $2-$3-$4");
        phoneInput2.value = formattedValue;
    });
}
