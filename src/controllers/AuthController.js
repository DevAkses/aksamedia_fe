import { AuthModel } from "../models/AuthModel";

export const AuthController = {
    login(username, password) {
        return AuthModel.login(username, password);
    },

    logout() {
        AuthModel.logout();
    },

    getAuthenticatedUser() {
        return AuthModel.getAuthenticatedUser();
    },

    isAuthenticated() {
        return AuthModel.isAuthenticated();
    },
};
