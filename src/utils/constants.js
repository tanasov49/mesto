export const elementsCards = [
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
export const validationConfig = {
    formSelector: '.popup-form',
    popupImageSelector: '.popup_image',
    inputSelector: '.popup-form__input',
    submitButtonSelector: '.popup-form__save-btn',
    inactiveButtonClass: 'popup-form__save-btn_disabled',
    inputErrorClass: 'popup-form__input_error',
    errorTextClass: 'popup-form__input-error_active'
  };
  //Кнопка профиля
export const btnEditProfile = document.querySelector(".profile__click-profile");
//Кнопка закрытия
export const popupClose = document.querySelector(".popup__close");
//Контейнер профиля
export const popupEditProfile = document.querySelector(".popup_edit-profile");
//Контейнер карточки
export const popupAddCard = document.querySelector(".popup_add-card");
export const formPopupCard = document.querySelector('.popup-form_card');
//Кнопка закрытия карточки
export const popupCloseCard = popupAddCard.querySelector(".popup__close");
//Контейнер раскрытия фото
export const imagePopup = document.querySelector(".popup_image");
//Закрытие фото
export const btnCloseImage = imagePopup.querySelector(".popup__close");
//Событие отправки
export const popupEditForm = document.querySelector(".popup-form");
//Добавление карточки
export const btnFormCard = document.querySelector(".profile__add-element");
//Переменные профиля
export const textName = document.querySelector(".popup-form__input_type_name");
export const textSkill = document.querySelector(".popup-form__input_type_skill");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
//Переменные для внесения данных в массив карточек с фото
export const titleInputCard = document.querySelector(".popup-form__input_type_place");
export const imageInputCard = document.querySelector(".popup-form__input_type_url");
export const elementsList = document.querySelector(".elements");
export const popupViewImage = document.querySelector('.popup_image');
export const popupFullImage = popupViewImage.querySelector('.popup-image__fullscreen-image');
export const popupFullImageText = popupViewImage.querySelector('.popup-image__title');