export class Card {
    constructor(name, link, alt, cardSelector, {handleCardClick}) {
      this._link = link;
      this._name = name;
      this._alt = alt;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.element-item__image');
      this._buttonLike = this._element.querySelector('.element-item__like');
    }

    _getTemplate() {
      return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element-item')
      .cloneNode(true);
    }
    renderCard() {
      this._elementImage.src = this._link;
      this._elementImage.alt = this._alt;
      this._element.querySelector('.element-item__title').textContent = this._name;
      this._setEventListeners();
      return this._element;
    }
    _setEventListeners() {
      this._element.querySelector('.element-item__trash').addEventListener('click', () => {
        this._deleteClickHandler();
      });
      this._buttonLike.addEventListener('click', this._likeClickHandler);
      this._elementImage.addEventListener('click', () => {
        this._openPopupWithImage();
      });
    }
    _deleteClickHandler = () => {
      this._element.remove();
    }
    _likeClickHandler = () => {
      this._buttonLike.classList.toggle('.element-item__like_active');
    }
    _openPopupWithImage() {
      this._handleCardClick(
        this._name,
        this._link
      )
    }
  }