export class Api {
    constructor({address, token}) {
      this._address = address;
      this._token = token;
    }
      _checkResponse(res) {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
      }
    getCards() {
      return fetch(`${this._address}/cards`, {
        method: 'GET',
        headers: this._token,
      }).then(this._checkResponse);
    }

    getUser() {
      return fetch(`${this._address}/users/me`, {
        method: 'GET',
        headers: this._token,
      }).then(this._checkResponse);
    }

    editProfile(item) {
      return fetch(`${this._address}/users/me`, {
        method: 'PATCH',
        headers: this._token,
        body: JSON.stringify({
          name: item.name,
          about: item.activity
        })
      })
      .then(this._checkResponse)
    }
    addNewCard(data) {
      return fetch(`${this._address}/cards`, {
        method: 'POST',
        headers: this._token,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._checkResponse)
    }
    deleteCard(id) {
      return fetch(`${this._address}/cards/${id}`, {
        method: 'DELETE',
        headers: this._token,
      })
      .then(this._checkResponse)
    }
    addLike(id) {
      return fetch(`${this._address}/cards/likes${id}`, {
        method: 'PUT',
        headers: this._token,
      })
      .then(this._checkResponse)
    }
    removelike(id) {
      return fetch(`${this._address}/cards/likes${id}`, {
        method: 'DELETE',
        headers: this._token,
      })
      .then(this._checkResponse)
    }
    changeUserAvatar(item) {
      return fetch(`${this._address}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._token,
        body: JSON.stringify({
            avatar: item.avatar
        })
      })
      .then(this._checkResponse)
    }
  }