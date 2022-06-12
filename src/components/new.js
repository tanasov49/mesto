//API.JS//
class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
    }
  
     // Проверяем ответ от сервера
    _handleResponse(resolve) {
      return resolve.ok? resolve.json() : Promise.reject(`ERROR: ${data.status}`);
    }
  
    // Загрузка информации о пользователе с сервера
    getUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers
      })
      .then(this._handleResponse);
    }
  
    // Загрузка карточек с сервера
    getCards() {
      return fetch(`${this.baseUrl}/cards`,{
        headers: this.headers
      })
      .then(this._handleResponse);
    }
  
      // Добавление новой карточки
      createCard(data) {
        return fetch(`${this.baseUrl}/cards`,{
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify(data),
        })
        .then(this._handleResponse);
      }
  
  
    // Лайкнуть карточку
    setLike(data) {
      return fetch(`${this.baseUrl}/cards/${data._id}/likes`,{
        method: 'PUT',
        headers: this.headers,
      })
      .then(this._handleResponse);
    }
  
    // Убрать лайк
    removeLike(data) {
      return fetch(`${this.baseUrl}/cards/${data._id}/likes`,{
        method: 'DELETE',
        headers: this.headers,
      })
      .then(this._handleResponse);
    }
  }
  //=================================================================//
  
  //SECTION.JS//
  class Section {
    constructor({ items, renderer }, containerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._container = containerSelector;
    }
  
    // Отрисовываем элементы
    rendererItems(items) {
      items.forEach(this._renderer);
    }
  
      // Принимаем DOM-элемент и добавляем его в контейнер
    setItem(element){
      this._container.prepend(element);
    }
  }
  //===================================================================//
  
  
  //CARD.JS//
  class Card {
    constructor({data, userId, handleCardClick, handleDeleteCard, handleLikeCard}, cardSelector) {
      this._data = data;
      this._link = data.link;
      this._name = data.name;
      this._likes = data.likes;
      this._cardId = data._id;
      this._ownerId = data.owner._id;
      this._userId = userId;
      
      this._handleCardClick = handleCardClick;
      this._handleDeleteCard = handleDeleteCard;
      this._handleLikeCard = handleLikeCard;
      
      this._cardSelector = cardSelector;
    }
  
    _getTemplate() {
      return document.querySelector(this._cardSelector)
        .content
        .querySelector('.element-item')
        .cloneNode(true);
    }
  
    _hideButtonRemove() {
      if (this._userId !== this._ownerId) {
        this._buttonRemove.classList.add('element-item__remove-hidden');
      }
    }
  
    removeCard() {
      this._element.remove();
      this._element = null;
    }
  
    
  // ВОТ ЗДЕСЬ ВСЕ МЕТОДЫ ЛАЙКОВ//
    isLiked = () => this._likes.some((owner) => owner._id === this._userId); //Проверка, стоит ли свой лайк (true or false)
  
    setActiveClass = () => {
      this._buttonLike.classList.add('element-item__like_active');
    }
  
    removeActiveClass = () => {
      this._buttonLike.classList.remove('element-item__like_active');
    }
  
    checkOwnLike() { //проверяем массивы лайков, если есть лайкнутый элемент, то устанавливаем класс активной кнопки
      this.isLiked() ? this.setActiveClass() : this.removeActiveClass();
    }
  
    setLikes(newData) { //Обновляем состояние лайков, передаем resolve от сервера, проверяем свои лайки и обновляем счетчик.
     this._likes = newData;
     this.checkOwnLike(newData);
     this._counter.textContent = newData.likes.length;
    }
  
  
    _setEventListeners() {
      this._buttonLike.addEventListener('click', () => {
        this._handleLikeCard();
      });
      this._buttonRemove.addEventListener('click', () => {
       this._handleDeleteCard();
      });
      this._cardPicture.addEventListener('click', () => {
        this._handleCardClick(this._link, this._name);
      });
    }
  
    generateCard() {
      this._element = this._getTemplate();
  
      this._cardPicture = this._element.querySelector('.element-item__image');
      this._cardTitle = this._element.querySelector('.element-item__title');
      this._buttonLike = this._element.querySelector('.element-item__like');
      this._counter = this._element.querySelector('.element-item__counter');
      this._buttonRemove = this._element.querySelector('.element-item__remove');
  
      this._cardPicture.src = this._link;
      this._cardPicture.alt = this._name;
      this._cardTitle.textContent = this._name;
  
      this._hideButtonRemove();
  
      this.setLikes(this._data);
  
      this._setEventListeners();
      return this._element;
    }
  }
  //===================================================================//
  
  //INDEX.JS//
  let userId = null;
  let deletedCard = null;
  
  //Создаем экземпляр Api
  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
    headers: {
      authorization: '7b11d0b8-523b-4f37-90de-4f1e8f1ef0ac',
      'Content-Type': 'application/json'
  }
  });
  
  Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, initialCards]) => {
      userId = userData._id;
      addUserInfo.setUserInfo(userData);
      addUserInfo.setUserAvatar(userData);
      initialCards.reverse();
      cards.rendererItems(initialCards);
    })
    .catch((error) => {
      console.log(error);
    })
  
  const addUserInfo = new UserInfo(userData);
  
  const cards = new Section({ // Создаем карточки из массива
    items: [],
    renderer: (items) => {
      const card = addCard (items);
      cards.setItem(card);
    }
  }, container);
  
  const addCard = (data) => { //создаем карточку
    const card = new Card ({
      data, userId,
      handleCardClick: () => {
        fullCard.open(data.name, data.link);
      },
      handleDeleteCard: () => {
        deletedCard = card;
        deleteCardPopup.open(deletedCard);
      },
  
      handleLikeCard: () => { //================ОБРАБОТКА ЛАЙКОВ===========================//
        if (card.isLiked()) {
          api.removeLike(data)
          .then((newData) => {
            card.removeActiveClass();
            card.setLikes(newData.likes);
          })
          .catch((error) => {
            console.log(`ERROR: ${error}`);
          })
        } else {
          api.setLike(data)
          .then((newData) => {
            card.setActiveClass();
            card.setLikes(newData.likes);
          })
          .catch((error) => {
            console.log(`ERROR: ${error}`);
          })
        }
      },
    }, idConfig.elementTemplate);
    console.log(card._isLiked);
    return card.generateCard();
  }
  
  const addCardPopup = new PopupWithForm({
    handleFormSubmit: (data) => {
      addCardPopup.toogleButtonText(true);
      api.createCard(data)
      .then((resolve) => {
        const newCard = addCard(resolve);
        cards.setItem(newCard);
        addCardPopup.toogleButtonText(false);
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      })
      .finally(() => {
        addCardPopup.toogleButtonText(false)
        addCardPopup.close();
      })
    }
  }, popupAddPlace);
  
  const editProfilePopup = new PopupWithForm({
    handleFormSubmit: (userData) => {
      editProfilePopup.toogleButtonText(true);
      api.editUserInfo(userData)
        .then((resolve) => {
          addUserInfo.setUserInfo(resolve);
        })
        .catch((error) => {
          console.log(`ERROR: ${error}`);
        })
        .finally(() => {
          editProfilePopup.close();
          editProfilePopup.toogleButtonText(false);
        })
    }
  }, popupEditProfile);
  
  const deleteCardPopup = new PopupWithSubmit({
    handleFormSubmit: (data) => {
      api.deleteCard(data)
      .then(() => {
        deletedCard.removeCard();
      })
      .then(() => {
        deletedCard = null;
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      })
      .finally(() => {
        deleteCardPopup.close();
      })
    }
  }, popupDeleteImage);
  
  const changeAvatarPopup = new PopupWithForm({
    handleFormSubmit: (data) => {
      changeAvatarPopup.toogleButtonText(true);
      api.editUserAvatar(data)
      .then((data) => {
        addUserInfo.setUserAvatar(data);
        changeAvatarPopup.toogleButtonText(false);
      })
      .catch((error => {
        console.log(`ERROR: ${error}`);
      }))
      .finally(() => {
        changeAvatarPopup.toogleButtonText(false);
        changeAvatarPopup.close();
      })
    }
  }, popupChangeAvatar);
  
  
  
  const fullCard = new PopupWithImage(imagePopup);
  
  const editProfileValidation = new FormValidator(validationConfig, editProfileForm);
  const addCardValidation = new FormValidator(validationConfig, placeFormAdd);
  const changeAvatarValidation = new FormValidator(validationConfig, avatarChangeForm);
  
  
  function editProfile() {
    const addedUserData = addUserInfo.getUserInfo();
    nameInput.value = addedUserData.name;
    professionInput.value = addedUserData.about;
    editProfileValidation.toggleButtonState();
    editProfilePopup.open();
  }
  
  editProfileValidation.enableValidation();
  addCardValidation.enableValidation();
  changeAvatarValidation.enableValidation();
  
  
  fullCard.setEventListeners();
  editProfilePopup.setEventListeners();
  addCardPopup.setEventListeners();
  deleteCardPopup.setEventListeners();
  changeAvatarPopup.setEventListeners();
  
  buttonEditProfile.addEventListener('click', () => {
    editProfile();
  });
  buttonAddPlace.addEventListener('click', () => {
    addCardValidation.toggleButtonState();
    addCardPopup.open();
  });
  buttonChangeAvatar.addEventListener('click', () => {
    changeAvatarValidation.toggleButtonState();
    changeAvatarPopup.open();
  });
  
  