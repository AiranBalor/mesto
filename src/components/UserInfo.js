export default class UserInfo {
  constructor({name, profession}) {
    this._actualName = name;
    this._actualProfession = profession;
    this._name = "";
    this._profession = ""
  }

  getUserInfo() {
    return { 
      name: this._actualName.textContent,
      profession: this._actualProfession.textContent
    }
  }

  setUserInfo({newName, newProfession}) {
    this._name = newName;
    this._profession = newProfession;
  }

  updateUserInfo() {
    this._actualName.textContent = this._name;
    this._actualProfession.textContent = this._profession;
  }
}