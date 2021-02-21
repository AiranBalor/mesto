const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  getUserInfoFromServer() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  getAllInfo() {
    return Promise.all([this.getUserInfoFromServer(), this.getInitialCards()]);
  }

  updateUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.profession,
      }),
    }).then(handleOriginalResponse);
  }

  sendNewCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then(handleOriginalResponse);
  }

  deleteCardFromServer(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  addLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  deleteLike(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  updateAvatar(userData) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.link,
      }),
    }).then(handleOriginalResponse);
  }
}
