//Открытие формы для редактирования
const btnEditProfile = document.querySelector('.profile__click-profile');

const popupClose = document.querySelector('.popup-form__close-btn');

const popupCloseCard = document.querySelector('.popup-form__close-btn_card');

const popupEditProfile = document.querySelector('.popup_edit-profile');

const btnFormCard = document.querySelector('.profile__add-element');

const popupAddCard = document.querySelector('.popup_add-card');

const textName = document.querySelector('.popup-form__input_type_name');

const textSkill =document.querySelector('.popup-form__input_type_skill');

const profileTitle = document.querySelector('.profile__title');

const profileSubtitle = document.querySelector('.profile__subtitle');

const btnSafeForm = document.querySelector('.popup-form__save-btn_profile');

const titleInputCard = document.querySelector('.popup-form__input_type_place');

const imageInputCard = document.querySelector('.popup-form__input_type_place_url');
btnEditProfile.addEventListener('click', () => {
  textName.value = profileTitle.textContent;
  textSkill.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
})
// Закрытие формы без редактирования

popupClose.addEventListener('click', () => {
  closePopup(popupEditProfile);
})

btnFormCard.addEventListener('click', () => {
  openPopup(popupAddCard);
})

popupCloseCard.addEventListener('click', () => {
  closePopup(popupAddCard);
})

btnSafeForm.addEventListener('click', function formSubmit(evt) {
    if (textName.value !== "" && textSkill.value !== "") {
        evt.preventDefault();
        profileTitle.textContent = textName.value;
        profileSubtitle.textContent = textSkill.value;
        closePopup(popupEditProfile);
    } else {
        return false;
    }
});
  //Добавление карточек из массива
  const elements = document.querySelector('.elements');

  const addCardsMassive = (card) => {
    const elementsList = document.querySelector('.element-template');
    const elementsCard = elementsList.content.querySelector('.element-item').cloneNode(true);
    const imageCard = elementsCard.querySelector('.element-item__image');
    const titleCard = elementsCard.querySelector('.element-item__title');
    const imagePopup = document.querySelector('.popup_image');
    const imageFullscreen = imagePopup.querySelector('.popup-image__fullscreen-image');
    const imageTitle = imagePopup.querySelector('.popup-image__title');
    const btnCloseImage = imagePopup.querySelector('.popup-image__close');
    const imageFullscreenClick = elementsCard.querySelector('.element-item__image');
    imageCard.src = card.link;
    imageCard.alt = card.name;
    titleCard.textContent = card.name;
    elementsCard.querySelector('.element-item__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element-item__like_active');
    })

    elementsCard.querySelector('.element-item__trash').addEventListener('click', (evt) => {
      elementsCard.remove();
    })


    imageFullscreenClick.addEventListener('click', () => {
      imageFullscreen.src = card.link;
      imageFullscreen.alt = card.name;
      imageTitle.textContent = card.name;
      openPopup(imagePopup);
    })

    btnCloseImage.addEventListener('click', function() {
      closePopup(imagePopup);
    })

    return elementsCard;
  }
  const addNewElements = elementsCards.map(function(card) {
    return addCardsMassive(card);
  })
  const addNewCard = (card) => {
    elements.prepend(addCardsMassive(card));
  }

//Вставка карточек
const addCard = (evt) => {
    evt.preventDefault();
    const card = {};
    card.name = titleInputCard.value;
    card.link = imageInputCard.value;
    addNewCard(card);
    titleInputCard.value = "";
    imageInputCard.value = "";
    closePopup(popupAddCard);
}

elements.append(...addNewElements);
popupAddCard.addEventListener('submit', addCard);

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', null);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.addEventListener('click', null);
}



