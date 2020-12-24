//Очистка сообщений об ошибках валидирования при закрытии и повторном открытии форм.
const clearErrorMessages = function (form, config) {
  form.querySelectorAll(config.errorClass).forEach(error => {
    error.textContent = "";
  });
  form.querySelectorAll(config.inputSelector).forEach(input => {
    input.classList.remove(config.inputErrorClass);
  });
};

function showInputError(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
};

function hideInputError(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = "";
  input.classList.remove(config.inputErrorClass);
};

function checkValidity(form, input, config) {
  if (input.validity.valid) {
    hideInputError(form, input, config);
  } else {
    showInputError(form, input, config);
  }
};

function setButtonState (button, state, config) {
  if (state) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  };
};

function setEventListeners (form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener("input", (evt) => {
    checkValidity(form, input, config);
    setButtonState(submitButton, form.checkValidity(), config);
    });
  });
};

//Настройки валидации. Мне показалось, что это удобнее, чем передавать сам объект в функцию
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button-invalid',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: '.popup__input-error',
};

function enableFormValidation (config) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(form => {
    setEventListeners(form, config);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const submitButton = form.querySelector(config.submitButtonSelector);
    setButtonState(submitButton, form.checkValidity(), config);
  });
};

enableFormValidation(validationConfig);