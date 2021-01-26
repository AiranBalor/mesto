const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button-invalid',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: '.popup__input-error',
};

//Попап профиля
const popupProfile = document.querySelector(".popup-profile");
const popupProfileEditButton = document.querySelector(".profile__edit-button");
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

//Попап просмотра изображений
const popupPhotoView = document.querySelector(".popup-view");
const photoViewImage = popupPhotoView.querySelector(".popup-view__image");
const photoViewTitle = popupPhotoView.querySelector(".popup-view__card-title");

//Переменная для работы функции загрузки (рендера) карточек
const photoElements = document.querySelector(".photo-elements");

//Общее открытие попапов
const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEsc);
};

//Общее закрытие попапов
const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  if (popup.classList.contains("popup-card")) {
    popupCardForm.reset();
  };
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
    popupActive.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
  };
};

//Закрытие по клику на оверлей
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
  evt.target.classList.remove('popup_opened');
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
  profileValidation.setButtonState(true);
  profileValidation.clearErrorMessages();
  editPopupProfile();
});

//Сохранение профиля
const handleProfileSubmit = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupProfile);
};

popupProfileForm.addEventListener("submit", handleProfileSubmit);

//Общая функция создания карточки, чтобы не дублировать код при рендере карточек из массива и при добавлении через форму
const createCard = function (cardData) {
  const cardElement = new Card (cardData, '.template-photo', photoView);
  const card = cardElement.generateCard();
  return card;
}

//Добавление карточек
const handleCardSubmit = function (evt) {
  evt.preventDefault();
  photoElements.prepend(createCard({name: cardNameInput.value, link: cardLinkInput.value}));
  popupCardForm.reset();
  closePopup(popupCard);
};

popupCardForm.addEventListener("submit", handleCardSubmit);

//Перед открытием формы чистим сообщения об ошибках и отключаем кнопку.
popupCardOpenButton.addEventListener("click", function () {
  cardValidation.setButtonState(false);
  cardValidation.clearErrorMessages();
  openPopup(popupCard);
});

//Просмотр карточки
const photoView = function ({name, link}) {
  openPopup(popupPhotoView);
  photoViewImage.src = link;
  photoViewTitle.textContent = name;
};

initialCards.forEach((item) => {
  photoElements.append(createCard(item));
})

const profileValidation = new FormValidator (validationConfig, popupProfileForm);
profileValidation.enableFormValidation();
const cardValidation = new FormValidator (validationConfig, popupCardForm);
cardValidation.enableFormValidation();

import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";