//Открытие формы для редактирования
let popupOpen = document.querySelector('.profile__click-profile');

let popupClose = document.querySelector('.popup-form__close-btn');

let popup = document.querySelector('.popup');

// Редактирование формы
let popupForm = document.querySelector('.popup-form');

let textName = document.querySelector('.popup-form__input_type_name');

let textSkill =document.querySelector('.popup-form__input_type_skill');

let profileTitle = document.querySelector('.profile__title');

let profileSubtitle = document.querySelector('.profile__subtitle');

let saveForm = document.querySelector('.popup-form__save-btn');


popupOpen.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  textName.value = profileTitle.textContent;
  textSkill.value = profileSubtitle.textContent;
})


saveForm.addEventListener('click', function formSubmit(evt) {
    if (textName.value !== "" && textSkill.value !== "") {
        evt.preventDefault();
        profileTitle.textContent = textName.value;
        profileSubtitle.textContent = textSkill.value;
        popup.classList.remove('popup_opened'); 
    } else {
        return false;
    }
});


// Закрытие формы без редактирования
popupClose.addEventListener('click', function() {
    textName.value = profileTitle.textContent;
    textSkill.value = profileSubtitle.textContent;
    popup.classList.remove('popup_opened');
});


const elementsCards = [
    {
      name: 'Калининград',
      link: 'https://images.unsplash.com/photo-1621707098150-3c0b7de2c3ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80g'
    },
    {
      name: 'Прага',
      link: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'Киев',
      link: 'https://images.unsplash.com/photo-1561542320-9a18cd340469?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'Гданьск',
      link: 'https://images.unsplash.com/photo-1574115092376-4cee6a30927a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    },
    {
      name: 'Стамбул',
      link: 'https://images.unsplash.com/photo-1640681319367-2cb759a32a96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80'
    },
    {
      name: 'Рига',
      link: 'https://images.unsplash.com/photo-1567669721460-221b82865ee0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    }
  ];
//Добавление карточек из массива
  const elements = document.querySelector('.elements');
  const elementsList = document.querySelector('.element-template');

  const cardMassive = (card) => {
    const elementsCard = elementsList.content.querySelector('.element-item').cloneNode(true);
    elementsCard.querySelector('.element-item__image').src = card.link;
    elementsCard.querySelector('.element-item__image').alt = card.name;
    elementsCard.querySelector('.element-item__title').textContent = card.name;
    return elementsCard;
  }
  const newElements = elementsCards.map(function(card) {
    return cardMassive(card);
  })
  const newCard = (card) => {
    elements.prepend(cardMassive(card));
  }
//Кнопки формы добавления карточки
const popupCard = document.querySelector('.popup-card');
const openCardBtn = document.querySelector('.profile__add-element');
const closeCardBtn = document.querySelector('.popup-form-card__close-btn');
const safeCardBtn = document.querySelector('.popup-form-card__save-btn');

function openCard() {
  popupCard.classList.add('popup-card_opened');
}

function closeCard() {
  popupCard.classList.remove('popup-card_opened');
}
function safeCard() {
  popup.classList.remove('popup-card_opened');
}

openCardBtn.addEventListener('click', openCard);
closeCardBtn.addEventListener('click', closeCard);
safeCardBtn.addEventListener('click', safeCard);

//Вставка карточек
const titleInputCard = document.querySelector('.popup-form-card__input_type_name');
const imageInputCard = document.querySelector('.popup-form-card__input_type_image');
const addCard = (evt) => {
  if (titleInputCard.value !== "" && imageInputCard.value !== "") {
    evt.preventDefault();
    const card = {};
    card.name = titleInputCard.value;
    card.link = imageInputCard.value;
    newCard(card);
    titleInputCard.value = "";
    imageInputCard.value = "";
    closeCard();
  } else {
    return false;
  }

}
elements.append(...newElements);
popupCard.addEventListener('submit', addCard );
