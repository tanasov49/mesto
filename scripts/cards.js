import { openPopup } from "./index.js";

  class Card {
    constructor(data, template) {
      this._link = data.link;
      this._name = data.name;
      this._template = template;
    }

    _getTemplate() {
      const cardElement = document.querySelector(this._template)
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
  export { Card};