export class Card {
  constructor(data, actualUserId, cardSelector, {handleCardClick, actionDeleteCardClick, handleLikeClick}) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._likes = data.likes ?? [];
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._actualUserId = actualUserId;
    this._handleLikeClick = handleLikeClick;
    this._actionDeleteCardClick = actionDeleteCardClick;
    this._elementImage = this._element.querySelector('.element-item__image');
    this._deleteCardButton = this._element.querySelector('.element-item__trash');
    this._placeButtonLike = this._element.querySelector('.element-item__like');
    this._likeCounter = this._element.querySelector('.element-item__like-counter');
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element-item')
      .cloneNode(true);
  };

  renderCard() {
    this._elementImage.src = this._link;
    this._elementImage.alt = this._alt;
    this._element.querySelector('.element-item__title').textContent = this._name;
    this._setEventListeners();
    this._iconCardDeleteIsDisplayed();
    this.upgradeLikes();
    return this._element;
  };

  _setEventListeners() {
   this._deleteCardButton.addEventListener('click', () => {
     this._actionDeleteCardClick(this);
   });

   this._placeButtonLike.addEventListener('click', () => {
     this._handleLikeClick(this);
   });

   this._elementImage.addEventListener('click', () => {
     this._openPopupWithImage();
   });
 };

 whenLiked() {
  return this._likes.some((like) => like._id === this._actualUserId);
};

upgradeLikes() {
  this._likeCounter.textContent = this._likes.length;
  if (this.whenLiked()) {
    this._placeButtonLike.classList.add('element-item__like_active');
  } else {
      this._placeButtonLike.classList.remove('element-item__like_active');
  }
};

discoverLikesInfo(likes) {
  this._likes = likes;
  this.upgradeLikes();
};

_openPopupWithImage() {
  this._handleCardClick(
    this._name,
    this._link
  )
};

_iconCardDeleteIsDisplayed() {
  if (this._ownerId === this._actualUserId) {
    this._deleteCardButton.classList.add('element-item__trash_visible');
  } else {
    this._deleteCardButton.classList.remove('element-item__trash_visible');
  }
};

deleteCard() {
  this._element.remove();
  this._element = null;
};

cardId() {
  return this._cardId;
};

}

