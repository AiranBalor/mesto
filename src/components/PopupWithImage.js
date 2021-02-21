import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = popupSelector.querySelector(".popup-view__image");
    this._popupImageTitle = popupSelector.querySelector(
      ".popup-view__card-title"
    );
  }

  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupImageTitle.textContent = data.name;
    super.open();
  }
}
