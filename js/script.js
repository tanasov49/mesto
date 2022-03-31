//Открытие формы для редактирования
let popupOpen = document.querySelector('.profile__click-profile');

let popupClose = document.querySelector('.popup-form__close-btn');

let popup = document.querySelector('.popup');

popupOpen.addEventListener('click', function() {
    popup.classList.add('popup_opened');
})


// Редактирование формы
let popupForm = document.querySelector('.popup-form');

let textName = document.querySelector('.popup-form__input_type_name');

let textSkill =document.querySelector('.popup-form__input_type_skill');

let profileTitle = document.querySelector('.profile__title');

let profileSubtitle = document.querySelector('.profile__subtitle');

let saveForm = document.querySelector('.popup-form__save-btn');

textName.value = profileTitle.textContent;
textSkill.value = profileSubtitle.textContent;


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


//Массив карточек с ссылками и названиями
const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;



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

  elementsCards.forEach(function (element) {
    const elementCard = elementTemplate.cloneNode(true);

    elementCard.querySelector('.element-item__title').textContent = element.name;
    elementCard.querySelector('.element-item__image').alt = element.name;
    elementCard.querySelector('.element-item__image').src = element.link
    
    elementsList.append(elementCard);
})

//Открытие и закрытие формы добавления карточек
let popupCardOpen = document.querySelector('.profile__add-element');

let popupCardClose = document.querySelector('.popup-form-card__close-btn');

let popupCard = document.querySelector('.popup-card');

let saveCard = document.querySelector('.popup-form-card__save-btn');

popupCardOpen.addEventListener('click', function() {
    popupCard.classList.add('popup-card_opened');
})


// Добаывление карточек
let popupFormCard = document.querySelector('.popup-form-card');

let titleImage = document.querySelector('.popup-form-card__input_type_name');

let imageSrc =document.querySelector('.popup-form-card__input_type_image');

let addCardForm = document.querySelector('.popup-form-card__save-btn');


function safeCard (evt) {
  evt.preventDefault();

  const newCard = elementTemplate.cloneNode(true);
  newCard.querySelector('.element-item__title').textContent = titleImage.value;
  newCard.querySelector('.element-item__image').src = imageSrc.value;
  newCard.querySelector('.element-item__image').alt = imageSrc.value;
  elementsList.prepend(newCard);
  popupCardClose.addEventListener('click', function() {
    popupCard.classList.remove('popup-card_opened');
});

}

 








