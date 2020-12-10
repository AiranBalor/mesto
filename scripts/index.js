//Общие переменные попапов
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__container');

//Попап профиля
const popupProfile = document.querySelector('.popup-profile');
const popupProfileEditButton = document.querySelector('.profile__edit-button');
const popupProfileSubmitButton = document.querySelector('.popup__save-profile');
const nameInput = popupForm.querySelector('.popup__input_type_name');
const professionInput = popupForm.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

//Попап карточек
const popupCard = document.querySelector('.popup-card');
const popupCardOpenButton = document.querySelector('.profile__add-button');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_card-link');
const popupCardSubmit = document.querySelector('.popup__container-card');

//Переменные для работы функции загрузки (рендера) карточек
const photoElements = document.querySelector('.photo-elements'); 
const templateCard = document.querySelector('.template-photo').content;

//Исходный массив
const initialCards = [
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

//Функция загрузки карточек
const renderPhotoElements = () => {
    initialCards.map(element => {
      const photoElement = templateCard.cloneNode(true);
      photoElement.querySelector('.photo-element__picture').src = element.link;
      photoElement.querySelector('.photo-element__picture').alt = element.name;
      photoElement.querySelector('.photo-element__title').textContent = element.name;
      photoElements.append(photoElement);
  })
};

renderPhotoElements();

//Общая функция открытия/закрытия попапов
const togglePopup = function (popup) {
  popup.classList.toggle('popup_opened');
}

//Общее закрытие попапов
const popupCloseButton = document.querySelectorAll('.popup__close');

const popupClose = function (evt) {
  evt.preventDefault();
  const currentButton = evt.target;
  const currentPopup = currentButton.closest('.popup');
  togglePopup(currentPopup);
}

popupCloseButton.forEach(function (button) {
  button.addEventListener('click', popupClose)
});


//Добавление карточек
const addCard = function (evt) {
  evt.preventDefault();
  let photoElement = templateCard.cloneNode(true);
  photoElement.querySelector('.photo-element__picture').src = cardLinkInput.value;
  photoElement.querySelector('.photo-element__picture').alt = cardNameInput.value;
  photoElement.querySelector('.photo-element__title').textContent = cardNameInput.value;
  photoElement.querySelector('.photo-element__button-delete').addEventListener('click', deleteCard);
  photoElement.querySelector('.photo-element__button-like').addEventListener('click', likeCard);
  photoElement.querySelector('.photo-element__picture').addEventListener('click', photoView);
  photoElements.prepend(photoElement);
  togglePopup(popupCard);
  cardNameInput.value = "";
  cardLinkInput.value = "";
};

popupCardSubmit.addEventListener('submit', addCard);

popupCardOpenButton.addEventListener('click', function () {
  togglePopup(popupCard);
});


//Удаление карточек
const cardDeleteButtonList = document.querySelectorAll('.photo-element__button-delete');

let deleteCard = function (evt) {
  evt.preventDefault();
  const currentButton = evt.currentTarget;
  const currentCard = currentButton.closest('.photo-element');
  currentButton.removeEventListener('click', deleteCard);
  currentCard.remove();
}

cardDeleteButtonList.forEach(function (button) {
  button.addEventListener('click', deleteCard);
});


//Лайки карточек
const cardLikeButtonList = document.querySelectorAll('.photo-element__button-like');

const likeCard = function (evt) {
  evt.preventDefault();
  evt.target.classList.toggle('photo-element__button-like_active');
};

cardLikeButtonList.forEach(function (button) {
  button.addEventListener('click', likeCard);
});

//Редактирование профиля
const popupEditProfile = function () {
  togglePopup(popupProfile);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

popupProfileEditButton.addEventListener('click', () => 
  popupEditProfile(popupProfile));

const popupProfileSubmit = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  togglePopup(popupProfile);
  }

popupForm.addEventListener('submit', popupProfileSubmit);

//Просмотр карточки
const popupPhotoView = document.querySelector('.popup-view');
const photoImagelist = document.querySelectorAll('.photo-element__picture');

const photoView = function (evt) {
  evt.preventDefault();
  togglePopup(popupPhotoView);
  const currentPhotoCard = evt.target.closest('.photo-element');
  const currentPhoto = currentPhotoCard.querySelector('.photo-element__picture');
  const currentPhotoTitle = currentPhotoCard.querySelector('.photo-element__title');
  const photoViewImage = popupPhotoView.querySelector('.popup-view__image');
  const photoViewTitle = popupPhotoView.querySelector('.popup-view__card-title');
  photoViewImage.src = currentPhoto.src;
  photoViewTitle.textContent = currentPhotoTitle.textContent;
}

photoImagelist.forEach(function (photo) {
  photo.addEventListener('click', photoView)
});