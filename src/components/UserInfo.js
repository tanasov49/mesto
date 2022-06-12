export class UserInfo {
    constructor({profileTitle, profileSubtitle, popupImageProfile}) {
        this._profileName = profileTitle;
        this._profileActivity = profileSubtitle;
        this._popupImageProfile = popupImageProfile;
    }
    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileActivity.textContent
        }
    }
    setProfileInfo(item) {
        this._profileName.textContent = item.name;
        this._profileActivity.textContent = item.about;
        this._popupImageProfile.src = item.avatar;
    }
}