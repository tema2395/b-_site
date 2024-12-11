let customInputValueModal = "";
let submitCountModal = parseInt(localStorage.getItem('submitCount')) || 0;
const maxSubmissionsModal = 3;

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}


document.addEventListener("DOMContentLoaded", () => {
    const modalTest = document.getElementById("modal-test");
    const openModalTest = document.getElementById("open-modal-test");
    const closeModalTest = document.getElementById("close-modal-test");
    const modalAgreement = document.getElementById("modal-agreement");

    if (openModalTest) {
        openModalTest.addEventListener("click", () => {
            modalTest.style.opacity = "1";
            modalTest.style.visibility = "visible";
            document.body.style.overflow = "hidden";
        });
    }
    if (closeModalTest) {
        closeModalTest.addEventListener("click", () => {
            modalTest.style.opacity = "0";
            modalTest.style.visibility = "hidden";
            document.body.style.overflow = "auto";
        });
    }

    const customInputContainer = document.getElementById("form__input-your-option");
    const radioButtons = document.querySelectorAll("input[name='businessForm']");

    radioButtons.forEach((radio) => {
        radio.addEventListener("change", () => {
            if (radio.value === "Свой вариант") {
                customInputContainer.style.display = "flex";
            } else {
                customInputContainer.style.display = "none";
            }
        });
    });

    let currentStep = 1;

    function updateStep() {
        const questions = document.querySelectorAll(".modal__question-steps__text.question");
        const answerOptions = document.querySelectorAll(".modal__answers");
        const stepBlocks = document.querySelectorAll(".step__block");
        const mobileStepBlocks = document.querySelectorAll(".modal__question-steps-mobile .step__block");

        // Скрываем все вопросы и ответы
        questions.forEach((question) => {
            question.style.display = "none";
        });
        answerOptions.forEach((options) => {
            options.style.display = "none";
        });

        questions.forEach((question) => {
            if (question.getAttribute("data-step") == currentStep) {
                question.style.display = "block";
            }
        });

        answerOptions.forEach((options) => {
            if (options.getAttribute("data-step") == currentStep) {
                options.style.display = "flex";
            }
        });

        const questionText = `${currentStep} Вопрос`;
        document.querySelector(".modal__question-steps .question-number").textContent = questionText;
        document.querySelector(".modal__question-steps-mobile .question-number").textContent = questionText;

        stepBlocks.forEach((block, index) => {
            if (index < currentStep) {
                block.classList.add("step__block-active");
            } else {
                block.classList.remove("step__block-active");
            }
        });

        mobileStepBlocks.forEach((block, index) => {
            if (index < currentStep) {
                block.classList.add("step__block-active");
            } else {
                block.classList.remove("step__block-active");
            }
        });

        if (currentStep === 4) {
            modalAgreement.style.display = "block";
        } else {
            modalAgreement.style.display = "none";
        }
    }

    updateStep();

    const nextButtonTest = document.getElementById("nextModalTest");
    const backButtonTest = document.getElementById("backModalTest");

    if (nextButtonTest) {
        nextButtonTest.addEventListener("click", () => {
            let hasError = false;
            let nameInputValue = "";
            let phoneInputValue = "";

            if (currentStep === 1) {
                const businessFormOptions = document.querySelectorAll("input[name='businessForm']");
                const businessFormSelected = Array.from(businessFormOptions).some(option => option.checked);

                if (!businessFormSelected) {
                    hasError = true;
                    document.querySelectorAll(".modal__answer-option").forEach(option => {
                        option.classList.add("custom-input-error");
                    });
                } else {
                    document.querySelectorAll(".modal__answer-option").forEach(option => {
                        option.classList.remove("custom-input-error");
                    });

                    const customOption = document.querySelector("input[name='businessForm'][value='Свой вариант']");
                    const customInput = document.getElementById("your-option-input-modal");

                    if (customOption.checked) {
                        customInputValueModal = customInput.value.trim();
                        if (!customInputValueModal) {
                            hasError = true;
                            customInput.classList.add("custom-input-error");
                        } else {
                            customInput.classList.remove("custom-input-error");
                        }
                    }
                }
            } else if (currentStep === 2) {
                const taxFormOptions = document.querySelectorAll("input[name='taxForm']");
                const taxFormSelected = Array.from(taxFormOptions).some(option => option.checked);

                if (!taxFormSelected) {
                    hasError = true;
                    document.querySelectorAll(".modal__answer-option").forEach(option => {
                        option.classList.add("custom-input-error");
                    });
                } else {
                    document.querySelectorAll(".modal__answer-option").forEach(option => {
                        option.classList.remove("custom-input-error");
                    });
                }
            } else if (currentStep === 3) {
                const helpNeededOptions = document.querySelectorAll("input[name='helpNeeded']");
                const helpNeededSelected = Array.from(helpNeededOptions).some(option => option.checked);

                if (!helpNeededSelected) {
                    hasError = true;
                    document.querySelectorAll(".modal__answer-option").forEach(option => {
                        option.classList.add("custom-input-error");
                    });
                } else {
                    document.querySelectorAll(".modal__answer-option").forEach(option => {
                        option.classList.remove("custom-input-error");
                    });
                }
            } else if (currentStep === 4) {
                const nameInput = document.getElementById("name-input-modal");
                const phoneInputСon = document.querySelector(".phone-input-container");
                const phoneInput = document.getElementById("phone-number-modal");
                nameInputValue = nameInput.value;
                phoneInputValue = phoneInput.value;

                if (!nameInputValue) {
                    nameInput.classList.add("custom-input-error");
                    hasError = true;
                } else {
                    nameInput.classList.remove("custom-input-error");
                }

                if (!phoneInputValue) {
                    phoneInputСon.classList.add("custom-input-error");
                    hasError = true;
                } else {
                    phoneInputСon.classList.remove("custom-input-error");
                }
            }

            if (hasError) {
                return;
            }

            if (currentStep < 4) {
                currentStep++;
                updateStep();
            } else {
                if (submitCountModal >= maxSubmissionsModal) {
                    alert("Вы достигли лимита на отправку заявок.");
                    return;
                }

                const businessForm = document.querySelector("input[name='businessForm']:checked");
                const taxForm = document.querySelector("input[name='taxForm']:checked");
                const helpNeeded = document.querySelector("input[name='helpNeeded']:checked");
                const commentInput = document.getElementById("comment-input-modal").value;

                const dataToSend = {
                    business_form: businessForm ? businessForm.value : customInputValueModal,
                    form_of_taxation: taxForm ? taxForm.value : null,
                    assistance_to_buchalteria: helpNeeded ? helpNeeded.value : null,
                    name: nameInputValue,
                    phone_number: `+7${phoneInputValue}`,
                    comment: commentInput
                };

                fetch('/api/test', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                    .then(() => {
                        currentStep = 1
                        updateStep()
                        modalTest.style.opacity = "0";
                        modalTest.style.visibility = "hidden";
                        document.body.style.overflow = "auto";
                        submitCountModal++
                        localStorage.setItem('submitCount', submitCountModal);
                    })
                    .catch((error) => {
                        currentStep = 1
                        updateStep()
                        modalTest.style.opacity = "0";
                        modalTest.style.visibility = "hidden";
                        document.body.style.overflow = "auto";
                    });
            }
        });
    }

    if (backButtonTest) {
        backButtonTest.addEventListener("click", () => {
            if (currentStep > 1) {
                currentStep--;
                updateStep();
            } else {
                modalTest.style.opacity = "0";
                modalTest.style.visibility = "hidden";
                document.body.style.overflow = "auto";
            }
        });
    }

    const phoneInput = document.getElementById("phone-number-modal");
    phoneInput.addEventListener("input", (event) => {
        let value = phoneInput.value.replace(/\D/g, "");

        if (value.length > 10) {
            value = value.slice(0, 10);
        }

        const formattedValue = value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "($1) $2-$3-$4");
        phoneInput.value = formattedValue;
    });

    const modal2 = document.getElementById("modal-send-request");
    const takeTheTestBtn2 = document.getElementById("openModal2");
    const closeModal2 = document.getElementById("closeModal2");

    takeTheTestBtn2.addEventListener("click", () => {
        modal2.style.opacity = "1";
        modal2.style.visibility = "visible";
        document.body.style.overflow = "hidden";
    });

    closeModal2.addEventListener("click", () => {
        modal2.style.opacity = "0";
        modal2.style.visibility = "hidden";
        document.body.style.overflow = "auto";
    });

    const sendRequestModal = document.getElementById("send-request-modal");
    sendRequestModal.addEventListener("click", () => {
        const nameInputModal = document.getElementById("name-input-form-modal");
        const emailInputModal = document.getElementById("email-input-form-modal");
        const phoneInputContainerModal = document.getElementById("phone-input-container-form-modal");
        const phoneInputModal = document.getElementById("phone-number-form-modal");
        const commentInputModal = document.getElementById("comment-input-form-modal");
        const selectedBusinessFormModal = document.querySelector("input[name='businessForm-form']:checked");

        nameInputModal.classList.remove("custom-input-error");
        emailInputModal.classList.remove("custom-input-error");
        phoneInputContainerModal.classList.remove("custom-input-error");
        commentInputModal.classList.remove("custom-input-error");

        let hasErrorModal = false;
	
	 if (!selectedBusinessFormModal) {
            radioButtons.forEach(radio => {
                radio.style.borderColor = "#fe2121";
            });
            hasErrorModal = true;
        } else {
            radioButtons.forEach(radio => {
                radio.style.borderColor = "";
            });
        }

        if (!nameInputModal.value) {
            nameInputModal.classList.add("custom-input-error");
            hasErrorModal = true;
        }

	if (!emailInputModal.value) {
            emailInputModal.classList.add("custom-input-error");
            hasErrorModal = true;
        } else {
            if (!validateEmail(emailInputModal.value)) {
                emailInputModal.classList.add("custom-input-error");
                hasErrorModal = true;
            }
        }

        if (!phoneInputModal.value) {
            phoneInputContainerModal.classList.add("custom-input-error");
            hasErrorModal = true;
        }

        if (hasErrorModal) {
            return;
        }

        const dataToSend = {
            name: nameInputModal.value,
            email: emailInputModal.value,
            phone_number: phoneInputModal.value,
            comment: commentInputModal.value,
            type: selectedBusinessFormModal.value,
        };

        fetch('/api/consultation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                currentStep = 1
                updateStep()
                modal2.style.opacity = "0";
                modal2.style.visibility = "hidden";
                document.body.style.overflow = "auto";
                nameInputModal.value = "";
                emailInputModal.value = "";
                phoneInputModal.value = "";
                commentInputModal.value = "";
                console.log("")
            })
            .catch((error) => {
                currentStep = 1
                updateStep()
                modal2.style.opacity = "0";
                modal2.style.visibility = "hidden";
                document.body.style.overflow = "auto";
                nameInputModal.value = "";
                emailInputModal.value = "";
                phoneInputModal.value = "";
                commentInputModal.value = "";
            });

        const radioButtonsModal = document.querySelectorAll("input[name='businessForm-form']");
        radioButtonsModal.forEach(radio => radio.checked = false);
    });
});
