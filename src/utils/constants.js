//Попап профиля
export const popupProfile = document.querySelector(".popup-profile");
export const popupProfileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const nameInput = document.querySelector(".popup__input_type_name");
export const professionInput = document.querySelector(
  ".popup__input_type_profession"
);

//Профиль
export const profileName = document.querySelector(".profile__name");
export const profileProfession = document.querySelector(".profile__profession");
export const profileAvatar = document.querySelector(".profile__avatar");

//Формы
export const popupProfileForm = document.querySelector(
  ".popup__container-profile"
);
export const popupCardForm = document.querySelector(".popup__container-card");
export const popupAvatarForm = document.querySelector(
  ".popup__container-avatar"
);

//Попап карточек
export const popupCard = document.querySelector(".popup-card");
export const popupCardOpenButton = document.querySelector(
  ".profile__add-button"
);

//Попап просмотра изображений
export const popupPhotoView = document.querySelector(".popup-view");

//Попап удаления
export const popupCardDelete = document.querySelector(".popup-delete");

//Попап изменения аватара
export const popupAvatarSelector = document.querySelector(".popup-avatar");

//Переменная для работы функции загрузки (рендера) карточек
export const photoElements = document.querySelector(".photo-elements");

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__button-invalid",
  inputErrorClass: "popup__input_state_invalid",
  errorClass: ".popup__input-error",
};
