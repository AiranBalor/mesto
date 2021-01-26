export class FormValidator {
  constructor (config, form) {
    this.config = config;
    this.form = form;
    this.submitButton = this.form.querySelector('.popup__submit');
  }

  clearErrorMessages() {
    this.form.querySelectorAll(this.config.errorClass).forEach(error => {
      error.textContent = "";
    });
    this.form.querySelectorAll(this.config.inputSelector).forEach(input => {
      input.classList.remove(this.config.inputErrorClass);
    });
  };

  showInputError(input) {
    const error = this.form.querySelector(`.${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this.config.inputErrorClass);
  };

  hideInputError(input) {
    const error = this.form.querySelector(`.${input.id}-error`);
    error.textContent = "";
    input.classList.remove(this.config.inputErrorClass);
  };

  checkInputValidity(input) {
    if (input.validity.valid) {
      this.hideInputError(input);
    } else {
      this.showInputError(input);
    }
  };

  setButtonState(state) {
    if (state) {
      this.submitButton.classList.remove(this.config.inactiveButtonClass);
      this.submitButton.disabled = false;
    } else {
      this.submitButton.classList.add(this.config.inactiveButtonClass);
      this.submitButton.disabled = true;
    };
  };

  setEventListeners() {
    const inputList = this.form.querySelectorAll(this.config.inputSelector);
    inputList.forEach(input => {
      input.addEventListener("input", () => {
      this.checkInputValidity(input);
      this.setButtonState(this.form.checkValidity());
      });
    });
  };

  enableFormValidation() {
    this.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this.setButtonState(this.form.checkValidity());
  };
}

