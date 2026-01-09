// src/routes/routes.js
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm/ForgotPasswordForm.svelte";
import LoginForm from "../components/auth/LoginForm/LoginForm.svelte";
import RegisterForm from "../components/auth/RegisterForm/RegisterForm.svelte";
import FrontPage from "../pages/FrontPage/FrontPage.svelte";
import LobbyOverview from "../pages/LobbyOverview/LobbyOverview.svelte";
import LobbyPage from "../pages/LobbyPage/LobbyPage.svelte";
import ProfilePage from "../pages/ProfilePage/ProfilePage.svelte";
import { gameRoutes } from "../games/index.js";

const baseRoutes = [
    {
        path: "/",
        Component: FrontPage,
    },
    {
        path: "/lobbies",
        Component: LobbyOverview,
    },
    {
        path: "/login",
        Component: LoginForm,
    },
    {
        path: "/register",
        Component: RegisterForm,
    },
    {
        path: "/forgot-password",
        Component: ForgotPasswordForm,
    },
    {
        path: "/profile",
        Component: ProfilePage,
        requiresAuth: true,
    },
    {
        path: "/lobby/:id",
        Component: LobbyPage,
        withParams: true,
        requiresAuth: true,
        requiresLobbyMember: false, // Here to stop TS from complaining
    },
];

export const routes = [...baseRoutes, ...gameRoutes];
