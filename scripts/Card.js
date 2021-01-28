
export class Card {
  constructor(data, cardSelector, openImage) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openImage = openImage;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".photo-element")
      .cloneNode(true);

    return cardTemplate;
  }

  _setEventListeners() {
    this._element.querySelector(".photo-element__button-delete").addEventListener("click", () => {
      this._handleDeleteCard();
    });
    this._element.querySelector(".photo-element__button-like").addEventListener("click", () => {
      this._handleLikeCard();
    });
    this._element.querySelector(".photo-element__picture").addEventListener("click", () => {
      this._openImage({name: this._name, link: this._link});
    });
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard() {
    this._element.querySelector(".photo-element__button-like").classList.toggle("photo-element__button-like_active");
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardPucture = this._element.querySelector(".photo-element__picture");
    cardPucture.src = this._link;
    cardPucture.alt = this._name;
    this._element.querySelector(".photo-element__title").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}
