export default class Card {
  constructor(
    { name, link, _id, owner, likes, userId },
    {
      cardSelector,
      handleCardClick,
      handleConfirmDelete,
      handleLike,
      handleRemoveLike,
      handleCountLikes,
    }
  ) {
    this._name = name;
    this._link = link;
    this._cardId = _id;
    this._ownerId = owner._id;
    this._likes = likes;
    this._cardSelector = cardSelector;
    this._openImage = handleCardClick;
    this._userId = userId;
    this._handleConfirmDelete = handleConfirmDelete;
    this._handleLike = handleLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleCountLikes = handleCountLikes;
  }

  //Общие методы класса
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".photo-element")
      .cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners() {
    this._element.querySelector(".photo-element__button-delete").addEventListener("click", this._handleConfirmDelete);
    const likeButton = this._element.querySelector(".photo-element__button-like");
    likeButton.addEventListener("click", () => {
      if (likeButton.classList.contains('photo-element__button-like_active')) {
        this._handleRemoveLike()
      } else { 
        this._handleLike();
      }
    });
    this._element.querySelector(".photo-element__picture").addEventListener("click", () => {
        this._openImage({ name: this._name, link: this._link });
    });
  }


  generateCard() {
    this._element = this._getTemplate();
    this.checkLikes();
    this.compareId();
    this.countLikes(this._likes.length);
    const cardPucture = this._element.querySelector(".photo-element__picture");
    cardPucture.src = this._link;
    cardPucture.alt = this._name;
    this._element.querySelector(".photo-element__title").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  //Метод удаления карточки из ДОМ
  handleDeleteCardFromDOM() {
    this._element.remove();
    this._element = null;
  }

  //Методы работы с ID
  getCardId() {
    return this._cardId;
  }

  compareId() {
    if (this._ownerId !== this._userId) {
      this._element
        .querySelector(".photo-element__button-delete")
        .classList.add("photo_element__button-delete_hidden");
    }
  }

  //Методы работы с лайками
  toggleLikeCard() {
    this._element.querySelector(".photo-element__button-like").classList.toggle("photo-element__button-like_active");
  }

  checkLikes() {
    this._likes.forEach(item => {
      if (item._id === this._userId) {
        this._element.querySelector(".photo-element__button-like").classList.add("photo-element__button-like_active");
      }
    })
  }

  countLikes(likesValue) {
    const counterLike = this._element.querySelector(".photo-element__likes-counter");
    return (counterLike.textContent = likesValue);
  }
}
