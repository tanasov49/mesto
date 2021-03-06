import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor({popupSelector, processFormSubmission}) {
        super(popupSelector);
        this._processFormSubmission = processFormSubmission;
        this._popupForm = this._popup.querySelector('.popup-form');
        this._inputList = this._popupForm.querySelectorAll('.popup-form__input');
        this._popupButtonSafe = document.querySelector('.popup-form__save-btn')
    }
    _getInputValues() {
        this._formFieldValues = {};
        this._inputList.forEach(input => {
            this._formFieldValues[input.name] = input.value;
        });
        return this._formFieldValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._processFormSubmission(this._getInputValues());
        });
    }
    close() {
        super.close();
        this._popupForm.reset();
    }
    loading(loading, text) {
        if (loading) {
          this._popupButtonSafe.textContent = "Сохранение..."
        } else {
          this._popupButtonSafe.textContent = text;
        }
      }
}