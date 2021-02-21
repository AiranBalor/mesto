import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popup = popupSelector;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__input");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this.handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      if (this._popup === ".popup-card") {
        this._submitButton.textContent = "Создать";
      } else {
        this._submitButton.textContent = "Сохранить";
      }
    }
  }
}
