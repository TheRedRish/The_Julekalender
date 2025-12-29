import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import {
    getUserByEmail,
    getUserByUsername,
    createUser,
    updateUserPassword
} from '../database/queries/user.js';
import { recordLoginEvent } from '../database/queries/login.js';
import { sendWelcomeEmail, sendPasswordResetEmail } from '../util/mailer.js';

export async function registerUser({ email, username, password }, sendEmail = true) {
    if (!email || !username || !password) {
        const err = new Error('Email, username and password are required');
        err.status = 400;
        throw err;
    }

    if (await getUserByEmail(email)) {
        const err = new Error('Email already exists');
        err.status = 409;
        throw err;
    }

    if (await getUserByUsername(username)) {
        const err = new Error('Username already exists');
        err.status = 409;
        throw err;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await createUser(email, username, passwordHash);

    recordLoginEvent(user.id, 'signup');

    if (sendEmail) {
        sendWelcomeEmail(email);
    }

    return {
        id: user.id,
        email: user.email,
        username: user.username
    };
}

export async function loginUser({ email, password }) {
    if (!email || !password) {
        const err = new Error('Email and password are required');
        err.status = 400;
        throw err;
    }

    const user = await getUserByEmail(email);
    if (!user) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        throw err;
    }

    const passwordValid = await bcrypt.compare(password, user.password_hash);
    if (!passwordValid) {
        recordLoginEvent(user.id, 'failed_login');
        const err = new Error('Invalid credentials');
        err.status = 401;
        throw err;
    }

    recordLoginEvent(user.id, 'login');

    return {
        id: user.id,
        email: user.email,
        username: user.username
    };
}

export async function resetPassword({ email }) {
    if (!email) {
        const err = new Error('Email is required');
        err.status = 400;
        throw err;
    }

    const user = await getUserByEmail(email);
    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }

    const newPassword = crypto.randomBytes(6).toString('base64url');
    const passwordHash = await bcrypt.hash(newPassword, 12);

    await updateUserPassword(email, passwordHash);
    recordLoginEvent(user.id, 'password_reset');
    sendPasswordResetEmail(email, newPassword);

    return { message: 'Password reset email sent' };
}
