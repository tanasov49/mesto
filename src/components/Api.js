export class Api {
    constructor(options) {
      this.address = options.urlJson;
      this.headers = options.headers;
    }
    _checkResponse(res) {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
      }
    getCards() {
      return fetch(`${this.address}/cards`, {
        method: 'GET',
        headers: this.headers,
      }).then(this._checkResponse);
    }

    getUser() {
      return fetch(`${this.address}/users/me`, {
        method: 'GET',
        headers: this.headers,
      }).then(this._checkResponse);
    }

    editProfile(data) {
      return fetch(`${this.address}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(this._checkResponse)
    }
    addNewCard(data) {
      return fetch(`${this.address}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._checkResponse)
    }
    deleteCard(id) {
      return fetch(`${this.address}/cards/${id}`, {
        method: 'DELETE',
        headers: this.headers,
      })
      .then(this._checkResponse)
    }
  addLike(id) {
    return fetch(`${this.address}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers,
    })
    .then(this._checkResponse)
  }
  removeLike(id) {
    return fetch(`${this.address}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this._checkResponse)
  }
    changeUserAvatar(data) {
      return fetch(`${this.address}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
            avatar: data.avatar
        })
      })
      .then(this._checkResponse)
    }
  }