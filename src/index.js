import '../pages/index.css';
import {validationConfig, elementsCards, btnEditProfile, formPopupCard, popupEditForm, btnFormCard, textName, textSkill, profileTitle, profileSubtitle} from '../components/constants.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';

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

const userProfile = new UserInfo({profileTitle, profileSubtitle});

const popupAddCards = new PopupWithForm({
  popupSelector: '.popup_add-card',
  processFormSubmission: (item) => {
    cardsList.prependItem(createCard(item));
  }
});
popupAddCards.setEventListeners();
const popupProfileForm = new PopupWithForm({
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
