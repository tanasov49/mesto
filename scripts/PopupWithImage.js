import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.popupFullImage = this._popup.querySelector('.popup-image__fullscreen-image');
        this.popupFullImageText = this._popup.querySelector('.popup-image__title');
    }
    open(name, link) {
        this.popupFullImage.src = link;
        this.popupFullImageText.alt = name;
        this.popupFullImageText.textContent = name;
        super.open();
    }
}