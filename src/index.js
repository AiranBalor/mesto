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

const userInfo = new UserInfo({
  name: profileName,
  profession: profileProfession,
});

userInfo.setUserInfo({
  newName: nameInput.value,
  newProfession: professionInput.value,
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
      newName: nameInput.value,
      newProfession: professionInput.value,
    });
    userInfo.updateUserInfo();
  },
});

popupUserProfile.setEventListeners();

const popupAddCard = new PopupWithForm({
  popupSelector: popupCard,
  handleFormSubmit: (data) => {
    const newCard = new Card(data, ".template-photo", photoView).generateCard();
    cardList.addNewItem(newCard);
  },
});

popupAddCard.setEventListeners();

popupCardOpenButton.addEventListener("click", function () {
  cardValidation.setButtonState(false);
  cardValidation.clearErrorMessages();
  popupAddCard.open();
});

//Просмотр карточки
const popupView = new PopupWithImage(popupPhotoView);

const photoView = function ({ name, link }) {
  popupView.open({ name, link });
};

//Рендер начальных карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".template-photo", photoView).generateCard();
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
