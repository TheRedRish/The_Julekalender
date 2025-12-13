export function authGuard(req, res, next) {
    if (!req.session.user) {
        return res.status(401).send({ error: 'Not authenticated' });
    }
    next();
}