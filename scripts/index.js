const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
let popupForm = popup.querySelector('.popup__container');
let NameInput = popupForm.querySelector('.popup__input_type_name');
let ProfessionInput = popupForm.querySelector('.popup__input_type_profession');
let popupSave = popupForm.querySelector('.popup__save-button');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

const PopupOpen = function () {
  NameInput.value = profileName.textContent;
  ProfessionInput.value = profileProfession.textContent;
  popup.classList.add('popup_opened');
}

popupOpenButton.addEventListener('click', PopupOpen);

const PopupClose = function () {
  NameInput.value = '';
  ProfessionInput.value = '';
  popup.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', PopupClose);

const PopupSubmit = function (evt) {
  evt.preventDefault()
  profileName.textContent = NameInput.value;
  profileProfession.textContent = ProfessionInput.value;
  PopupClose()
}

popupForm.addEventListener('submit', PopupSubmit);