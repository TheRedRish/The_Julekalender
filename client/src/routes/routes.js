// src/routes/routes.js
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm/ForgotPasswordForm.svelte";
import LoginForm from "../components/auth/LoginForm/LoginForm.svelte";
import RegisterForm from "../components/auth/RegisterForm/RegisterForm.svelte";
import LobbyOverview from "../pages/LobbyOverview/LobbyOverview.svelte";

export const routes = [
    {
        path: "/",
        component: LobbyOverview
    },
    {
        path: "/login",
        component: LoginForm
    },
    {
        path: "/register",
        component: RegisterForm
    },
    {
        path: "/forgot-password",
        component: ForgotPasswordForm
    }
];
