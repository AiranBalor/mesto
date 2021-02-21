import {
  popupProfile,
  popupProfileEditButton,
  nameInput,
  professionInput,
  profileName,
  profileProfession,
  profileAvatar,
  popupProfileForm,
  popupCardForm,
  popupCard,
  popupCardOpenButton,
  popupPhotoView,
  photoElements,
  validationConfig,
  initialCards,
  popupCardDelete
} from "./utils/constants.js";

import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupConfirm from "./components/PopupConfirm.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api.js";

import './pages/index.css';

const createCard = function({name, link, _id, owner, likes}) {
  const cardElement = new Card ({name, link, _id, owner, likes, userId: userInfo.returnUserId()}, '.template-photo', photoView, () => {
    popupDeleteCardConfirm.setEventListeners(removeCardFormServer(cardElement));
    popupDeleteCardConfirm.open();
  });
  return cardElement.generateCard();
}

const removeCardFormServer = function (card) {
  return () => { 
    apiInstance.deleteCardFromServer(card.getCardId())
      .then(
        card._handleDeleteCardFromDOM(),
        popupDeleteCardConfirm.close()
      );
  }
} 

//Универсализированный класс
const cardList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
    },
  },
photoElements
);

const userInfo = new UserInfo({
  name: profileName,
  profession: profileProfession
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
  handleFormSubmit: (data) => { //Здесь уже лежит объект с ключами и данными из полей инпутов
    apiInstance.updateUserInfo(data);
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
  handleFormSubmit: (data) => { //Здесь уже лежит объект с данными из инпутов
    apiInstance.sendNewCard(data)
      .then((res) => {//Поскольку необходимо в любом случае превращать Response в объект для дальнейшего использования, думаю, это должно
        //описываться в методе класса изначально.
        return res.json();
      })
      .then((res) => {
        const newCard = createCard(res);
        cardList.addNewItem(newCard);
      })
  },
});

popupAddCard.setEventListeners();


const popupDeleteCardConfirm = new PopupConfirm (popupCardDelete, removeCardFormServer);

//Работа с API
const apiInstance = new Api(
  {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '8e6db405-93d3-4564-862a-de4e30ec51f5',
    'Content-Type': 'application/json'
  }
});

//Отправили запрос на сервер и после ответа сервера отрендерили карточки, загруженные пользователями
apiInstance.getInitialCards()
  .then((res) => {
    console.log(res)
    cardList.renderItems(res);
  })

//Отправили запрос на сервер о пользователе, затем вставили эти данные в DOM-узлы 
apiInstance.getUserInfoFromServer()
  .then((res) => {
    userInfo.setUserInfo({
      newName: res.name,
      newProfession: res.about,
    });
    userInfo.getUserId(res._id) //Здесь мой айдишник попадает в this userInfo и далее может использоваться методом returnUserId 
    userInfo.updateUserInfo();
  })
  .catch((err) => {
    console.log(`Ошибка - ${err.status}`);
  })


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

//Валидация
const profileValidation = new FormValidator(validationConfig, popupProfileForm);
profileValidation.enableFormValidation();
const cardValidation = new FormValidator(validationConfig, popupCardForm);
cardValidation.enableFormValidation();

// const cardDelete = new PopupWithForm({
//   popupSelector: popupCardDelete,
//   handleFormSubmit: (data) => {
//     const newCard = createCard(data);
//     cardList.addNewItem(newCard);
//   },
// });

document.querySelector('.profile__overlay').addEventListener('click', popupUserProfile.open())