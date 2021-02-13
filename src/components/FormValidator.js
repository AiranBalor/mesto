export default class FormValidator {
  constructor (config, form) {
    this._config = config;
    this._form = form;
    this._submitButton = this._form.querySelector('.popup__submit');
    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
  }

  clearErrorMessages() {
    this._form.querySelectorAll(this._config.errorClass).forEach(error => {
      error.textContent = "";
    });
    this._inputList.forEach(input => {
      input.classList.remove(this._config.inputErrorClass);
    });
  };

  _showInputError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  };

  _hideInputError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = "";
    input.classList.remove(this._config.inputErrorClass);
  };

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  };

  setButtonState(state) {
    if (state) {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = true;
    };
  };

  _setEventListeners() {
    this._inputList.forEach(input => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this.setButtonState(this._form.checkValidity());
      });
    });
  };

  enableFormValidation() {
    this._setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this.setButtonState(this._form.checkValidity());
  };
}