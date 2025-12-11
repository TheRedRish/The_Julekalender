import { Router } from 'express';
import { sendWelcomeEmail, sendPasswordResetEmail } from '../util/mailer.js';
import { authGuard } from '../util/authGuard.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { getUserByEmail, getUserByUsername, getUserById, createUser, updateUserPassword } from '../database/user/user.js';
import { recordLoginEvent } from '../database/login/login.js';

const router = Router();

router.post('/api/auth/register', async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !password || !username) {
        return res.status(400).send({ error: 'Email, username and password are required' });
    }

    try {
        const existingUserEmail = await getUserByEmail(email);
        if (existingUserEmail) {
            return res.status(409).send({ error: 'Email already exists' });
        }

        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            return res.status(409).send({ error: 'Username already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const user = await createUser(email, username, passwordHash);
        recordLoginEvent(user.id, 'signup');
        sendWelcomeEmail(email);
        req.session.user = { id: user.id, email: user.email, username: user.username };

        res.status(201).send(req.session.user);
    } catch (error) {
        console.error('Registration failed', error);
        res.status(500).send({ error: 'Failed to register' });
    }
});

router.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ error: 'Email and password are required' });
    }

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const passwordValid = await bcrypt.compare(password, user.password_hash);
        if (!passwordValid) {
            recordLoginEvent(user.id, 'failed_login');
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        req.session.user = { id: user.id, email: user.email, username: user.username };
        recordLoginEvent(user.id, 'login');
        res.send(req.session.user);
    } catch (error) {
        console.error('Login failed', error);
        res.status(500).send({ error: 'Failed to login' });
    }
});

router.post('/api/auth/forgot', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send({ error: 'Email is required' });
    }

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const newPassword = crypto.randomBytes(6).toString('base64url');
        const passwordHash = await bcrypt.hash(newPassword, 12);
        await updateUserPassword(email, passwordHash);
        recordLoginEvent(user.id, 'password_reset');
        sendPasswordResetEmail(email, newPassword);

        res.send({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Password reset failed', error);
        res.status(500).send({ error: 'Failed to reset password' });
    }
});

router.post('/api/auth/logout', (req, res) => {
    req.session.destroy(() => {
        res.send({ message: 'Logout successful' });
    });
});

router.get('/api/auth/session', authGuard, async (req, res) => {
    try {
        const user = await getUserById(req.session.userId);
        res.send({ user });
    } catch (error) {
        console.error('Fetching user failed', error);
        res.status(500).send({ error: 'Failed to fetch user' });
    }
});

export default router;
