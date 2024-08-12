export const AuthModel = {
    login(username, password) {
        const users = [
            { username: "user1", password: "password1" },
            { username: "user2", password: "password2" },
        ];

        const user = users.find(
            (user) => user.username === username && user.password === password
        );

        if (user) {
            localStorage.setItem("authenticatedUser", JSON.stringify(user));
            return true;
        }

        return false;
    },

    logout() {
        localStorage.removeItem("authenticatedUser");
    },

    getAuthenticatedUser() {
        return JSON.parse(localStorage.getItem("authenticatedUser"));
    },

    isAuthenticated() {
        return !!localStorage.getItem("authenticatedUser");
    },
};
