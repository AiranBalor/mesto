//Попап профиля
export const popupProfile = document.querySelector(".popup-profile");
export const popupProfileEditButton = document.querySelector(".profile__edit-button");
export const nameInput = document.querySelector(".popup__input_type_name");
export const professionInput = document.querySelector(".popup__input_type_profession");
export const profileName = document.querySelector(".profile__name");
export const profileProfession = document.querySelector(".profile__profession");

//Формы
export const popupProfileForm = document.querySelector(".popup__container-profile");
export const popupCardForm = document.querySelector(".popup__container-card");

//Попап карточек
export const popupCard = document.querySelector(".popup-card");
export const popupCardOpenButton = document.querySelector(".profile__add-button");

//Попап просмотра изображений
export const popupPhotoView = document.querySelector(".popup-view");

//Переменная для работы функции загрузки (рендера) карточек
export const photoElements = document.querySelector(".photo-elements");

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button-invalid',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: '.popup__input-error',
};

export const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];