/* класс PopupWithImage, который наследует от Popup */
export const initialCards = [
    {
      name: 'Галактика',
      link: 'https://cdn.pixabay.com/photo/2017/04/22/00/14/universe-2250310_960_720.jpg'
    },
    {
      name: 'Планеты фантазия',
      link: 'https://cdn.pixabay.com/photo/2018/03/04/23/09/astronomy-3199541_960_720.jpg'
    },
    {
      name: 'Пространство',
      link: 'https://cdn.pixabay.com/photo/2021/08/14/03/55/galaxy-6544509_960_720.jpg'
    },
    {
      name: 'Туманность Ориона',
      link: 'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg'
    },
    {
      name: 'Звездная пыль',
      link: 'https://cdn.pixabay.com/photo/2020/11/07/01/28/abstract-5719221_960_720.jpg'
    },
    {
      name: 'Большой взрыв',
      link: 'https://cdn.pixabay.com/photo/2011/12/15/11/37/galaxy-11188_960_720.jpg'
    }
  ];
  
  export const validationConfig = {
    cardListSelector: '.elements__list',
    popupImageSelector: '.popup_view-image',
    inputSelector: '.popup__input',
    formSelector: '.popup__container',
    buttonSubmitClass: '.popup__submit-button',
    disableButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    activeErrorClass: 'popup__input-error_active',
  };
  
  export const profileEditBtn  = document.querySelector('.profile__edit-button');
  export const profileName = document.querySelector('.profile__user-name');
  export const profileActivity = document.querySelector('.profile__user-job')
  
  export const popupPrflFrm = document.querySelector('.popup_form-user');
  export const popupPrflFrmName = popupPrflFrm.querySelector('.popup__input_type_name');
  export const popupPrflFrmActiv = popupPrflFrm.querySelector('.popup__input_type_activity');
  export const profileForm = popupPrflFrm.querySelector('.popup__container');
  
  export const btnAddNewCard = document.querySelector('.profile__add-button');
  
  export const popupCardAdd = document.querySelector('.popup_form-card');
  export const formAddCard = popupCardAdd.querySelector('.popup__container');
  
  export const popupView = document.querySelector('.popup_view-image');
  export const popupViewImage = popupView.querySelector('.popup__image');
  export const popupViewDesc = popupView.querySelector('.popup__description');
  
  export const elementList = document.querySelector('.elements__list');
  export const popups = document.querySelectorAll('.popup');
  export const popupFormAdd = document.querySelector('#popup-form-add');
  export const popupFormEdit = document.querySelector('#popup-form-edit');
  

import { Popup } from "./Popup.js";


export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupViewImage = this._popup.querySelector('.popup__image');
    this.popupViewDesc = this._popup.querySelector('.popup__description');
  }

  open(name, link) {
    this.popupViewImage.src = link;
    this.popupViewImage.alt = name;
    this.popupViewDesc.textContent = name;
    super.open();
  }
}
// Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open. В методе open класса PopupWithImage
// нужно вставлять в попап картинку с src изображения и подписью к картинке.
