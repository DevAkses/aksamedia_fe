// src/controllers/UserController.js
import { UserModel } from "../models/UserModel";

export class UserController {
    static getAuthenticatedUser() {
        return UserModel.getUser();
    }

    static updateUser(updatedUser) {
        UserModel.updateUser(updatedUser);
    }
}
