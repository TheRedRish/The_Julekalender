// src/routes/routes.js
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm/ForgotPasswordForm.svelte";
import LoginForm from "../components/auth/LoginForm/LoginForm.svelte";
import RegisterForm from "../components/auth/RegisterForm/RegisterForm.svelte";
import LobbyOverview from "../pages/LobbyOverview/LobbyOverview.svelte";
import LobbyPage from "../pages/LobbyPage/LobbyPage.svelte";

export const routes = [
    {
        path: "/",
        Component: LobbyOverview
    },
    {
        path: "/login",
        Component: LoginForm
    },
    {
        path: "/register",
        Component: RegisterForm
    },
    {
        path: "/forgot-password",
        Component: ForgotPasswordForm
    },
    {
        path: "/lobby/:id",
        Component: LobbyPage,
        withParams: true
    }
];
