const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
let popupForm = document.querySelector('.popup__container');
let NameInput = document.querySelector('.popup__input_type_name');
let ProfessionInput = document.querySelector('.popup__input_type_profession');
let popupSave = document.querySelector('.popup__save-button');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

const PopupOpen = function () {
  popup.classList.add('popup_opened');
  NameInput.value = profileName.textContent;
  ProfessionInput.value = profileProfession.textContent;
}

popupOpenButton.addEventListener('click', PopupOpen);

const PopupClose = function () {
  popup.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', PopupClose);

const PopupSubmit = function (evt) {
  evt.preventDefault()
  profileName.textContent = NameInput.value /*Видел пример в описании 4 ПР, где задавали две дополнительные переменные 
  со значением(value) инпутов, но не смог обосновать для себя их появление, поэтому решил сделать попроще. На усмотрение ревьюера.*/
  profileProfession.textContent = ProfessionInput.value
}

popupForm.addEventListener('submit', PopupSubmit);

popupSave.addEventListener('click', PopupClose);