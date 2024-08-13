// src/models/UserModel.js
export class UserModel {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static getUser() {
        const userData = JSON.parse(localStorage.getItem('authenticatedUser'));
        if (userData) {
            return new UserModel(userData.username, userData.password);
        }
        return null;
    }

    static updateUser(updatedUser) {
        localStorage.setItem('authenticatedUser', JSON.stringify(updatedUser));
    }
}
