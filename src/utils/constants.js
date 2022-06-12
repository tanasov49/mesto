// export const elementsCards = [
//     {
//       name: 'Калининград',
//       link: 'https://images.unsplash.com/photo-1621707098150-3c0b7de2c3ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80g'
//     },
//     {
//       name: 'Прага',
//       link: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
//     },
//     {
//       name: 'Киев',
//       link: 'https://images.unsplash.com/photo-1561542320-9a18cd340469?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
//     },
//     {
//       name: 'Гданьск',
//       link: 'https://images.unsplash.com/photo-1574115092376-4cee6a30927a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
//     },
//     {
//       name: 'Стамбул',
//       link: 'https://images.unsplash.com/photo-1640681319367-2cb759a32a96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80'
//     },
//     {
//       name: 'Рига',
//       link: 'https://images.unsplash.com/photo-1567669721460-221b82865ee0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
//     }
//   ];
export const validationConfig = {
    formSelector: '.popup-form',
    popupImageSelector: '.popup_image',
    inputSelector: '.popup-form__input',
    submitButtonSelector: '.popup-form__save-btn',
    inactiveButtonClass: 'popup-form__save-btn_disabled',
    inputErrorClass: 'popup-form__input_error',
    errorTextClass: 'popup-form__input-error_active',
    cardListSelector: '.elements'
  };
  //Кнопка профиля
export const btnEditProfile = document.querySelector(".profile__click-profile");
//Контейнер карточки
export const formPopupCard = document.querySelector('.popup-form_card');
//Событие отправки
export const popupEditForm = document.querySelector(".popup-form");
//Добавление карточки
export const btnFormCard = document.querySelector(".profile__add-element");
//Переменные профиля
export const textName = document.querySelector(".popup-form__input_type_name");
export const textSkill = document.querySelector(".popup-form__input_type_skill");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const btnImageProfile = document.querySelector('.profile__avatar');
export const popupEditImage = document.querySelector('.popup-form_image');
export const btnDeleteCard = document.querySelector('.element-item__trash');
export const popupImageProfile = document.querySelector('.profile__image');

