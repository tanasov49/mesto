export class FormValidator {
    constructor(config, form) {
      this._form = form;
      this._inputSelector = config.inputSelector;
      this._submitButton = config.submitButtonSelector;
      this._inactiveButton = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorTextClass = config.errorTextClass;
      this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      this._buttonElement = this._form.querySelector(this._submitButton);
    }
    _showInputError(inputElement) {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      errorElement.classList.add(this._errorTextClass);
      errorElement.textContent = inputElement.validationMessage;
      inputElement.classList.add(this._inputErrorClass);
    }
    _hideInputError(inputElement) {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      errorElement.classList.remove(this._errorTextClass);
      errorElement.textContent = '';
      inputElement.classList.remove(this._inputErrorClass);
    }
    _hasInvalidInput() {
      return this._inputList.some(function (inputElement) {
        return !inputElement.validity.valid;
      });
    }
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
      } else {
        this._hideInputError(inputElement);
      }
    }
    _setEventListeners() {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
    }
    _disableButton() {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButton);
    }
    _enableButton() {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButton);
    }
    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._disableButton();
      } else {
        this._enableButton();
      }
    }
    enableValidation() {
      this._form.addEventListener('submit', evt => {
        evt.preventDefault();
      });
      this._setEventListeners();
    }
    resetValidation() {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      })
    }
  }