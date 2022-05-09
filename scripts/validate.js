const validationConfig = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__save-btn',
  inactiveButtonClass: 'popup-form__save-btn_disabled',
  inputErrorClass: 'popup-form__input_error',
  errorTextClass: 'popup-form__input-error_active'
};
class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._input = config.inputSelector;
    this._submitButton = config.submitButtonSelector;
    this._inactiveButton = config.inactiveButtonClass;
    this._inputError = config.inputErrorClass;
    this._errorText = config.errorTextClass;

    this._inputList = 
    Array.from(this._form.querySelectorAll(this._input));
    this._buttonElement = this._form.querySelector(this._submitButton);
  }
  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.toggleButtonState(this._inputList);
      });
    });
  }

  _enableButton = () => {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._inactiveButton);
  }
  _disableButton = () => {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButton);
  }
  toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton(this._buttonElement);
    } else {
      this._enableButton(this._buttonElement);
    }
  };
  _hasInvalidInput = () => {
    return this._inputList.some((inputList) => {
      return !inputList.validity.valid;
    });
  };
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorText);
  };
  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputError);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorText);
  };
  enableValidation = () => {
    this._setEventListeners();
  };
}
export { validationConfig, FormValidator };