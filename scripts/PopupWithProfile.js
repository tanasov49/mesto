import { Popup } from "./Popup.js";
export class PopupWithProfile extends Popup {
    constructor({popupSelector, processFormSubmission}) {
        super(popupSelector);
        this._processFormSubmission = processFormSubmission;
        this._popupForm = this._popup.querySelector('.popup-form');
        this._inputList = this._popupForm.querySelectorAll('.popup-form__input');
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
            this.close();
        })
    }
    close() {
        super.close();
        this._popupForm.reset();
    }
}