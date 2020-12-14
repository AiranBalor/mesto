//Попап профиля
const popupProfile = document.querySelector('.popup-profile');
const popupProfileForm = document.querySelector('.popup__container-profile');
const popupProfileEditButton = document.querySelector('.profile__edit-button');
const popupProfileSubmitButton = document.querySelector('.popup__save-profile');
const nameInput = document.querySelector('.popup__input_type_name');
const professionInput = document.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

//Попап карточек
const popupCard = document.querySelector('.popup-card');
const popupCardForm = document.querySelector('.popup__container-card');
const popupCardOpenButton = document.querySelector('.profile__add-button');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_card-link');

//Попап просмотра изображений
const popupPhotoView = document.querySelector('.popup-view');
const photoViewImage = popupPhotoView.querySelector('.popup-view__image');
const photoViewTitle = popupPhotoView.querySelector('.popup-view__card-title');

//Переменные для работы функции загрузки (рендера) карточек
const photoElements = document.querySelector('.photo-elements');
const templateCard = document.querySelector('.template-photo').content;

//Общее открытие попапов
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
};

//Общее закрытие попапов

const closePopup = function (popup) { 
  popup.classList.remove('popup_opened'); 
};

const popupCloseButtons = document.querySelectorAll('.popup__close'); 
 
const closePopupActions = function (evt) { 
  evt.preventDefault(); 
  const currentButton = evt.target; 
  const currentPopup = currentButton.closest('.popup'); 
  closePopup(currentPopup); 
};
 
popupCloseButtons.forEach(function (button) { 
  button.addEventListener('click', closePopupActions) 
});

//Удаление карточек
const handleDeleteCard = function (evt) {
  evt.preventDefault();
  const currentButton = evt.currentTarget;
  const currentCard = currentButton.closest('.photo-element');
  currentButton.removeEventListener('click', handleDeleteCard);
  currentCard.remove();
}

//Лайки карточек
const handleLikeCard = function (evt) {
  evt.preventDefault();
  evt.target.classList.toggle('photo-element__button-like_active');
};

//Редактирование профиля
const editPopupProfile = function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

popupProfileEditButton.addEventListener('click', editPopupProfile);

const handleProfileSubmit = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupProfile);
}

popupProfileForm.addEventListener('submit', handleProfileSubmit);

//Просмотр карточки
const photoView = function (evt) {
  evt.preventDefault();
  openPopup(popupPhotoView);
  const currentPhotoCard = evt.target.closest('.photo-element');
  const currentPhoto = currentPhotoCard.querySelector('.photo-element__picture');
  const currentPhotoTitle = currentPhotoCard.querySelector('.photo-element__title');
  photoViewImage.src = currentPhoto.src;
  photoViewTitle.textContent = currentPhotoTitle.textContent;
};

//Функция получения данных о карточке
const createCard = function (cardDate) {
  const newCard = templateCard.cloneNode(true);
  newCard.querySelector('.photo-element__picture').src = cardDate.link;
  newCard.querySelector('.photo-element__picture').alt = cardDate.name;
  newCard.querySelector('.photo-element__title').textContent = cardDate.name;
  newCard.querySelector('.photo-element__button-delete').addEventListener('click', handleDeleteCard);
  newCard.querySelector('.photo-element__button-like').addEventListener('click', handleLikeCard);
  newCard.querySelector('.photo-element__picture').addEventListener('click', photoView);
  return newCard;
};

//Функция рендера карточек
const renderPhotoElements = () => {
  photoElements.append(...initialCards.map(createCard));
};

renderPhotoElements();

//Добавление карточек
const addCard = function (evt) {
  evt.preventDefault();
  photoElements.prepend(createCard({name: cardNameInput.value, link: cardLinkInput.value}));
  popupCardForm.reset();
  closePopup(popupCard);
};

popupCardForm.addEventListener('submit', addCard);

popupCardOpenButton.addEventListener('click', function () {
  openPopup(popupCard);
});