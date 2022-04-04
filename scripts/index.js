//Открытие popup для редактирования
const btnEditProfile = document.querySelector('.profile__click-profile');

const popupClose = document.querySelector('.popup__close');

const popupEditProfile = document.querySelector('.popup_edit-profile');

const popupAddCard = document.querySelector('.popup_add-card');

const popupCloseCard = popupAddCard.querySelector('.popup__close');

const imagePopup = document.querySelector('.popup_image');

const btnCloseImage = imagePopup.querySelector('.popup__close');

const popupForm = document.querySelector('.popup__container');

const btnFormCard = document.querySelector('.profile__add-element');

const textName = document.querySelector('.popup-form__input_type_name');

const textSkill =document.querySelector('.popup-form__input_type_skill');

const profileTitle = document.querySelector('.profile__title');

const profileSubtitle = document.querySelector('.profile__subtitle');

const btnSafeForm = document.querySelector('.popup-form__save-btn_profile');

const titleInputCard = document.querySelector('.popup-form__input_type_place');

const imageInputCard = document.querySelector('.popup-form__input_type_url');

const elements = document.querySelector('.elements');

const elementsList = document.querySelector('.element-template');



//Добавление карточек из массива



btnEditProfile.addEventListener('click', () => {
  textName.value = profileTitle.textContent;
  textSkill.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
})


popupClose.addEventListener('click', () => {
  closePopup(popupEditProfile);
})

btnFormCard.addEventListener('click', () => {
  openPopup(popupAddCard);
})

popupCloseCard.addEventListener('click', () => {
  closePopup(popupAddCard);
})

btnCloseImage.addEventListener('click', function() {
  closePopup(imagePopup);
})

function formEditProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = textName.value;
  profileSubtitle.textContent = textSkill.value;
  closePopup(popupEditProfile);
}



popupForm.addEventListener('submit', formEditProfile);

const createCard = (card) => {
  const elementsCard = elementsList.content.querySelector('.element-item').cloneNode(true);
  const imageCard = elementsCard.querySelector('.element-item__image');
  const titleCard = elementsCard.querySelector('.element-item__title');
  const imageFullscreen = imagePopup.querySelector('.popup-image__fullscreen-image');
  const imageTitle = imagePopup.querySelector('.popup-image__title');
  const imageFullscreenClick = elementsCard.querySelector('.element-item__image');
  //Кнопки лайка
  const likeActive = elementsCard.querySelector('.element-item__like');
  const likeDisable = elementsCard.querySelector('.element-item__trash');
  imageCard.src = card.link;
  imageCard.alt = card.name;
  titleCard.textContent = card.name;

  //включение и выключение лайка
  likeActive.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element-item__like_active');
  })
  likeDisable.addEventListener('click', (evt) => {
    elementsCard.remove();
  })
  //Внесение данных из массива
  imageFullscreenClick.addEventListener('click', () => {
     imageFullscreen.src = card.link;
     imageFullscreen.alt = card.name;
     imageTitle.textContent = card.name;
     openPopup(imagePopup);
  })
  //Закрытие полноэкранного изображения


  return elementsCard;
}

const addNewCard = (card) => {
  elements.prepend(createCard (card));
}

//Вставка карточек
const addCard = (evt) => {
    evt.preventDefault();
    const card = {};
    card.name = titleInputCard.value;
    card.link = imageInputCard.value;
    addNewCard(card);
    closePopup(popupAddCard);
    titleInputCard.value = "";
    imageInputCard.value = "";
}

const addNewElements = elementsCards.map(card => {
  return createCard(card);
});

elements.append(...addNewElements);
popupAddCard.addEventListener('submit', addCard);

//Открытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
//Закрытие popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}



