//Попап профиля
const popupProfile = document.querySelector(".popup-profile");
const popupProfileEditButton = document.querySelector(".profile__edit-button");
const popupProfileSubmitButton = document.querySelector(".popup__save-profile");
const nameInput = document.querySelector(".popup__input_type_name");
const professionInput = document.querySelector(".popup__input_type_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

//Формы
const popupProfileForm = document.querySelector(".popup__container-profile");
const popupCardForm = document.querySelector(".popup__container-card");

//Попап карточек
const popupCard = document.querySelector(".popup-card");
const popupCardOpenButton = document.querySelector(".profile__add-button");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_card-link");
const popupCardSubmitButton = popupCard.querySelector(".popup__add-card-button");

//Попап просмотра изображений
const popupPhotoView = document.querySelector(".popup-view");
const photoViewImage = popupPhotoView.querySelector(".popup-view__image");
const photoViewTitle = popupPhotoView.querySelector(".popup-view__card-title");

//Переменные для работы функции загрузки (рендера) карточек
const photoElements = document.querySelector(".photo-elements");
const templateCard = document.querySelector(".template-photo").content;

//Общее открытие попапов
const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEsc);
};

//Общее закрытие попапов
const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByEsc);
};

const popupCloseButtons = document.querySelectorAll(".popup__close");

popupCloseButtons.forEach(function (button) { 
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//Закрытие по ESC
const closePopupByEsc = function (evt) {
  const popupActive = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupActive);
    document.removeEventListener('keydown', closePopupByEsc);
  };
};

//Закрытие по клику на оверлей
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
  closePopup(evt.target);
  document.removeEventListener('keydown', closePopupByEsc);
  };
});

//Редактирование профиля
const editPopupProfile = function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
};

//При открытии формы чистим сообщения об ошибках и включаем кнопку
popupProfileEditButton.addEventListener("click", function () {
  clearErrorMessages(popupProfileForm, validationConfig);
  setButtonState(popupProfileSubmitButton, true, validationConfig);
  editPopupProfile();
});

const handleProfileSubmit = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupProfile);
};

popupProfileForm.addEventListener("submit", handleProfileSubmit);

//Добавление карточек
const handleCardSubmit = function (evt) {
  evt.preventDefault();
  photoElements.prepend(
    createCard({ name: cardNameInput.value, link: cardLinkInput.value })
  );
  popupCardForm.reset();
  closePopup(popupCard);
};

popupCardForm.addEventListener("submit", handleCardSubmit);

//Перед открытием формы чистим сообщения об ошибках и отключаем кнопку.
popupCardOpenButton.addEventListener("click", function () {
  clearErrorMessages(popupCardForm, validationConfig);
  setButtonState(popupCardSubmitButton, false, validationConfig);
  popupCardForm.reset(); //перенес очистку. в отправке формы она уже была.
  openPopup(popupCard);
});

// if (popup.classList.contains("popup-card")) {
//   popupCardForm.reset();
// };

//Просмотр карточки
const photoView = function (evt) {
  openPopup(popupPhotoView);
  const currentPhotoCard = evt.target.closest(".photo-element");
  const currentPhoto = currentPhotoCard.querySelector(".photo-element__picture");
  const currentPhotoTitle = currentPhotoCard.querySelector(".photo-element__title");
  photoViewImage.src = currentPhoto.src;
  photoViewTitle.textContent = currentPhotoTitle.textContent;
};

//Удаление карточек
const handleDeleteCard = function (evt) {
  const currentButton = evt.currentTarget;
  const currentCard = currentButton.closest(".photo-element");
  currentButton.removeEventListener("click", handleDeleteCard);
  currentCard.remove();
};

//Лайки карточек
const handleLikeCard = function (evt) {
  evt.target.classList.toggle("photo-element__button-like_active");
};

//Функция получения данных о карточке
const createCard = function (cardDate) {
  const newCard = templateCard.cloneNode(true);
  const cardPucture = newCard.querySelector(".photo-element__picture");
  cardPucture.src = cardDate.link;
  cardPucture.alt = cardDate.name;
  cardPucture.addEventListener("click", photoView);
  newCard.querySelector(".photo-element__title").textContent = cardDate.name;
  newCard.querySelector(".photo-element__button-delete").addEventListener("click", handleDeleteCard);
  newCard.querySelector(".photo-element__button-like").addEventListener("click", handleLikeCard);
  return newCard;
};

//Функция рендера карточек
const renderPhotoElements = (section, arr) => {
  section.append(...arr.map(createCard));
};

renderPhotoElements(photoElements, initialCards);