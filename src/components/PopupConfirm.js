import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__delete-card-button');
  }

  setEventListeners(handle) {
    this._handleConfirmDelete = handle;
    this._confirmButton.addEventListener('click', this._handleConfirmDelete);
    super.setEventListeners();
  }

  close() {
    this._confirmButton.removeEventListener('click', this._handleConfirmDelete);
    super.close();
  }
}