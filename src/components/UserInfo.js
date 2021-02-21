export default class UserInfo {
  constructor({ name, profession, avatar }) {
    this._actualName = name;
    this._actualProfession = profession;
    this._userAvatar = avatar;
    this._name = "";
    this._profession = "";
  }

  getUserInfo() {
    //Возвращает объект, в ключи которого записывает значения текстКонтент ДОМ-узлов
    return {
      name: this._actualName.textContent,
      profession: this._actualProfession.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    //Записывает в this для последующего обновления инфы
    this._name = name;
    this._profession = about;
    this._avatar = avatar;
  }

  updateUserInfo() {
    //Записывает в ДОМ-узлы
    this._actualName.textContent = this._name;
    this._actualProfession.textContent = this._profession;
    this._userAvatar.src = this._avatar;
  }

  getUserId(id) {
    this._userId = id;
  }

  returnUserId() {
    return this._userId;
  }
}
