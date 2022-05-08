import { openPopup } from "./index.js";
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
  class Card {
    constructor(data, template) {
      this._link = data.link;
      this._name = data.name;
      this._template = template;
    }

    _getTemplate() {
      const cardElement = document.querySelector('.element-template')
      .content
      .querySelector('.element-item')
      .cloneNode(true);
      return cardElement;
    }
    addCard() {
      this._element = this._getTemplate();
      this._buttonLike = this._element.querySelector('.element-item__like');
      this._buttonDelete = this._element.querySelector('.element-item__trash');
      this._imageCard = this._element.querySelector('.element-item__image');
      this._titleCard = this._element.querySelector('.element-item__title');

      this._imageCard.src = this._link;
      this._imageCard.alt = this._name;
      this._titleCard.textContent = this._name;

      this._setEventListeners();
      return this._element;
    }
    _setEventListeners() {
      this._buttonLike.addEventListener('click', () => {
        this._handleLikeClick();
      });
      this._buttonDelete.addEventListener('click', () => {
        this._element.remove();
      });
      this._imageCard.addEventListener('click', () => {
        this._handleOpenPopup();
      });
    }
    _handleLikeClick() {
      this._buttonLike.classList.toggle('element-item__like_active');
    }
    _handleOpenPopup() {
      const imagePopup = document.querySelector('.popup_image');
      const imageFullscreen = imagePopup.querySelector('.popup-image__fullscreen-image');
      const imageTitle = imagePopup.querySelector('.popup-image__title');
      imageFullscreen.src = this._link;
      imageFullscreen.alt = this._name;
      imageTitle.textContent = this._name;
      openPopup(imagePopup);
    }
  }
  export { elementsCards, Card};