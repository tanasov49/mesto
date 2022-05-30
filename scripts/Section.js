export class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    renderItems() {
        this._items.forEach((items) => {
            this._renderer = items;
        })
    }
    addItem(cardElement) {
        this._container.append(cardElement);
    }
    prependItem(cardElement) {
        this._container.prepend(cardElement);
    }
}