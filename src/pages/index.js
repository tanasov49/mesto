import './index.css';
import {validationConfig, btnEditProfile, formPopupCard, popupEditForm, btnFormCard, textName, textSkill, profileTitle, profileSubtitle, btnImageProfile, popupEditImage} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api.js'

const openImagePopup = new PopupWithImage(validationConfig.popupImageSelector);
openImagePopup.setEventListeners();

// const createCard = (item) => {
//   const card = new Card(item.name, item.link, item.alt, '.element-template',
//   {
//     handleCardClick: () => {
//       openImagePopup.open(item.name, item.link);
//     }
//   });
//   return card.renderCard();
// }

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-42',
  token: {
    authorization: 'e366e191-bdb8-47b8-a6a4-efb11ee70619',
    'Content-Type': 'application/json',
  }
});
let actualUserId;
Promise.all([
  api.getCards(),
  api.getUser()
]).then(([cards, profile]) => {
  actualUserId = profile._id;
  cardsList.renderItems(cards);
  userProfile.setUserInfo(profile);
}).catch(err => {
  console.log(`Error: ${err}`);
})
const createCard = (item) => {
  const card = new Card(
    item,
    actualUserId,
    '.element-template',
    {
      handleCardClick: () => {
        openImagePopup.open(item.name, item.link);
      },
  actionDeleteCardClick: (card) => {
    popupDeleteCard.open(); 
    popupDeleteCard.setSubmitCallback(() => {
      api.deleteCard(card.cardId())
        .then(() => {
          card.deleteCard();
          popupDeleteCard.close();
        })
        .catch(err => {
          console.log(`Ошибка при удалении карточки: ${err}`)
        })
    });
  },
    handleLikeClick: (card) => {
      if (card.whenLiked()) {
        api.removeLike(card.cardId())
        .then((data) => {
          card.discoverLikesInfo(data.likes);
        })
        .catch(err => {
          console.log(`Ошибка при удалении лайка: ${err}`)
        });
      } else {
        api.addLike(card.cardId())
          .then((data) => {
            card.discoverLikesInfo(data.likes);
        })
        .catch(err => {
          console.log(`Ошибка лайка: ${err}`)
        });
      }
    }
    });
    return card.renderCard();
  };

const cardsList = new Section({
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  },
}, validationConfig.cardListSelector);
const userProfile = new UserInfo({profileTitle, profileSubtitle});
const popupAddCards = new PopupWithForm({
  popupSelector: '.popup_add-card',
  processFormSubmission: (item) => {
    popupAddCards.loading(true);
    api.addNewCard(item)
      .then(result => {
        cardsList.prependItem(createCard(result));
        popupAddCards.close();
      })
      .catch(err => {
        console.log(`Ошибка добавления: ${err}`);
      })
      .finally(() => {
        popupAddCards.loading(false);
      })
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

const addCardValidation = new FormValidator(validationConfig, formPopupCard);
const profileFormValidation = new FormValidator(validationConfig, popupEditForm);
const imageFormValidation = new FormValidator(validationConfig, popupEditImage);
addCardValidation.enableValidation();
profileFormValidation.enableValidation();
imageFormValidation.enableValidation();

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
const popupProfileImage = new PopupWithForm({
  popupSelector: '.popup_update-profile-image',
  processFormSubmission: (item) => {
    popupProfileImage.loading(true, 'Сохранить');
    api.changeUserAvatar(item)
      .then(result => {
        userProfile.setUserInfo(result);
        popupProfileImage.close();
      })
      .catch(err => {
        console.log(`Ошибка в ходе изменения аватара пользователя: ${err}`);
      })
      .finally(() => {
        popupProfileImage.loading(false);
      })
  }
})
popupProfileImage.setEventListeners();
btnImageProfile.addEventListener('click', () => {
  popupProfileImage.open();
  imageFormValidation.resetValidation();
})