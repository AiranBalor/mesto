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
  popupAvatarSelector,
  popupAvatarForm,
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

const createCard = function ({ name, link, _id, owner, likes }) {
  const cardElement = new Card(
    { name, link, _id, owner, likes, userId: userInfo.returnUserId() },
    {
      cardSelector: ".template-photo",
      handleCardClick: photoView,
      handleConfirmDelete: () => {
        console.log(userInfo.returnUserId())
        popupDeleteCardConfirm.setEventListeners(
          removeCardFormServer(cardElement)
        );
        popupDeleteCardConfirm.open();
      },
      handleLike: function () {
        apiInstance.addLike(_id)
        .then((res) => {
          cardElement.toggleLikeCard();
          cardElement.countLikes(res.likes.length);
        });
      },
      handleRemoveLike: function () {
        apiInstance.deleteLike(_id)
        .then((res) => {
          cardElement.toggleLikeCard();
          cardElement.countLikes(res.likes.length);
        });
      },
    }
  );
  return cardElement.generateCard();
};

const photoView = function ({ name, link }) {
  popupView.open({ name, link });
};


//Работа с API
const apiInstance = new Api(
  {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '8e6db405-93d3-4564-862a-de4e30ec51f5',
    'Content-Type': 'application/json'
  }
});

apiInstance.getAllInfo()
  .then(([userInfoServer, cards]) => {
    userInfo.setUserInfo(userInfoServer)
    userInfo.getUserId(userInfoServer._id)
    cardList.renderItems(cards)
    userInfo.updateUserInfo()
  })
  .catch((err) => {
    console.log(`Ошибка - ${err.status}`);
  });

const removeCardFormServer = function (card) {
  return () => {
    apiInstance.deleteCardFromServer(card.getCardId())
      .then(
        card.handleDeleteCardFromDOM(),
        popupDeleteCardConfirm.close()
      )
      .catch((err) => {
        console.log(`Ошибка - ${err.status}`);
      })
  }
}

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
  profession: profileProfession,
  avatar: profileAvatar
});

//Попапы
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
    popupUserProfile.renderLoading(true);
    apiInstance.updateUserInfo(data)
      .then(res => {
        userInfo.setUserInfo(res);
        userInfo.updateUserInfo();
      })
      .catch((err) => {
        console.log(`Ошибка - ${err.status}`);
      })
      .finally(
        popupUserProfile.renderLoading(false),
        popupUserProfile.close()
      )
  }
});

popupUserProfile.setEventListeners();

const popupAvatar = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  handleFormSubmit: (data) => {
    popupAvatar.renderLoading(true);
    apiInstance.updateAvatar(data)
      .then(res => {
        userInfo.setUserInfo(res);
        userInfo.updateUserInfo();
      })
      .catch((err) => {
        console.log(`Ошибка - ${err.status}`);
      })
      .finally(
        popupAvatar.renderLoading(false),
        popupAvatar.close()
      )
  }
})

popupAvatar.setEventListeners();

//Перед открытием формы чистим сообщения об ошибках и отключаем кнопку.
profileAvatar.addEventListener("click", () => {
  avatarValidation.setButtonState(false);
  avatarValidation.clearErrorMessages();
  popupAvatar.open();
})

const popupAddCard = new PopupWithForm({
  popupSelector: popupCard,
  handleFormSubmit: (data) => {
    popupAddCard.renderLoading(true);
    apiInstance.sendNewCard(data)
      .then(res => {
        const newCard = createCard(res);
        cardList.addNewItem(newCard);
      })
      .catch((err) => {
        console.log(`Ошибка - ${err.status}`);
      })
      .finally(
        popupAddCard.renderLoading(false),
        popupAddCard.close()
      )
  },
});

popupAddCard.setEventListeners();

const popupDeleteCardConfirm = new PopupConfirm (popupCardDelete, removeCardFormServer);

//Перед открытием формы чистим сообщения об ошибках и отключаем кнопку.
popupCardOpenButton.addEventListener("click", function () {
  cardValidation.setButtonState(false);
  cardValidation.clearErrorMessages();
  popupAddCard.open();
});

//Просмотр карточки
const popupView = new PopupWithImage(popupPhotoView);
popupView.setEventListeners();

//Валидация
const profileValidation = new FormValidator(validationConfig, popupProfileForm);
profileValidation.enableFormValidation();
const cardValidation = new FormValidator(validationConfig, popupCardForm);
cardValidation.enableFormValidation();
const avatarValidation = new FormValidator(validationConfig, popupAvatarForm);
avatarValidation.enableFormValidation();
//Старая функция взяла и сломалась.
