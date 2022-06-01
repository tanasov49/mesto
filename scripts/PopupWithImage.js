import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.popupFullImage = this._popup.querySelector('.popup-image__fullscreen-image');
        this.popupFullImageText = this._popup.querySelector('.popup-image__title');
    }
    open(place, image) {
        this.popupFullImage.src = image;
        this.popupFullImage.alt = place;
        this.popupFullImageText.textContent = place;
        super.open();
    }
}