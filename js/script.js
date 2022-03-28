let popupOpen = document.querySelector('.profile__click-profile');

let popupClose = document.querySelector('.popup-form__close-btn');

let popup = document.querySelector('.popup');

popupOpen.addEventListener('click', function() {
    popup.classList.add('popup_opened');
})



let popupForm = document.querySelector('.popup-form');

let textName = document.querySelector('.popup-form__input_type_name');

let textSkill =document.querySelector('.popup-form__input_type_skill');

let profileTitle = document.querySelector('.profile__title');

let profileSubtitle = document.querySelector('.profile__subtitle');

let saveForm = document.querySelector('.popup-form__save-btn');

textName.value = profileTitle.textContent;
textSkill.value = profileSubtitle.textContent;

function formSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = textName.value;
    profileSubtitle.textContent = textSkill.value; 
}
popupClose.addEventListener('click', function() {
    textName.value = profileTitle.textContent;
    textSkill.value = profileSubtitle.textContent;
    popup.classList.remove('popup_opened');
})

popupForm.addEventListener('submit', formSubmit); 
saveForm.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
})




