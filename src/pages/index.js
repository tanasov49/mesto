import './index.css';
import {validationConfig, btnEditProfile, formPopupCard, popupEditForm, btnFormCard, textName, textSkill, btnImageProfile, popupEditImage, userData} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api.js'
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
// Валидация форм
const addCardValidation = new FormValidator(validationConfig, formPopupCard);
const profileFormValidation = new FormValidator(validationConfig, popupEditForm);
const imageFormValidation = new FormValidator(validationConfig, popupEditImage);
const openImagePopup = new PopupWithImage(validationConfig.popupImageSelector);
addCardValidation.enableValidation();
profileFormValidation.enableValidation();
imageFormValidation.enableValidation();
openImagePopup.setEventListeners();

// Импорт данных с Api
const api = new Api({
  urlJson: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'e366e191-bdb8-47b8-a6a4-efb11ee70619',
    'Content-Type': 'application/json',
  }
});
let actualUserId;
Promise.all([
  api.getCards(),
  api.getUser()
]).then(([cards, userData]) => {
  actualUserId = userData._id;
  cardsList.renderItems(cards);
  userProfile.setProfileInfo(userData);
}).catch(err => {
  console.log(`Error: ${err}`);
})
const userProfile = new UserInfo(userData);
//Импорт карточек из Json
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

const popupDeleteCard = new PopupWithConfirm('.popup_safe-confirm'); /*  */
popupDeleteCard.setEventListeners();
//Добавление карточек
const popupAddCards = new PopupWithForm({
  popupSelector: '.popup_add-card',
  processFormSubmission: (item) => {
    popupAddCards.loading(true, 'Сохранение...');
    api.addNewCard(item)
      .then(result => {
        cardsList.prependItem(createCard(result));
        popupAddCards.close();
      })
      .catch(err => {
        console.log(`Ошибка добавления: ${err}`);
      })
      .finally(() => {
        popupAddCards.loading(false, 'Создать');
      })
  }
});
popupAddCards.setEventListeners();
btnFormCard.addEventListener('click', () => {
  addCardValidation.resetValidation();
  popupAddCards.open();
})
// Редактирование профиля
const popupProfileForm = new PopupWithForm({
  popupSelector: '.popup_edit-profile',
  processFormSubmission: (userData) => {
    popupProfileForm.loading(true, 'Сохранение...');
    api.editProfile(userData)
    .then((resolve) => {
      userProfile.setProfileInfo(resolve);
      popupProfileForm.close();
    })
    .catch(err => {
      console.log(`Ошибка в профиле пользователя: ${err}`);
    })
    .finally(() => {
      popupProfileForm.loading(false, 'Сохранить');
    })
  }
});
popupProfileForm.setEventListeners();

btnEditProfile.addEventListener('click', () => {
  const profile = userProfile.getUserInfo();
  textName.value = profile.name;
  textSkill.value = profile.about;
  profileFormValidation.resetValidation();
  popupProfileForm.open();
});
// Изменение картинки
const popupProfileImage = new PopupWithForm({
  popupSelector: '.popup_update-profile-image',
  processFormSubmission: (data) => {
    popupProfileImage.loading(true, 'Сохранение...');
    api.changeUserAvatar(data)
      .then(data => {
        userProfile.setProfileInfo(data);
        popupProfileImage.close();
      })
      .catch(err => {
        console.log(`Ошибка в ходе изменения аватара пользователя: ${err}`);
      })
      .finally(() => {
        popupProfileImage.loading(false, 'Сохранить');
      })
  }
})
popupProfileImage.setEventListeners();
btnImageProfile.addEventListener('click', () => {
  popupProfileImage.open();
  imageFormValidation.resetValidation();
})