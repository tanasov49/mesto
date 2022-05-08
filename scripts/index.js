import { elementsCards, Card} from './cards.js';
//Закрытие по клавише ESC
const closeKeyEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}
//Закрытие в пустой области кликом
const closeOverlayPopup = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}
//Открытие popup
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener('keyup', closeKeyEsc);
  document.addEventListener('click', closeOverlayPopup);
}
//Закрытие popup
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keyup', closeKeyEsc);
  document.removeEventListener('click', closeOverlayPopup);
}
//Кнопка профиля
const btnEditProfile = document.querySelector(".profile__click-profile");
//Кнопка закрытия
const popupClose = document.querySelector(".popup__close");
//Контейнер профиля
const popupEditProfile = document.querySelector(".popup_edit-profile");
//Кнопка сохранения профиля
const btnSafeProfile =document.querySelector('.popup-form__save-btn_profile');
//Кнопка сохранения карточки
const btnSafeCard =document.querySelector('.popup-form__save-btn_card');
//Контейнер карточки
const popupAddCard = document.querySelector(".popup_add-card");
const formPopupCard = document.querySelector('.popup-form_card');
//Кнопка закрытия карточки
const popupCloseCard = popupAddCard.querySelector(".popup__close");
//Контейнер раскрытия фото
const imagePopup = document.querySelector(".popup_image");
//Закрытие фото
const btnCloseImage = imagePopup.querySelector(".popup__close");
//Событие отправки
const popupForm = document.querySelector(".popup-form");
//Добавление карточки
const btnFormCard = document.querySelector(".profile__add-element");
//Переменные профиля
const textName = document.querySelector(".popup-form__input_type_name");
const textSkill = document.querySelector(".popup-form__input_type_skill");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
//Переменные для внесения данных в массив карточек с фото
const titleInputCard = document.querySelector(".popup-form__input_type_place");
const imageInputCard = document.querySelector(".popup-form__input_type_url");
//Блок карточек
const elements = document.querySelector(".elements");
const templateElement = document.querySelector(".element-template");
//Закрытие редактирования профиля

const validationConfig = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__save-btn',
  inactiveButtonClass: 'popup-form__save-btn_disabled',
  inputErrorClass: 'popup-form__input_error',
  errorTextClass: 'popup-form__input-error_active'
};
popupClose.addEventListener("click", () => {
  closePopup(popupEditProfile);
});
//Открытие формы добавления карточки
btnFormCard.addEventListener("click", () => {
  openPopup(popupAddCard);
  disableButtonElement(btnSafeCard, validationConfig);
});
//Закртытие без добавления карточки
popupCloseCard.addEventListener("click", () => {
  closePopup(popupAddCard);
});
//Закрытие полноэкранного изображения
btnCloseImage.addEventListener("click", function () {
  closePopup(imagePopup);
});
//Редатирование профиля
const editProfile = () => {
  textName.value = profileTitle.textContent;
  textSkill.value = profileSubtitle.textContent;
  activeButtonElement(btnSafeProfile, validationConfig);
  openPopup(popupEditProfile);
}
btnEditProfile.addEventListener("click", () => {
  editProfile();
});
const handleSubmitProfileForm = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = textName.value;
  profileSubtitle.textContent = textSkill.value;
  closePopup(popupEditProfile);
}
popupForm.addEventListener("submit", handleSubmitProfileForm);

const createCard = (item) => {
  const card = new Card(item, '.element-template');
  const cardElement = card.addCard();
  return cardElement;
}
const publicationCard = (evt) => {
  evt.preventDefault();
  const card = {};
  card.name = titleInputCard.value;
  card.link = imageInputCard.value;
  addNewCard(card);
  closePopup(popupAddCard);
  formPopupCard.reset();
};
const addNewCard = (card) => {
  elements.prepend(createCard(card));
};
const addNewElements = elementsCards.map((card) => {
  return createCard(card);
});
elements.append(...addNewElements);
formPopupCard.addEventListener("submit", publicationCard);

export { openPopup };