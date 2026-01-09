import { registerUser } from "../services/authService.js";

export function seedDefaultUsers() {
    const users = [
        { email: "test1@tester.com", username: "Tester 1", password: "password1" },
        { email: "test2@tester.com", username: "Tester 2", password: "password1" },
        { email: "test3@tester.com", username: "Tester 3", password: "password1" },
    ];

    return Promise.all(
        users.map((user) =>
            registerUser(
                { email: user.email, username: user.username, password: user.password },
                false
            )
        )
    );
}
