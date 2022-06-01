export class UserInfo {
    constructor({profileTitle, profileSubtitle}) {
        this._profileName = profileTitle;
        this._profileActivity = profileSubtitle;
    }
    getUserInfo() {
        return {
            name: this._profileName.textContent,
            activity: this._profileActivity.textContent
        }
    }
    setProfileInfo({name, skill}) {
        this._profileName.textContent = name;
        this._profileActivity.textContent = skill;
    }
}