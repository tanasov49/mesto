import { validationConfig, elementsCards, btnEditProfile, popupClose, popupEditProfile, popupAddCard, formPopupCard, popupCloseCard, imagePopup, btnCloseImage, popupEditForm, btnFormCard, textName, textSkill, profileTitle, profileSubtitle, titleInputCard, imageInputCard, elementsList, popupFullImage, popupFullImageText } from '../src/utils/constants.js';
import { Card } from '../scripts/Card.js';
import { Section } from '../scripts/Section.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithProfile } from '../scripts/PopupWithProfile.js';
import { ProfileInfo } from '../scripts/ProfileInfo.js';
import { FormValidator } from '../scripts/FormValidator.js';

const openImagePopup = new PopupWithImage(validationConfig.popupImageSelector);
openImagePopup.setEventListeners();

const createCard = (item) => {
  const card = new Card(item.name, item.link, item.alt, '.element-template',
  {
    handleCardClick: () => {
      openImagePopup.open(item.name, item.link);
    }
  });
  return card.renderCard();
}
const cardsList = new Section({
  items: elementsCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  },
},
validationConfig.cardListSelector);
cardsList.renderItems();

const userProfile = new ProfileInfo({profileTitle, profileSubtitle});

const popupAddCards = new PopupWithProfile({
  popupSelector: '.popup_add-card',
  processFormSubmission: (item) => {
    console.log(item);
    cardsList.prependItem(createCard(item));
  }
});
popupAddCards.setEventListeners();
const popupProfileForm = new PopupWithProfile({
  popupSelector: '.popup_edit-profile',
  processFormSubmission: (item) => {
    userProfile.setProfileInfo(item);
    popupProfileForm.close();
  }
});
popupProfileForm.setEventListeners();

const addCardValidation = new FormValidator(validationConfig, popupEditForm);
const profileFormValidation = new FormValidator(validationConfig, formPopupCard);
addCardValidation.enableValidation();
profileFormValidation.enableValidation();

btnEditProfile.addEventListener('click', () => {
  const profile = userProfile.getUserInfo();
  textName.value = profile.name;
  textSkill.value = profile.activity;
  profileFormValidation.resetValidation();
  popupProfileForm.open();
});
btnFormCard.addEventListener('click', () => {
  addCardValidation.resetValidation();
  popupAddCards.open();
})
// //Блок карточек

// //Закрытие по клавише ESC
// const closeKeyEsc = (evt) => {
//   if (evt.key === 'Escape') {
//     const popupOpened = document.querySelector('.popup_opened');
//     closePopup(popupOpened);
//   }
// }
// // const openPopup = (popup) => {
//   popup.classList.add("popup_opened");
//   document.addEventListener('keyup', closeKeyEsc);
// }
// //Закрытие popup
// const closePopup = (popup) => {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener('keyup', closeKeyEsc);
// }
// // Массив элементов Popup для закрытия в пустой области
// const popupList = Array.from(document.querySelectorAll('.popup'));
// popupList.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
//       closePopup(popup);
//     };
//   });
// });
// //Закрытие редактирования профиля
// popupClose.addEventListener("click", () => {
//   closePopup(popupEditProfile);
// });
// //Закртытие без добавления карточки
// popupCloseCard.addEventListener("click", () => {
//   closePopup(popupAddCard);
// });
// //Закрытие полноэкранного изображения
// btnCloseImage.addEventListener("click", function () {
//   closePopup(imagePopup);
// });
// //Редатирование профиля
// const createCard = (item) => {
//   const card = new Card(item, '.element-template');
//   const cardElement = card.addCard();
//   return cardElement;
// }
// const publicationCard = (evt) => {
//   evt.preventDefault();
//   const card = {
//     name: titleInputCard.value,
//     link: imageInputCard.value
//   };
//   addNewCard(card);
//   closePopup(popupAddCard);
//   formPopupCard.reset();
// };
// const addNewCard = (card) => {
//   elementsList.prepend(createCard(card));
// };
// const addNewElements = elementsCards.map((card) => {
//   return createCard(card);
// });
// elementsList.append(...addNewElements);


// const editProfileValidation = new FormValidator(validationConfig, popupEditForm);
// const addCardValidation = new FormValidator(validationConfig, formPopupCard);

// const handleSubmitProfileForm = (evt) => {
//   evt.preventDefault();
  // profileTitle.textContent = textName.value;
  // profileSubtitle.textContent = textSkill.value;
//   closePopup(popupEditProfile);
// }
// btnEditProfile.addEventListener("click", () => {
  // textName.value = profileTitle.textContent;
  // textSkill.value = profileSubtitle.textContent;
//   editProfileValidation.toggleButtonState();
//   openPopup(popupEditProfile);
// });
// popupEditForm.addEventListener("submit", handleSubmitProfileForm);
// btnFormCard.addEventListener("click", () => {
//   addCardValidation.toggleButtonState();
//   openPopup(popupAddCard);
// });
// formPopupCard.addEventListener('submit', publicationCard);
// editProfileValidation.enableValidation();
// addCardValidation.enableValidation();
// export { openPopup };