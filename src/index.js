import {
  popupProfile,
  popupProfileEditButton,
  nameInput,
  professionInput,
  profileName,
  profileProfession,
  popupProfileForm,
  popupCardForm,
  popupCard,
  popupCardOpenButton,
  popupPhotoView,
  photoElements,
  validationConfig,
  initialCards
} from "./utils/constants.js";

import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

import './pages/index.css';

const createCard = function (cardData) {
  const cardElement = new Card (cardData, '.template-photo', photoView);
  return cardElement.generateCard();
}

const userInfo = new UserInfo({
  name: profileName,
  profession: profileProfession,
});

popupProfileEditButton.addEventListener("click", () => {
  profileValidation.setButtonState(true);
  profileValidation.clearErrorMessages();
  const getInfo = userInfo.getUserInfo();
  nameInput.value = getInfo.name;
  professionInput.value = getInfo.profession;
  popupUserProfile.open();
});

const popupUserProfile = new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({
      newName: data.name,
      newProfession: data.profession,
    });
    userInfo.updateUserInfo();
  },
});

popupUserProfile.setEventListeners();

const popupAddCard = new PopupWithForm({
  popupSelector: popupCard,
  handleFormSubmit: (data) => {
    const newCard = createCard(data);
    cardList.addNewItem(newCard);
  },
});

popupAddCard.setEventListeners(); //метод класса PopupWithForm

//Перед открытием формы чистим сообщения об ошибках и отключаем кнопку.
popupCardOpenButton.addEventListener("click", function () {
  cardValidation.setButtonState(false);
  cardValidation.clearErrorMessages();
  popupAddCard.open();
});

//Просмотр карточки
const popupView = new PopupWithImage(popupPhotoView);
popupView.setEventListeners();

const photoView = function ({ name, link }) {
  popupView.open({ name, link });
};

//Рендер начальных карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
    },
  },
  photoElements
);

cardList.renderItems();

//Валидация
const profileValidation = new FormValidator(validationConfig, popupProfileForm);
profileValidation.enableFormValidation();
const cardValidation = new FormValidator(validationConfig, popupCardForm);
cardValidation.enableFormValidation();